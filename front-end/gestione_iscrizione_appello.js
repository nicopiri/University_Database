// Dati di esempio per gli appelli
var exams = [
  {
    name: "Esame di Matematica",
    code: "MAT-101",
    date: "2023-08-15"
  },
  {
    name: "Esame di Informatica",
    code: "INF-201",
    date: "2023-08-20"
  },
  // Aggiungi altri appelli se necessario
];

// Funzione per generare le opzioni degli appelli nel menu a tendina
function generateExamOptions() {
  var examSelect = document.getElementById("exam-select");

  exams.forEach(function(exam) {
    var option = document.createElement("option");
    option.value = exam.code;
    option.text = "Materia: " + exam.name + " - Data: " + exam.date;
    examSelect.appendChild(option);
  });
}

// Chiamata alla funzione per generare le opzioni degli appelli
generateExamOptions();
