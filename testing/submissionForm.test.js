const SubmissionForm = require('./components/SubmissionForm');

test('Indetifies if a DOI string is the correct format', () => {
  expect(SubmissionForm.checkDOI()).toBe(true);
});