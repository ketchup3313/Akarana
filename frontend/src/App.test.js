import react from 'react';

import {wrapper} from 'enzyme';


const SubmissionForm = require('./components/SubmissionForm');

test('Indetifies if a DOI string is the correct format', () => {
  expect(3).toBe(3);
  

  expect(wrapper(<SubmissionForm/>).instance().checkDOI()).toBe(true);
});