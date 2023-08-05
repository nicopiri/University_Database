const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');

// Function to display data in the table
function displayProveGestite(data) {
    const provaTable = document.getElementById("provaTable");
    const tbody = provaTable.querySelector("tbody");

    // Clear the previous data
    tbody.innerHTML = "";

    data.forEach(item => {
        const row = document.createElement("tr");

        // Assuming the order is: provaId, data, tipo, ricaduta, opzionale (excluding the last value)
        for (let i = 0; i < item.length - 1; i++) {
            const cell = document.createElement("td");
            cell.textContent = item[i];
            row.appendChild(cell);
        }

        // Create a "Delete" button for each row
        const deleteButtonCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function() {
            deleteProva(item[0]); // Assuming the first value is provaId
        });
        deleteButtonCell.appendChild(deleteButton);
        row.appendChild(deleteButtonCell);

        tbody.appendChild(row);
    });
}

// Function to delete a prova
function deleteProva(provaId) {
    fetch(`http://127.0.0.1:5000/delete/prova_gestita/docente/${userId}/${provaId}`, {
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

// Function to fetch and display data
function fetchAndDisplayData() {
    fetch(`http://127.0.0.1:5000/get/prove_gestite/${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayProveGestite(data);
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}
// Insert data when the form is submitted
document.getElementById("insertForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var prova = document.getElementById("prova").value;

    var insertData = {
        docente: userId,
        prova: prova
    };

    fetch('http://127.0.0.1:5000/insert/prova_gestita', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(insertData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Handle the response data if needed
            alert('Data inserted successfully!');
            // Fetch and display the data again after insertion
            fetchAndDisplayData();
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
});

// Call the fetchAndDisplayData function when the page loads initially
fetchAndDisplayData();
