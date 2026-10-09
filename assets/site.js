/* consilyn.com — the replayed call in the hero, and two small page behaviours.

   The demo is a recreation of the app's live screen (src/copilot/static), driven by
   the made-up calls in index.html's #demo-calls block (the same block becomes the
   text version under the demo, built by packaging/build_site.py). It keeps the app's
   rules: a new question clears the old answer and takes the next look; the opening
   line carries "Read this" until the answer lands; every AI-written answer carries
   "Generated · not verified" first and is drawn as unverified, with a green chip for
   each piece of the expert's own material it quotes; a held answer is the expert's
   own screening answer under a solid green chip; a figure the client misquotes gets
   the red bar over the heard line; a client who cuts in dims the card.
   Every element it looks up must be in index.html: the caption line was taken off the
   page on 2026-10-06 while this still wrote to it, and the demo froze at its first
   step until 2026-10-09. tests/test_public_site.py now checks each lookup. The calls'
   "caption" fields are not shown anywhere at present.
   Every call is invented. No real company, client or person appears here. */

/* The phone menu: the same <nav> as on a laptop, opened by the "Menu" button. Closes on
   a link (most go to a section of the same page), on Escape, and on a tap outside. */
(function () {
  "use strict";
  document.documentElement.classList.add("js");
  const button = document.querySelector(".menu-btn");
  const head = document.querySelector(".site-head");
  if (!button || !head) return;
  const set = (open) => {
    head.classList.toggle("menu-open", open);
    button.setAttribute("aria-expanded", open ? "true" : "false");
    button.textContent = open ? "Close" : "Menu";
  };
  button.addEventListener("click", () => set(button.getAttribute("aria-expanded") !== "true"));
  document.getElementById("main-nav").addEventListener("click", (e) => { if (e.target.closest("a")) set(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") set(false); });
  document.addEventListener("click", (e) => { if (!head.contains(e.target)) set(false); });
})();

(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const GENERATED = "Generated · not verified";
  const LOOKS = ["look-a", "look-b", "look-c"];

  /* ------------------------------------------------------------ helpers */

  const $ = (root, sel) => root.querySelector(sel);
  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  };
  // One sentence to a line, as the app does. No lookbehind: older Safari cannot
  // parse it, and a parse error would take the whole script down.
  function split(text) {
    return text.replace(/([.!?])\s+(?=["'A-Z0-9“])/g, "$1\u0000").split("\u0000");
  }
  function sentences(node, text, lead) {
    node.replaceChildren();
    split(text).forEach((s, i) => node.appendChild(el("span", lead && i === 0 ? "sent lead" : "sent", s)));
  }

  /* ------------------------------------------------------------ the demo */

  function Demo(root, CALLS) {
    const win = $(root, ".app");
    const ui = {
      client: $(win, ".app-client"),
      timer: $(win, ".app-timer"),
      heard: $(win, ".app-heard-text"),
      clash: $(win, ".app-clash"),
      clashText: $(win, ".app-clash-text"),
      working: $(win, ".app-working"),
      workingHead: $(win, ".app-working-head"),
      workingLabel: $(win, ".app-read-text"),
      say: $(win, ".app-say"),
      cutin: $(win, ".app-cutin"),
      card: $(win, ".app-card"),
    };
    const tabs = Array.from(root.querySelectorAll(".demo-tab"));
    const playBtn = $(root, ".demo-play");
    const stepsBar = $(root, ".demo-steps");
    const live = $(root, ".demo-live");

    let scenarioIndex = 0;
    let run = 0;
    let speakRun = -1;     // only a run the visitor started is read out
    let started = false;
    let visible = false;
    // Reduced motion: nothing moves until the visitor presses Play, and then the
    // words arrive whole rather than as they are spoken.
    let userPaused = reduceMotion;
    let look = 0;
    let seconds = 42;

    const active = () => !userPaused && visible && !document.hidden;

    setInterval(() => {
      if (!active()) return;
      seconds += 1;
      ui.timer.textContent = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
    }, 1000);

    // A pausable sleep: time passes only while the demo plays and is on screen.
    // A 100 ms tick rather than every frame, so a paused or hidden demo costs nothing.
    function sleep(ms, id) {
      return new Promise((resolve, reject) => {
        let left = ms;
        let last = performance.now();
        const step = () => {
          if (id !== run) { reject(new Error("cancelled")); return; }
          const now = performance.now();
          if (active()) left -= now - last;
          last = now;
          if (left <= 0) resolve();
          else setTimeout(step, Math.min(100, Math.max(16, left)));
        };
        setTimeout(step, Math.min(100, ms));
      });
    }

    function setPlayButton() {
      playBtn.querySelector(".label").textContent = userPaused ? "Play demo" : "Pause demo";
      playBtn.querySelector(".i-pause").classList.toggle("hidden", userPaused);
      playBtn.querySelector(".i-play").classList.toggle("hidden", !userPaused);
      root.classList.toggle("paused", userPaused);
    }

    function setSteps(total, at) {
      stepsBar.replaceChildren();
      for (let i = 0; i < total; i += 1) stepsBar.appendChild(el("span", i < at ? "done" : i === at ? "now" : ""));
    }


    // The app's top bar: the client in bold, what the call is about after it.
    function setClient(text) {
      const [name, ...rest] = text.split(" · ");
      ui.client.replaceChildren(document.createTextNode(name));
      if (rest.length) ui.client.appendChild(el("em", "", ` · ${rest.join(" · ")}`));
    }
    function announce(id, text) { if (id === speakRun) live.textContent = text; }

    function wear(node) {
      LOOKS.forEach((l) => node.classList.remove(l));
      node.classList.add(LOOKS[look % LOOKS.length]);
    }

    function blankCard() {
      ui.card.replaceChildren();
      ui.card.classList.remove("answered", "stale");
      const b = el("div", "app-blank");
      b.append(el("h4", "", "Nothing on screen yet"), el("p", "", "A suggestion appears here when the client finishes a question."));
      ui.card.appendChild(b);
    }

    // A new question: both sections start empty and the set takes the next look.
    function startSet() {
      look += 1;
      ui.say.replaceChildren();
      ui.working.classList.remove("hidden", "answered");
      wear(ui.working);
      ui.workingHead.classList.remove("read-this");
      ui.workingLabel.textContent = "";
      ui.cutin.classList.add("hidden");
      blankCard();
    }

    function showOpening(text) {
      wear(ui.working);
      ui.workingHead.classList.add("read-this");
      ui.workingLabel.textContent = "Read this";
      sentences(ui.say, text, false);
    }

    // The answer has landed. The opening line stays exactly as it is (they may be
    // halfway through saying it) but stops claiming to be read; with no line, the
    // band goes away.
    function quietOpening() {
      if (ui.say.textContent) {
        ui.working.classList.add("answered");
        ui.workingHead.classList.remove("read-this");
        ui.workingLabel.textContent = "";
      } else {
        ui.working.classList.add("hidden");
      }
    }

    function showAnswer(turn) {
      ui.card.replaceChildren();
      ui.card.classList.add("answered");
      ui.card.classList.remove("stale");
      ui.card.appendChild(el("div", "app-read", "Read this"));
      const prov = el("div", "app-prov");
      const a = el("p", "app-answer");
      if (turn.held) {
        prov.appendChild(el("span", "chip chip-verified chip-solid", turn.held.label));
        sentences(a, turn.held.text, true);
      } else {
        turn.prov.forEach((label) => prov.appendChild(el("span", label === GENERATED ? "chip chip-unverified" : "chip chip-verified", label)));
        if (turn.prepared) prov.appendChild(el("span", "chip chip-muted", "Prepared"));
        if (turn.prov.includes(GENERATED)) a.classList.add("unverified");
        sentences(a, turn.text, true);
      }
      wear(a);
      ui.card.append(prov, a);
      if (!turn.held && turn.foot.length) {
        const foot = el("div", "app-foot");
        turn.foot.forEach(([label, quote]) => {
          const item = el("div", "app-foot-item");
          item.append(el("b", "", label), document.createTextNode(`“${quote}”`));
          foot.appendChild(item);
        });
        ui.card.appendChild(foot);
      }
    }

    function showClash(who, c) {
      ui.clashText.replaceChildren(
        document.createTextNode(`${who} said `), el("b", "", c.said),
        document.createTextNode(" — you wrote "), el("b", "", c.wrote),
        document.createTextNode(` (Q${c.q}).`));
      ui.clash.classList.remove("hidden");
    }

    // The heard line fills in as the transcript arrives: a few words at a time, at
    // about the pace people speak.
    async function hear(who, text, id) {
      ui.heard.replaceChildren(el("span", "who", who));
      const node = document.createTextNode("");
      ui.heard.appendChild(node);
      if (reduceMotion) { node.textContent = text; await sleep(1500, id); return; }
      const words = text.split(" ");
      for (let i = 0; i < words.length; i += 3) {
        node.textContent = words.slice(0, i + 3).join(" ");
        await sleep(1000 + Math.random() * 200, id);
      }
    }

    // `resume`: the page loads showing the first answer of the first call, already
    // on screen. The first run starts from there instead of wiping it.
    async function playScenario(index, id, resume) {
      const sc = CALLS[index];
      tabs.forEach((t, i) => t.setAttribute("aria-pressed", i === index ? "true" : "false"));
      let first = 0;
      if (resume) {
        look = 1;
        setSteps(sc.turns.length, 0);
        announce(id, `Example call: ${sc.client}. ${sc.who} asked: ${sc.turns[0].heard} Answer on screen, labelled ${sc.turns[0].prov.join(", ")}, prepared: ${sc.turns[0].text}`);
        await sleep(7000, id);
        first = 1;
      } else {
        setClient(sc.client);
        ui.clash.classList.add("hidden");
        ui.cutin.classList.add("hidden");
        ui.working.classList.add("hidden");
        ui.heard.replaceChildren(document.createTextNode("Listening. Nothing said yet."));
        blankCard();
        setSteps(sc.turns.length, 0);
        announce(id, `Example call: ${sc.client}.`);
        await sleep(1800, id);
      }

      for (let t = first; t < sc.turns.length; t += 1) {
        const turn = sc.turns[t];
        setSteps(sc.turns.length, t);
        if (!turn.clash) ui.clash.classList.add("hidden");
        ui.cutin.classList.add("hidden");
        ui.card.classList.remove("stale");
        await hear(sc.who, turn.heard, id);
        if (turn.clash) {
          showClash(sc.who, turn.clash);
          announce(id, `${sc.who} said ${turn.clash.said}; you wrote ${turn.clash.wrote} (Q${turn.clash.q}).`);
        }
        await sleep(300, id);
        startSet();
        if (turn.prepared) {
          // A prepared answer usually beats the opening line, so there is none.
          announce(id, `${sc.who} asks: ${turn.heard}`);
          await sleep(2600, id);
        } else {
          await sleep(1800, id);
          showOpening(turn.say);
          announce(id, `${sc.who} asks: ${turn.heard} Opening line: ${turn.say}`);
          await sleep(3400, id);
        }
        quietOpening();
        showAnswer(turn);
        const labels = turn.held ? turn.held.label : turn.prov.concat(turn.prepared ? ["Prepared"] : []).join(", ");
        const body = turn.held ? turn.held.text : turn.text;
        announce(id, `Answer on screen, labelled ${labels}: ${body}`);
        await sleep(Math.max(6500, body.split(" ").length * 300), id);
        if (turn.cutIn) {
          ui.cutin.textContent = `${sc.who} is speaking — listen`;
          ui.cutin.classList.remove("hidden");
          ui.card.classList.add("stale");
          ui.heard.replaceChildren(el("span", "who", sc.who), document.createTextNode("Sorry, can I stop you there"));
          announce(id, `${sc.who} cuts in. The card dims and the screen says listen.`);
          await sleep(4200, id);
        }
      }
      setSteps(sc.turns.length, sc.turns.length);
      await sleep(1500, id);
    }

    async function loop(start, resume, speak) {
      const id = ++run;
      if (speak) speakRun = id;
      started = true;
      let i = start;
      try {
        for (;;) {
          scenarioIndex = i;
          await playScenario(i, id, resume);
          resume = false;
          i = (i + 1) % CALLS.length;
        }
      } catch (e) {
        if (e.message !== "cancelled") throw e;
      }
    }

    function choose(i) {
      look = 0;
      if (userPaused) { userPaused = false; setPlayButton(); }
      loop(i, false, true);
    }

    tabs.forEach((tab, i) => tab.addEventListener("click", () => choose(i)));

    playBtn.addEventListener("click", () => {
      userPaused = !userPaused;
      setPlayButton();
      if (userPaused) { live.textContent = ""; return; }
      if (!started) loop(scenarioIndex, true, true);
      else speakRun = run;
    });
    $(root, ".demo-restart").addEventListener("click", () => choose(scenarioIndex));

    if ("IntersectionObserver" in window) {
      new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          visible = e.isIntersecting;
          if (visible && !started && !userPaused) loop(0, true, false);
        });
      }, { threshold: 0.3 }).observe(win);
    } else {
      visible = true;
      if (!userPaused) loop(0, true, false);
    }
    setPlayButton();
  }

  /* ------------------------------------------------------------ page */

  function initHeader() {
    const head = document.querySelector(".site-head");
    if (!head) return;
    const onScroll = () => head.classList.toggle("scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function initReveal() {
    const items = document.querySelectorAll(".reveal");
    if (!items.length) return;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach((n) => n.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    items.forEach((n) => io.observe(n));
  }

  // "Copy the address": many people read mail in a browser, where a mailto link
  // does nothing, so the address can also be copied. The result is said in a live
  // region as well as on the button, so a screen reader hears it.
  function initCopy() {
    document.querySelectorAll(".copy-email").forEach((btn) => {
      const label = btn.textContent;
      const status = document.querySelector(".copy-status");
      let timer = null;
      btn.addEventListener("click", async () => {
        let said;
        try {
          await navigator.clipboard.writeText(btn.dataset.email);
          said = "Copied";
        } catch (e) {
          said = btn.dataset.email;
        }
        btn.textContent = said;
        if (status) status.textContent = said === "Copied" ? `Copied ${btn.dataset.email}` : `The address is ${btn.dataset.email}`;
        clearTimeout(timer);
        timer = setTimeout(() => { btn.textContent = label; }, 2400);
      });
    });
  }

  document.documentElement.classList.remove("no-js");
  initCopy();
  initHeader();
  initReveal();
  const callsBlock = document.getElementById("demo-calls");
  if (callsBlock) {
    const CALLS = JSON.parse(callsBlock.textContent);
    document.querySelectorAll("[data-demo]").forEach((root) => Demo(root, CALLS));
  }
})();

/* Counting visits (2026-10-08, docs/plans/2026-10-08-feedback-analytics.md).

   One small message to our own server per page, and nothing else: which page, the
   site that sent the visitor (referrer) and any utm_ tags, a press on Download, Buy
   or the email link, and this page's own script errors. No cookies, nothing kept in
   the browser, nothing loaded from anyone else. The server counts a visitor with a
   code that changes every day and never keeps the address (server/src/insights.js).
   Download presses are also counted by the server's own /download link, which
   carries the utm_ tags along so a download is credited to where the visitor came
   from. Off anywhere but consilyn.com, so previews and local copies count nothing. */
(function () {
  "use strict";
  if (!/^(www\.)?consilyn\.com$/.test(location.hostname)) return;
  const ENDPOINT = "https://api.consilyn.com/v1/site";
  const send = (body) => {
    try {
      const data = new Blob([JSON.stringify(body)], { type: "text/plain" });
      if (!(navigator.sendBeacon && navigator.sendBeacon(ENDPOINT, data))) {
        fetch(ENDPOINT, { method: "POST", body: data, keepalive: true, mode: "no-cors" }).catch(() => {});
      }
    } catch (e) { /* counting never breaks the page */ }
  };
  const params = new URLSearchParams(location.search);
  const utm = {};
  ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "ref"].forEach((k) => {
    if (params.get(k)) utm[k] = params.get(k).slice(0, 100);
  });
  send({ t: "view", p: location.pathname, r: document.referrer || "", u: utm });

  // The visitor's utm_ tags ride along to the download, so it is credited to them.
  if (Object.keys(utm).length) {
    document.querySelectorAll('a[href^="https://api.consilyn.com/download"]').forEach((a) => {
      const url = new URL(a.href);
      Object.keys(utm).forEach((k) => url.searchParams.set(k, utm[k]));
      a.href = url.toString();
    });
  }

  document.addEventListener("click", (e) => {
    const a = e.target.closest && e.target.closest("a[href]");
    if (!a) return;
    const href = a.getAttribute("href");
    let button = null;
    if (href.startsWith("https://api.consilyn.com/download")) button = "download";
    else if (href.startsWith("https://api.consilyn.com/buy")) button = "buy";
    else if (href.startsWith("mailto:")) button = "email";
    else if (href === "#download" || href === "/#download") button = "to-download";
    if (button) send({ t: "click", p: location.pathname, b: button, u: utm });
  });

  let errors = 0;
  window.addEventListener("error", (e) => {
    if (errors++ >= 5) return;
    send({ t: "error", p: location.pathname, m: String(e.message || "error").slice(0, 300),
           s: `${String(e.filename || "").split("/").pop()}:${e.lineno || 0}` });
  });
  // The demo runs in async functions, and an error there arrives here, not above:
  // the 2026-10-06 demo crash was reported by nobody for three days.
  window.addEventListener("unhandledrejection", (e) => {
    if (errors++ >= 5) return;
    const r = e.reason || {};
    const at = /([\w.-]+\.js):(\d+)/.exec(String(r.stack || ""));
    send({ t: "error", p: location.pathname, m: String(r.message || r).slice(0, 300),
           s: at ? `${at[1]}:${at[2]}` : "promise" });
  });
})();
