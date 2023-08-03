const urlParams = new URLSearchParams(window.location.search);
var studentId = urlParams.get('id');

async function populateProveTable() {
  try {
    const response = await fetch(`http://127.0.0.1:5000/get/prove_valide/${studentId}`);
    const data = await response.json();
  
    const proveTable = document.getElementById('prove-table');
    const examOccurrences = {}; // To store the occurrences of each exam name
  
    data.forEach(prova => {
      const examName = prova[0];
      if (examOccurrences[examName] === undefined) {
        examOccurrences[examName] = 1;
      } else {
        examOccurrences[examName]++;
      }
  
      const row = proveTable.insertRow();
      const cell = row.insertCell();
      cell.textContent = `${examName} ${examOccurrences[examName]}`;
  
      for (let i = 2; i < prova.length; i++) {
        const cellData = prova[i];
        const cell = row.insertCell();
  
        if (typeof cellData === 'boolean') {
          cell.textContent = cellData ? 'Si' : 'No';
        } else if (typeof cellData === 'object') {
          cell.textContent = new Date(cellData).toLocaleDateString();
        } else {
          cell.textContent = cellData;
        }
      }
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

populateProveTable();
