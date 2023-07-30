// Funzione per gestire l'invio del form
document.getElementById('proveForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Ottieni i valori inseriti nei campi del form
    const id = document.getElementById('id').value;
    const appello = document.getElementById('appello').value;
    const tipologia = document.getElementById('tipologia').value;
    const esame = document.getElementById('esame').value;

    // Puoi fare qualcosa con i dati, ad esempio inviarli a un server tramite una richiesta AJAX

    // Esempio di output dei dati nella console
    console.log('ID:', id);
    console.log('Appello:', appello);
    console.log('Tipologia:', tipologia);
    console.log('Esame:', esame);

    // Pulisci i campi del form dopo aver salvato i dati
    document.getElementById('proveForm').reset();
});

