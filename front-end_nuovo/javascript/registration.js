document.getElementById("registration-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting
  
    var userId;
    var nome = document.getElementById("nome").value;
    var cognome = document.getElementById("cognome").value;
    var cf = document.getElementById("cf").value;
    var luogo = document.getElementById("luogo").value;
    var nascita = document.getElementById("nascita").value;
  
    var registrationData = {
      nome: nome,
      cognome: cognome,
      cf: cf,
      luogo: luogo,
      nascita: nascita
    };
  
    fetch('http://127.0.0.1:5000/insert/utente', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(registrationData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(data => {
      if (data.includes("Data inserted successfully!")) {
        userId = parseInt(data.split("ID: ")[1], 10); // Store the extracted ID
        showUserId(userId);
        redirectToSetPassword(userId); // Pass userId to the function
      } else {
        showErrorMessage('Registration failed.');
      }
    })
    .catch(error => {
      console.error('Fetch error:', error);
      // Handle registration errors
    });
  });
  
  function showUserId(id) {
    var userIdSpan = document.getElementById('user-id');
    userIdSpan.textContent = id;
  
    var resultContainer = document.getElementById('result-container');
    resultContainer.style.display = 'block';
  }
  
  function showErrorMessage(message) {
    var errorDiv = document.getElementById('error-message');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
  }
  
  function redirectToSetPassword(userId) {
    window.location.href = `set-password.html?id=${userId}`;
  }
  