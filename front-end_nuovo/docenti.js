document.addEventListener("DOMContentLoaded", function() {
  const examSuccessMessage = document.getElementById("exam-success-message");
  const testSuccessMessage = document.getElementById("test-success-message");

  // Oggetto Exam per rappresentare un esame
  function Exam(name, requiredTests) {
    this.name = name;
    this.requiredTests = requiredTests;
    this.tests = [];
  }

  // Oggetto Test per rappresentare una prova
  function Test(name, expirationDate, passDate) {
    this.name = name;
    this.expirationDate = expirationDate;
    this.passDate = passDate;
  }

  // Creazione di un nuovo esame
  function createExam(name, requiredTests) {
    // Verifica che i campi siano stati compilati correttamente
    if (!name || requiredTests < 1) {
      return false;
    }

    var exam = new Exam(name, requiredTests);
    // Aggiungi l'esame al sistema o salvalo nel database
    // ...

    return exam;
  }

  // Creazione di una nuova prova per un esame
  function createTest(exam, name, expirationDate) {
    // Verifica che i campi siano stati compilati correttamente
    if (!name || !expirationDate) {
      return false;
    }

    var test = new Test(name, expirationDate, null);
    exam.tests.push(test);
    // Aggiungi la prova all'esame nel sistema o salvala nel database
    // ...

    return test;
  }

  // Superamento di una prova
  function passTest(test) {
    test.passDate = new Date();
    // Aggiorna la data di superamento della prova nel sistema o nel database
    // ...

    invalidatePreviousTests(test);
  }

  // Invalidazione delle prove precedenti
  function invalidatePreviousTests(currentTest) {
    var exam = currentTest.exam;
    var previousTests = exam.tests.filter(function(test) {
      return test.passDate && test.passDate > currentTest.passDate;
    });

    previousTests.forEach(function(test) {
      test.passDate = null;
      // Aggiorna la data di superamento della prova nel sistema o nel database
      // ...
    });
  }

  // Aggiungi un listener per il click del bottone "Crea" all'interno del form "exam-creation-form"
  const createExamBtn = document.getElementById("create-exam-btn");
  createExamBtn.addEventListener("click", function() {
    const examName = document.getElementById("exam-name").value;
    const requiredTests = parseInt(document.getElementById("required-tests").value);
    const exam = createExam(examName, requiredTests);
    if (exam) {
      examSuccessMessage.textContent = "Esame creato con successo!";
    } else {
      examSuccessMessage.textContent = "Errore nella creazione dell'esame. Riprova.";
    }
  });

  // Aggiungi un listener per il click del bottone "Crea" all'interno del form "test-creation-form"
  const createTestBtn = document.getElementById("create-test-btn");
  createTestBtn.addEventListener("click", function() {
    const testName = document.getElementById("test-name").value;
    const expirationDate = document.getElementById("expiration-date").value;
    const test = createTest(testName, expirationDate);
    if (test) {
      testSuccessMessage.textContent = "Prova creata con successo!";
    } else {
      testSuccessMessage.textContent = "Errore nella creazione della prova. Riprova.";
    }
  });
});
