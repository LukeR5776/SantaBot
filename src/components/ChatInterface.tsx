import React, { useState, useRef, useEffect } from 'react';
import OpenAI from 'openai';
import MessageBubble from './MessageBubble';
import DialogueOptions, { type Option } from './DialogueOptions';
import './ChatInterface.css';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatInterfaceProps {
  onJollinessChange: (newJolliness: number) => void;
  currentJolliness: number;
}

// Initial dialogue options to start the conversation
const INITIAL_OPTIONS: Option[] = [
  { text: "Hi Santa! I'd love to learn some science from you!", points: 18 },
  { text: "Hello there. How are you doing?", points: 8 },
  { text: "Hey. What's up?", points: 3 },
  { text: "Ugh, I guess I have to talk to you...", points: -10 },
];

// Helper function to extract JSON from various formats
const extractJSON = (text: string): any => {
  // Method 1: Try direct parse
  try {
    return JSON.parse(text);
  } catch {}

  // Method 2: Strip markdown code blocks (```json ... ```)
  const withoutMarkdown = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  try {
    return JSON.parse(withoutMarkdown);
  } catch {}

  // Method 3: Find first { to last }
  const match = text.match(/\{[\s\S]*\}/);
  if (match) {
    try {
      return JSON.parse(match[0]);
    } catch {}
  }

  // Method 4: Try to find JSON object anywhere in text
  const jsonMatch = text.match(/\{[^{}]*"santaResponse"[^{}]*"options"[\s\S]*\}/);
  if (jsonMatch) {
    try {
      return JSON.parse(jsonMatch[0]);
    } catch {}
  }

  throw new Error('Could not extract valid JSON from response');
};

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onJollinessChange, currentJolliness }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Ho ho... well, not quite 'ho' yet. I'm Science Santa, and someone's drained all my Christmas spirit with endless questions about particle physics! Help me get back in the jolly mood by having a nice chat with me.",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [currentOptions, setCurrentOptions] = useState<Option[]>(INITIAL_OPTIONS);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleOptionSelect = async (selectedOption: Option) => {
    if (isLoading) return;

    // Add user's chosen dialogue to messages
    const userMessage: Message = {
      id: Date.now().toString(),
      text: selectedOption.text,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setCurrentOptions([]); // Hide options while loading
    setIsLoading(true);

    // Update jolliness with the option's points
    const points = Math.min(25, Math.max(-25, selectedOption.points)); // Clamp
    const newJolliness = Math.min(100, Math.max(0, currentJolliness + points));
    onJollinessChange(newJolliness);

    console.log(`✅ Option selected: "${selectedOption.text}" | Points: ${points >= 0 ? '+' : ''}${points} | New jolliness: ${newJolliness}`);

    try {
      const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

      if (!apiKey) {
        throw new Error('OpenRouter API key not found. Please set VITE_OPENROUTER_API_KEY in your .env file.');
      }

      const openai = new OpenAI({
        apiKey: apiKey,
        baseURL: 'https://openrouter.ai/api/v1',
        dangerouslyAllowBrowser: true,
      });

      // Build conversation history (limit to last 10 messages)
      const recentMessages = messages.slice(-10);
      const conversationHistory = recentMessages.map((msg) => ({
        role: msg.isUser ? 'user' as const : 'assistant' as const,
        content: msg.text,
      }));

      const completion = await openai.chat.completions.create({
        model: 'nvidia/llama-3.1-nemotron-70b-instruct',
        // @ts-ignore - OpenRouter-specific headers
        extra_headers: {
          "HTTP-Referer": "https://santa-chatbot.local",
          "X-Title": "Santa Chatbot"
        },
        // @ts-ignore - Force JSON-only output (OpenRouter feature)
        response_format: { type: "json_object" },
        messages: [
          {
            role: 'system',
            content: `You are Science Santa - a Santa Claus who is also a science teacher. This is a visual novel game where you provide dialogue options for the player.

CURRENT JOLLINESS: ${newJolliness}/100

PERSONALITY BY JOLLINESS LEVEL:
- 0-20 (Grumpy): Short, irritable responses. Barely mention science. "Hmph." "What now?"
- 21-40 (Warming Up): Less grumpy, occasional science facts, starting to soften
- 41-60 (Friendly): Engaged, conversational, share science facts with interest
- 61-80 (Cheerful): Enthusiastic! Make science fun! Use Christmas analogies!
- 81-100 (Maximum Jolly): HO HO HO! Extremely enthusiastic about everything!

YOUR TASK:
1. Respond to the user's chosen dialogue option as Santa (in character based on jolliness level)
2. Generate 4 NEW dialogue options for the player to choose from next
3. Each option should have a hidden point value based on its tone/content

POINT GUIDELINES:
- Neutral/casual options: ±2 to ±5 points
- Positive/friendly options: +5 to +15 points
- Very positive/enthusiastic options: +15 to +25 points
- Negative/dismissive options: -5 to -15 points
- Very negative/rude options: -15 to -25 points

CREATE VARIED OPTIONS:
- Option 1: Usually very positive/enthusiastic (+15 to +25)
- Option 2: Positive/friendly (+5 to +15)
- Option 3: Neutral/casual (±2 to ±5)
- Option 4: Negative or dismissive (-5 to -15)

This creates gameplay: players choose how to interact!

RESPONSE FORMAT (CRITICAL - MUST BE VALID JSON):
{
  "santaResponse": "Your in-character response as Santa to what the user just said",
  "options": [
    {"text": "Dialogue option 1 text", "points": 20},
    {"text": "Dialogue option 2 text", "points": 10},
    {"text": "Dialogue option 3 text", "points": 3},
    {"text": "Dialogue option 4 text", "points": -8}
  ]
}

RULES:
✅ ALWAYS return valid JSON (no extra text before or after)
✅ santaResponse reflects your current jolliness level personality
✅ Options should be contextual and make sense in conversation
✅ Options should vary in positivity (give players real choices)
✅ Keep dialogue option text concise (under 15 words each)
✅ Points must be integers between -25 and +25
✅ NEVER mention points/jolliness in santaResponse or option text
✅ Stay in character as Science Santa

EXAMPLE:
User chose: "Can you teach me about chemistry?"
Your response:
{
  "santaResponse": "*adjusts spectacles* Chemistry! Well now, someone wants to learn! Let me tell you about atoms...",
  "options": [
    {"text": "This is fascinating! Tell me more!", "points": 18},
    {"text": "What about the periodic table?", "points": 12},
    {"text": "Okay, I'm listening.", "points": 3},
    {"text": "This is kind of boring...", "points": -10}
  ]
}

CRITICAL JSON FORMATTING RULES:
❌ DO NOT use markdown code blocks (NO backtick-json-backtick)
❌ DO NOT add any text before the opening {
❌ DO NOT add any text after the closing }
✅ START immediately with { character
✅ END immediately with } character
✅ Return ONLY the JSON object, nothing else

Your entire response must be PURE JSON and nothing else!`,
          },
          ...conversationHistory,
          {
            role: 'user',
            content: selectedOption.text,
          },
        ],
        temperature: 0.7,
        max_tokens: 400,
      });

      const responseText = completion.choices[0].message.content || '';

      console.log('🔍 Raw AI Response (first 300 chars):', responseText.substring(0, 300));

      // Parse JSON response using robust extraction
      try {
        const parsed = extractJSON(responseText);

        if (!parsed.santaResponse || !parsed.options || !Array.isArray(parsed.options)) {
          throw new Error('Invalid JSON structure');
        }

        // Add Santa's response to messages
        const santaMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: parsed.santaResponse,
          isUser: false,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, santaMessage]);

        // Set new dialogue options
        setCurrentOptions(parsed.options);

        console.log('✅ JSON parsed successfully. New options:', parsed.options.length);
      } catch (jsonError) {
        console.error('❌ JSON parsing failed:', jsonError);
        console.error('Raw response:', responseText);

        // Fallback: show error message and default options
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "*scratches head* Hmm, my brain seems to be a bit foggy. Let's try that again...",
          isUser: false,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, errorMessage]);

        // Provide generic fallback options
        setCurrentOptions([
          { text: "Tell me about science!", points: 12 },
          { text: "How are you feeling?", points: 8 },
          { text: "Let's talk about something else.", points: 3 },
          { text: "This isn't working...", points: -5 },
        ]);
      }
    } catch (error) {
      console.error('Error calling OpenRouter API:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: error instanceof Error
          ? `Oh dear! ${error.message}`
          : 'Ho ho... oh no! Something went wrong. Please check your API key configuration.',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);

      // Reset to initial options on error
      setCurrentOptions(INITIAL_OPTIONS);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-interface">
      <div className="chat-messages" ref={chatContainerRef}>
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message.text}
            isUser={message.isUser}
            timestamp={message.timestamp}
          />
        ))}
        {isLoading && (
          <div className="loading-indicator">
            <span className="loading-dot"></span>
            <span className="loading-dot"></span>
            <span className="loading-dot"></span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {!isLoading && currentOptions.length > 0 && (
        <DialogueOptions
          options={currentOptions}
          onSelect={handleOptionSelect}
        />
      )}

      {isLoading && (
        <div className="dialogue-options-loading">
          <p>Preparing response...</p>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;
