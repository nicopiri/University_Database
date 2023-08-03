document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');
    
    const esameForm = document.getElementById("esameForm");
  
    esameForm.addEventListener("submit", async function(event) {
      event.preventDefault();
  
      const form = event.target;
      const formData = new FormData(form);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });
      
      data.docente = userId;
  
      const response = await fetch('http://127.0.0.1:5000/insert/esame', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      if (response.ok) {
        const jsonResponse = await response.json();
        alert("Esame inserted successfully!");
        form.reset();
      } else {
        alert("Error inserting esame");
      }
    });
  });
  