const mongoose = require('mongoose');
const { getTeacher } = require('../dataHelpers');
const Cohort = require('../../lib/models/Cohort');

describe('Cohort', () => {
  it('validates a good model', async() => {
    const teacher = await getTeacher();
    const cohort = new Cohort({
      teacher: teacher._id,
      stress: 0,
      sleep: 100,
      knowledge: 25
    });
    expect(cohort.toJSON()).toEqual({ stress: 0,
      sleep: 100,
      knowledge: 25,
      _id: expect.any(mongoose.Types.ObjectId),
      teacher: expect.any(mongoose.Types.ObjectId) });
  });
});
