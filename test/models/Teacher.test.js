require('dotenv').config();
require('../../lib/utils/connect')();
const mongoose = require('mongoose');
const Teacher = require('../../lib/models/Teacher');

describe('Teacher', () => {
  beforeEach(done => {
    return mongoose.connection.dropDatabase(() => {
      done();
    });
  });
  afterAll(done => {
    mongoose.connection.close();
    done();
  });
  it('validates a good model', () => {
    const teacher = new Teacher({
      username: 'martypdx'
    });
    expect(teacher.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      username: 'martypdx'
    });
  });
  it('requires a username', () => {
    const teacher = new Teacher({});
    const errors = teacher.validateSync().errors;
    expect(errors).toBeDefined();
    expect(errors.username.message).toEqual('Username required');
  });
});
