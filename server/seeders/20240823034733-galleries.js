'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add seed commands here.

    //Example:
    await queryInterface.bulkInsert(
      'Galleries',
      [
        {
          title: 'test seeds',
          author: 'John Doe',
          file_name: '/gallery/1724002609838.png',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          title: 'test seeds 2',
          author: 'Tony Joss',
          file_name: '/gallery/1724206313312.png',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    // * Add commands to revert seed here.

    // Example:
    await queryInterface.bulkDelete('Galleries', null, {});
  },
};
