// lib/firebase.ts

import { initializeApp, getApps } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDCpAyzluluZi2EQeJ5taM250akeetkw0U",
  authDomain: "women-world-8e5df.firebaseapp.com",
  projectId: "women-world-8e5df",
  storageBucket: "women-world-8e5df.firebasestorage.app",
  messagingSenderId: "517274269731",
  appId: "1:517274269731:web:4183e6938b0c9146365996",
  measurementId: "G-WL80QC92NN"
};

const app = getApps().length
  ? getApps()[0]
  : initializeApp(firebaseConfig);

export const analytics: Analytics | null =
  typeof window !== "undefined" ? getAnalytics(app) : null;