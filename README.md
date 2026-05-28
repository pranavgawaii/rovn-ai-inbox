<h1 align="center">
  <img src="public/logo.png" width="40" height="40" valign="middle" />
  &nbsp;Rovn
</h1>

<p align="center">
<strong>The AI-powered omnichannel inbox for modern small businesses.</strong><br/>
Detect hot leads across WhatsApp, Instagram, and Email. Generate smart follow-ups in one click.
</p>

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)

</div>

---

## Features

- **Omnichannel Inbox** — WhatsApp, Instagram, and Email in one unified workspace
- **AI Intent Scoring** — Automatically ranks leads as Hot, Pending, or Cold in real time
- **1-Click AI Drafts** — Context-aware reply suggestions generated instantly via OpenAI
- **Co-Pilot Mode** — Review, refine, and send — no autopilot surprises

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Components | shadcn/ui |
| AI | OpenAI GPT-4o-mini via OpenRouter |
| Deployment | Vercel |

## Project Structure

```
rovn/
├── app/
│   ├── api/
│   │   ├── generate-reply/    # AI reply generation endpoint
│   │   └── summarize/         # Conversation summarization endpoint
│   ├── dashboard/             # Main workspace
│   ├── settings/              # User settings
│   ├── sign-in / sign-up/     # Auth pages
│   ├── layout.tsx
│   └── page.tsx               # Landing page
├── components/
│   ├── dashboard/             # Sidebar, ConversationList, ConversationDetail
│   └── ui/                    # RovnLogo, ThemeToggle
├── lib/
│   ├── api/                   # OpenAI client
│   ├── data/                  # Mock data
│   ├── types.ts
│   └── utils.ts
└── public/                    # Static assets
```

## Quick Start

### 1. Clone
```bash
git clone https://github.com/pranavgawaii/rovn-ai-inbox.git
cd rovn-ai-inbox
```

### 2. Install
```bash
npm install
```

### 3. Environment Variables
```bash
cp .env.local.example .env.local
```

Add your key to `.env.local`:
```env
OPENAI_API_KEY=your_api_key_here
```

### 4. Run
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## License

MIT © 2026 Rovn
