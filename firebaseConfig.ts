import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAAUJ3avK9wArC99cs2tqbCA29Bk8kFGs0",
  authDomain: "mobiiliohjelmointi-ostos-6e929.firebaseapp.com",
  databaseURL: "https://mobiiliohjelmointi-ostos-6e929-default-rtdb.firebaseio.com",
  projectId: "mobiiliohjelmointi-ostos-6e929",
  storageBucket: "mobiiliohjelmointi-ostos-6e929.firebasestorage.app",
  messagingSenderId: "924847635081",
  appId: "1:924847635081:web:b694ec809d3eb1f81b2458"
};

export const app = initializeApp(firebaseConfig);