'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('User', [
      {
        "user_id": 1,
        "created_at": "2023-04-24T13:45:00",
        "updated_at": "2023-04-24T13:45:00",
        "email": "user1@example.com",
        "oauth_id": "user1oauthid",
        "oauth_provider": "kakao",
        "user_name" : "정세아6337",
        "phone" : "01047686337"
      },
      {
        "user_id": 2,
        "created_at": "2023-04-24T13:46:00",
        "updated_at": "2023-04-24T13:46:00",
        "email": "user2@example.com",
        "oauth_id": "user2oauthid",
        "oauth_provider": "kakao",
        "user_name" : "정유진6337",
        "phone" : "01012346337"
      },
      {
        "user_id": 3,
        "created_at": "2023-04-24T13:46:00",
        "updated_at": "2023-04-24T13:46:00",
        "email": "user3@example.com",
        "oauth_id": "user3oauthid",
        "oauth_provider": "kakao",
        "user_name" : "강경훈6337",
        "phone" : "01056786337"
      }]
    , { updateOnDuplicate: true });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('User', null, {});
  }
};
