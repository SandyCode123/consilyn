// Can this browser hear a call? Decided before anything heavy loads, from what the
// browser says about itself: nothing is asked of the visitor, and a browser that can
// hear a call is shown nothing at all.
//
// A page hears the call only through a screen share that carries the computer's sound
// (docs/web-first-placement.md): Chromium browsers on Windows and ChromeOS, and on a Mac
// Chrome 141 or newer on macOS 14.2 or newer. Firefox and Safari share no sound, a phone
// shares no call's sound, and on Linux a browser shares a tab's sound only.
//
// One file for two places: the web version's shell (server/web/shell.js), and the site's
// buttons, which get a copy from packaging/build_site.py (packaging/public/assets/fit.js).
(function (root) {
  "use strict";

  const MAC_CHROME = 141;
  const MAC_OS = [14, 2];
  const LINK = "consilyn.com/app";

  function chromium(brands) {
    const brand = (brands || []).find((b) => b.brand === "Chromium");
    return brand ? Number(brand.version) || 0 : 0;
  }

  function older(version, need) {
    const [major = 0, minor = 0] = String(version).split(".").map(Number);
    return major < need[0] || (major === need[0] && minor < need[1]);
  }

  // facts: { ua, uad (navigator.userAgentData or null), macVersion ("14.2.0" or null), touch }
  function judge(facts) {
    const ua = facts.ua || "";
    const uad = facts.uad || null;
    const mac = /Macintosh|Mac OS X/.test(ua);
    const handheld = uad
      ? Boolean(uad.mobile) || uad.platform === "Android"
      : /iPhone|iPad|iPod|Android|Mobile/i.test(ua) || (mac && facts.touch > 1);   // an iPad asking for the desktop site
    if (handheld) return { ok: false, kind: "phone" };
    if (!uad) {
      // Only Chromium browsers describe themselves this way, and only they share sound.
      const browser = /Firefox\//.test(ua) ? "Firefox"
        : /Safari\//.test(ua) && !/Chrom(e|ium)\//.test(ua) ? "Safari" : "this browser";
      return { ok: false, kind: "browser", browser, mac };
    }
    if (uad.platform === "Linux") return { ok: false, kind: "linux" };
    if (uad.platform === "macOS") {
      const version = chromium(uad.brands);
      if (version && version < MAC_CHROME) return { ok: false, kind: "old-chrome", platform: "macOS" };
      if (facts.macVersion && older(facts.macVersion, MAC_OS)) return { ok: false, kind: "old-mac", platform: "macOS" };
    }
    return { ok: true, kind: "ok", platform: uad.platform || "" };
  }

  // The browser's own description, with the real macOS version where a Mac has one to
  // give (Chromium only; Safari always says 10.15.7).
  async function check() {
    const nav = root.navigator || {};
    const uad = nav.userAgentData || null;
    let macVersion = null;
    if (uad && uad.platform === "macOS" && uad.getHighEntropyValues) {
      try { macVersion = (await uad.getHighEntropyValues(["platformVersion"])).platformVersion || null; } catch (e) { /* unknown is allowed */ }
    }
    return judge({ ua: nav.userAgent || "", uad, macVersion, touch: nav.maxTouchPoints || 0 });
  }

  // What to tell a visitor this browser cannot serve: one heading, one thing to do.
  function words(fit) {
    switch (fit.kind) {
      case "phone":
        return { head: "Open Consilyn on your laptop",
                 text: `Consilyn works beside the call, on the laptop you take it on. Open ${LINK} there, in Chrome or Edge.` };
      case "browser": {
        const use = fit.mac ? "Chrome" : "Chrome or Edge";
        const lacks = fit.browser === "this browser" ? "which this browser doesn't offer" : `which ${fit.browser} doesn't offer yet`;
        return { head: `Open Consilyn in ${use}`,
                 text: `Consilyn hears your call through ${use}'s system-sound sharing, ${lacks}. Open ${LINK} in ${use}${fit.mac ? " on this Mac" : ""}.` };
      }
      case "linux":
        return { head: "Open Consilyn on Windows or a Mac",
                 text: `On Linux a browser shares a tab's sound but not a call app's, so Consilyn can't hear the call here yet. Open ${LINK} on a Windows laptop or a Mac.` };
      case "old-chrome":
        return { head: "Update Chrome",
                 text: `Chrome hears a Mac's sound from version ${MAC_CHROME}. Update it (Chrome menu, Help, About Google Chrome), then open ${LINK} again.` };
      case "old-mac":
        return { head: "Update macOS",
                 text: `Chrome hears your call on macOS ${MAC_OS.join(".")} or newer. Update in System Settings, General, Software Update, then open ${LINK} again.` };
      default:
        return null;
    }
  }

  root.consilynFit = { judge, check, words, LINK };
})(self);
