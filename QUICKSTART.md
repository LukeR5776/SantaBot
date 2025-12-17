# Quick Start Guide

## Get Started in 3 Steps

### 1. Set up your FREE API key
```bash
cp .env.example .env
# Edit .env and add your OpenRouter API key (FREE!)
# Get it from: https://openrouter.ai/keys
```

### 2. Add your Santa images
Place 5 Santa expression images in `public/images/`:
- `santa-grumpy.png`
- `santa-neutral.png`
- `santa-slight-smile.png`
- `santa-happy.png`
- `santa-jolly.png`

See `public/images/README.md` for details.

### 3. Run the app
```bash
npm run dev
```

Visit http://localhost:5173 and start chatting with Science Santa!

## What You Built

A visual novel-style chatbot featuring:
- Science Santa character with 5 different expressions
- AI-powered conversations using NVIDIA Llama 3.1 Nemotron 70B (FREE via OpenRouter)
- Jolliness system (0-100) that increases based on conversation
- Victory screen when reaching 100 jolliness
- Beautiful visual novel UI with festive theming

## Project Structure

```
santa-chatbot/
├── src/
│   ├── components/
│   │   ├── SantaDisplay.tsx       # Shows Santa with changing expressions
│   │   ├── JollinessBar.tsx       # Displays jolliness progress
│   │   ├── ChatInterface.tsx      # Main chat + OpenRouter integration
│   │   ├── MessageBubble.tsx      # Individual message display
│   │   └── VictoryModal.tsx       # Victory screen
│   ├── App.tsx                    # Main app component
│   └── main.tsx                   # Entry point
├── public/
│   └── images/                    # Santa expression images go here
├── .env                           # Your API key (create this)
└── SETUP.md                       # Detailed setup instructions
```

## How It Works

1. **AI Integration**: NVIDIA Nemotron analyzes each message and returns both a response and a new jolliness score
2. **Expression System**: Santa's image changes based on jolliness ranges (0-20, 21-40, etc.)
3. **Visual Novel Style**: Large character display, chat bubbles, and festive styling
4. **Victory Condition**: Reaching 100 jolliness triggers a celebration modal

## Need Help?

See `SETUP.md` for detailed instructions and troubleshooting.
