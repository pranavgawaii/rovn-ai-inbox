<div align="center">
  <h1>
    <img src="rovnlogo.png" width="48" height="48" style="vertical-align: middle; margin-right: 12px;" />
    Rovn
  </h1>
  <p><strong>The AI-powered omnichannel inbox for modern small businesses.</strong></p>
  <p>Detect hot leads across WhatsApp, Instagram, and Email. Generate smart follow-ups in one click.</p>
</div>

---

## Features

* **Omnichannel Lead Detection:** Automatically identifies and highlights high-intent leads from WhatsApp, Instagram, and Email.
* **One-Click Smart Follow-ups:** Generates context-aware, personalized replies instantly using cutting-edge OpenAI models.
* **Unified Dashboard:** Manage all your business communications seamlessly in one unified interface.
* **Performance Optimized:** Built on Next.js 14 and styled with Tailwind CSS for optimal responsiveness and speed.

## Tech Stack

* **Framework:** Next.js 14
* **Styling:** Tailwind CSS
* **Components:** shadcn/ui
* **AI Integration:** OpenAI (GPT-4o-mini, Codex)

## Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/pranavgawaii/rovn-ai-inbox.git
cd rovn-ai-inbox
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Copy the example environment file and add your API keys:
```bash
cp .env.local.example .env.local
```

Open `.env.local` and add your OpenAI API Key:
```env
OPENAI_API_KEY=your_api_key_here
```

### 4. Run the Development Server
```bash
npm run dev
```
Navigate to [http://localhost:3000](http://localhost:3000) to see the application in action.

---

## License
This project is licensed under the MIT License.
