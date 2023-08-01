// Get the student id from the URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const studentId = urlParams.get('id');

// Function to fetch student data and populate the HTML
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

function populateStudentData(studentData) {
  const menuContainer = document.getElementById("menu-container");
  menuContainer.innerHTML = ''; // Clear the container before adding new data

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




// Listen to button clicks and navigate to other pages
document.getElementById("prove-btn").addEventListener("click", function (event) {
  event.preventDefault();
  window.location.href = `prove.html?id=${studentId}`;
});

document.getElementById("cambio-password-btn").addEventListener("click", function (event) {
  event.preventDefault();
  window.location.href = `reset_password.html?id=${studentId}`;
});

document.getElementById("logout-btn").addEventListener("click", function (event) {
  event.preventDefault();
  window.location.href = "login.html";
});

// Check if studentId is available
if (studentId) {
  // Fetch student data and populate the HTML
  fetchAndPopulateStudentData(studentId);
}