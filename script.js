// Function to show an alert when button is clicked
function showAlert() {
    alert('Button clicked!');
}

// Contact form submission handling
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from refreshing the page
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (name && email && message) {
        document.getElementById("formMessage").textContent = "Thank you for contacting us, " + name + "!";
        document.getElementById("contactForm").reset(); // Reset form fields
    } else {
        document.getElementById("formMessage").textContent = "Please fill in all fields.";
        document.getElementById("formMessage").style.color = "red";
    }
});
