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
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Check if credentials have been replaced
function isFirebaseConfigured() {
  return firebaseConfig && 
         firebaseConfig.apiKey && 
         !firebaseConfig.apiKey.startsWith("YOUR_");
}

window.firebaseConfig = firebaseConfig;
window.isFirebaseConfigured = isFirebaseConfigured;
