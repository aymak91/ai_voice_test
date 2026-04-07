# AI Voice Interviewer

A real-time AI-powered voice interviewer using:

- Next.js frontend (speech input + UI)
- FastAPI backend
- Anthropic Claude API
- Web Speech API (browser)

## Features

- Voice-to-text input
- AI interview responses (Claude)
- Real-time conversation loop (WIP)

## Run locally

### Backend

```bash
cd backend
uvicorn main:app --reload --port 8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```
