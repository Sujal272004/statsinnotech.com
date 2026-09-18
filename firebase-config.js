/**
 * Firebase Configuration - Stats Innotech
 * 
 * Instructions:
 * 1. Go to https://console.firebase.google.com/
 * 2. Open your project (or create a new one: e.g. "stats-innotech")
 * 3. Click the gear icon (Project Settings) > General
 * 4. Under "Your apps", click the Web icon (</>) to register a web app
 * 5. Copy the `firebaseConfig` keys and paste them below:
 */

const firebaseConfig = {
  apiKey: "AIzaSyBNGSR89PvthDMN1IEJNhm9Q_CaSOP1uog",
  authDomain: "stats-innotech.firebaseapp.com",
  projectId: "stats-innotech",
  storageBucket: "stats-innotech.firebasestorage.app",
  messagingSenderId: "602670692748",
  appId: "1:602670692748:web:6f000bbf16fbd6547ffea9",
  measurementId: "G-Y990E24WNH"
}

// Check if credentials have been replaced
function isFirebaseConfigured() {
  return firebaseConfig &&
    firebaseConfig.apiKey &&
    !firebaseConfig.apiKey.startsWith("YOUR_");
}

window.firebaseConfig = firebaseConfig;
window.isFirebaseConfigured = isFirebaseConfigured;
