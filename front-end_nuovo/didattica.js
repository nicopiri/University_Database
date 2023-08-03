const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');

document.addEventListener("DOMContentLoaded", function() {
  const provaBtn = document.getElementById("provaBtn");
  const creaProvaBtn = document.getElementById("creaProvaBtn");
  const creaEsameBtn = document.getElementById("creaEsameBtn");
  const proveSostenuteBtn = document.getElementById("proveSostenuteBtn");
  const esamiRegistratiBtn = document.getElementById("esamiRegistratiBtn");
  const updatePasswordBtn = document.getElementById("updatePasswordBtn"); // Get the button

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

  esamiRegistratiBtn.addEventListener("click", function() {
    redirectToPage("esame_registrato.html");
  });

  updatePasswordBtn.addEventListener("click", function() {
    redirectToPage("reset_password.html"); // Redirect to reset_password.html
  });

  function redirectToPage(page) {
    window.location.href = `${page}?id=${userId}`;
  }
});
