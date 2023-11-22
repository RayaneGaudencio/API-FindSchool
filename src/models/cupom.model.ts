const { DataTypes, Model } = require('sequelize');
import sequelize from '../config/dtabase';

class Cupom extends Model {
    public id!: number;
    public usuario_cpf!: string;
    public escola_cnpj!: string;
    public desconto_matricula_id!: number;
    public codigo_cupom!: string;
    public status!: string;
    public validade!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Cupom.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    codigo_cupom: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    usuario_cpf: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    escola_cnpj: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desconto_matricula_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('ABERTO', 'UTILIZADO', 'EXPIRADO'),
      allowNull: false
    }, 
    validade: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Cupom',
    timestamps: true,
    tableName: 'cupons', 
  }
);

export default Cupom;