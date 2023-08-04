const urlParams = new URLSearchParams(window.location.search);
var docenteResponsabile = urlParams.get('id');

document.addEventListener("DOMContentLoaded", function() {
    const insertForm = document.getElementById("insert-form");
  
    insertForm.addEventListener("submit", async function(event) {
      event.preventDefault();
  
      const idEsame = document.getElementById("id_esame").value;
      const idStudente = document.getElementById("id_studente").value;
      const voto = document.getElementById("voto").value;
  
      const data = {
        id_esame: idEsame,
        id_utente: idStudente,
        voto: voto
      };
  
      try {
        const response = await fetch("http://127.0.0.1:5000/insert/esame-registrato", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });
  
        if (response.ok) {
          const jsonResponse = await response.json();
          alert("Voto inserito con successo!");
          form.reset();
        } else {
          alert("Error inserting esame");
        }
      } catch (error) {
        console.error("Error inserting data:", error);
      }
    });
  });
  