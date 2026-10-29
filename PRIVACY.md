# Privacy

Consilyn is made by Amaltas Labs (https://www.amaltaslabs.com); "we" and "us" here
mean Amaltas Labs. Consilyn runs on your laptop. There is no password: if you sign in, it is
with your email and a one-time code. Nothing said on a call, and nothing you type or paste
for a call, is ever sent to us.

## What stays on your laptop

- **Audio is never saved and never leaves your laptop.** It is held in memory for a
  few seconds, turned into text on your laptop, and discarded.
- **Your material** (your background, clients, screening answers, briefs) and **call
  text** are stored in a database file in the `.consilyn` folder in your
  user folder. Only you can see them, and uninstalling leaves them there so you
  don't lose them by accident. Delete that folder to remove them.
- **Your Gemini key and licence key** are saved in the same folder, in a file called
  `.env`.
- **If you sign in**, your email and this device's sign-in token (a long random code our
  server gives it) are saved in the same folder, in `account.json`. Deleting it signs
  this device out.

### If you use Consilyn in your browser

The browser version (Chrome or Edge on Windows, Chrome on a Mac, at app.consilyn.com) is
the same app, run inside the page, and keeps the same rules:

- **Audio still never leaves your laptop.** The page hears the call through the screen
  share you choose and your microphone, turns it into text inside the page, and
  discards it. Only the sound of the share is used; the picture is never looked at.
- **Your material, call text and keys** are kept in your browser's own storage for
  app.consilyn.com, on this laptop, instead of the `.consilyn` folder. Clearing that
  site's data in your browser deletes them. Another browser, or a private window, starts
  empty.
- **The first time, the page downloads its parts**: Python and its libraries from
  jsDelivr, and the speech and matching models from Hugging Face. Like any download,
  those services see your internet address; nothing about you or your calls goes with it.
- **The laptop ID** is a random code the page makes once and keeps in that same storage,
  because a web page cannot read Windows' ID. Clearing the site's data makes a new one.
- **Reports** say "web on Windows" or "web on Mac" where the app says your Windows
  version. Everything else our server receives is exactly as listed below.

## What is sent to the AI service

To suggest answers, the app sends **text only** to Google's Gemini service, using
your own key: the recent conversation, your background, and the call's screening
answers and brief. Nothing else is sent.

- On Gemini's **free tier**, Google may use this text to improve its products, and
  people may review it. The consent screen tells you so before every call.
- On a **paid tier** (billing linked in Google AI Studio), Google does not use it
  for training.

Google's own privacy terms apply to what it receives. Without a key, nothing is sent
to Google, and the app only shows the transcript.

## What our server receives

Our server is a small service run for us by Cloudflare at api.consilyn.com (the browser
version reaches the same service at app.consilyn.com). It never
receives call content: nothing said, no transcript, no suggested answer, no client name,
no brief, no screening answers, no background, no AI key.

### To count free calls

When you open the consent screen and when you start a call, the app asks our
server whether the call is allowed. It sends:

- **A scrambled laptop ID.** This is a one-way code made from Windows' own ID for
  your laptop. Anyone who holds it can't work back to your laptop, and it matches
  nothing in any other app. It stays the same if you reinstall, which is how free
  calls are counted. The app shows the start of it as your **Support ID**.
- **A scrambled ID for the client entry** the call is for, so that restarting the
  same call isn't counted twice. It contains nothing about the client.
- **The app's version number**, and **the times** calls were started, including any
  calls started while offline.
- **Your licence key**, if you bought Pro before 29 October 2026 (keys are no longer
  issued), so your plan can be checked. The server keeps only a scrambled copy of it.
- **This device's sign-in token**, if you've signed in, so the call is counted on your
  account and a plan you bought works on every device you sign in on.
- **That the call has ended**, sent after it ends, never during it, so a call on another
  of your devices isn't taken for two at once.

### Your account, if you sign in

In Set up → Your account, you type your email, and our server emails you a six-digit
code through Resend, a mail service, under its privacy terms. Typing the code in signs
that device in. Free calls and any plan you buy then belong to your email, on every
device you sign in on. Our server keeps:

- **your email**, as you typed it, and a tidied copy used to tell whether two addresses
  are one inbox (for example, Gmail ignores dots and anything after a +);
- **when you signed up and were last seen**, and whether you ticked "OK to email me about
  offers". If you didn't, we email you only codes, receipts and replies;
- **which devices are signed in**, by their scrambled IDs, and a scrambled copy of each
  device's sign-in token (never the token itself);
- **your calls' counts**: when each started and ended, on which device, and whether one
  started while another of your devices had a call running. If several devices share
  one account often, we may ask about it.

The six-digit code is kept only scrambled, works for 10 minutes, and is deleted once
used. A purchase made with the same email is linked to your account, including one made
before you first signed in.

### Usage counts and error reports (you can turn these off)

So that problems get found and fixed, the app also sends, tied to your Support ID:

- that the app started, and the first time it did;
- the first time you reach each setup step, **by name only**: AI key saved, client added,
  screening answers saved, answers prepared, consent screen opened, listening started.
  Nothing you typed or pasted goes with it;
- after each call, **numbers only**: how long it lasted, how many answers were shown and
  what they were built from (your material, or general knowledge), how quickly they
  came, how the call ended, the name of the speaker it listened to, whether the laptop
  was on battery, and how many requests to the AI service failed and why;
- **errors**: what kind, where in the app's code, and a short description when it can
  only be about your laptop (a network, device or file problem). Other error messages
  are left out, because they could quote something;
- your Windows version and whether your Gemini key is on the free or paid tier.

They are **on unless you turn them off** in Set up → Reports and feedback. When you
do, the app sends one last note that you did, and then none of the above.

### When you install or uninstall

The installer tells our server how the install went, so failed installs get found and
fixed: that its window opened, that copying began, that it finished and found its main
files in place (or which were missing), that it stopped part-way, or that it was closed
before installing and on which page; and that the app was uninstalled. It sends the same
scrambled laptop ID, the version, the version it replaces and your Windows version.

### Feedback, and your email if you give it

When you answer the short card after a call, or use **Feedback**, the app sends what you
chose and typed there, with your Support ID. It is saved as you go, so an unfinished
card still reaches us, and if you change an answer we keep the newest. Please don't
put client details in it.

You can give your email in Set up or on a feedback card, so we can reply or tell you
when something you hit is fixed. It's optional, and it's sent with your reports and
feedback from then on. If you haven't given one but have signed in, the email you signed
in with goes with your reports instead. If you bought a licence, we link the email you gave Dodo
Payments to your Support ID, so we can help you when something goes wrong.

### Checking for a new version

The app asks our server for the newest version number, so it can offer the update.
It sends nothing but the app's version, and it does this even with reports off.

How long we keep it: usage counts and errors for about 13 months; feedback, emails
and your account until you ask us to delete them. Write to hello@consilyn.com, quoting your
Support ID, to see or delete what we hold about you.

Your internet address is seen by Cloudflare, which runs the server, as with any
website. We don't store it.

## Our website

consilyn.com uses **no cookies** and keeps nothing in your browser. Each page sends one
small message to our server: the page's address, the site that linked to it, any
campaign tags in the link (`utm_` tags), which country Cloudflare places you in,
whether you pressed Download, Buy or our email link, and what kind of device you are
on: Windows, Mac, phone, tablet, Linux or other. The kind is worked out from what your
browser says about itself, and only the kind is kept. To count visitors without
cookies, the server makes a code from your internet address, browser and the date,
which changes every day and can't be turned back into the address; the address
itself is not kept. Script errors on our pages are reported the same way. The only
thing the site ever stores in a browser is a switch the site's owner turns on in their
own browsers to stop counting their own visits; nobody else has one.

Two pages also send, the same way and with the same daily code:

- **"Read the page"**: a note that a page stayed open 30 seconds or was read down to the
  download section, so we can tell readers from people who leave at once.
- **How far you got**: when you leave a page or switch away from it, which of its
  sections you scrolled down to, whether "What stopped you?" came into view, and roughly
  how long the page had been open (under 10 seconds, up to 30, up to 2 minutes, up to 5,
  or longer). It is sent again only if you come back and read further.
- **Your answer, if you tap one,** to "How did it go?" (shown after you press Download)
  or "What stopped you?" (at the bottom of the home page): only the answer you chose, and
  the few words you type under "Something else", if any. Please don't put anything
  private there.

**"Email me the link"** (on phones, tablets and Macs): the email address you type is sent
to our server, which emails you the download link once through Resend, a mail service,
under its privacy terms. We keep the address, when you asked, the country and kind of
device, whether the link went out, and whether you ticked "OK to email me once to ask
how it went". If you ticked it, we may write to you once; if not, we won't write except
to send the link. We keep the address until you ask us to delete it.

**"Want a hand?"** (in the box after you press Download): if you type your email address
there, it is sent to our server with whether you ticked "OK to email me again later to
ask how it went", your answer to "How did it go?" if you gave one, and the country and
kind of device. The founder is told at once and writes to you to help with the install;
nothing is emailed to you automatically. If you didn't tick the box, we write only about
this. We keep the address until you ask us to delete it.

**The setup call** is booked on Cal.com, a separate service; what you give it is under
Cal.com's privacy terms and reaches us as a normal booking.

The Download button goes through our server, which counts the press the same way
(with the kind of device) and sends you to the newest installer on GitHub. To tell which visit led to which install,
the server also makes a second daily code from your internet address alone, kept with
the download press and with the installer's first message; it changes every day and
can't be turned back into the address.

## Payments

If you buy a licence, the purchase is handled by Dodo Payments, the merchant of
record. Your name, email and payment details go to Dodo Payments under its privacy
policy. We receive the licence's status, and the purchase details Dodo Payments
shares with sellers, including your email and, if a payment fails, Dodo's reason for it.

When you're signed in, Upgrade gives Dodo Payments your account's email, already filled
in, and your account's number, so the plan lands on your account.

The Upgrade link passes through our server on its way to Dodo Payments. It uses the
country Cloudflare reports for your connection to offer rupees and UPI if you are in
India, and counts the press with that country, the kind of device and the same daily
code made from your internet address. It never keeps your address.

After you pay, Dodo Payments sends you back to a thank-you page on our server, and puts
your email (and, for purchases before 29 October 2026, a licence key) in that page's
address. The page shows neither and removes both from the address bar. The server
keeps neither.

## Contact

Questions about privacy: hello@consilyn.com.
