class CadastroDescontoMatricula {
    public admin_cpf: string;
    public escola_cnpj: string;
    public porcentagem_desconto: string;
    public data_inicio: Date;
    public data_expiracao: Date;

    constructor(admin_cpf: string, escola_cnpj: string, porcentagem_desconto: string, data_inicio: Date, data_expiracao: Date) {
        this.admin_cpf = admin_cpf;
        this.escola_cnpj = escola_cnpj;
        this.porcentagem_desconto = porcentagem_desconto;
        this.data_inicio = data_inicio;
        this.data_expiracao = data_expiracao;
    }
}

export default CadastroDescontoMatricula;
