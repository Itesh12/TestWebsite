// Firebase Configuration
const firebaseConfig = {
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "YOUR_FIREBASE_AUTH_DOMAIN",
    projectId: "YOUR_FIREBASE_PROJECT_ID",
    storageBucket: "YOUR_FIREBASE_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Variables for UI elements
const authForm = document.getElementById('authForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const authButton = document.getElementById('authButton');
const toggleLink = document.getElementById('toggleLink');
const formTitle = document.getElementById('formTitle');
const errorDiv = document.getElementById('error');
let isLogin = true; // Flag for whether the form is in login or register mode

// Toggle between login and register
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

// Form submission
authForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the default form submission
    const email = emailInput.value;
    const password = passwordInput.value;
    
    errorDiv.textContent = ''; // Clear previous errors

    if (isLogin) {
        // Login logic
        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                window.location.href = 'pages/home.html'; // Redirect to home on success
            })
            .catch((error) => {
                errorDiv.textContent = error.message; // Show error on failed login
            });
    } else {
        // Register logic
        auth.createUserWithEmailAndPassword(email, password)
            .then(() => {
                window.location.href = 'pages/home.html'; // Redirect to home on success
            })
            .catch((error) => {
                errorDiv.textContent = error.message; // Show error on failed registration
            });
    }
});

// Check if the user is already logged in
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        window.location.href = 'pages/home.html'; // Redirect to home if already logged in
    }
});
