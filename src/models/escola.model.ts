import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/dtabase';

class Escola extends Model {
    public id!: number;
    public nome!: string;
    public email!: string;
    public cnpj!: string;
    public senha!: string;
}

Escola.init(
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
        cnpj: {
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
        modelName: 'Escola',
        timestamps: true,
    }
);
    
export default Escola;