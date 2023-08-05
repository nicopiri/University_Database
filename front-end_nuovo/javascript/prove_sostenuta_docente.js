const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');

function displayProveSostenute(data) {
    const provaSostenutaTable = document.getElementById("provaSostenutaTable");
    const tbody = provaSostenutaTable.querySelector("tbody");

    tbody.innerHTML = "";

    data.forEach(item => {
        const row = document.createElement("tr");

        item.forEach((value, index) => {
            const cell = document.createElement("td");
            cell.textContent = value;

            row.appendChild(cell);
        });

        // Add a "Delete" button to the last column
        const deleteButtonCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function() {
            const idProva = item[1]; // Assuming the second value is id_prova
            const idStudente = item[2]; // Assuming the third value is id_studente
            confirmAndDelete(idStudente, idProva);
        });
        deleteButtonCell.appendChild(deleteButton);
        row.appendChild(deleteButtonCell);

        tbody.appendChild(row);
    });
}


function fetchAndDisplayData() {
    const idDocente = userId;
    
    fetch(`http://127.0.0.1:5000/get/prove-sostenute-docente/${idDocente}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayProveSostenute(data);
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}

function confirmAndDelete(idStudente, idProva) {
    const confirmation = confirm("Are you sure you want to delete this entry?");
    if (confirmation) {
        deleteProva(idStudente, idProva);
    }
}

function deleteProva(idStudente, idProva) {
    fetch(`http://127.0.0.1:5000/delete/prova_sostenuta/studente/${idStudente}/${idProva}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Handle the response data if needed
        alert('Data deleted successfully!');
        // Fetch and display the data again after deletion
        fetchAndDisplayData();
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });
}

fetchAndDisplayData();
