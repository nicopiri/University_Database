document.getElementById("login-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent the form from submitting

  // Get the values from the form
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  // Create the URL with the username and password values
  var url = "http://127.0.0.1:5000/try?id=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password);

  // Send a GET request to the API endpoint
  fetch(url)
    .then(function(response) {
      return response.text();
    })
    .then(function(data) {
      // Handle the response data
      if (data === "Logged in successfully") {
        // Redirect to another page or perform any other action on success
        window.location.href = "dopo_login.html";
      } else {
        // Display error message
        alert("Incorrect password");
      }
    })
    .catch(function(error) {
      console.log("Error:", error);
    });

  // Clear the form fields
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
});


document.getElementById("reset-password-btn").addEventListener("click", function() {
  var username = document.getElementById("username").value;
  
  // Effettua una richiesta al tuo server per reimpostare la password
  // Puoi utilizzare fetch() o un'altra libreria per effettuare richieste HTTP
  
  fetch('/reset-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username: username })
  })
  .then(function(response) {
    if (response.ok) {
      // Reset password eseguito con successo, puoi gestire la risposta come desideri
      alert("Password reset request sent. Check your email for further instructions.");
    } else {
      // Reset password non riuscito, gestisci l'errore come desideri
      alert("Failed to reset password. Please try again later.");
    }
  })
  .catch(function(error) {
    // Gestisci gli errori di connessione o altre eccezioni
    console.error('Error:', error);
    alert("An error occurred. Please try again later.");
  });

// Aggiungi l'evento di submit al form di login
document.getElementById("login-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent the form from submitting

  // Get the values from the form
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  // Create the URL with the username and password values
  var url = "http://127.0.0.1:5000/try?id=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password);

  // Send a GET request to the API endpoint
  fetch(url)
    .then(function(response) {
      return response.text();
    })
    .then(function(data) {
      // Handle the response data
      if (data === "Logged in successfully") {
        // Redirect to another page or perform any other action on success
        window.location.href = "dopo_login.html";
      } else {
        // Display error message
        alert("Incorrect password");
      }
    })
    .catch(function(error) {
      console.log("Error:", error);
    });

  // Clear the form fields
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
});

// Aggiungi l'evento click al pulsante "Reimposta password"
document.getElementById("reset-password-btn").addEventListener("click", function() {
  var username = document.getElementById("username").value;
  resetPassword(username);
});
