"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const escola_model_1 = require("../../models/escola.model");
const sequelize_1 = require("sequelize");
class EscolaService {
    async criarEscola(escolaDTO) {
        try {
            const { nome, email, cnpj, senha } = escolaDTO;
            const erros = [];
            const escolaExiste = await escola_model_1.default.findOne({
                where: {
                    [sequelize_1.Op.or]: [{ email }, { cnpj }]
                }
            }).catch(err => {
                console.error('Erro ao consultar o banco de dados:', err);
            });
            if (escolaExiste) {
                erros.push('Já existe uma escola com este email ou CNPJ.');
            }
            if (!validarCNPJ(cnpj)) {
                erros.push('CNPJ inválido.');
            }
            if (!validarEmail(email)) {
                erros.push('Email inválido.');
            }
            if (!validarSenha(senha)) {
                erros.push('Senha não atende aos requisitos.');
            }
            if (nome == null) {
                erros.push('Nome deve ser informado.');
            }
            if (erros.length > 0) {
                return Promise.reject(erros);
            }
            await escola_model_1.default.create({
                nome: escolaDTO.nome,
                email: escolaDTO.email,
                cnpj: escolaDTO.cnpj,
                senha: escolaDTO.senha
            });
            return escolaDTO;
        }
        catch (error) {
            throw new Error('Erro ao criar escola.');
        }
    }
}
exports.default = EscolaService;
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
function validarCNPJ(cnpj) {
    const regex = /^\d{14}$/;
    return regex.test(cnpj);
}
function validarSenha(senha) {
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9a-z]).{8,}$/;
    return regex.test(senha);
}
