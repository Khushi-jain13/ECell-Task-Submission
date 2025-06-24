const registeredEmails = ["john@example.com", "jane@example.com"];

document.getElementById("registrationForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim().toLowerCase();
  const name = document.getElementById("name").value.trim();
  const message = document.getElementById("message");

  if (registeredEmails.includes(email)) {
    message.textContent = "⚠️ This email is already registered.";
    message.className = "message error";
  } else {
    registeredEmails.push(email);
    message.textContent = `✅ Registration successful. Welcome, ${name}!`;
    message.className = "message success";
    document.getElementById("registrationForm").reset();
  }
});
