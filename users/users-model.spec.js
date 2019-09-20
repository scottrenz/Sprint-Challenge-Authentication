const Users = require('./usersModel.js');
const db = require('../data/dbConfig.js');

describe('users model', () => {
  beforeEach(async () => {
    await db('users').truncate();
  });

  it('should set environment to testing', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });

  describe('insert()', () => {
    it('should insert users into the db', async () => {
      // insert a record
      await Users.insert({ name: 'Gaffer' });
      await Users.insert({ name: 'Frodo' });

      let users = await db('users');

      // assert the record was inserted
      expect(users).toHaveLength(2);
    });

    it('should insert users into the db', async () => {
      // insert a record
      const [id] = await Users.insert({ name: 'Gaffer' });

      let user = await db('users')
        .where({ id })
        .first();

      // assert the record was inserted
      expect(user.name).toBe('Gaffer');
    });
  });

  describe('remove()', () => {
    it('should delete a user from the db', async () => {
      // delete a record
      // await Users.insert({ name: 'Gaffer' });
      const [id] = await Users.insert({ name: 'Gaffer' });
      await Users.remove(id);
      const [id2] = await Users.insert({ name: 'Frodo' });
      await Users.remove(id2);

      let users = await db('users');

      // assert the record was inserted
      expect(users).toHaveLength(0);
    });

  });


});
