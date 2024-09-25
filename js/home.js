// Initialize Firebase
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
firebase.initializeApp(firebaseConfig);

const profileButton = document.getElementById('profileButton');
const welcomeMessage = document.getElementById('welcomeMessage');
const logoutButton = document.getElementById('logoutButton');

// Display welcome message with user's email
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        welcomeMessage.textContent = `Welcome, ${user.email}!`;
    } else {
        window.location.href = 'login.html'; // Redirect to login if not logged in
    }
});

// Logout functionality
logoutButton.addEventListener('click', async () => {
    try {
        await firebase.auth().signOut();
        window.location.href = 'login.html';
    } catch (error) {
        console.error('Error logging out: ', error);
    }
});

// Profile button functionality
profileButton.addEventListener('click', () => {
    alert("Profile button clicked!"); // Placeholder action
    // You can redirect to a profile page or display user information here
});
