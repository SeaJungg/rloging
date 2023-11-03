'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('User', 'user_name', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('User', 'phone', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('User', 'name');
    await queryInterface.removeColumn('User', 'phone');
  }
};