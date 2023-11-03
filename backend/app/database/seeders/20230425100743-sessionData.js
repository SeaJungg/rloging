'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Session', [
      {
        "session_id": 1,
        "imageUrl": "https://example.com/image1.jpg",
        "name": "Sample Session 1",
        "description": "This is a sample session.",
        "location": "Sample Location 1",
        "user_id": 1,
        "launch_date": "2023-01-01T10:00:00",
        "application_fee": 10000,
        "created_at": "2023-01-01T00:00:00",
        "updated_at": "2023-01-01T00:00:00"
      },
      {
        "session_id": 2,
        "imageUrl": "https://example.com/image2.jpg",
        "name": "Sample Session 2",
        "description": "This is another sample session.",
        "location": "Sample Location 2",
        "user_id": 2,
        "launch_date": "2023-02-01T10:00:00",
        "application_fee": 20000,
        "created_at": "2023-02-01T00:00:00",
        "updated_at": "2023-02-01T00:00:00"
      }
    ]
    , {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Session', null, {});
  }
};
