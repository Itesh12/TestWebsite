import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore, setDoc, doc, query, where, getDocs, collection } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// Firebase configuration
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

// Show/hide password functionality
document.querySelectorAll(".eye-icon").forEach(eyeIcon => {
  eyeIcon.addEventListener("click", () => {
    let pwFields = eyeIcon.parentElement.parentElement.querySelectorAll(".password");

    pwFields.forEach(password => {
      if (password.type === "password") {
        password.type = "text"; // Show password
        eyeIcon.classList.replace("bx-hide", "bx-show"); // Change icon to show state
      } else {
        password.type = "password"; // Hide password
        eyeIcon.classList.replace("bx-show", "bx-hide"); // Change icon to hide state
      }
    });
  });
});

// Toggle between login and signup forms
document.querySelectorAll(".link").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    document.querySelector(".forms").classList.toggle("show-signup");
  });
});

// Function to check if username exists in Firestore
const isUsernameTaken = async (username) => {
  const q = query(collection(db, "users"), where("username", "==", username));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
};

// Generate random username suggestions
const generateSuggestions = (firstName, lastName) => {
  const randomNum = Math.floor(1000 + Math.random() * 9000); // Random 4-digit number
  return [
    `${firstName}_${lastName}_${randomNum}`,
    `${firstName}${randomNum}`,
    `${firstName}_${randomNum}`,
    `${firstName}${lastName}`,
  ];
};

// Signup form submission
document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const firstName = document.getElementById("signupFirstName").value;
  const lastName = document.getElementById("signupLastName").value;
  const username = document.getElementById("signupUsername").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  // Check if username is already taken
  if (await isUsernameTaken(username)) {
    const suggestions = generateSuggestions(firstName, lastName);
    document.querySelector(".username-error").textContent = `Username is taken. Try: ${suggestions.join(", ")}`;
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save user data to Firestore
    await setDoc(doc(db, "users", user.uid), {
      firstName,
      lastName,
      username,
      email,
      createdAt: new Date(),
    });

    alert("Signup successful! You can now log in.");
    window.location.href = 'index.html'; // Redirect to login
  } catch (error) {
    console.error("Error during signup:", error.message);
    alert("Signup failed. Please try again.");
  }
});

// Login form submission
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    localStorage.setItem('loggedInUserId', user.uid);
    window.location.href = 'pages/home.html'; // Redirect to home page
  } catch (error) {
    console.error("Sign-in error:", error.message);
    alert("Login failed. Please try again.");
  }
});

// Logout functionality
const logout = async () => {
  try {
    await signOut(auth);
    alert("Logged out successfully!");
    window.location.href = "index.html"; // Redirect to login page
  } catch (error) {
    console.error("Error logging out:", error.message);
  }
};
