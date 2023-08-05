const urlParams = new URLSearchParams(window.location.search);
var docenteResponsabile = urlParams.get('id');

async function populateProveTable() {
  try {
    const response = await fetch(`http://127.0.0.1:5000/get/prove/docente/${docenteResponsabile}`);
    const data = await response.json();

    const proveTable = document.getElementById('prove-table');

    data.forEach(prova => {
      const row = proveTable.insertRow();

      prova.forEach(cellData => {
        const cell = row.insertCell();

        if (typeof cellData === 'boolean') {
          cell.textContent = cellData ? 'Si' : 'No';
        } else if (typeof cellData === 'object') {
          cell.textContent = new Date(cellData).toLocaleDateString();
        } else {
          cell.textContent = cellData;
        }
      });

      // Add delete button
      const deleteCell = row.insertCell();
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', async () => {
        const confirmDelete = confirm('Are you sure you want to delete this record?');
        if (confirmDelete) {
          const idProva = prova[1]; // Assuming the second column contains the ID
          await deleteProva(idProva);
          proveTable.deleteRow(row.rowIndex);
        }
      });
      deleteCell.appendChild(deleteButton);
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

async function deleteProva(id_prova) {
  try {
    const deleteResponse = await fetch(`http://127.0.0.1:5000/delete/prova/${id_prova}`, {
      method: 'DELETE'
    });

    if (!deleteResponse.ok) {
      console.error('Delete request failed');
    }
  } catch (error) {
    console.error('Error deleting data:', error);
  }
}

populateProveTable();
