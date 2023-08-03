const urlParams = new URLSearchParams(window.location.search);
var studentId = urlParams.get('id');
async function populateProveTable() {
    try {
      const response = await fetch(`http://127.0.0.1:5000/get/prove_valide/${studentId}`); // Update with your API URL
      const data = await response.json();
  
      const proveTable = document.getElementById('prove-table');
  

  
      // Loop through the data and create table rows dynamically
      data.forEach(prova => {
        const row = proveTable.insertRow();
  
        for (const cellData of prova) {
          const cell = row.insertCell();
          if (typeof cellData === 'boolean') {
            cell.textContent = cellData ? 'Yes' : 'No';
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
  
  // Call the function to populate the table when the page loads
  populateProveTable();
  