// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDz6Lo5LoYRmVpHL9egJUdiZosBBNWa2aA",
  authDomain: "alvin-f573e.firebaseapp.com",
  databaseURL: "https://alvin-f573e-default-rtdb.firebaseio.com",
  projectId: "alvin-f573e",
  storageBucket: "alvin-f573e.firebasestorage.app",
  messagingSenderId: "718704784181",
  appId: "1:718704784181:web:6bcdf70a5d35bcd875d27c",
  measurementId: "G-T7SW3DC8YC"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Export untuk digunakan di file lain
const auth = firebase.auth();
const database = firebase.database();
