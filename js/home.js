// Initialize Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
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
