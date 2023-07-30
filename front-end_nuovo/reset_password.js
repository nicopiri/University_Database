// Funzione per reimpostare la password
function resetPassword(event) {
  event.preventDefault(); // Previeni il comportamento predefinito del form (submit)

  // Otteniamo la nuova password dal campo di input
  var newPassword = document.getElementById("new-password").value;

  // Esegui la richiesta al server per reimpostare la password
  fetch('/reset-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ newPassword: newPassword })
  })
    .then(function (response) {
      if (response.ok) {
        // Reset password eseguito con successo, puoi gestire la risposta come desideri
        alert("Richiesta di reimpostazione password inviata. Controlla la tua email per ulteriori istruzioni.");
      } else {
        // Reset password non riuscito, gestisci l'errore come desideri
        alert("Impossibile reimpostare la password. Riprova più tardi.");
      }
    })
    .catch(function (error) {
      // Gestisci gli errori di connessione o altre eccezioni
      console.error('Error:', error);
      alert("Si è verificato un errore. Riprova più tardi.");
    });
}

// Aggiungi l'evento di submit al form di reimpostazione password
document.getElementById("reset-password-form").addEventListener("submit", resetPassword);

