// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

// Your web app's Firebase configuration
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
const auth = getAuth(app);

// Variables for UI elements
const authForm = document.getElementById('authForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const authButton = document.getElementById('authButton');
const toggleLink = document.getElementById('toggleLink');
const formTitle = document.getElementById('formTitle');
const errorDiv = document.getElementById('error');
const loader = document.getElementById('loader'); // For loading indicator
let isLogin = true; // Flag for whether the form is in login or register mode

// Toggle between login and register
if (toggleLink) {
    toggleLink.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent the default link behavior

        if (isLogin) {
            // Switch to Register mode
            formTitle.textContent = 'Register';
            authButton.textContent = 'Register';
            toggleLink.textContent = 'Already have an account? Login here';
            isLogin = false; // Set the flag to false (register mode)
        } else {
            // Switch back to Login mode
            formTitle.textContent = 'Login';
            authButton.textContent = 'Login';
            toggleLink.textContent = "Don't have an account? Register here";
            isLogin = true; // Set the flag to true (login mode)
        }
    });
}

// Form submission logic for login/register
if (authForm) {
    authForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent the default form submission
        const email = emailInput.value;
        const password = passwordInput.value;

        // Clear previous error messages
        errorDiv.textContent = '';

        // Show loading indicator
        loader.style.display = 'block';

        if (isLogin) {
            // Login logic
            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    window.location.href = 'pages/home.html'; // Redirect to home on successful login
                })
                .catch((error) => {
                    errorDiv.textContent = `Login failed: ${error.message}`; // Show error on failed login
                })
                .finally(() => {
                    loader.style.display = 'none'; // Hide loading indicator
                });
        } else {
            // Register logic
            createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    window.location.href = 'pages/home.html'; // Redirect to home on successful registration
                })
                .catch((error) => {
                    errorDiv.textContent = `Registration failed: ${error.message}`; // Show error on failed registration
                })
                .finally(() => {
                    loader.style.display = 'none'; // Hide loading indicator
                });
        }
    });
}

// Check if the user is already logged in and prevent them from going back to login
onAuthStateChanged(auth, (user) => {
    const currentPath = window.location.pathname;

    // If the user is authenticated and they are on the login page (index.html), redirect to home
    if (user && currentPath.includes('index.html')) {
        window.location.href = 'pages/home.html';
    }

    // If the user is not authenticated and they are on home.html, redirect them to login page
    if (!user && currentPath.includes('home.html')) {
        window.location.href = '../index.html';
    }
    
    // Prevent back navigation to login after login
    if (user) {
        history.replaceState(null, null, window.location.href); // Replace the current state
    }
});

// Logout logic only for the home page
const logoutButton = document.getElementById('logoutButton');

if (logoutButton) {
    logoutButton.addEventListener('click', () => {
        // Show loader during logout
        loader.style.display = 'block';

        signOut(auth)
            .then(() => {
                // Successfully logged out, redirect to login page
                window.location.href = '../index.html';
            })
            .catch((error) => {
                console.error('Error during logout:', error);
            })
            .finally(() => {
                loader.style.display = 'none'; // Hide loading indicator
            });
    });
    }
