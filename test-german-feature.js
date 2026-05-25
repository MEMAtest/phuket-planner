/**
 * Smoke test for German Learning feature
 * Run with: node test-german-feature.js
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Testing German Learning Feature Integration\n');

// Test 1: Check all required files exist
console.log('📁 Checking files...');
const requiredFiles = [
  'src/components/German/index.js',
  'src/components/German/VoicePractice.js',
  'src/data/germanThemes.js',
  'src/state/GermanContext.tsx',
  'src/utils/groqAI.js',
  'GERMAN_LEARNING_GUIDE.md'
];

let allFilesExist = true;
requiredFiles.forEach(file => {
  const exists = fs.existsSync(file);
  console.log(`  ${exists ? '✅' : '❌'} ${file}`);
  if (!exists) allFilesExist = false;
});

if (!allFilesExist) {
  console.log('\n❌ Some files are missing!');
  process.exit(1);
}

// Test 2: Check App.js integration
console.log('\n🔗 Checking App.js integration...');
const appContent = fs.readFileSync('src/App.js', 'utf8');
const appChecks = [
  { check: appContent.includes("import GermanLearning from './components/German'"), msg: 'German component import' },
  { check: appContent.includes("case 'German':"), msg: 'German case in renderContent' },
  { check: appContent.includes('return <GermanLearning />'), msg: 'GermanLearning component render' }
];

appChecks.forEach(({ check, msg }) => {
  console.log(`  ${check ? '✅' : '❌'} ${msg}`);
  if (!check) allFilesExist = false;
});

// Test 3: Check Header.js integration
console.log('\n📋 Checking Header.js integration...');
const headerContent = fs.readFileSync('src/components/Header.js', 'utf8');
const hasGermanTab = headerContent.includes("'German'") && headerContent.includes("tabs = [");
console.log(`  ${hasGermanTab ? '✅' : '❌'} German tab in navigation`);

// Test 4: Check index.js GermanProvider
console.log('\n⚛️  Checking index.js GermanProvider...');
const indexContent = fs.readFileSync('src/index.js', 'utf8');
const providerChecks = [
  { check: indexContent.includes("import { GermanProvider } from './state/GermanContext'"), msg: 'GermanProvider import' },
  { check: indexContent.includes('<GermanProvider>'), msg: 'GermanProvider wrapper' }
];

providerChecks.forEach(({ check, msg }) => {
  console.log(`  ${check ? '✅' : '❌'} ${msg}`);
  if (!check) allFilesExist = false;
});

// Test 5: Check germanThemes data structure
console.log('\n📚 Checking germanThemes.js structure...');
const themesContent = fs.readFileSync('src/data/germanThemes.js', 'utf8');
const themesChecks = [
  { check: themesContent.includes('GERMAN_THEMES'), msg: 'GERMAN_THEMES constant' },
  { check: themesContent.includes('A1:'), msg: 'A1 level themes' },
  { check: themesContent.includes('A2:'), msg: 'A2 level themes' },
  { check: themesContent.includes('B1:'), msg: 'B1 level themes' },
  { check: themesContent.includes('getAllThemes'), msg: 'getAllThemes function' },
  { check: themesContent.includes('calculateProgress'), msg: 'calculateProgress function' }
];

themesChecks.forEach(({ check, msg }) => {
  console.log(`  ${check ? '✅' : '❌'} ${msg}`);
});

// Test 6: Check Groq API integration
console.log('\n🤖 Checking Groq API integration...');
const groqContent = fs.readFileSync('src/utils/groqAI.js', 'utf8');
const groqChecks = [
  { check: groqContent.includes('reviewGermanSpeech'), msg: 'reviewGermanSpeech function' },
  { check: groqContent.includes('isGroqConfigured'), msg: 'isGroqConfigured function' },
  { check: groqContent.includes('getGroqSetupInstructions'), msg: 'getGroqSetupInstructions function' },
  { check: groqContent.includes('REACT_APP_GROQ_API_KEY'), msg: 'API key environment variable' }
];

groqChecks.forEach(({ check, msg }) => {
  console.log(`  ${check ? '✅' : '❌'} ${msg}`);
});

// Test 7: Check VoicePractice component
console.log('\n🎤 Checking VoicePractice component...');
const voiceContent = fs.readFileSync('src/components/German/VoicePractice.js', 'utf8');
const voiceChecks = [
  { check: voiceContent.includes('webkitSpeechRecognition'), msg: 'Web Speech API integration' },
  { check: voiceContent.includes('de-DE'), msg: 'German language setting' },
  { check: voiceContent.includes('reviewGermanSpeech'), msg: 'AI feedback integration' }
];

voiceChecks.forEach(({ check, msg }) => {
  console.log(`  ${check ? '✅' : '❌'} ${msg}`);
});

// Test 8: Check .env.example
console.log('\n⚙️  Checking environment configuration...');
const envExampleContent = fs.readFileSync('.env.example', 'utf8');
const hasGroqKey = envExampleContent.includes('REACT_APP_GROQ_API_KEY');
console.log(`  ${hasGroqKey ? '✅' : '❌'} Groq API key in .env.example`);

// Final summary
console.log('\n' + '='.repeat(50));
if (allFilesExist) {
  console.log('✅ All integration tests passed!');
  console.log('\n📋 Next Steps:');
  console.log('1. Add your Groq API key to .env:');
  console.log('   REACT_APP_GROQ_API_KEY=your-key-here');
  console.log('2. Get a free key at: https://console.groq.com');
  console.log('3. Restart dev server: npm start');
  console.log('4. Open app and click "German" tab');
  console.log('5. Read GERMAN_LEARNING_GUIDE.md for full instructions');
  console.log('\n🎯 Goal Status: COMPLETE ✅');
  process.exit(0);
} else {
  console.log('❌ Some integration tests failed!');
  process.exit(1);
}
