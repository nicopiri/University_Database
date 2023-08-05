const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');
const insertForm = document.getElementById("insertForm");
const resultMessage = document.getElementById("resultMessage");
const provaSelect = document.getElementById("prova");
const studenteInput = document.getElementById("studente");
const checkStudenteButton = document.getElementById("checkStudenteButton");
let flag = false; // Initialize the flag

// Fetch and populate available prove options
fetch(`http://127.0.0.1:5000/get/prove/docente/${userId}`)
    .then(response => response.json())
    .then(data => {
        data.forEach(prova => {
            const option = document.createElement('option');
            option.value = prova[1];
            option.textContent = `${prova[0]} - ${prova[1]}`;
            provaSelect.appendChild(option);
        });
    });

checkStudenteButton.addEventListener("click", async () => {
    const studente = parseInt(studenteInput.value);
    const provaId = provaSelect.value;

    try {
        const responseFromAPI = await fetch(`http://127.0.0.1:5000/get/student-id-from-prova-id/${provaId}`);
        const validStudentIdsFromAPI = await responseFromAPI.json();

        const validStudentIds = validStudentIdsFromAPI.flat();

        if (validStudentIds.includes(studente)) {
            flag = true; // Set the flag to true if student is valid
            alert(`Lo studente con ID ${studente} esiste.`);
        } else {
            const confirmMessage = `Lo studente con ID ${studente} non esiste. Vuoi continuare comunque?`;
            if (!confirm(confirmMessage)) {
                return;
            }
            flag = false; // Set the flag to false if student is not valid
        }
    } catch (error) {
        console.error(error);
        alert("Si è verificato un errore durante il controllo dello studente.");
    }
});

insertForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const studente = studenteInput.value;
    const provaId = provaSelect.value;
    const dataScadenza = document.getElementById("data_scadenza").value;
    const voto = document.getElementById("voto").value;
    const valid = document.getElementById("valid").value;

    try {
        const response = await fetch(`http://127.0.0.1:5000/get/prove/docente/${userId}`);
        const availableProveData = await response.json();
        
        const selectedProva = availableProveData.find(prova => prova[1] === parseInt(provaId));

        if (!selectedProva) {
            alert("Please select a prova.");
            return;
        }

        const requestData = {
            studente: studente,
            prova: provaId,
            data_appello: selectedProva[2],
            data_scadenza: dataScadenza,
            voto: voto,
            valid: valid
        };

        const requestDataShort = {
            studente: studente,
            prova: provaId,
            data_appello: selectedProva[2],
            data_scadenza: dataScadenza,
            voto: voto,
            valid: valid
        };
        let dataToProcess = requestDataShort;
        let apiUrl = 'http://127.0.0.1:5000/insert/prova_sostenuta_short';
        let method = 'POST';

        if (!flag) {
            dataToProcess=requestData;
            apiUrl = 'http://127.0.0.1:5000/insert/prova_sostenuta';
            method = 'POST';
        }

        const responseInsert = await fetch(apiUrl, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToProcess)
        });

        const dataInsert = await responseInsert.json();
        resultMessage.textContent = dataInsert.message || "Data inserted successfully!";
        resultMessage.style.color = "green";
    } catch (error) {
        console.error(error);
        resultMessage.textContent = "An error occurred while inserting data.";
        resultMessage.style.color = "red";
    }
});
