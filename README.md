# Consilyn

A live answer screen for experts on paid calls. It listens to your call on your own
Windows laptop and puts a short, AI-written answer on screen for you to say in your own
words, drawn from your own screening answers and background. See https://consilyn.com.

**Free to start. Runs on your laptop. Audio is never recorded and never leaves it.
Only text goes to Google's AI, with your own key.**

## What it does

- **Before the call:** paste the client's brief and the screening answers you
  submitted. It prepares answers to the questions you are likely to be asked.
- **During the call:** it transcribes both sides on your laptop. When the client
  finishes a question, a short answer you can read aloud appears. Every answer shows
  what it rests on: every AI-written answer is marked *not verified*, and where it
  draws on your screening answers or background, your exact words are quoted
  underneath. Each answer is checked against your screening answers before it
  appears; if it disagrees, your own screening answer is shown instead.

## Price

- **Free during early access.** Every call is free while we're getting started.
- **After that:** your first 5 calls are free, then 2 free calls every month.
  Unlimited calls are $39 a month, and you can cancel any time. The free allowance
  and the price may change; the app shows the current numbers before each call.
- Restarting the same call, for example after a dropped connection, isn't counted
  again.
- Payments are not refundable, so please try the free calls first. See
  [REFUND.md](REFUND.md).

## Download

**The first release is coming soon.** When it's out, get
`Consilyn-Setup-<version>.exe` from [Releases](../../releases/latest)
and run it. No admin rights are needed.

Windows may say it "protected your PC", because the installer is not yet signed.
Choose **More info**, then **Run anyway**. The `.sha256` file next to each release
lets you check the download is the one published here.

## What you need

- Windows 10 or 11, 64-bit, with 8 GB of memory. Keep the laptop plugged in during
  calls.
- The laptop's own speakers and microphone, or a headset (a wired one is more
  predictable than Bluetooth). The app hears the client through your call app's
  sound output, and you through your microphone.
- A call app on the same laptop. Zoom and Google Meet in Chrome work best; others,
  such as Microsoft Teams, can work too. The app finds whichever one is playing and
  listening.
- A Gemini key from [Google AI Studio](https://aistudio.google.com/apikey), free to
  start. The app asks for it the first time it starts. Speeds were measured with a
  paid key; on the free tier, Google's limits can make answers slow or missing, and
  the daily allowance can run out mid-call.

## Before your first real call

1. **Check your expert network's terms.** Several large expert networks do not
   allow experts to transcribe calls or use AI to help answer. On those networks'
   calls, do not use it without written permission.
2. **Tell the client** a tool is transcribing the call and sending the text to
   Google's AI to suggest answers, and go ahead only if they agree. The app asks you
   to confirm this before it listens.
3. **Practise** on a call with a friend first.

## Privacy

Audio stays on your laptop. Only text is sent, to Google's Gemini with your own key,
to write suggestions. On Gemini's free tier Google may use that text to improve its
products. To count free calls, our server sees a scrambled laptop ID, a scrambled ID
for the client entry, the app version, when calls start, and your licence key once
you have one. It never sees anything said. See the [privacy policy](https://consilyn.com/privacy/) and
[terms](https://consilyn.com/terms/).

## Contact

hello@consilyn.com, or open an issue under [Issues](../../issues).

## Known limits

- Laptops, headsets and call apps vary, so try yours on a free call before a paid
  one. Please report problems under [Issues](../../issues).
- English only.
- Windows only.
