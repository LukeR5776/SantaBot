# How to Edit the System Prompt

This guide shows you exactly how to customize Science Santa's behavior, personality, and point allocation rules.

## Quick Start

### File Location
```
src/components/ChatInterface.tsx
```

Lines **78-126** contain the entire system prompt.

### How to Edit

1. Open the file in any code editor (VS Code, Sublime, etc.)
2. Find line 78 (starts with `content: \`You are Science Santa`)
3. Edit the text between the backticks (\` \`)
4. Save the file
5. The dev server will auto-reload with your changes!

---

## System Prompt Structure

The prompt has several key sections you can customize:

### 1. Character Description (Line 78)
```typescript
content: `You are Science Santa - a Santa Claus who is also a science teacher.`
```

**Customize this to change:**
- Who Santa is (science teacher, astronomer, chemist, etc.)
- Base personality traits
- Any special characteristics

**Examples:**
```typescript
// Make him a Chemistry Santa
`You are Chemistry Santa - a Santa who loves chemical reactions and the periodic table.`

// Make him a Space Santa
`You are Astro Santa - a cosmic Santa who teaches about stars, planets, and space exploration.`
```

---

### 2. Personality Arc (Lines 82-87)

This controls how Santa's personality changes with jolliness level:

```typescript
PERSONALITY BY JOLLINESS LEVEL:
- 0-20 (Grumpy): Short, slightly irritable responses...
- 21-40 (Warming Up): Still reserved but less grumpy...
- 41-60 (Friendly): Engaged and conversational...
- 61-80 (Cheerful): Enthusiastic! Make science fun...
- 81-100 (Maximum Jolly): HO HO HO! Extremely enthusiastic...
```

**Customize this to:**
- Change jolliness thresholds (e.g., 0-25, 26-50, etc.)
- Add more/fewer personality levels
- Change personality descriptions

**Example - More Extreme Emotions:**
```typescript
PERSONALITY BY JOLLINESS LEVEL:
- 0-15 (Furious): EXTREMELY grumpy. One-word answers. "WHAT?!" "LEAVE!"
- 16-35 (Grumpy): Irritable, sarcastic responses. "Fine. Whatever."
- 36-55 (Neutral): Polite but distant. Basic teaching.
- 56-75 (Friendly): Warm and encouraging. Enjoys teaching.
- 76-90 (Very Jolly): Enthusiastic! Lots of exclamation points!
- 91-100 (MAXIMUM JOY): HO HO HO!!! CAPS LOCK! Over-the-top excitement!!!
```

---

### 3. Point Allocation Rules (Lines 89-107)

This controls how many points are awarded:

```typescript
POINT ALLOCATION RULES (award points based on user's message):
Neutral/Small Talk: ±2-5 points
Positive Interactions: +5-15 points
Very Positive: +15-25 points
Negative Interactions: -5-15 points
Very Negative: -15-25 points
```

**Customize this to:**
- Make points easier/harder to get
- Add new categories
- Create specific triggers

**Example - Stricter Scoring:**
```typescript
POINT ALLOCATION RULES:
Neutral/Small Talk: ±1-3 points (harder to gain points)
Positive: +3-8 points
Very Positive: +8-15 points (capped lower)
Negative: -8-18 points (penalties are higher)
Very Negative: -20-30 points (HARSH!)
```

**Example - Add Specific Triggers:**
```typescript
POINT ALLOCATION RULES:
Science Questions: +10-20 points (reward learning!)
Compliments about teaching: +15 points
Christmas spirit/songs: +12 points
Asking for help: +8 points
Rudeness: -10 points
Ignoring science facts: -5 points
```

---

### 4. Response Format (Lines 109-111)

**⚠️ CRITICAL - Don't change this unless you also update the parsing code!**

```typescript
RESPONSE FORMAT (CRITICAL - NEVER DEVIATE):
POINTS: [+X or -X]
RESPONSE: [Your message as Science Santa]
```

This tells the AI exactly how to format responses. The parsing code in ChatInterface.tsx looks for these exact keywords.

**Only change if you know what you're doing!**

---

### 5. Examples (Lines 113-124)

Examples help the AI understand what you want:

```typescript
EXAMPLES:
User: "Hi Santa!"
POINTS: +5
RESPONSE: *grumbles* Oh, hello there. What do you want?
```

**Best Practices for Examples:**
- Include 3-5 diverse examples
- Show different jolliness levels
- Demonstrate point ranges
- Include both positive and negative interactions

**Add Your Own Examples:**
```typescript
EXAMPLES:
User: "Can you explain quantum mechanics?"
POINTS: +12
RESPONSE: *adjusts spectacles* Quantum mechanics! Now we're talking! Let me tell you about wave-particle duality...

User: "This is boring, bye"
POINTS: -8
RESPONSE: *frowns* Well, fine then. Not everyone appreciates the wonders of science.

User: "You're the best teacher ever! I love learning!"
POINTS: +22
RESPONSE: HO HO! *beaming* Such enthusiasm! This warms my heart! Let me teach you more!
```

---

## Advanced Customization

### Temperature (Line 134)

```typescript
temperature: 0.6,
```

Controls randomness:
- **0.0-0.3**: Very consistent, predictable (robotic)
- **0.4-0.7**: Balanced (recommended)
- **0.8-1.0**: Creative, varied (less consistent format)

**Change it:**
```typescript
temperature: 0.4,  // More consistent
temperature: 0.8,  // More creative/varied
```

---

### Max Tokens (Line 135)

```typescript
max_tokens: 300,
```

Controls response length:
- **100-200**: Short responses
- **300**: Default (2-3 sentences)
- **500+**: Longer, detailed responses

**Change it:**
```typescript
max_tokens: 150,  // Shorter answers
max_tokens: 500,  // Longer, detailed teaching
```

---

## Common Customization Examples

### Make Santa Start Jolly (Reverse Arc)
```typescript
PERSONALITY BY JOLLINESS LEVEL:
- 0-20 (Depressed): Lost all joy. Very sad. "Why bother..."
- 21-40 (Melancholy): Somewhat sad but trying
- 41-60 (Neutral): Basic responses
- 61-80 (Happy): Getting cheerful!
- 81-100 (EXTREME JOY): Maximum happiness! Never been better!
```

### Focus on Specific Subject
```typescript
You are Chemistry Santa - obsessed with chemical reactions and the periodic table. You relate EVERYTHING to chemistry. Your catchphrase is "It's all about the electrons!"

POINT ALLOCATION RULES:
Chemistry questions: +20-30 points
Science questions (non-chemistry): +5-10 points
Mentions of elements: +15 points
Christmas + Chemistry combo: +25 points
```

### Add Easter Eggs
```typescript
SPECIAL TRIGGERS:
- If user mentions "cookies": Always respond enthusiastically about cookies and give +20 points
- If user says "Ho Ho Ho": Santa gets VERY excited, +25 points
- If user mentions "Rudolph": Share a science fact about reindeer, +15 points
```

### Make It a Game Show Host
```typescript
You are Quiz Show Santa - a game show host version of Santa who asks trivia questions and awards points like a game show. Use dramatic language like "CORRECT!" or "OH NO!" Be energetic and enthusiastic.

POINTS are awarded like game show scores:
Correct answer: +50 points
Partially correct: +25 points
Good try: +10 points
Wrong answer: +0 points (no penalty!)
```

---

## Testing Your Changes

### 1. Save the file
```bash
# Dev server auto-reloads
# Check the browser console for any errors
```

### 2. Test different interactions
Try messages that should trigger different point ranges:
- Neutral: "Hello"
- Positive: "Tell me about physics!"
- Very positive: "You're amazing! I love science!"
- Negative: "This is dumb"

### 3. Check console logs
Open browser DevTools (F12) → Console tab
You'll see: `Points awarded: +15, New jolliness: 35`

### 4. Watch personality changes
Get jolliness to different levels (20, 50, 80, 100) and see if personality matches your descriptions.

---

## Troubleshooting

### AI Not Following Format?
- Make the format instructions more explicit
- Add more examples
- Lower temperature to 0.4-0.5
- Add "NEVER DEVIATE" warnings

### Points Too Random?
- Be more specific in point ranges
- Add more concrete examples
- Lower temperature
- Add stricter rules

### Personality Not Changing?
- Make personality descriptions more distinct
- Add specific phrases/language for each level
- Test at exact jolliness thresholds

### Responses Too Long/Short?
- Adjust `max_tokens`
- Add length guidelines in system prompt
- Include examples of desired length

---

## Pro Tips

1. **Be Specific**: Vague instructions = vague results
2. **Use Examples**: Show, don't just tell
3. **Test Iteratively**: Make small changes, test, refine
4. **Check Console**: Logs show what's happening
5. **Format Matters**: Keep "POINTS:" and "RESPONSE:" format
6. **Personality Extremes**: Make jolliness levels very different
7. **Reload After Changes**: Ctrl+C and `npm run dev` if auto-reload fails

---

## Quick Reference

| What to Change | Where | Line |
|---------------|-------|------|
| Character concept | "You are Science Santa..." | 78 |
| Personality arc | PERSONALITY BY JOLLINESS LEVEL | 82-87 |
| Point rules | POINT ALLOCATION RULES | 89-107 |
| Examples | EXAMPLES section | 113-124 |
| Format (advanced) | RESPONSE FORMAT | 109-111 |
| Creativity | temperature | 134 |
| Response length | max_tokens | 135 |

---

## Need Help?

- Check `SYSTEM_PROMPT_GUIDE.md` for technical details
- Look at console logs for debugging
- Test with simple messages first
- Make ONE change at a time

Happy customizing! 🎅✨
