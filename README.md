# University Database
The application is designed for managing university exams. It allows instructors to create exams, each consisting of multiple tests (n ≥ 1). Students can take these tests in various sessions, and each test has a passing date and an expiration date. Once all tests are passed and still valid, students can register their final grade. If a student takes the same test in a later session, the new result replaces the previous one if passed, or marks the previous attempt as a failure if not.

The system provides functionalities to view student status (valid tests passed, test history) and exam sessions (students who passed specific tests). It also allows generating a list of students who are eligible to register their exam but haven't done so yet, showing the tests that make them eligible.

The application supports different test types (e.g., written, oral, project) and evaluation criteria (e.g., pass/fail, weighted grade). It can handle constraints between tests (e.g., project discussion only after passing written exam) and optional or mutually exclusive tests. The system ensures that different instructors can manage different tests without interfering with each other's evaluations, while maintaining overall exam visibility.

