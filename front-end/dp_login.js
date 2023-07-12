document.getElementById("menu-dropdown").addEventListener("change", function(event) {
  var selectedOption = event.target.value;
  var contentContainer = document.getElementById("content-container");

  // Pulisci il contenuto precedente
  contentContainer.innerHTML = "";

  // Aggiungi il contenuto in base alla voce del menu selezionata
  switch (selectedOption) {
    case "dati-personali":
      contentContainer.innerHTML = "<h3>Dati personali</h3><p>Contenuto dei dati personali...</p>";
      break;
    case "ammissione-immatricolazione":
      contentContainer.innerHTML = "<h3>Ammissione e immatricolazione</h3><p>Contenuto dell'ammissione e immatricolazione...</p>";
      break;
    case "carriera":
      contentContainer.innerHTML = "<h3>Carriera</h3><p>Contenuto della carriera...</p>";
      break;
    case "tasse":
      contentContainer.innerHTML = "<h3>Tasse</h3><p>Contenuto delle tasse...</p>";
      break;
    case "piano-di-studio":
      contentContainer.innerHTML = "<h3>Piano di studio</h3><p>Contenuto del piano di studio...</p>";
      break;
    case "esami":
      contentContainer.innerHTML = "<h3>Esami</h3><p>Contenuto degli esami...</p>";
      break;
    case "libretto":
      contentContainer.innerHTML = "<h3>Libretto</h3><p>Contenuto del libretto...</p>";
      break;
    default:
      break;
  }
});
