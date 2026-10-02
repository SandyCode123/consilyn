# Privacy

Consultants Copilot runs on your laptop. There is no account, and nothing you say,
type or paste is ever sent to us.

## What stays on your laptop

- **Audio is never saved and never leaves your laptop.** It is held in memory for a
  few seconds, turned into text on your laptop, and discarded.
- **Your material** (your background, clients, screening answers, briefs) and **call
  text** are stored in a database file in the `.consultants-copilot` folder in your
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

## What our server receives, which is only enough to count free calls

When you open the consent screen and when you start a call, the app asks our
server whether the call is allowed. It sends exactly this:

- **A scrambled laptop ID.** This is a one-way code made from Windows' own ID for
  your laptop. Anyone who holds it can't work back to your laptop, and it matches
  nothing in any other app. It stays the same if you reinstall, which is how free
  calls are counted.
- **A scrambled ID for the client entry** the call is for, so that restarting the
  same call isn't counted twice. It contains nothing about the client.
- **The app's version number**, and **the times** calls were started, including any
  calls started while offline.
- **Your licence key**, once you've bought one, so your plan can be checked. The
  server keeps only a scrambled copy of it.

It never receives call content, anything said or typed, client names, your name or
your email. It doesn't use cookies or analytics. Your internet address is seen by
Cloudflare, which runs the server, as with any website.

## Payments

If you buy a licence, the purchase is handled by Dodo Payments, the merchant of
record. Your name, email and payment details go to Dodo Payments under its privacy
policy. We receive the licence's status, and the purchase details Dodo Payments
shares with sellers.

## Contact

Questions about privacy: pateljimi520@gmail.com.
