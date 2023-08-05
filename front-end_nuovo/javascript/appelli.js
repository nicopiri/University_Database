const examSelect = document.getElementById("examSelect");
const examTable = document.getElementById("examTable").getElementsByTagName('tbody')[0];

fetch('http://127.0.0.1:5000/get/esami')
    .then(response => response.json())
    .then(data => {
        data.forEach(exam => {
            const option = document.createElement('option');
            option.value = exam[0];
            option.textContent = exam[1];
            examSelect.appendChild(option);
        });
    });

function populateExamProveData(selectedExamId, studentId) {
    fetch(`http://127.0.0.1:5000/get/prove-by-esame/${selectedExamId}/${studentId}`)
        .then(response => response.json())
        .then(data => {
            examTable.innerHTML = "";

            if (data.length === 0) {
                const noProveRow = document.createElement('tr');
                const noProveCell = document.createElement('td');
                noProveCell.textContent = 'Sei iscritto a tutte le prove di questa esame';
                noProveCell.colSpan = 7; // Set the colspan to match the number of columns in the table
                noProveRow.appendChild(noProveCell);
                examTable.appendChild(noProveRow);
            } else {
                data.forEach(prova => {
                    const row = document.createElement('tr');
                    prova.forEach((cellData, index) => {
                        const cell = document.createElement('td');
                        cell.textContent = cellData;
                        row.appendChild(cell);
                    });

                    // Add iscriviti button cell
                    const iscrivitiCell = document.createElement('td');
                    const iscrivitiButton = document.createElement('button');
                    iscrivitiButton.textContent = 'Iscriviti';
                    iscrivitiButton.addEventListener('click', () => {
                        handleIscrivitiButtonClick(prova[0], prova[2], studentId);
                    });
                    iscrivitiCell.appendChild(iscrivitiButton);
                    row.appendChild(iscrivitiCell);

                    examTable.appendChild(row);
                });
            }
        });
}

function handleIscrivitiButtonClick(id_prova, data_appello, id_studente) {
    const confirmMessage = `Sei sicuro che vuoi iscriverti alla prova:  ${id_prova}?`;
    if (confirm(confirmMessage)) {
        const requestData = {
            id_studente: id_studente,
            id_prova: id_prova,
            data_appello: data_appello
            
        };

        fetch('http://127.0.0.1:5000/insert/prova-studente', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert('Iscrito con successo!');
            
            // Refresh the prove data after successful subscription
            populateExamProveData(examSelect.value, id_studente);
        })
        .catch(error => {
            console.error(error);
            alert('Error durante iscriziones.');
        });
    }
}

// Event listener for exam selection
examSelect.addEventListener("change", () => {
    const selectedExamId = examSelect.value;
    const urlParams = new URLSearchParams(window.location.search);
    const studentId = urlParams.get('id');
    
    populateExamProveData(selectedExamId, studentId);
});
