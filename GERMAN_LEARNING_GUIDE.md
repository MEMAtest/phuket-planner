# 🇩🇪 German Learning App - User Guide

## Overview

The German Learning App is a voice-first language learning tool integrated into your Trip Planner. It helps you reach conversational German through 36 thematic modules using AI-powered feedback on your spoken German.

## Quick Start

### 1. Enable AI Feedback (Recommended)

To get AI-powered feedback on your German pronunciation and grammar:

1. Go to https://console.groq.com
2. Sign up for a free account (no credit card needed)
3. Create an API key
4. Add to your `.env` file:
   ```
   REACT_APP_GROQ_API_KEY=your-actual-key-here
   ```
5. Restart the dev server: `npm start`

**Free tier:** 14,400 requests/day (more than enough for daily practice!)

### 2. Access the German Learning Tab

1. Open the app in your browser
2. Click the **"German"** tab in the navigation
3. You'll see your learning dashboard with stats and progress

### 3. Start Learning

1. Click **"Start Learning"** or **"Continue Learning"**
2. Choose a theme from the available list
3. Follow the voice practice exercises

## How It Works

### Voice Practice Flow

1. **Read the scenario** - Understand the situation and what you need to say
2. **Press the microphone button** - Start recording
3. **Speak in German** - The app transcribes your speech in real-time
4. **Get AI feedback** - Receive detailed scores and suggestions:
   - **Grammar Score** (0-10) - Verb conjugation, word order, articles
   - **Pronunciation Score** (0-10) - How well you pronounced the words
   - **Fluency Score** (0-10) - Natural flow and connecting words
   - **Overall Score** (0-10) - Combined assessment

5. **Review feedback**:
   - ⚠️ **Corrections** - Grammar or word choice errors
   - 💡 **Better Alternatives** - More natural ways to express the same idea
   - 📚 **Tips** - General suggestions for improvement

6. **Try again or continue** - Practice until you're satisfied, then move to the next exercise

### Learning Structure

**36 Themes across 3 CEFR Levels:**

#### A1 - Beginner (Survival German)
- Theme 1-12: Basics like introducing yourself, ordering food, asking directions, shopping, etc.
- **Estimated time per theme:** 15-30 minutes

#### A2 - Elementary (Social German)
- Theme 13-24: Talking about your day, making plans, describing past events, expressing preferences, etc.
- **Estimated time per theme:** 15-30 minutes

#### B1 - Intermediate (Conversational German)
- Theme 25-36: Expressing opinions, telling stories, discussing future plans, giving advice, debates, etc.
- **Estimated time per theme:** 30 minutes

### Progressive Learning

- Themes unlock **sequentially** (you must complete Theme 1 before Theme 2, etc.)
- This ensures you build a solid foundation before advancing
- Visual indicators:
  - ✅ = Completed
  - 📚 = Available
  - 🔒 = Locked (complete previous theme first)

## Features

### Dashboard Stats

Your dashboard tracks:
- **Level** - Current CEFR level (A1/A2/B1)
- **Progress** - Percentage of themes completed
- **Streak** - Consecutive days of practice 🔥
- **Practice Time** - Total minutes spent learning

### Progress Tracking

All your progress is automatically saved:
- Completed themes
- Practice sessions
- Recordings with AI feedback
- Daily streaks
- Total practice time

**Data is stored locally** in your browser (no account needed).

### Dark Mode Support

The German learning interface fully supports dark mode. Toggle it using the moon/sun icon in the header.

## Browser Compatibility

### Voice Recognition (Required)

The app uses your browser's built-in speech recognition for German:

✅ **Supported browsers:**
- Chrome (Desktop & Mobile)
- Edge (Desktop & Mobile)
- Safari (macOS & iOS)

❌ **Not supported:**
- Firefox (no Web Speech API support)

### Best Experience

For the best voice recognition results:
- Use a **quiet environment**
- Speak **clearly and at a normal pace**
- Hold the microphone button while speaking
- Use **headphones with a microphone** for better audio quality

## Tips for Success

1. **Practice daily** - Even 15 minutes a day builds your streak and reinforces learning
2. **Read key phrases first** - Review the key phrases before starting a theme
3. **Don't aim for perfection** - Native-like pronunciation takes time; focus on progress
4. **Review corrections** - Read the AI feedback carefully and try again
5. **Use the "Try Again" button** - Repeat exercises until you feel confident
6. **Speak naturally** - Don't over-enunciate; speak as you would in conversation

## Troubleshooting

### No AI Feedback

**Issue:** Warning banner says "Setup Required"

**Solution:** Add your Groq API key to `.env` and restart the dev server

### Voice Recognition Not Working

**Issue:** Error message about speech recognition not supported

**Solutions:**
1. Use Chrome, Edge, or Safari
2. Grant microphone permissions when prompted
3. Check that your microphone is working in system settings

### Transcription Is Inaccurate

**Solutions:**
1. Speak more slowly and clearly
2. Reduce background noise
3. Move closer to your microphone
4. Try using headphones with a built-in mic

### Streak Not Updating

**Solution:** Make sure you complete at least one scenario each day. The streak updates when you start practice for the day.

## Technical Details

### Data Storage

All data is stored in `localStorage` with these keys:
- `german_completed_themes` - Array of completed theme IDs
- `german_current_theme` - Currently active theme
- `german_total_minutes` - Total practice time
- `german_streak` - Consecutive days practiced
- `german_last_practice` - Last practice date
- `german_sessions` - Practice session history
- `german_recordings` - All recordings with feedback

### Privacy

- **No data is sent to servers** except transcriptions to Groq for AI feedback
- **No account required** - everything is stored locally
- **Your Groq API key** is only used by your browser to call the Groq API
- **Recordings are not saved** - only transcriptions and feedback are stored

## Future Enhancements (Planned)

- Conversation mode: Full dialogue practice with AI responses
- Speech playback: Hear correct pronunciation
- Custom themes: Create your own practice scenarios
- Export progress: Download your learning history
- Flashcards: Review key phrases from completed themes

## Need Help?

If you encounter issues or have suggestions, check the browser console for error messages or reach out for support.

---

**Built with:**
- Web Speech API (German language recognition)
- Groq API (Llama-3.1-70B for AI feedback)
- React Context API (state management)
- localStorage (data persistence)
- Tailwind CSS (responsive dark mode UI)
