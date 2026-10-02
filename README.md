# Consultants Copilot

A live answer screen for experts on expert-network calls. It listens to your call on
your own Windows laptop and puts a suggested answer on screen, fast enough to use,
built from your own screening answers and background.

**Free to start. Runs on your laptop. Audio is never recorded and never leaves it.**

## What it does

- **Before the call:** paste the client's brief and the screening answers you
  submitted. It prepares answers to the questions you are likely to be asked.
- **During the call:** it transcribes both sides on your laptop. When the client
  finishes a question, a short answer you can read aloud appears. Every answer shows
  what it rests on: your screening answers, your background, or general knowledge
  marked *not verified*. Nothing it suggests contradicts your screening answers.

## Price

- **Free during early access.** Every call is free while we're getting started.
- **After that:** your first 5 calls are free, then 2 free calls every month,
  forever. Unlimited calls are $39 a month, and you can cancel any time.
- Restarting the same call, for example after a dropped connection, isn't counted
  again.
- Payments are not refundable, so please try the free calls first. See
  [REFUND.md](REFUND.md).

## Download

**The first release is coming soon.** When it's out, get
`ConsultantsCopilot-Setup-<version>.exe` from [Releases](../../releases/latest)
and run it. No admin rights are needed.

Windows may say it "protected your PC", because the installer is not yet signed.
Choose **More info**, then **Run anyway**. The `.sha256` file next to each release
lets you check the download is the one published here.

## What you need

- Windows 10 or 11, 64-bit, with 8 GB of memory. Keep the laptop plugged in during
  calls.
- A headset. The app hears the client through your call app's sound output, and you
  through your microphone.
- Zoom, Teams, Google Meet or another call app. The app finds whichever one is
  playing and listening.
- A free Gemini key from [Google AI Studio](https://aistudio.google.com/apikey).
  The app asks for it the first time it starts.

## Before your first real call

1. **Check your expert network's terms.** Some do not allow assistant tools on
   their calls.
2. **Tell the client** a tool is transcribing the call, and go ahead only if they
   agree. The app asks you to confirm this before it listens.
3. **Practise** on a call with a friend first.

## Privacy

Audio stays on your laptop. Only text is sent, to Google's Gemini with your own key,
to write suggestions. On Gemini's free tier Google may use that text to improve its
products. To count free calls, our server sees a scrambled laptop ID and when calls
start. It never sees anything said. See [PRIVACY.md](PRIVACY.md) and
[TERMS.md](TERMS.md).

## Contact

pateljimi520@gmail.com, or open an issue under [Issues](../../issues).

## Known limits

- It has been tested on one laptop with one Bluetooth headset. Other hardware may
  behave differently. Please report problems under [Issues](../../issues).
- English only.
- Windows only.
