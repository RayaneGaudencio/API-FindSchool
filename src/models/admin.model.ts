import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/dtabase';

class Administrador extends Model {
    public id!: number;
    public nome!: string;
    public email!: string;
    public cpf!: string;
    public senha!: string;
}

Administrador.init(
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
        timestamps: true,
    }
);
    
export default Administrador;
