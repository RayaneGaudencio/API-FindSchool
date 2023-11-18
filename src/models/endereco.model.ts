import { DataTypes, Model } from "sequelize";
import sequelize from '../config/dtabase';

class Endereco extends Model {
    public id!: number;
    public cep!: string;
    public rua!: string;
    public bairro!: string;
    public cidade!: string;
    public uf!: string;
    public numero!: string;
    public cnpj!: string;
  
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Endereco.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      cep: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rua: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bairro: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cidade: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      uf: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      numero: {
        type: DataTypes.STRING,
        allowNull: false,
      }, 
      cnpj: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
    sequelize,
    modelName: 'Endereco',
    timestamps: true,
    }
);

export default Endereco;