# TalentPulse — Candidate Engagement Scoring & Outreach Automation Platform

## Welcome to TalentPulse!
**TalentPulse** is an enterprise-grade web application built for recruitment and Talent Acquisition (TA) teams at technology services and consulting companies (aligned with enterprise consulting practices like **SAP/ERP, Cloud & Data Engineering, RPA/Intelligent Automation, Quality Engineering, Supply Chain Tech, and Domain Consulting**).

It gives recruitment teams **one unified place** to ingest candidates from 4 different channels, calculate transparent 0–100 engagement scores, trigger automated drip outreach, and report on channel ROI.

---

## 🚀 How to Open & Run the App (No Coding Required!)
You do **not** need to install Python, Node.js, or run terminal commands!

### Method 1 (Easiest — 1-Click):
1. In your Windows File Explorer, open this folder:
   `ITC Infotech Outreach Engine`
2. Double-click **`start_talentpulse.bat`**.
3. TalentPulse will immediately open in your default web browser (Google Chrome, Microsoft Edge, etc.)!

### Method 2:
1. Double-click the file **`index.html`** directly in this folder.
2. It will open in your browser right away!

---

## 🌟 Key Features Walkthrough

### 1. Unified Multi-Source Ingestion (4 Channels Normalized)
All candidates are mapped into a single unified candidate entity while preserving their unique intake intelligence:
- **Direct Applications (ATS)**: Job requisition ID, resume keyword match score, assessment scores, screening feedback.
- **Staffing Vendor Submissions**: Agency name (Collabera, Randstad, Allegis, etc.), SLA turnaround hours, vendor candidate notes.
- **Employee Referrals**: Referrer name & employee ID, department, relationship (former colleague, alumni), referral bonus tier.
- **Walk-ins & Job Fairs**: Drive name (e.g. *Bengaluru Cloud Drive 2026*), drive date, physical venue, on-the-spot screening score, digital vs paper resume tracking.

### 2. Explainable 0–100 Engagement Scoring Engine
- **Multi-signal calculation**:
  - Email open & link click rates
  - Recruiter reply latency (speed of responding to calls/messages)
  - Technical assessment completion speed & score
  - Careers portal & COE blog revisit frequency (simulated behavioral tracking)
  - Interview scheduling responsiveness & reschedule penalties
  - Explicit intent signals (saved jobs, active alerts, refreshed profile)
- **Time Inactivity Decay**: Scores gradually diminish if a candidate has been silent for more than 5 days.
- **Tiers**:
  - 🔥 **Hot (80–100)**: Rapid responders; immediate interview and offer priority.
  - ⚡ **Warm (60–79)**: Steady engagement; standard nurturing.
  - ❄️ **Cooling (40–59)**: Falling engagement; triggers automated re-engagement outreach.
  - 🧊 **Cold / Dormant (0–39)**: Inactive; enrolled in long-term talent pool drip.
- **"Why This Score?" Explainability Breakdown**: Shows exact point contributions (e.g. `+18 pts for assessment completed in <24h`, `-12 pts for 10 days silent`).

### 3. Automated Outreach & Campaign Builder
- **3-Step Campaign Wizard**:
  - **Step 1: Segment Definition**: Filter by engagement tier (e.g., Cooling), practice family, and channel with **live audience estimation**.
  - **Step 2: Drip Sequence Builder**: Multi-step automated schedule (e.g., D+0 status check, D+3 tech blueprint, D+7 executive chat) with email/SMS channel choice.
  - **Step 3: Review & Launch**: Preview populated message with merge fields (`{{first_name}}`, `{{target_role}}`, etc.) and A/B test variant tracking.
- **Proactive Automated Triggers**:
  - Automatic re-engagement for cooling candidates (<50 score and >7 days silent).
  - High-intent alert when a cooling candidate suddenly revisits the portal 3+ times.
  - Technical assessment reminder after 48 hours pending.
- **1-Click Quick Outreach**: Send personalized emails directly from any candidate's row or profile with automatic delivery logging.

### 4. Interactive Dashboards & Views
1. **Recruiter Command Center**: High-level pipeline metrics, source funnel distribution, and prioritized "Attention Required Today" candidate list.
2. **Candidates Pipeline Directory**: Comprehensive table with real-time search, practice filters, channel filters, and tier tags.
3. **Candidate 360 Profile**: Large circular SVG score gauge, 30-day score trajectory trend line, omnichannel activity timeline, source metadata card, and recommended next action banner.
4. **Leadership Analytics**: Channel effectiveness matrix (candidates sourced vs hot tier vs hires), average time-to-engage benchmarks, and practice health index.
5. **Scoring Weights Configurator**: Interactive sliders to adjust how much each factor impacts the score and recalculate all 50 candidates live!

### 5. Multi-Persona Switcher
Use the top-right persona selector to view the platform from 3 different lenses:
- **Priya Sharma** (Senior Tech Recruiter)
- **Vikram Malhotra** (Head of Talent Acquisition / Admin)
- **Rajeev Tandon** (VP - Global Tech Services, Leadership)

---

## ☁️ How to Push to GitHub & Deploy to Vercel

### Step 1: Create a New Repository on GitHub
1. Log in to [GitHub.com](https://github.com).
2. Click the **`+`** icon at the top right and select **"New repository"**.
3. Name it **`talentpulse`** (or any name you prefer).
4. Keep it **Public** (or Private).
5. **Do NOT** check "Add a README file" (we already have one!).
6. Click **"Create repository"**.
7. Copy your repository URL (e.g., `https://github.com/your-username/talentpulse.git`).

### Step 2: Push Your Code to GitHub
You can use the helper file:
1. Double-click **`push_to_github.bat`** in this folder.
2. When prompted, paste your GitHub repository URL and press **Enter**.
3. It will automatically commit and push all code directly to GitHub!

*(Alternative using command prompt if you prefer)*:
```bash
git init
git add .
git commit -m "Initial commit of TalentPulse"
git branch -M main
git remote add origin YOUR_GITHUB_URL
git push -u origin main
```

### Step 3: Deploy to Vercel (1-Click & Free)
1. Go to [Vercel.com](https://vercel.com) and log in with your GitHub account.
2. Click **"Add New..."** → **"Project"**.
3. Select your **`talentpulse`** repository from the list and click **"Import"**.
4. In the Project configuration:
   - **Framework Preset**: Leave as *Other* (static site).
   - **Root Directory**: `./` (default).
5. Click **"Deploy"**!
6. In ~15 seconds, Vercel will give you a live production URL (e.g. `https://talentpulse-engine.vercel.app`) that you can share with your entire team!

