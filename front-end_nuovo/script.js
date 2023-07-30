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
  

  // Effettua una richiesta POST al server con i dati del form
  fetch("/reset-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formDataObject),
  })
    .then((response) => response.json())
    .then((data) => {
      // Esegui azioni in base alla risposta del server
      console.log(data);
      // Se l'autenticazione è riuscita, puoi reindirizzare l'utente a un'altra pagina, ad esempio, "dashboard.html"
      // window.location.href = "dashboard.html";
    })
    .catch((error) => console.error("Errore durante la richiesta al server:", error));
});

document.getElementById("reset-password-btn").addEventListener("click", function () {
  // Reindirizza l'utente alla pagina "reimposta_password.html"
  window.location.href = "reimposta_password.html";
});
