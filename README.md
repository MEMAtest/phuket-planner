# 🏝️ Phuket Family Trip Planner

A modern, collaborative trip planning application built with React, TypeScript, and Firebase. Perfect for organizing family vacations with real-time sync across devices.

![Phuket Planner](https://img.shields.io/badge/Version-1.0.0-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue.svg)
![React](https://img.shields.io/badge/React-18.2.0-61dafb.svg)
![Firebase](https://img.shields.io/badge/Firebase-Ready-orange.svg)

## ✨ Features

### 📅 **Interactive Itinerary**
- Day-by-day trip planning with timeline view
- Add, edit, and remove activities
- Track activity completion
- Weather-aware recommendations
- Quick-add templates for common activities

### 🛫 **Jet Lag Management**
- Step-by-step jet lag mitigation plan
- UK to Thailand (+6h) specific advice
- Progress tracking with motivational nudges
- Sleep schedule adjustment guide

### 🍜 **Thai Food Guide**
- Kid-friendly dish recommendations
- Phuket specialties with spice levels
- Essential Thai phrases for dining
- Restaurant etiquette tips

### 💱 **Smart Tools**
- Real-time currency converter (GBP ⟷ THB)
- Kid-comfort packing checklist
- Emergency contacts
- Offline-capable with local storage
- Calendar export (.ics format)

### 🔄 **Collaboration Features**
- Firebase real-time sync
- Multi-device support
- Offline mode with automatic sync
- Progress indicators

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Git
- Firebase account (free tier works)
- Netlify account (for deployment)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/phuket-planner.git
cd phuket-planner
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up Firebase** (Optional for collaborative features)
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Firestore Database
   - Get your config from Project Settings
   - Update `src/firebase/config.ts`:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

4. **Start development server**
```bash
npm start
```

Visit `http://localhost:3000` to see your app!

## 🌐 Deployment

### Deploy to Netlify

#### Method 1: Git Integration (Recommended)

1. Push your code to GitHub
2. Log in to [Netlify](https://netlify.com)
3. Click "New site from Git"
4. Choose your repository
5. Build settings will auto-configure from `netlify.toml`
6. Click "Deploy site"

#### Method 2: Manual Deploy

```bash
# Build the project
npm run build

# Install Netlify CLI
npm install -g netlify-cli

# Deploy to Netlify
netlify deploy --prod --dir=build
```

### Environment Variables

If using Firebase, add these to Netlify:
- Go to Site settings → Environment variables
- Add your Firebase config as individual variables:
  - `REACT_APP_FIREBASE_API_KEY`
  - `REACT_APP_FIREBASE_AUTH_DOMAIN`
  - etc.

## 📱 Mobile Optimization

The app is fully responsive with:
- Touch-friendly interface (44px minimum touch targets)
- Swipe navigation between days
- Progressive disclosure for mobile screens
- Optimized data usage for slow connections
- PWA-ready structure

## 🔧 Configuration

### Customizing Trip Data

Edit `src/data/staticData.ts` to customize:
- Hotel information
- Weather forecasts
- Restaurant recommendations
- Phuket facts
- Food recommendations

### Styling

The app uses Tailwind CSS via CDN. Custom styles are in `src/style.css`.

## 🏗️ Project Structure

```
phuket-planner/
├── public/
│   └── index.html
├── src/
│   ├── components/       # React components
│   ├── context/          # Global state management
│   ├── data/            # Static data
│   ├── firebase/        # Firebase configuration
│   ├── types/           # TypeScript definitions
│   ├── utils/           # Helper functions
│   ├── App.tsx          # Main app component
│   ├── index.tsx        # Entry point
│   └── style.css        # Global styles
├── package.json
├── tsconfig.json
├── netlify.toml
└── README.md
```

## 💾 Data Persistence

The app uses a three-tier data strategy:
1. **Firebase Firestore** - Real-time sync when online
2. **LocalStorage** - Offline persistence
3. **Static defaults** - Fallback data

## 🛠️ Development

### Available Scripts

```bash
npm start       # Start development server
npm run build   # Build for production
npm test        # Run tests (if configured)
```

### Adding New Features

1. **New Component**: Create in `src/components/`
2. **New Data Type**: Add to `src/types/index.ts`
3. **Global State**: Update `src/context/TripContext.tsx`
4. **Static Data**: Modify `src/data/staticData.ts`

## 🐛 Troubleshooting

### Firebase Not Syncing
- Check Firebase configuration in `src/firebase/config.ts`
- Verify Firestore rules allow read/write
- Check browser console for errors

### Build Errors
- Clear node_modules: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npx tsc --noEmit`
- Verify all imports are correct

### Deployment Issues
- Ensure `netlify.toml` is in root directory
- Check build command outputs
- Verify environment variables in Netlify

## 📄 License

MIT License - feel free to use this for your own trips!

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 💡 Future Enhancements

Planned features:
- [ ] Photo uploads for activities
- [ ] Expense tracking with budget alerts
- [ ] Weather API integration
- [ ] Google Maps embedding
- [ ] Share itinerary via link
- [ ] Print-friendly version
- [ ] Multi-language support
- [ ] Dark mode

## 🙏 Acknowledgments

- Built for an amazing family trip to Phuket
- Icons provided inline as SVG components
- Inspired by the need for better travel planning tools

## 📧 Support

For issues or questions:
- Create an issue on GitHub
- Check existing issues for solutions
- Review the documentation above

---

**Safe travels and enjoy Phuket! 🏖️✈️**
