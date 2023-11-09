import { Sequelize, Model, DataTypes } from 'sequelize';

const sequelize = new Sequelize('mysql://root:root@localhost/findschool');

class Escola extends Model {}
Escola.init({
    CNPJ: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        validate: {
            len: [15, 15] // Garante que o CNPJ tenha exatamente 15 dígitos.
        }
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    endereco: DataTypes.STRING,
    email: DataTypes.STRING,
    senha: DataTypes.STRING
}, {
    sequelize,
    modelName: 'escola'
});

class Usuario extends Model {}
Usuario.init({
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    CPF: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        validate: {
            len: [11, 11] // Garante que o CPF tenha exatamente 11 dígitos.
        }
    },
    email: DataTypes.STRING,
    senha: DataTypes.STRING
}, {
    sequelize,
    modelName: 'usuario'
});

class Serie extends Model {}
Serie.init({
    codigo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    grau: {
        type: DataTypes.STRING,
        allowNull: false
    },
    valor_matricula: DataTypes.DOUBLE,
    escola_CNPJ: {
        type: DataTypes.BIGINT,
        references: {
            model: Escola,
            key: 'CNPJ'
        },
    }
}, {
    sequelize,
    modelName: 'serie'
});

class Desconto extends Model {}
Desconto.init({
    dia_gerado: DataTypes.DATE,
    hora_gerado: DataTypes.TIME,
    status_cupom: {
        type: DataTypes.ENUM('ATIVO', 'EXPIRADO', 'UTILIZADO'),
        allowNull: false
    },
    usuario_CPF: {
        type: DataTypes.BIGINT,
        references: {
            model: Usuario,
            key: 'CPF'
        }
    },
    serie_codigo: {
        type: DataTypes.INTEGER,
        references: {
            model: Serie,
            key: 'codigo'
        }
    }
}, {
    sequelize,
    modelName: 'desconto'
});

// Relações
Serie.belongsTo(Escola, { foreignKey: 'escola_CNPJ', targetKey: 'CNPJ' });
Escola.hasMany(Serie, { foreignKey: 'escola_CNPJ' });

Desconto.belongsTo(Usuario, { foreignKey: 'usuario_CPF', targetKey: 'CPF' });
Usuario.hasMany(Desconto, { foreignKey: 'usuario_CPF' });

Desconto.belongsTo(Serie, { foreignKey: 'serie_codigo', targetKey: 'codigo' });
Serie.hasMany(Desconto, { foreignKey: 'serie_codigo' });

export { Escola, Usuario, Serie, Desconto };

async function synchronizeModels() {
    try {
        await sequelize.sync({ alter: true });
        console.log('Modelos sincronizados com sucesso.');
    } catch (error) {
        console.error('Erro ao sincronizar os modelos:', error);
    }
}

synchronizeModels();
