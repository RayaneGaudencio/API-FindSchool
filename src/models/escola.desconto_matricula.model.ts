import { DataTypes, Model } from "sequelize";
import sequelize from '../config/dtabase'; 

class DescontoMatricula extends Model {
  public id!: number;
  public admin_cpf!: string;
  public escola_cnpj!: string;
  public porcentagem_desconto!: number;
  public data_inicio!: Date;
  public data_expiracao!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

DescontoMatricula.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    admin_cpf: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    escola_cnpj: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    porcentagem_desconto: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    data_inicio: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    data_expiracao: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: 'DescontoMatricula',
    tableName: 'desconto_matricula',
    timestamps: true,
  }
);

export default DescontoMatricula;
