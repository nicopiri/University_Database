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
        window.location.href = 'dopo_login.html';
      } else if(data === 'Docente') {
        window.location.href = 'docenti.html';
      }else {
        console.log('Incorrect Password');
      }
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
});
