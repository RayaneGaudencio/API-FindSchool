import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/dtabase';

class Usuario extends Model {
    public nome!: string;
    public email!: string;
    public cpf!: string;
    public telefone!: string;
    public senha!: string;
}

Usuario.init(
    {
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        cpf: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        telefone: {
            type: DataTypes.STRING
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Usuario',
        tableName: 'usuarios',
        timestamps: true,
    }
);

export default Usuario;
