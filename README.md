<h1 align="center">Gemini GrowLab Dashboard</h1>

<p align="center">
  <strong>Real-time cloud dashboard for an AI-powered hydroponic grow tent. Watch Gemini grow basil — from anywhere.</strong>
</p>

<p align="center">
  Next.js 16 &bull; React 19 &bull; Tailwind CSS 4 &bull; Supabase &bull; Vercel
</p>

---

## Overview

This is the public-facing dashboard for [Gemini GrowLab](https://github.com/abhijeetvichare76/gemini-growlab) — an autonomous hydroponics system where Google Gemini controls a grow tent end-to-end. Every 60 minutes, a Raspberry Pi reads sensors, photographs the plant, and asks Gemini what to do. This dashboard displays the results in real time.

**What you see on the dashboard:**

- **5 sensor readings** — air temperature, humidity, water temperature, pH, TDS — with color-coded status indicators (green = optimal, yellow = warning, red = critical)
- **Live plant photo** — uploaded from the Pi's USB webcam every cycle
- **AI decision breakdown** — what each actuator (light, air pump, humidifier, pH dosing) is doing and *why*
- **Plant health score** — 0 to 10, assessed by Gemini from sensor data + visual inspection
- **Intervention alerts** — a red banner fires when Gemini thinks a human should check in

---

## Architecture

```
Raspberry Pi (every 60 min)
       │
       │  Uploads decision + photo
       ▼
┌──────────────┐         ┌──────────────────┐
│   Supabase   │         │     Vercel        │
│  ┌─────────┐ │  ISR    │  ┌─────────────┐ │
│  │Postgres │◄├─────────┤  │  Next.js 16  │ │
│  │decisions│ │  60s    │  │  App Router  │ │
│  ├─────────┤ │         │  │  Tailwind 4  │ │
│  │ Storage  │ │         │  └─────────────┘ │
│  │ (photos) │ │         │                  │
│  └─────────┘ │         │  Public URL →     │
│  RLS secured │         │  anyone can view  │
└──────────────┘         └──────────────────┘
```

### Data Flow

1. **Pi → Supabase**: After each Gemini decision cycle, the Pi uploads a row to the `decisions` table (sensor data, actuator states, AI reasoning, health score) and the plant photo to a public storage bucket
2. **Supabase → Vercel**: The Next.js app fetches the latest decision using the Supabase JS client with the publishable (read-only) key
3. **ISR**: The page uses Incremental Static Regeneration with 60-second revalidation — the static page rebuilds automatically, staying fresh without hammering the database

---

## Components

| Component | What It Shows |
|-----------|--------------|
| `SensorCard` | Individual sensor value with progress bar + color-coded status (green/yellow/red based on proximity to ideal range) |
| `ActuatorStatus` | On/off state of each device with glowing status dots |
| `HealthScore` | Large circular display — plant health score 0–10 with color-coded ring |
| `PlantPhoto` | Latest plant capture from the Pi's webcam, optimized via Next.js Image |
| `ReasoningCard` | Gemini's full reasoning — overall assessment + per-actuator strategy breakdown |
| `InterventionAlert` | Pulsing red banner when the AI flags that a human should intervene |

---

## Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Next.js** | 16.1.6 | App Router, server components, ISR |
| **React** | 19.2.3 | UI rendering |
| **Tailwind CSS** | 4 | Utility-first styling, dark theme |
| **Supabase JS** | 2.95.3 | Database client (read-only via publishable key) |
| **TypeScript** | 5 | Type safety |
| **Vercel** | — | Hosting + automatic ISR |

---

## Database Schema

The dashboard reads from a single `decisions` table in Supabase:

```sql
CREATE TABLE decisions (
    id UUID PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    cycle_timestamp TIMESTAMPTZ NOT NULL,
    -- Sensor readings
    air_temp_c REAL,
    humidity_pct REAL,
    water_temp_c REAL,
    ph REAL,
    tds_ppm REAL,
    -- Actuator commands
    light TEXT CHECK (light IN ('on', 'off')),
    air_pump TEXT CHECK (air_pump IN ('on', 'off')),
    humidifier TEXT CHECK (humidifier IN ('on', 'off')),
    ph_adjustment TEXT CHECK (ph_adjustment IN ('none', 'ph_up', 'ph_down')),
    -- AI reasoning
    reasoning JSONB NOT NULL,
    plant_health_score INTEGER CHECK (0 <= plant_health_score <= 10),
    intervention_needed BOOLEAN DEFAULT FALSE,
    intervention_message TEXT,
    photo_url TEXT
);
```

**Security**: Row-Level Security (RLS) ensures the dashboard (publishable key) can only `SELECT` — no inserts, updates, or deletes. Only the Pi (secret key) can write.

---

## Getting Started

### Prerequisites

- Node.js 18+
- A Supabase project with the `decisions` table (see [`../supabase_schema.sql`](../supabase_schema.sql))

### 1. Install Dependencies

```bash
cd hydroponics-dashboard
npm install
```

### 2. Configure Environment

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-publishable-key
```

### 3. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Deploy to Vercel

```bash
vercel --prod
```

Or connect the repo to Vercel for automatic deployments on push.

---

## Project Structure

```
hydroponics-dashboard/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout, metadata, dark theme
│   │   ├── page.tsx            # Main dashboard (ISR 60s, data fetch)
│   │   └── globals.css         # Tailwind imports
│   ├── components/
│   │   ├── SensorCard.tsx      # Sensor display with color coding
│   │   ├── ActuatorStatus.tsx  # Device state indicators
│   │   ├── HealthScore.tsx     # Health score circle (0-10)
│   │   ├── ReasoningCard.tsx   # AI reasoning breakdown
│   │   ├── PlantPhoto.tsx      # Live plant image
│   │   └── InterventionAlert.tsx  # Critical warning banner
│   └── lib/
│       └── supabase.ts         # Supabase client initialization
├── next.config.ts              # Image optimization for Supabase CDN
├── vercel.json                 # Deployment config
├── package.json
└── tsconfig.json
```

---

## Design Decisions

- **Server components only** — No client-side JS for data fetching. The page renders on the server every 60 seconds via ISR, keeping the bundle minimal and the page fast.
- **Dark theme** — The dashboard is designed for grow room environments where you might check it in low light. Dark gray background with high-contrast status indicators.
- **No charting library** — Kept lean. Sensor status is communicated through color-coded cards and progress bars rather than time-series charts. The parent project has a local `dashboard.py` that generates matplotlib plots for deeper analysis.
- **Publishable key only** — The dashboard never touches the secret key. RLS policies enforce read-only access at the database level.

---

<p align="center">
  Part of <a href="../README.md"><strong>Gemini GrowLab</strong></a> — an AI-powered autonomous hydroponics system.
  <br/>
  Built for the Google Gemini API Developer Competition.
</p>
