import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

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
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore();

// Toggle between login and signup forms
const forms = document.querySelector(".forms");
const pwShowHide = document.querySelectorAll(".eye-icon");
const links = document.querySelectorAll(".link");

// Show/hide password functionality
pwShowHide.forEach(eyeIcon => {
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

// Toggle between forms
links.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault(); // Prevent default link behavior
    forms.classList.toggle("show-signup");
  });
});

// Signup functionality
document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent form submission
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  const auth=getAuth();
    const db=getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
        const user=userCredential.user;
        const userData={
            email: email,
            firstName: "Itesh",
            lastName:"Ambre",
        };
      const docRef=doc(db, "testusers", user.uid);
        setDoc(docRef,userData)
        .then(()=>{
            window.location.href='index.html';
        })
        .catch((error)=>{
            console.error("error writing document", error);

        });
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode=='auth/email-already-in-use'){
            console.log('Email Address Already Exists !!!', 'signUpMessage');
        }
        else{
            console.log('unable to create User', 'signUpMessage');
        }
    })
 });

// Login functionality
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent form submission
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    localStorage.setItem('loggedInUserId', user.uid);
    window.location.href = 'pages/home.html'; // Redirect to home page
  } catch (error) {
    const errorCode = error.code;
    console.error("Sign-in error code:", errorCode);
    let errorMessage = "An error occurred. Please try again.";

    // Handle specific error codes
    if (errorCode === 'auth/user-not-found') {
      errorMessage = 'No user found with this email.';
    } else if (errorCode === 'auth/wrong-password') {
      errorMessage = 'Incorrect password. Please try again.';
    } else if (errorCode === 'auth/invalid-email') {
      errorMessage = 'The email address is not valid.';
    } else if (errorCode === 'auth/too-many-requests') {
      errorMessage = 'Too many failed login attempts. Please try again later.';
    }

    alert(errorMessage); // Show error message to user
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
