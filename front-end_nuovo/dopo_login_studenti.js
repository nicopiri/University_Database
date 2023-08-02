const urlParams = new URLSearchParams(window.location.search);
const studentId = urlParams.get('id');

// Fetch student data and populate the HTML
function fetchAndPopulateStudentData(studentId) {
  return fetch(`http://127.0.0.1:5000/get/utente/${studentId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(studentData => {
      populateStudentData(studentData);
    })
    .catch(error => {
      console.error('Error fetching student data:', error);
    });
}

// Populate student data
function populateStudentData(studentData) {
  const menuContainer = document.getElementById("menu-container");
  menuContainer.innerHTML = '';

  const studentInfoList = document.createElement("ul");
  studentInfoList.classList.add("student-info");

  const studentProperties = [
    "Student ID",
    "Nome",
    "Cognome",
    "CF",
    "LuogoNascita",
    "DataNascita",
    "DataImmatricolazione",
  ];

  for (let i = 0; i < studentProperties.length; i++) {
    const listItem = document.createElement("li");
    listItem.innerHTML = `<strong>${studentProperties[i]}:</strong> ${studentData[i]}`;
    studentInfoList.appendChild(listItem);
  }

  menuContainer.appendChild(studentInfoList);
}

document.getElementById("prove_sostenute-btn").addEventListener("click", function (event) {
  event.preventDefault();
  window.location.href = `prove.html?id=${studentId}`;
});

document.getElementById("libretto-btn").addEventListener("click", function (event) {
  event.preventDefault();
  window.location.href = `libretto.html?id=${studentId}`;
});

document.getElementById("storico-prove-btn").addEventListener("click", function (event) {
  event.preventDefault();
  window.location.href = `prova_sostenuta.html?id=${studentId}`;
});

document.getElementById("cambio-password-btn").addEventListener("click", function (event) {
  event.preventDefault();
  window.location.href = `reset_password.html?id=${studentId}`;
});

document.getElementById("logout-btn").addEventListener("click", function (event) {
  event.preventDefault();
  window.location.href = "login.html";
});

if (studentId) {
  fetchAndPopulateStudentData(studentId);
}
