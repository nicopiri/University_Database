const urlParams = new URLSearchParams(window.location.search);
var docenteResponsabile = urlParams.get('id');

async function deleteEsame(id) {
  try {
    const confirmDelete = window.confirm("Are you sure you want to delete this?");
    if (!confirmDelete) {
      return;
    }

    const response = await fetch(`http://127.0.0.1:5000/delete/esame/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      const esamiTable = document.getElementById('esami-table').getElementsByTagName('tbody')[0];
      esamiTable.innerHTML = ''; 
      populateEsamiTable();
    } else {
      console.error('Error deleting esame:', response.statusText);
    }
  } catch (error) {
    console.error('Error deleting esame:', error);
  }
}

async function populateEsamiTable() {
  try {
    const response = await fetch(`http://127.0.0.1:5000/get/esami/${docenteResponsabile}`);
    const data = await response.json();
  
    const esamiTable = document.getElementById('esami-table').getElementsByTagName('tbody')[0];
    
    data.forEach(esame => {
      const row = esamiTable.insertRow();

      const idCell = row.insertCell();
      idCell.textContent = esame[0];

      const nomeEsameCell = row.insertCell();
      nomeEsameCell.textContent = esame[1];

      const descrizioneCell = row.insertCell();
      descrizioneCell.textContent = esame[2];
      
      const minProveCell = row.insertCell();
      minProveCell.textContent = esame[3];

      const maxProveCell = row.insertCell();
      maxProveCell.textContent = esame[4];

      const deleteCell = row.insertCell();
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => {
        deleteEsame(esame[0]);
      });
      deleteCell.appendChild(deleteButton);
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

populateEsamiTable();
