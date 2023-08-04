document.addEventListener("DOMContentLoaded", function() {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get('id');

  const provaBtn = document.getElementById("provaBtn");
  const creaProvaBtn = document.getElementById("creaProvaBtn");
  const creaEsameBtn = document.getElementById("creaEsameBtn");
  const proveSostenuteBtn = document.getElementById("proveSostenuteBtn");
  const esamiBtn = document.getElementById("esamiBtn");
  const updatePasswordBtn = document.getElementById("updatePasswordBtn");
  const logOutBtn = document.getElementById("logoutBtn");
  const creaEsameRegistratiBtn = document.getElementById("creaEsameRegistratiBtn");
  const esamiRegistratiBtn = document.getElementById("esamiRegistratiBtn");

  provaBtn.addEventListener("click", function() {
    redirectToPage("lista_appelli.html");
  });

  creaProvaBtn.addEventListener("click", function() {
    redirectToPage("crea_prova.html");
  });

  creaEsameBtn.addEventListener("click", function() {
    redirectToPage("crea_esame.html");
  });

  proveSostenuteBtn.addEventListener("click", function() {
    redirectToPage("prova_sostenuta.html");
  });

  esamiBtn.addEventListener("click", function() {
    redirectToPage("esami.html");
  });

  updatePasswordBtn.addEventListener("click", function() {
    redirectToPage("reset_password.html");
  });

  logOutBtn.addEventListener("click", function(){
    redirectToPage("login.html");
  });

  creaEsameRegistratiBtn.addEventListener("click", function(){
    redirectToPage("crea_esame_registrato.html");
  });
  
  esamiRegistratiBtn.addEventListener("click", function(){
    redirectToPage("esame_registrato.html")
  });
  // Fetch and populate student data
  fetchAndPopulateStudentData(userId);

  function redirectToPage(page) {
    window.location.href = `${page}?id=${userId}`;
  }

  function fetchAndPopulateStudentData(userId) {
    return fetch(`http://127.0.0.1:5000/get/utente/${userId}`)
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
    menuContainer.innerHTML = '';

    const studentInfoList = document.createElement("ul");
    studentInfoList.classList.add("student-info");

    const studentProperties = [
      "ID",
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
});
