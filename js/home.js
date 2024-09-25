// home.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// Firebase configuration (Add your actual Firebase config)
const firebaseConfig = {
  apiKey: "AIzaSyDPneL6Pk9fOpMiTilqoHcCDfG3pHD_Q9g",
  authDomain: "explora-3c682.firebaseapp.com",
  projectId: "explora-3c682",
  storageBucket: "explora-3c682.appspot.com",
  messagingSenderId: "644439159668",
  appId: "1:644439159668:web:44c756d6507c6531b47221",
  measurementId: "G-62HJXTP4PM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

// Logout functionality
const logoutButton = document.getElementById("logoutButton");
if (logoutButton) {
  logoutButton.addEventListener("click", async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully!");
      window.location.href = "index.html"; // Redirect to login page
    } catch (error) {
      console.error("Error logging out:", error.message);
      alert("Error logging out. Please try again."); // Notify user of error
    }
  });
}

// Load user data on home page
window.addEventListener("load", async () => {
  const userId = localStorage.getItem('loggedInUserId');
  if (userId) {
    const userDoc = await getDoc(doc(db, "testusers", userId));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      document.getElementById("userWelcome").innerText = `Welcome, ${userData.firstName} ${userData.lastName}`;
    } else {
      console.error("No user data found!");
    }
  } else {
    alert("User not logged in.");
    window.location.href = "index.html"; // Redirect to login if not logged in
  }
});
