const urlParams = new URLSearchParams(window.location.search);
var studentId = urlParams.get('id');
const API_URL = `http://127.0.0.1:5000/get/storico_prove/${studentId}`; // Update the API URL accordingly
const ENTRIES_PER_PAGE = 5; // Number of entries per page

let currentPage = 1;
let proveSostenuteData = [];

async function fetchProveSostenuteData() {
  try {
    const response = await fetch(API_URL);
    proveSostenuteData = await response.json();
    updateTable();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

let entriesPerPage = parseInt(document.getElementById('entries-per-page').value);

document.getElementById('entries-per-page').addEventListener('change', (event) => {
  entriesPerPage = parseInt(event.target.value);
  currentPage = 1; // Reset to the first page
  updateTable();
});

function updateTable() {
  const proveSostenuteTable = document.getElementById('prove-sostenute-table');
  proveSostenuteTable.innerHTML = ''; // Clear the table

  // Add column headers
  const headerRow = proveSostenuteTable.insertRow();
  const columnHeaders = ["Prova ID", "Data Superamento", "Esito", "Data Valutazione", "Voto", "Valutazione"];
  for (const headerText of columnHeaders) {
    const headerCell = headerRow.insertCell();
    headerCell.textContent = headerText;
  }

  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;

  let examOccurrences = {}; // To store the occurrences of each exam name

  for (let i = startIndex; i < endIndex && i < proveSostenuteData.length; i++) {
    const row = proveSostenuteTable.insertRow();
    const rowData = proveSostenuteData[i];

    // Construct exam name with incremental number
    const examName = rowData[0];

    if (examOccurrences[examName] === undefined) {
      examOccurrences[examName] = 1;
    } else {
      examOccurrences[examName]++;
    }

    const examNumber = examOccurrences[examName];
    const examNameWithNumber = `${examName} ${examNumber}`;
    const cell = row.insertCell();
    cell.textContent = examNameWithNumber;

    // Insert rest of the data from the third value onward
    for (let j = 2; j < rowData.length; j++) {
      const cellData = rowData[j];
      const cell = row.insertCell();

      if (typeof cellData === 'boolean') {
        cell.textContent = cellData ? 'Pass' : 'Fail';
      } else if (typeof cellData === 'object') {
        cell.textContent = new Date(cellData).toLocaleDateString();
      } else {
        cell.textContent = cellData;
      }
    }
  }

  updatePaginationButtons();
}


function updatePaginationButtons() {
  const prevPageButton = document.getElementById('prev-page-btn');
  const nextPageButton = document.getElementById('next-page-btn');

  prevPageButton.disabled = currentPage === 1;
  nextPageButton.disabled = currentPage >= Math.ceil(proveSostenuteData.length / ENTRIES_PER_PAGE);
}

document.getElementById('prev-page-btn').addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      updateTable();
    }
  });
  
  document.getElementById('next-page-btn').addEventListener('click', () => {
    const maxPage = Math.ceil(proveSostenuteData.length / entriesPerPage);
    if (currentPage < maxPage) {
      currentPage++;
      updateTable();
    }
  });
  
  fetchProveSostenuteData();
