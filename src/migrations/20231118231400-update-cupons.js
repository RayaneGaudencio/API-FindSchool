'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('cupons', 'status', {
      type: Sequelize.ENUM('EXPIRADO', 'UTILIZADO', 'ABERTO'),
      defaultValue: 'ABERTO'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('cupons', 'status');
  }
};
