'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('desconto_matricula', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      admin_cpf: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'admins', 
          key: 'cpf',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      escola_cnpj: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'escolas',
          key: 'cnpj',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      porcentagem_desconto: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      data_inicio: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      data_expiracao: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('desconto_matricula');
  }
};
