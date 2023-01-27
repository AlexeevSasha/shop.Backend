'use strict';
const bcrypt = require('bcryptjs');

const makePassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const password = await makePassword('1234');
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          id: '7c19c724-4831-4e73-a94f-352a24f504f7',
          role: 'admin',
          firstname: 'Alex',
          lastname: 'Hordend',
          email: 'alex993sasha@gmail.com',
          phone: null,
          password,
          blocked: false,
          favorites: '{}',
          refreshToken: null,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
