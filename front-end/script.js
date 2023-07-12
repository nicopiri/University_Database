document.getElementById("login-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent the form from submitting

  // Get the values from the form
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  // Perform your login logic here (e.g., send a request to the server)

  // For this example, simply display the entered username and password in the console
  console.log("Username: " + username);
  console.log("Password: " + password);

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
});
