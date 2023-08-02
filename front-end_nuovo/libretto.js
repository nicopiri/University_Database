const urlParams = new URLSearchParams(window.location.search);
var studentId = urlParams.get('id');
const API_URL = `http://127.0.0.1:5000/get/libretto/${studentId}`; // Update the API URL accordingly
const ENTRIES_PER_PAGE = 5; // Number of entries per page

let currentPage = 1;
let librettoData = [];

async function fetchLibrettoData() {
  try {
    const response = await fetch(API_URL);
    librettoData = await response.json();
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
  const proveTable = document.getElementById('prove-table');
  proveTable.innerHTML = ''; // Clear the table
  
  // Add column headers
  const headerRow = proveTable.insertRow();
  const columnHeaders = ["Esame", "Data Superamento", "Esito"];
  for (const headerText of columnHeaders) {
    const headerCell = headerRow.insertCell();
    headerCell.textContent = headerText;
  }

  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;

  for (let i = startIndex; i < endIndex && i < librettoData.length; i++) {
    const row = proveTable.insertRow();
    const rowData = librettoData[i];

    for (const cellData of rowData) {
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
  nextPageButton.disabled = currentPage >= Math.ceil(librettoData.length / ENTRIES_PER_PAGE);
}

document.getElementById('prev-page-btn').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    updateTable();
  }
});

document.getElementById('next-page-btn').addEventListener('click', () => {
  const maxPage = Math.ceil(librettoData.length / ENTRIES_PER_PAGE);
  if (currentPage < maxPage) {
    currentPage++;
    updateTable();
  }
});

fetchLibrettoData();
