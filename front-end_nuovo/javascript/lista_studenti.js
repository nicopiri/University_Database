const urlParams = new URLSearchParams(window.location.search);
var docenteResponsabile = urlParams.get('id');

const chooseProvaForm = document.getElementById('choose-prova-form');
const provaSelect = document.getElementById('prova-select');
const studentsTable = document.getElementById('students-table');

async function populateProvaOptions() {
    try {
      const response = await fetch(`http://127.0.0.1:5000/get/prove/docente/${docenteResponsabile}`);
      const data = await response.json();
  
      data.forEach(prova => {
        const option = document.createElement('option');
        option.value = prova[1]; // Assuming prova[1] contains the ID
        option.textContent = `${prova[1]} - ${prova[0]}`; // Display both ID and name
        provaSelect.appendChild(option);
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

async function displayStudentsByProva(id_prova) {
  try {
    const response = await fetch(`http://127.0.0.1:5000/get/students_by_prova_superata/${id_prova}`);
    const data = await response.json();

    studentsTable.innerHTML = '<tr><th>ID Studente</th><th>Nome</th><th>Cognome</th></tr>';

    data.forEach(student => {
      const row = studentsTable.insertRow();
      student.forEach(cellData => {
        const cell = row.insertCell();
        cell.textContent = cellData;
      });
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

chooseProvaForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const selectedProvaId = provaSelect.value;
  displayStudentsByProva(selectedProvaId);
});

populateProvaOptions();
