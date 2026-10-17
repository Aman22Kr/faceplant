# FacePlant — Cosmetologist & Aesthetic Medicine Clinic (Mumbai)

A high-fidelity, multi-page static web application recreating and elevating the clinical presence of **Dr. Huma Shaikh's Cosmetology, Trichology, Aesthetic Medicine & General Practice Clinic** in Antop Hill, Mumbai.

Built for **Aman22kr** with automated static deployment via **GitHub Actions** to **GitHub Pages**.

---

## 🌟 Overview & Brand Identity

- **Brand Name**: FacePlant
- **Lead Doctor**: Dr. Huma Shaikh (BHMS, CCH, DIPLOMA SKIN AESTHETICS — 12.0 Years Experience, Licence 56076)
- **Clinical Address**: FacePlant Clinic, Mujavar Compound, Behind Shaikh Mistri Dargah, Antop Hill, Mumbai 400037, Maharashtra, India
- **Phone**: +91 9970849909
- **Email**: humaonly@gmail.com
- **Working Hours**: Tuesday – Sunday: 12:00 PM – 03:00 PM & 07:00 PM – 11:00 PM (Monday: Closed for deep sanitization)

---

## 🚀 Key Features & Page Scope

1. **Home Page (`/#/`)**:
   - Dynamic Hero Slider (3 slides with authentic clinical copy: Pigmentation, Clear Acne, Hair Regrowth)
   - Real clinical credentials strip (12+ Years Experience, 15,000+ Happy Patients, 25+ Aesthetic Procedures, 4.9 ★ Rating)
   - About FacePlant Clinic narrative matching reference
   - 4 Specializations: Cosmetology, Aesthetician, Trichology, Aesthetic Procedure
   - 21 authentic healthcare treatments with images and category filters
   - Meet Doctor showcase card with consultation modes (Voice Call, Video Call, In-Person clinic)
   - Verified patient reviews carousel & interactive "Leave a Review" modal
   - Clinical Media Pictures gallery with image lightbox
   - 9 Medical FAQs with detailed clinical answers
   - Location & Google Maps interactive embed
   - Working Hours schedule
   - Interactive Contact Us inquiry form
   - Dedicated Base Page Sponsored Advertisement banner

2. **Healthcare Services Directory (`/#/services`)**:
   - Complete directory of all 21 services
   - Real-time instant search input
   - Filter chips: All, Saved, Skin & Pigmentation, Hair & Scalp, Anti-Aging & Rejuvenation, Clinical Minor Surgeries, Medi-Facials & Glow
   - Sort by Name (A-Z) or Duration
   - Heart icon to save/bookmark treatments in localStorage

3. **Service Detail Pages (`/#/services/:slug`)**:
   - Clinical Overview & Mechanism
   - Key Treatment Benefits
   - Step-by-Step In-Clinic Procedure Workflow
   - Ideal Candidate & Recommended Sessions
   - Direct pre-filled "Book This Treatment" button
   - Related procedures recommendations

4. **Doctor Profile (`/#/doctor-profile`)**:
   - Comprehensive biography & medical clerkships (Sir JJ Hospital, St. George Hospital, Prince Ali Khan Hospital, Vadia Hospital)
   - Registration licence & qualifications
   - Consultation fee & direct slot booking

5. **Patient Portal / My Appointments (`/#/my-appointments`)**:
   - View scheduled appointments with booking reference IDs (e.g. `FP-824192`)
   - Cancel or manage scheduled appointments
   - Quick access to all bookmarked treatments

6. **Interactive Booking Modal (`Global`)**:
   - Consultation modes: In-Person Clinic, Video Call, Audio Call
   - Date picker with Monday closure validation
   - Dynamic 15-minute slot generator matching clinic operating hours
   - Patient details validation (10-digit mobile, email, name)
   - Instant confirmation with booking ID stored in `localStorage`

7. **Base Page Advertisement Banner (`Global`)**:
   - Displays sponsored health & aesthetic technology partners
   - Rotate next partner button
   - Minimize / dismiss control saved in localStorage

8. **Animation & Motion Controls Modal (`Global`)**:
   - Speeds: `SLOW` (1.8x), `NORMAL` (1.0x), `FAST` (0.5x), `OFF` (zero motion)
   - Intensities: `SUBTLE`, `MEDIUM`, `STRONG`
   - Floating badge trigger in bottom right corner
   - Automatically respects `prefers-reduced-motion`

---

## 🛠️ Technology Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router (HashRouter for bulletproof GitHub Pages static hosting without 404 rewrite issues)
- **Icons**: Lucide React
- **Data Persistence**: Browser `localStorage` (Namespaced: `faceplant_appointments`, `faceplant_favorites`, `faceplant_reviews`, `faceplant_contact_messages`, `faceplant_anim_settings`, `faceplant_ad_minimized`)
- **Unit Testing**: Node.js native test runner (`node:test` + `node:assert/strict`)

---

## 📦 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Run unit tests
node --test

# 3. Start local development server
npm run dev

# 4. Create production build
npm run build

# 5. Preview production build
npm run preview
```

---

## 🚀 GitHub Pages Static Deployment (GitHub Actions)

This repository includes a preconfigured GitHub Actions workflow at `.github/workflows/deploy.yml`.

### Step-by-Step Deployment Instructions for `Aman22kr`:

1. Push this repository to your GitHub account:
   ```bash
   git init
   git add .
   git commit -m "Update 2"
   git branch -M main
   git remote add origin https://github.com/Aman22kr/faceplant.git
   git push -u origin main
   ```

2. Enable GitHub Pages in your GitHub repository:
   - Navigate to **Settings** &rarr; **Pages** in `github.com/Aman22kr/faceplant`.
   - Under **Build and deployment** &rarr; **Source**, select **GitHub Actions**.

3. The GitHub Actions workflow will automatically run:
   - It will install dependencies, execute the unit test suite (`node --test`), build the static bundle (`npm run build`), and deploy the `./dist` directory directly to GitHub Pages.
   - Note: Both `package.json` and `package-lock.json` are included in the repository root. The workflow is also resilient and handles builds smoothly whether the lockfile is present or regenerated.

4. Your website will be live at:
   ```
   https://aman22kr.github.io/faceplant/
   ```

### Alternative `gh-pages` Branch Deployment:
If you prefer branch-based deployment without GitHub Actions:
```bash
npm run deploy
```
*(This runs `npm run build` and publishes `./dist` to the `gh-pages` branch).*

---

## 🔒 Client-Side Storage & Demo Boundaries

All appointment bookings, reviews, contact inquiries, and bookmarks are persisted client-side in the user's browser `localStorage`. No private data is transmitted to external servers.
