"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Desconto = exports.Serie = exports.Usuario = exports.Escola = void 0;
var sequelize_1 = require("sequelize");
var sequelize = new sequelize_1.Sequelize('mysql://root:root@localhost/findschool');
var Escola = /** @class */ (function (_super) {
    __extends(Escola, _super);
    function Escola() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Escola;
}(sequelize_1.Model));
exports.Escola = Escola;
Escola.init({
    CNPJ: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        validate: {
            len: [15, 15] // Garante que o CNPJ tenha exatamente 15 dígitos.
        }
    },
    nome: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    endereco: sequelize_1.DataTypes.STRING,
    email: sequelize_1.DataTypes.STRING,
    senha: sequelize_1.DataTypes.STRING
}, {
    sequelize: sequelize,
    modelName: 'escola'
});
var Usuario = /** @class */ (function (_super) {
    __extends(Usuario, _super);
    function Usuario() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Usuario;
}(sequelize_1.Model));
exports.Usuario = Usuario;
Usuario.init({
    nome: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    CPF: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        validate: {
            len: [11, 11] // Garante que o CPF tenha exatamente 11 dígitos.
        }
    },
    email: sequelize_1.DataTypes.STRING,
    senha: sequelize_1.DataTypes.STRING
}, {
    sequelize: sequelize,
    modelName: 'usuario'
});
var Serie = /** @class */ (function (_super) {
    __extends(Serie, _super);
    function Serie() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Serie;
}(sequelize_1.Model));
exports.Serie = Serie;
Serie.init({
    codigo: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    grau: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    valor_matricula: sequelize_1.DataTypes.DOUBLE,
    escola_CNPJ: {
        type: sequelize_1.DataTypes.BIGINT,
        references: {
            model: Escola,
            key: 'CNPJ'
        },
    }
}, {
    sequelize: sequelize,
    modelName: 'serie'
});
var Desconto = /** @class */ (function (_super) {
    __extends(Desconto, _super);
    function Desconto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Desconto;
}(sequelize_1.Model));
exports.Desconto = Desconto;
Desconto.init({
    dia_gerado: sequelize_1.DataTypes.DATE,
    hora_gerado: sequelize_1.DataTypes.TIME,
    status_cupom: {
        type: sequelize_1.DataTypes.ENUM('ATIVO', 'EXPIRADO', 'UTILIZADO'),
        allowNull: false
    },
    usuario_CPF: {
        type: sequelize_1.DataTypes.BIGINT,
        references: {
            model: Usuario,
            key: 'CPF'
        }
    },
    serie_codigo: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: Serie,
            key: 'codigo'
        }
    }
}, {
    sequelize: sequelize,
    modelName: 'desconto'
});
// Relações
Serie.belongsTo(Escola, { foreignKey: 'escola_CNPJ', targetKey: 'CNPJ' });
Escola.hasMany(Serie, { foreignKey: 'escola_CNPJ' });
Desconto.belongsTo(Usuario, { foreignKey: 'usuario_CPF', targetKey: 'CPF' });
Usuario.hasMany(Desconto, { foreignKey: 'usuario_CPF' });
Desconto.belongsTo(Serie, { foreignKey: 'serie_codigo', targetKey: 'codigo' });
Serie.hasMany(Desconto, { foreignKey: 'serie_codigo' });
function synchronizeModels() {
    return __awaiter(this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, sequelize.sync({ alter: true })];
                case 1:
                    _a.sent();
                    console.log('Modelos sincronizados com sucesso.');
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error('Erro ao sincronizar os modelos:', error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
synchronizeModels();
