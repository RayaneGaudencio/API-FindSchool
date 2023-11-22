'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cupons', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      codigo_cupom: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      usuario_cpf: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'usuarios',
          key: 'cpf',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      escola_cnpj: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'escolas',
          key: 'cnpj',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      desconto_matricula_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'desconto_matricula',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('cupons');
  }
};
