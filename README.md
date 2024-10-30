# ShortsMagic - AI YouTube Shorts Generator

A full-stack application that generates YouTube Shorts using AI. Built with React, TypeScript, Node.js, and OpenAI.

## Project Structure

```
shorts-magic/
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Features.tsx
│   │   ├── PromptInput.tsx
│   │   └── VideoPreview.tsx
│   ├── services/
│   │   └── api.ts
│   ├── App.tsx
│   └── main.tsx
├── server/
│   ├── routes/
│   │   ├── assets.js
│   │   └── videoGeneration.js
│   ├── services/
│   │   ├── imageService.js
│   │   ├── videoService.js
│   │   └── captionService.js
│   └── index.js
└── package.json
```

## Setup Instructions

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a .env file in the root directory:
   ```
   PORT=3000
   OPENAI_API_KEY=your_openai_api_key_here
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Start the backend server:
   ```bash
   npm run server
   ```

## Features

- AI-powered image generation using DALL-E
- Automatic caption generation with GPT-4
- Video creation with transitions and effects
- Background music integration
- Custom asset upload support

## Technologies Used

- React + TypeScript
- Node.js + Express
- OpenAI API
- FFmpeg for video processing
- Tailwind CSS for styling