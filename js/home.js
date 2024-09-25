import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

const auth = getAuth();
const user = auth.currentUser;

if (user) {
  document.getElementById("userEmail").innerText = user.email;
} else {
  window.location.href = "index.html"; // Redirect to login if not authenticated
}

// Show/hide drawer
const profileBtn = document.getElementById("profileBtn");
const drawer = document.getElementById("drawer");

profileBtn.addEventListener("click", () => {
  drawer.classList.toggle("show");
});

// Logout functionality
document.getElementById("logoutBtn").addEventListener("click", async () => {
  await logout();
});

// Logout function from app.js
const logout = async () => {
  const auth = getAuth();
  try {
    await auth.signOut();
    alert("Logged out successfully!");
    window.location.href = "index.html"; // Redirect to login page
  } catch (error) {
    console.error("Error logging out:", error.message);
  }
};
