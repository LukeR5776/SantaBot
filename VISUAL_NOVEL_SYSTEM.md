# Visual Novel Dialogue System

## Overview

The Santa Chatbot has been completely redesigned as a visual novel with dialogue choices. Instead of free-text input, users select from 4 AI-generated dialogue options with hidden point values.

## Why This Change?

### Problems Solved:
- ❌ **Format consistency issues** → ✅ JSON is structured and reliable
- ❌ **AI breaking immersion** → ✅ AI only generates choices, never talks about points
- ❌ **Users cheating** → ✅ Points are hidden and AI-controlled
- ❌ **Parsing errors** → ✅ JSON is easy to parse, with fallback handling

### Benefits:
- ✅ **True visual novel experience** - Like playing a VN game
- ✅ **Guided conversation** - AI provides contextual, meaningful choices
- ✅ **No format errors** - JSON structure is clear and consistent
- ✅ **Better gameplay** - Strategic choice-making matters
- ✅ **Immersive** - Never breaks the fourth wall

## How It Works

### User Flow

```
1. User sees Santa's message
   ↓
2. 4 dialogue options appear (as cards)
   ↓
3. User clicks an option
   ↓
4. Option becomes user's message
   ↓
5. Points are applied (hidden from user)
   ↓
6. AI generates Santa's response + 4 new options
   ↓
7. Repeat!
```

### AI Response Format

The AI returns JSON:

```json
{
  "santaResponse": "*grumbles* Oh, you want to learn? Fine...",
  "options": [
    {"text": "Yes! Please teach me about atoms!", "points": 18},
    {"text": "I'd like to know about chemistry.", "points": 12},
    {"text": "Sure, go ahead.", "points": 3},
    {"text": "Actually, never mind...", "points": -8}
  ]
}
```

**What happens:**
- `santaResponse` → Displayed to user
- `options[0-3]` → Shown as clickable cards
- `points` → Hidden, used to update jolliness when selected

## Components Created

### 1. DialogueOption.tsx

Individual dialogue card component.

**Props:**
- `text`: The dialogue text to display
- `points`: Hidden point value (not shown to user)
- `onClick`: Handler when card is clicked

**Features:**
- Card-style design
- Hover animation (lifts up)
- Glow effect on hover
- Visual novel aesthetic

### 2. DialogueOptions.tsx

Container for 4 dialogue cards.

**Props:**
- `options`: Array of 4 options
- `onSelect`: Handler when option is selected

**Features:**
- 2x2 grid layout (desktop)
- Stacked list (mobile)
- Responsive design

### 3. ChatInterface.tsx (Complete Rewrite)

Main chat component now handles dialogue selection.

**Key Changes:**
- Removed text input field
- Removed send button
- Added dialogue option display
- JSON parsing logic
- Point application on selection
- Initial starter options

## System Prompt

Completely rewritten to output JSON:

**Old Format:**
```
POINTS: +15
RESPONSE: Hello there!
```

**New Format:**
```json
{
  "santaResponse": "Hello there!",
  "options": [...]
}
```

**AI Instructions:**
1. Respond as Santa based on jolliness level
2. Generate 4 contextual dialogue options
3. Vary point values (+25 to -25 range)
4. Return ONLY valid JSON

## Point System

### Option Variety (AI Guidelines)

- **Option 1**: Very positive/enthusiastic (+15 to +25)
- **Option 2**: Positive/friendly (+5 to +15)
- **Option 3**: Neutral/casual (±2 to ±5)
- **Option 4**: Negative/dismissive (-5 to -15)

This creates **strategic gameplay** - users choose how to interact!

### Hidden Points

Users **never see** point values. They have to:
- Read the tone of each option
- Guess which will increase jolliness
- Make strategic choices

### Point Application

```typescript
// When user selects option
const points = Math.min(25, Math.max(-25, selectedOption.points)); // Clamp
const newJolliness = Math.min(100, Math.max(0, currentJolliness + points));
onJollinessChange(newJolliness);
```

Points are clamped to ±25 and applied immediately.

## Initial Options

Hard-coded starter options to begin the conversation:

```typescript
const INITIAL_OPTIONS: Option[] = [
  { text: "Hi Santa! I'd love to learn some science from you!", points: 18 },
  { text: "Hello there. How are you doing?", points: 8 },
  { text: "Hey. What's up?", points: 3 },
  { text: "Ugh, I guess I have to talk to you...", points: -10 },
];
```

## Error Handling

### JSON Parsing Failure

If AI doesn't return valid JSON:

```typescript
// Fallback options
setCurrentOptions([
  { text: "Tell me about science!", points: 12 },
  { text: "How are you feeling?", points: 8 },
  { text: "Let's talk about something else.", points: 3 },
  { text: "This isn't working...", points: -5 },
]);
```

User sees error message + generic options to continue.

### API Error

If OpenRouter fails:
- Show error message
- Reset to INITIAL_OPTIONS
- User can try again

## UI/UX Features

### Card Styling

- Clean white cards with borders
- Hover effects (lift + glow)
- Smooth transitions
- Visual novel aesthetic
- Festive color scheme (red/green)

### Loading State

While AI generates response:
- Hide dialogue options
- Show loading indicator ("Preparing response...")
- Prevent duplicate selections

### Responsive

- Desktop: 2x2 grid of cards
- Mobile: Stacked vertical list
- Touch-friendly on all devices

## Console Logging

For debugging:

```
✅ Option selected: "Hi Santa!" | Points: +18 | New jolliness: 18
✅ JSON parsed successfully. New options: 4
```

Or if error:

```
❌ JSON parsing failed: SyntaxError...
Raw response: [whatever AI returned]
```

## Configuration

### Adjustable Settings

**Temperature** (line ~169):
```typescript
temperature: 0.7,  // Higher = more creative options
```

**Max Tokens** (line ~170):
```typescript
max_tokens: 400,  // Allows longer responses + options
```

**History Limit** (line ~85):
```typescript
const recentMessages = messages.slice(-10);  // Last 10 messages
```

## Testing

### Start the App

```bash
npm run dev
```

### Test Flow

1. **Initial load** → Should see 4 starter options
2. **Click option** → Points update, Santa responds, new options appear
3. **Try all option types** → Positive, neutral, negative
4. **Watch jolliness** → Should increase/decrease based on choices
5. **Check console** → Verify points logging

### Expected Behavior

- ✅ 4 options always visible (unless loading)
- ✅ Options change after each selection
- ✅ Jolliness updates correctly
- ✅ No format errors
- ✅ Smooth animations

## Example Conversation

```
Santa: "Ho ho... not quite 'ho' yet. I'm Science Santa..."

Options:
[Hi Santa! I'd love to learn some science from you!] (+18)
[Hello there. How are you doing?] (+8)
[Hey. What's up?] (+3)
[Ugh, I guess I have to talk to you...] (-10)

User clicks: "Hi Santa! I'd love to learn..."
→ Jolliness: 0 → 18

Santa: "*adjusts spectacles* Well now! Someone's eager to learn!"

Options:
[This is so exciting! What will you teach me?] (+20)
[I'm really interested in chemistry.] (+12)
[Okay, I'm listening.] (+5)
[Actually, this might be boring...] (-10)

...and so on!
```

## Benefits Over Old System

| Old System | New System |
|------------|------------|
| Free-text input | Guided dialogue choices |
| AI format errors | JSON always works |
| Users can cheat | Points are hidden |
| Breaks immersion | True visual novel feel |
| Inconsistent points | AI creates varied options |
| Complex parsing | Simple JSON.parse() |

## Future Enhancements

Potential additions:
- Show mood icons (😊 😐 😠) instead of points
- Special dialogue branches at certain jolliness levels
- Save/load conversation state
- Multiple endings based on final jolliness
- Character sprites that change expression
- Background music/sound effects

---

**Result:** A polished, immersive visual novel experience with zero format consistency issues!
