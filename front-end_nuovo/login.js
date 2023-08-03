document.getElementById("login-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent the form from submitting

  // Get the values from the form
  var id = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  var loginData = {
    id: id,
    password: password
  };

  fetch('http://127.0.0.1:5000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginData)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(data => { 
      if (data === 'Studente') {
        // Redirect to dopo_login_studenti.html with student id as query parameter
        window.location.href = `dopo_login_studenti.html?id=${id}`;
      } else if (data === 'Docente') {
        window.location.href = `didattica.html?id=${id}`;
      } else {
        // Incorrect password or other error message from the API
        showErrorMessage('Incorrect Password');
      }
    })
    .catch(error => {
      console.error('Fetch error:', error);
      // Network or other fetch errors
      showErrorMessage('Error occurred. Please try again later.');
    });
});

// Function to show error message
function showErrorMessage(message) {
  var errorDiv = document.getElementById('error-message');
  errorDiv.textContent = message;
  errorDiv.style.display = 'block';
}

document.getElementById("registration-btn").addEventListener("click", function(event) {
  event.preventDefault();
  window.location.href = "registration.html";
});
document.getElementById("reset-password-btn").addEventListener("click", function(event) {
  event.preventDefault();
  window.location.href = "update-password.html";
});