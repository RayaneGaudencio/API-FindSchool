class EscolaCadastroDTO {
    public nome: string;
    public email: string;
    public cnpj: string;
    public senha: string;

    constructor(nome: string, email: string, cnpj: string, senha: string) {
        this.nome = nome;
        this.email = email;
        this.cnpj = cnpj;
        this.senha = senha;
    }
}

export default EscolaCadastroDTO;
