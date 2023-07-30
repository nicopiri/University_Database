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
  var exam = new Exam(name, requiredTests);
  // Aggiungi l'esame al sistema o salvalo nel database
  // ...

  return exam;
}

// Creazione di una nuova prova per un esame
function createTest(exam, name, expirationDate) {
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
