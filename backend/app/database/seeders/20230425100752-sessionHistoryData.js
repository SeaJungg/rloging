'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('SessionHistory', [
      {
        "user_id": 1,
        "session_id": 1,
        "attendance_at": "2022-01-01T10:00:00",
        "is_supporter_dj": true,
        "is_supporter_welcome": false,
        "is_supporter_car": false,
        "created_at": "2022-01-01T00:00:00",
        "updated_at": "2022-01-01T00:00:00"
      },
      {
        "user_id": 2,
        "session_id": 1,
        "attendance_at": "2022-01-01T10:00:00",
        "is_supporter_dj": false,
        "is_supporter_welcome": true,
        "is_supporter_car": false,
        "created_at": "2022-01-01T00:00:00",
        "updated_at": "2022-01-01T00:00:00"
      },
      {
        "user_id": 1,
        "session_id": 2,
        "attendance_at": "2022-02-01T10:00:00",
        "is_supporter_dj": false,
        "is_supporter_welcome": true,
        "is_supporter_car": true,
        "created_at": "2022-02-01T00:00:00",
        "updated_at": "2022-02-01T00:00:00"
      }
    ]    
    , {});
  },


  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('SessionHistory', null, {});
  }
};
