document.addEventListener("DOMContentLoaded", async function() {
    // Get userId from URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');
  
    // Fetch exam data from the API and populate the select element
    async function populateExams() {
      try {
        const response = await fetch(`http://127.0.0.1:5000/get/esami/${userId}`);
        if (response.ok) {
          const examsData = await response.json();
          const selectElement = document.getElementById("esame");
  
          examsData.forEach(exam => {
            const option = document.createElement("option");
            option.value = exam[0]; // Use the ID as the option value
            option.textContent = exam[1]; // Use the exam name as the visible text
            selectElement.appendChild(option);
          });
        } else {
          console.error("Error fetching exam data");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  
    // Add event listener to the form submission
    document.getElementById("provaForm").addEventListener("submit", async function(event) {
      event.preventDefault();
  
      const form = event.target;
      const formData = new FormData(form);
      const data = {};
      formData.forEach((value, key) => {
        if (key === "opzionale") {
          data[key] = value === "true";
        } else if (key === "appello") {
          // Format the date to "YYYY-MM-DD" before sending to the backend
          const date = new Date(value);
          const formattedDate = date.toISOString().split('T')[0];
          data[key] = formattedDate;
        } else {
          data[key] = value;
        }
      });
  
      try {
        const response = await fetch('http://127.0.0.1:5000/insert/prova', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
  
        if (response.ok) {
          const jsonResponse = await response.json();
          alert("Prova inserted successfully!");
          form.reset();
        } else {
          alert("Error inserting prova");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    });
  
    // Call the function to populate exams when the page loads
    await populateExams();
  });
  