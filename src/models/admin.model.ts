import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/dtabase';

class Admins extends Model {
    public nome!: string;
    public email!: string;
    public cpf!: string;
    public senha!: string;
}

Admins.init(
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
        senha: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Administrador',
        tableName: 'admins',
        timestamps: true,
    }
);
    
export default Admins;
