document.getElementById("reset-password-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent the form from submitting

  // Get the values from the form
  var oldPassword = document.getElementById("old-password").value;
  var newPassword = document.getElementById("new-password").value;
  var confirmNewPassword = document.getElementById("confirm-new-password").value;

  // Assuming you have the student id from the URL query parameter
  const urlParams = new URLSearchParams(window.location.search);
  var studentId = urlParams.get('id');

  // Validate if the new password and confirm password match
  if (newPassword !== confirmNewPassword) {
    alert("New password and confirm password do not match.");
    return;
  }

  var resetPasswordData = {
    id: studentId,
    nuova_password: newPassword,
    vecchia_password: oldPassword
  };

  fetch('http://127.0.0.1:5000/update/password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(resetPasswordData)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(data => {
      console.log(data); // Password update success message, if any
      if (data === "Password Updated") {
        alert("Password aggiornato con successo");
      } else {
        alert("An error occurred while updating the password.");
      }
    })
    .catch(error => {
      console.error('Fetch error:', error);
      alert("An error occurred while updating the password.");
    });
});
