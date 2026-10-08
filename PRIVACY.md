# Privacy

Consilyn runs on your laptop. There is no account, and nothing said on a call, and
nothing you type or paste for a call, is ever sent to us.

## What stays on your laptop

- **Audio is never saved and never leaves your laptop.** It is held in memory for a
  few seconds, turned into text on your laptop, and discarded.
- **Your material** (your background, clients, screening answers, briefs) and **call
  text** are stored in a database file in the `.consilyn` folder in your
  user folder. Only you can see them, and uninstalling leaves them there so you
  don't lose them by accident. Delete that folder to remove them.
- **Your Gemini key and licence key** are saved in the same folder, in a file called
  `.env`.

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

Our server is a small service run for us by Cloudflare at api.consilyn.com. It never
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
- **Your licence key**, once you've bought one, so your plan can be checked. The
  server keeps only a scrambled copy of it.

### Usage counts and error reports (you can turn these off)

So that problems get found and fixed, the app also sends, tied to your Support ID:

- that the app started, and the first time it did;
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
feedback from then on. If you bought a licence, we link the email you gave Dodo
Payments to your Support ID, so we can help you when something goes wrong.

### Checking for a new version

The app asks our server for the newest version number, so it can offer the update.
It sends nothing but the app's version, and it does this even with reports off.

How long we keep it: usage counts and errors for about 13 months; feedback and
emails until you ask us to delete them. Write to hello@consilyn.com, quoting your
Support ID, to see or delete what we hold about you.

Your internet address is seen by Cloudflare, which runs the server, as with any
website. We don't store it.

## Our website

consilyn.com uses **no cookies** and keeps nothing in your browser. Each page sends one
small message to our server: the page's address, the site that linked to it, any
campaign tags in the link (`utm_` tags), which country Cloudflare places you in, and
whether you pressed Download, Buy or our email link. To count visitors without
cookies, the server makes a code from your internet address, browser and the date,
which changes every day and can't be turned back into the address; the address
itself is not kept. Script errors on our pages are reported the same way.

The Download button goes through our server, which counts the press the same way and
sends you to the newest installer on GitHub. To tell which visit led to which install,
the server also makes a second daily code from your internet address alone, kept with
the download press and with the installer's first message; it changes every day and
can't be turned back into the address.

## Payments

If you buy a licence, the purchase is handled by Dodo Payments, the merchant of
record. Your name, email and payment details go to Dodo Payments under its privacy
policy. We receive the licence's status, and the purchase details Dodo Payments
shares with sellers, including your email and, if a payment fails, Dodo's reason for it.

The Upgrade link passes through our server on its way to Dodo Payments. It uses the
country Cloudflare reports for your connection to offer rupees and UPI if you are in
India, and counts the press with that country. It never keeps your address.

After you pay, Dodo Payments sends you back to a thank-you page on our server, and puts
your new licence key and email in that page's address. The page shows you the key, then
removes both from the address bar. The server keeps neither.

## Contact

Questions about privacy: hello@consilyn.com.
