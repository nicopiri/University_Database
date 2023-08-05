document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    var docenteResponsabile = urlParams.get('id');
  
    async function populateEsamiRegistratiTable() {
      try {
        const response = await fetch(`http://127.0.0.1:5000/get/esami_registrati/${docenteResponsabile}`);
        const data = await response.json();
      
        const esamiTable = document.getElementById('esami-table').getElementsByTagName('tbody')[0];
        
        esamiTable.innerHTML = '';
  
        data.forEach(esame => {
          const row = esamiTable.insertRow();
  
          const idEsameCell = row.insertCell();
          idEsameCell.textContent = esame[0];
  
          const nomeEsameCell = row.insertCell();
          nomeEsameCell.textContent = esame[1];
  
          const idStudenteCell = row.insertCell();
          idStudenteCell.textContent = esame[2];
  
          const nomeStudenteCell = row.insertCell();
          nomeStudenteCell.textContent = esame[3];
  
          const cognomeStudenteCell = row.insertCell();
          cognomeStudenteCell.textContent = esame[4];
  
          const votoCell = row.insertCell();
          votoCell.textContent = esame[5];
  
          const dataCell = row.insertCell();
          const fullDate = new Date(esame[6]);
          const dateOnly = fullDate.toISOString().substring(0, 10);
          dataCell.textContent = dateOnly;
  
          const deleteCell = row.insertCell();
          const deleteButton = document.createElement("button");
          deleteButton.textContent = "Delete";
          deleteButton.addEventListener("click", function() {
            const confirmDelete = window.confirm("Sei sicuro di voler cancellare il dato?");
            if (confirmDelete) {
              deleteEsameRegistrato(esame[0], esame[2]);
            }
          });
          deleteCell.appendChild(deleteButton);
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    
    async function deleteEsameRegistrato(idEsame, idUtente) {
      try {
        const response = await fetch(`http://127.0.0.1:5000/delete/esami_registrati/${idEsame}/${idUtente}`, {
          method: 'DELETE'
        });
        const result = await response.json();
        console.log(result); 
        
        populateEsamiRegistratiTable();
      } catch (error) {
        console.error('Error deleting data:', error);
      }
    }
    
    populateEsamiRegistratiTable();
  });
  