"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const escola_model_1 = require("../models/escola.model");
const sequelize_1 = require("sequelize");
class EscolaService {
    async criarEscola(escolaDTO) {
        try {
            const { nome, email, cnpj, senha } = escolaDTO;
            console.log("Dados recebidos no service:", nome, email, cnpj, senha);
            const escolaExiste = await escola_model_1.default.findOne({
                where: {
                    [sequelize_1.Op.or]: [{ email }, { cnpj }]
                }
            });
            console.log("consulta ao banco realizada");
            if (escolaExiste) {
                throw new Error('Já existe uma escola com este email ou CNPJ.');
            }
            else if (!validarCNPJ(cnpj)) {
                throw new Error('CNPJ inválido.');
            }
            else if (!validarEmail(email)) {
                throw new Error('Email inválido.');
            }
            else if (!validarSenha(senha)) {
                throw new Error('Senha não atende os requisitos.');
            }
            else if (nome == null) {
                throw new Error('Nome deve ser informado.');
            }
            console.log("verificacao dos dados:", nome, email, cnpj, senha);
            await escola_model_1.default.create({
                nome: escolaDTO.nome,
                email: escolaDTO.email,
                cnpj: escolaDTO.cnpj,
                senha: escolaDTO.senha
            });
            console.log("Escola.create executado.");
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
    const regex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;
    if (!regex.test(cnpj)) {
        return false;
    }
    // Remove caracteres não numéricos
    const numerosCNPJ = cnpj.replace(/\D/g, '');
    // Verifica se todos os dígitos são iguais, o que torna o CNPJ inválido
    if (/^(\d)\1+$/.test(numerosCNPJ)) {
        return false;
    }
    // Calcula o primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 12; i++) {
        soma += parseInt(numerosCNPJ[i]) * (5 - i);
    }
    let digito1 = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    // Calcula o segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 13; i++) {
        soma += parseInt(numerosCNPJ[i]) * (6 - i);
    }
    let digito2 = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    // Verifica se os dígitos verificadores calculados são iguais aos do CNPJ
    if (parseInt(numerosCNPJ[12]) !== digito1 || parseInt(numerosCNPJ[13]) !== digito2) {
        return false;
    }
    return true;
}
function validarSenha(senha) {
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9a-z]).{8,}$/;
    return regex.test(senha);
}
