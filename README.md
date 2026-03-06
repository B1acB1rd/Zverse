# Zverse

Zverse is a modern, vibe-centric social experience designed for the next generation of digital interaction. It moves beyond traditional social feeds by focusing on "vibes" and immersive transitions.

<img width="664" height="951" alt="image" src="https://github.com/user-attachments/assets/22b18472-09ad-4eae-9ad1-59f783215407" />

## 🚀 Features

- **The Threshold**: A minimalist, high-impact landing experience that serves as the entry point to the Zverse.
- **Vibe-Check Onboarding**: Interactive session seeding where users select their current mood/vibe to curate their initial experience.
- **Dynamic Content Feed**: A responsive and fluid feed system for exploring "echoes" and "drops" (stories and posts).
- **Mood Overlays**: Subtle visual atmosphere adjustments based on the selected session vibe.
- **Ghost Monitor**: Built-in developer/debug tools for real-time state tracking and "ghost" component monitoring.
- **Privacy First**: Secure-by-default architecture using modern security headers and sanitized content rendering.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) with native PostCSS processing
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Context & Hooks
- **Security**: [Helmet](https://github.com/helmetjs/helmet) & [DOMPurify](https://github.com/cure53/dompurify)

## 🏁 Getting Started

### Prerequisites

- Node.js 20.x or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/B1acB1rd/Zverse.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Repository Structure

- `/src/app`: Next.js App Router pages and API routes.
- `/src/components`: Modular UI components organized by feature (landing, onboarding, feed, layout).
- `/src/lib`: Core utility functions, types, and state management logic.
- `/public`: Static assets and media.

---

Created with ❤️ by [B1acB1rd](https://github.com/B1acB1rd)
