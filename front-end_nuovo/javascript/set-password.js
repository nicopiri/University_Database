document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    var userId = urlParams.get('id');
  
    if (userId) {
      var userIdSpan = document.getElementById('user-id');
      userIdSpan.textContent = userId;
    }
  
    document.getElementById("set-password-form").addEventListener("submit", function(event) {
      event.preventDefault(); // Prevent the form from submitting
  
      var password1 = document.getElementById("password1").value;
      var password2 = document.getElementById("password2").value;
  
      if (password1 !== password2) {
        showErrorMessage("Passwords do not match.");
        return;
      }
  
      var passwordData = {
        id: userId,
        password: password1
      };
  
      fetch('http://127.0.0.1:5000/insert/password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(passwordData)
      })
      .then(response => response.text())
      .then(data => {
        if (data.includes('Password inserted successfully')) {
          showSuccessMessage('Password set successfully.');
        } else {
          showErrorMessage(data);
        }
      })
      .catch(error => {
        console.error('Fetch error:', error);
        showErrorMessage('An error occurred. Please try again later.');
      });
    });
  
    document.getElementById("login-btn").addEventListener("click", function() {
      window.location.href = "login.html"; // Redirect to login page
    });
  
    function showSuccessMessage(message) {
      var successDiv = document.createElement("div");
      successDiv.className = "success-message";
      successDiv.textContent = message;
  
      var container = document.querySelector(".container");
      container.appendChild(successDiv);
    }
  
    function showErrorMessage(message) {
      var errorDiv = document.createElement("div");
      errorDiv.className = "error-message";
      errorDiv.textContent = message;
  
      var container = document.querySelector(".container");
      container.appendChild(errorDiv);
    }
  });
  