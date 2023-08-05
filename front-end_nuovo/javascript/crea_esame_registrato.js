const urlParams = new URLSearchParams(window.location.search);
const docenteResponsabile = urlParams.get('id');

document.addEventListener("DOMContentLoaded", async function() {
  const insertForm = document.getElementById("insert-form");

  // Populate the exam select element
  const esameSelectElement = document.getElementById("id_esame");
  try {
    const response = await fetch(`http://127.0.0.1:5000/get/esami/${docenteResponsabile}`);
    if (response.ok) {
      const examsData = await response.json();
      examsData.forEach(exam => {
        const option = document.createElement("option");
        option.value = exam[0]; // Use the ID as the option value
        option.textContent = exam[1]; // Use the exam name as the visible text
        esameSelectElement.appendChild(option);
      });
    } else {
      console.error("Error fetching exam data");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }

  // Populate the student select element
  const studenteSelectElement = document.getElementById("id_studente");
  esameSelectElement.addEventListener("change", async function() {
    // Clear any existing options
    studenteSelectElement.innerHTML = "";

    const selectedExamId = esameSelectElement.value;
    try {
      const response = await fetch(`http://127.0.0.1:5000/get/studenti_registrabili/${selectedExamId}`);
      if (response.ok) {
        const studentsData = await response.json();
        studentsData.forEach(student => {
          const option = document.createElement("option");
          option.value = student[0]; // Use the ID as the option value
          option.textContent = `${student[0]} : ${student[1]} ${student[2]}`; // Use the student name as the visible text
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

