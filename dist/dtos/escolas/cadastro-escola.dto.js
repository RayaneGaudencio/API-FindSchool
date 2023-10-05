"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EscolaCadastroDTO {
    nome;
    email;
    cnpj;
    senha;
    constructor(nome, email, cnpj, senha) {
        this.nome = nome;
        this.email = email;
        this.cnpj = cnpj;
        this.senha = senha;
    }
}
exports.default = EscolaCadastroDTO;
