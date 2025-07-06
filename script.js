// Registration
document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("regUsername").value.trim();
  const password = document.getElementById("regPassword").value.trim();

  if (localStorage.getItem(username)) {
    showMessage("Username already exists.", "red");
  } else {
    localStorage.setItem(username, password);
    showMessage("Registration successful!", "green");
  }
});

// Login
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  const storedPassword = localStorage.getItem(username);
  if (storedPassword && storedPassword === password) {
    showMessage("Login successful!", "green");
    // Redirect or show dashboard
    setTimeout(() => {
      window.location.href = "dashboard.html"; // Create this page if needed
    }, 1000);
  } else {
    showMessage("Invalid username or password.", "red");
  }
});

// Helper
function showMessage(msg, color) {
  const message = document.getElementById("message");
  message.textContent = msg;
  message.style.color = color;
}
