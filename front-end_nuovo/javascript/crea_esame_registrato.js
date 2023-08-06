const urlParams = new URLSearchParams(window.location.search);
const docenteResponsabile = urlParams.get('id');

document.addEventListener("DOMContentLoaded", async function() {
  const insertForm = document.getElementById("insert-form");
  const esameSelectElement = document.getElementById("id_esame");
  const studenteSelectElement = document.getElementById("id_studente");
  const checkButton = document.getElementById("check-button");

  // Populate the exam select element
  try {
    const response = await fetch(`http://127.0.0.1:5000/get/esami/${docenteResponsabile}`);
    if (response.ok) {
      const examsData = await response.json();
      examsData.forEach(exam => {
        const option = document.createElement("option");
        option.value = exam[0];
        option.textContent = exam[1];
        esameSelectElement.appendChild(option);
      });
    } else {
      console.error("Error fetching exam data");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }

  checkButton.addEventListener("click", async function() {
    studenteSelectElement.innerHTML = "";

    const selectedExamId = esameSelectElement.value;
    try {
      const response = await fetch(`http://127.0.0.1:5000/get/studenti_registrabili/${selectedExamId}`);
      if (response.ok) {
        const studentsData = await response.json();
        studentsData.forEach(student => {
          const option = document.createElement("option");
          option.value = student[0];
          option.textContent = `${student[0]} : ${student[1]} ${student[2]}`;
          studenteSelectElement.appendChild(option);
        });
      } else {
        console.error("Error fetching student data");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  });

  insertForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const idEsame = esameSelectElement.value;
    const idStudente = studenteSelectElement.value;
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
        alert("Voto inserito con successo!");
        insertForm.reset();
      } else {
        alert("Error inserting esame");
      }
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  });
});

