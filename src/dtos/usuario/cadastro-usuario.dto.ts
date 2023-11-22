class CadastroUsuarioDTO {
    public nome: string;
    public email: string;
    public cpf: string;
    public telefone: string;
    public senha: string;

    constructor(nome: string, email: string, cpf: string, telefone: string, senha: string) {
        this.nome = nome;
        this.email = email;
        this.cpf = cpf;
        this.telefone = telefone;
        this.senha = senha;
    }
}

export default CadastroUsuarioDTO;
