'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Enderecos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      cep: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      rua: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      bairro: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      cidade: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      uf: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      numero: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      cnpj: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'Escolas', // Referência à tabela Escolas
          key: 'cnpj', // Chave estrangeira que referencia o CNPJ da tabela Escolas
        },
        onUpdate: 'CASCADE', // Atualiza o CNPJ vinculado automaticamente se for alterado na tabela Escolas
        onDelete: 'CASCADE', // Deleta automaticamente os endereços associados quando uma escola é excluída
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
    await queryInterface.dropTable('Enderecos');
  }
};
