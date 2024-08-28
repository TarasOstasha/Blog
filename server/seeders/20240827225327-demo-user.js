'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Generate hashed passwords for demo users
    const hashedPassword1 = await bcrypt.hash('password123', 10);
    const hashedPassword2 = await bcrypt.hash('secret456', 10);
    const hashedPassword3 = await bcrypt.hash('admin789', 10);

    return queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'John Doe',
          email: 'john.doe@example.com',
          password: hashedPassword1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Jane Smith',
          email: 'jane.smith@example.com',
          password: hashedPassword2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Admin User',
          email: 'admin@example.com',
          password: hashedPassword3,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
