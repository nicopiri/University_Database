document.getElementById("passwordForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const id = document.getElementById("id").value;
    const oldPassword = document.getElementById("oldPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmNewPassword = document.getElementById("confirmNewPassword").value;
    const messageDiv = document.getElementById("message"); // Define messageDiv here
    
    if (newPassword !== confirmNewPassword) {
      messageDiv.textContent = "New passwords do not match.";
      return;
    }
    
    const data = {
      id: id,
      nuova_password: newPassword,
      vecchia_password: oldPassword
    };
    
    fetch("http://127.0.0.1:5000/update/password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(result => {
      if (result === "Password Updated") {
        messageDiv.textContent = "Password updated successfully!";
      } else {
        messageDiv.textContent = "An error occurred. Please try again.";
      }
    })
    .catch(error => {
      console.error("Error:", error);
      messageDiv.textContent = "An error occurred. Please try again.";
    });
  });
    
  function redirectToLogin() {
    window.location.href = "login.html";
  }
  