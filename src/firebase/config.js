import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDBe4bUIEiNwjr-Rp6WRq_sQTRjLu8V-hk",
  authDomain: "recipe-hunt-42402.firebaseapp.com",
  projectId: "recipe-hunt-42402",
  storageBucket: "recipe-hunt-42402.appspot.com",
  messagingSenderId: "778379860835",
  appId: "1:778379860835:web:6448e7aa92f1aac991d156",
};

initializeApp(firebaseConfig);
export const db = getFirestore();
