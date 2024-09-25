// profile.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore, setDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

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

// Profile Update Functionality
document.getElementById("profileForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;

  const userId = localStorage.getItem('loggedInUserId');
  if (userId) {
    await setDoc(doc(db, "testusers", userId), {
      firstName: firstName,
      lastName: lastName,
    }, { merge: true }); // Use merge to update only the specified fields

    alert("Profile updated successfully!");
  }
});

// Load user data on profile page
window.addEventListener("load", async () => {
  const userId = localStorage.getItem('loggedInUserId');
  if (userId) {
    const userDoc = await getDoc(doc(db, "testusers", userId));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      document.getElementById("firstName").value = userData.firstName || "";
      document.getElementById("lastName").value = userData.lastName || "";
      document.getElementById("email").value = userData.email || "";
    } else {
      console.error("No user data found!");
    }
  } else {
    alert("User not logged in.");
    window.location.href = "index.html"; // Redirect to login if not logged in
  }
});
