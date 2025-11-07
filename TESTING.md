# Testing Guide for Phase 2 Features

This guide walks you through testing all three major Phase 2 features.

---

## ✅ Build Status

**Status:** ✅ Build Successful
**Build Size:** 213.94 kB (gzipped)
**Warnings:** Non-blocking ESLint warnings only

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm start
```

The app will open at `http://localhost:3000`

### 3. Access Test Page

Navigate to: **`/test`** or add `/test` to your URL

Or integrate the test page into your routing:

```tsx
import TestFeaturesPage from './pages/TestFeatures';

// In your router or App.js
<Route path="/test" element={<TestFeaturesPage />} />
```

---

## 🧪 Feature Testing

### Feature 1: Multi-Country Trip Builder

#### What to Test

1. **Create a New Trip**
   - Click "Test Trip Builder" on the test page
   - Enter trip name: "Southeast Asia Adventure"
   - Select home currency: GBP
   - Click "Next: Add Destinations"

2. **Add Country Segments**
   - Add Thailand: Jun 1-7, Cities: "Bangkok, Phuket"
   - Add Hong Kong: Jun 8-10, Cities: "Hong Kong"
   - Add Japan: Jun 11-15, Cities: "Tokyo, Kyoto"
   - Click "Next: Add Travelers"

3. **Add Travelers**
   - Add traveler: "Alice Smith", Nationality: GB (British)
   - Add traveler: "Bob Jones", Nationality: US (American)
   - Click "Next: Check Visas"

4. **Verify Visa Results**
   - Alice should see: 🟢 Visa-free for all destinations
   - Bob should see: 🟢 Visa-free for all except China (🔴 Visa required)
   - Click "Save Trip"

5. **Verify Trip Saved**
   - Check console log for trip object
   - Verify trip appears in green success box
   - Inspect JSON structure

#### Expected Results

```json
{
  "id": "trip_...",
  "name": "Southeast Asia Adventure",
  "segments": [
    {
      "id": "segment_...",
      "countryIso2": "TH",
      "startDate": "2025-06-01",
      "endDate": "2025-06-07",
      "cities": ["Bangkok", "Phuket"]
    },
    // ... more segments
  ],
  "travelers": [
    {
      "name": "Alice Smith",
      "nationality": "GB"
    }
  ],
  "homeCurrency": "GBP"
}
```

---

### Feature 2: Visa Checker

#### What to Test

1. **British Passport → Asia**
   - Nationality: GB
   - Destinations: TH, HK, CN, JP
   - Departure: 2025-06-01
   - **Expected:**
     - 🟢 Thailand: Visa-free, 30 days
     - 🟢 Hong Kong: Visa-free, 180 days
     - 🔴 China: Embassy visa, £151, 4 days processing
     - 🟢 Japan: Visa-free, 90 days

2. **American Passport → Asia**
   - Nationality: US
   - Destinations: TH, HK, CN, JP
   - **Expected:**
     - 🟢 Thailand: Visa-free, 30 days (by air)
     - 🟢 Hong Kong: Visa-free, 90 days
     - 🔴 China: Embassy visa, $140 USD, 4 days
     - 🟢 Japan: Visa-free, 90 days

3. **Australian Passport → Hong Kong + China**
   - Nationality: AU
   - Destinations: HK, CN
   - **Expected:**
     - 🟢 Hong Kong: Visa-free, 90 days
     - 🟡 China: eVisa, $140 AUD

#### Features to Verify

- [ ] Traffic light color coding works
- [ ] Costs display in correct currency
- [ ] Processing times show
- [ ] Requirements list appears
- [ ] Application deadline calculates correctly
- [ ] "Apply for Visa" button links work
- [ ] Summary shows total costs

---

### Feature 3: Offline Manager & PWA

#### Prerequisites

**IMPORTANT:** Service workers only work in production builds or HTTPS.

```bash
# Build for production
npm run build

# Serve with static server
npx serve -s build

# Open in browser
open http://localhost:3000/test
```

#### What to Test

1. **Download Country Packs**
   - Click "Test Offline Manager"
   - Observe storage usage bar (should start near 0%)
   - Click "Download" on Thailand
   - Watch:
     - Spinner appears
     - Storage bar increases
     - Green "Offline" badge appears
     - "Download" button changes to "Remove"

2. **Download Multiple Packs**
   - Download Hong Kong
   - Download Japan
   - Verify storage usage increases for each
   - Check total packs downloaded counter

3. **Test Offline Mode**
   - Open DevTools (F12)
   - Go to Network tab
   - Check "Offline" checkbox
   - Reload the page
   - **Expected:** App still loads (using cached data)
   - Navigate to different sections
   - Verify country data still accessible

4. **Remove Packs**
   - Click "Remove" on Thailand
   - Verify storage usage decreases
   - Downloaded pack counter decreases

5. **Service Worker**
   - DevTools → Application → Service Workers
   - Verify service worker is "Activated and running"
   - Check "Update on reload" to test updates
   - View Cache Storage to see cached files

#### PWA Installation (Mobile/Desktop)

**On Chrome Desktop:**
1. Look for install icon in address bar
2. Click "Install Trip Planner"
3. App opens in standalone window

**On Android Chrome:**
1. Menu → "Add to Home screen"
2. Icon appears on home screen
3. Opens like native app

**On iOS Safari:**
1. Share button → "Add to Home Screen"
2. Icon on home screen
3. Opens in full-screen mode

---

## 🔍 Manual Testing Checklist

### Multi-Country Trip Builder
- [ ] Can create trip with 1 country
- [ ] Can create trip with 3+ countries
- [ ] Dates validate correctly (end after start)
- [ ] Can add multiple cities to a segment
- [ ] Can remove segments
- [ ] Can add multiple travelers
- [ ] Can remove travelers
- [ ] Passport expiry date validation
- [ ] Visa requirements display for all travelers
- [ ] Save button creates valid trip object
- [ ] Cancel button returns to menu

### Visa Checker
- [ ] Displays all destination countries
- [ ] Country flags render correctly
- [ ] Visa-free shows green badge
- [ ] Visa required shows red badge
- [ ] eVisa shows yellow badge
- [ ] Costs format in correct currency
- [ ] Processing times display
- [ ] Max stay duration shows
- [ ] Requirements list displays
- [ ] Application URLs work
- [ ] Deadline calculation accurate
- [ ] Urgent warning for overdue deadlines
- [ ] Summary shows correct totals

### Offline Manager
- [ ] Country list displays all countries
- [ ] Country flags render
- [ ] Download button works
- [ ] Progress spinner shows during download
- [ ] Storage bar updates correctly
- [ ] Downloaded badge appears
- [ ] Remove button works
- [ ] Storage decreases on removal
- [ ] Pack counter accurate
- [ ] Info box displays

### PWA Features (Production Only)
- [ ] Service worker registers successfully
- [ ] App works offline after initial load
- [ ] Update prompt appears on new version
- [ ] Install prompt appears (desktop/mobile)
- [ ] Manifest.json loads correctly
- [ ] Theme color applies
- [ ] Standalone mode works

---

## 🐛 Common Issues & Solutions

### Issue: Service Worker Not Registering

**Symptoms:** "Service Worker not available" alert

**Solutions:**
1. Must use production build: `npm run build && npx serve -s build`
2. Must use localhost or HTTPS (not HTTP)
3. Check DevTools → Console for errors
4. Clear browser cache and reload

---

### Issue: Build Fails with TypeScript Errors

**Symptoms:** `npm run build` fails

**Solutions:**
1. Check you have TypeScript 4.9.5: `npm list typescript`
2. Delete node_modules: `rm -rf node_modules package-lock.json`
3. Reinstall: `npm install`
4. Try build again: `npm run build`

---

### Issue: Offline Mode Doesn't Work

**Symptoms:** App shows error when offline

**Solutions:**
1. Ensure you downloaded country packs first (while online)
2. Service worker must be active (DevTools → Application)
3. Clear cache and re-download packs
4. Check cache storage has files

---

### Issue: Visa Data Missing

**Symptoms:** "No requirements found" or empty visa checker

**Solutions:**
1. Check nationality is supported (GB, US, AU currently)
2. Check destination is supported (TH, HK, CN, JP currently)
3. Add more data in `/src/services/visa.ts`
4. File GitHub issue for missing combinations

---

### Issue: Map Providers Not Loading

**Symptoms:** "API key not found" error

**Solutions:**
1. Create `.env` file in project root
2. Add: `REACT_APP_MAPS_GOOGLE_KEY=your_key`
3. Restart dev server: `npm start`
4. Maps are optional for testing other features

---

## 📊 Testing Data

### Sample Trips to Test

#### 1. Asia Backpacker
- **Countries:** TH → VN → KH → MY → SG
- **Duration:** 30 days
- **Traveler:** GB passport
- **Expected Visas:** All visa-free except VN (eVisa)

#### 2. Business Trip
- **Countries:** HK → CN (Shanghai, Beijing) → HK
- **Duration:** 7 days
- **Traveler:** US passport
- **Expected Visas:** HK visa-free, CN embassy visa required

#### 3. Round-the-World
- **Countries:** GB → US → JP → AU → TH → GB
- **Duration:** 90 days
- **Traveler:** GB passport
- **Expected Visas:** US (ESTA), others visa-free

---

## 📝 Reporting Issues

If you find bugs, please report with:

1. **Feature:** Which feature (Trip Builder / Visa Checker / Offline)
2. **Steps:** What you did
3. **Expected:** What should happen
4. **Actual:** What actually happened
5. **Browser:** Chrome / Firefox / Safari + version
6. **Console:** Any errors from DevTools → Console
7. **Screenshot:** If applicable

---

## ✅ Success Criteria

All features working if:

- ✅ Can create and save multi-country trips
- ✅ Visa requirements display correctly
- ✅ Can download and remove country packs
- ✅ App works offline after downloading packs
- ✅ Service worker activates in production
- ✅ Build completes successfully
- ✅ No console errors (warnings OK)

---

## 🎯 Next Steps After Testing

1. **Expand Visa Data:** Add more nationalities and destinations
2. **Integrate Trip Builder:** Add to main app navigation
3. **Add Budget Tracker:** Track expenses per country
4. **Implement Itinerary View:** Day-by-day schedule per country
5. **Add Transit Visa Detection:** Auto-detect if transit visa needed

---

## 📚 Related Documentation

- `README-GLOBAL.md` - Global architecture overview
- `README-FEATURES.md` - Detailed feature documentation
- `.env.example` - Environment variable template
- `scripts/countries.csv` - Country data for generation

---

**Happy Testing!** 🎉

If all tests pass, you're ready for Phase 3!
