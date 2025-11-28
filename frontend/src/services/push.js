// src/services/push.js
// Firebase Cloud Messaging (FCM) helper for web push

import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { initializeApp } from "firebase/app";

// Read firebase config from env
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

let app = null;
let messaging = null;

export function initFirebase() {
  if (!app) {
    app = initializeApp(firebaseConfig);
  }
  if (!messaging) {
    try {
      messaging = getMessaging(app);
    } catch (err) {
      console.warn("FCM init failed:", err);
    }
  }
  return messaging;
}

/**
 * Request notification permission and return the FCM token (or null)
 * VAPID key is configured in env: REACT_APP_FIREBASE_VAPID_KEY
 */
export async function requestPushToken() {
  try {
    initFirebase();
    const vapidKey = process.env.REACT_APP_FIREBASE_VAPID_KEY;
    const token = await getToken(messaging, { vapidKey });
    return token;
  } catch (err) {
    console.warn("Unable to get permission / token", err);
    return null;
  }
}

/**
 * Listen to foreground messages (when tab is open)
 * handler receives payload (object)
 */
export function subscribeForegroundMessages(handler) {
  if (!messaging) initFirebase();
  if (!messaging) return () => {};
  return onMessage(messaging, (payload) => {
    handler(payload);
  });
}
