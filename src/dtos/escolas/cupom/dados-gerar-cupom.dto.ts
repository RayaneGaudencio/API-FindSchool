class DadosGerarCupom {
    public desconto_matricula_id: number;
    public usuario_cpf: string;
    public escola_cnpj: string;

    constructor(desconto_matricula_id: number, usuario_cpf: string, escola_cnpj: string) {
        this.desconto_matricula_id = desconto_matricula_id;
        this.usuario_cpf = usuario_cpf;
        this.escola_cnpj = escola_cnpj;
    }
}

export default DadosGerarCupom;
