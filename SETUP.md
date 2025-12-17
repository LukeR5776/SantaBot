# Santa Chatbot Setup Guide

A visual novel-style chatbot where you interact with Science Santa to increase his jolliness from 0 to 100!

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- OpenRouter API key (FREE - uses NVIDIA Nemotron model)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure API Key

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and add your OpenRouter API key:

```
VITE_OPENROUTER_API_KEY=sk-or-v1-your-actual-api-key-here
```

Get your FREE API key from: https://openrouter.ai/keys

**Note:** This project uses the FREE NVIDIA Llama 3.1 Nemotron 70B model through OpenRouter - no cost!

### 3. Add Santa Images

Place your Santa expression images in the `public/images/` folder with these names:

- `santa-grumpy.png` - Jolliness 0-20
- `santa-neutral.png` - Jolliness 21-40
- `santa-slight-smile.png` - Jolliness 41-60
- `santa-happy.png` - Jolliness 61-80
- `santa-jolly.png` - Jolliness 81-100

**Image Requirements:**
- PNG format recommended
- Transparent background works best
- Recommended size: 500x500px or similar square aspect ratio
- All images should show the same character with different expressions

### 4. Run the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## How to Play

1. Start chatting with Science Santa
2. Be friendly, ask about science or Christmas, show enthusiasm
3. Watch the jolliness meter increase as Santa gets happier
4. Try to reach 100 jolliness to win!
5. Santa's expression will change based on his current jolliness level

## Tips for Increasing Jolliness

- Be polite and friendly
- Ask interesting questions about science or Christmas
- Show enthusiasm and positivity
- Compliment Santa or his teaching
- Share your love for the holidays

## Building for Production

```bash
npm run build
```

**Important Note:** This current setup uses the API key in the frontend for simplicity. For production use, you should move the OpenRouter API calls to a backend server to keep your API key secure.

## Troubleshooting

### "OpenRouter API key not found" error
- Make sure you created the `.env` file
- Verify the API key is correctly set as `VITE_OPENROUTER_API_KEY` in `.env`
- Restart the dev server after adding the `.env` file
- Get your free key from https://openrouter.ai/keys

### Images not showing
- Check that images are in `public/images/` folder
- Verify filenames match exactly (lowercase, with hyphens)
- Ensure images are valid PNG/JPG files

### TypeScript errors
```bash
npm install --save-dev @types/node
```

## Technologies Used

- React 18 with TypeScript
- Vite for build tooling
- OpenRouter API with NVIDIA Llama 3.1 Nemotron 70B (FREE model)
- OpenAI SDK (compatible with OpenRouter)
- CSS3 for visual novel-style UI
