class CadastroAdminDTO {
    public nome: string;
    public email: string;
    public cpf: string;
    public senha: string;

    constructor(nome: string, email: string, cpf: string, senha: string) {
        this.nome = nome;
        this.email = email;
        this.cpf = cpf;
        this.senha = senha;
    }
}

export default CadastroAdminDTO;
