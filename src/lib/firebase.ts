import { cert, getApp, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const FIREBASE_SERVICE_ACCOUNT_KEY = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

export function getAdminApp() {
  if (getApps().length > 0) {
    return getApp();
  }

  if (!FIREBASE_SERVICE_ACCOUNT_KEY) {
    console.warn("FIREBASE_SERVICE_ACCOUNT_KEY is not defined. Firebase Admin SDK not initialized.");
    return null;
  }

  const serviceAccount = JSON.parse(FIREBASE_SERVICE_ACCOUNT_KEY);

  return initializeApp({
    credential: cert(serviceAccount),
  });
}

const adminApp = getAdminApp();
export const adminDb = adminApp ? getFirestore(adminApp) : null;
