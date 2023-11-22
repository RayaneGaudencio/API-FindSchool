class DadosCupomCadastrado {
    public codigo_cupom: string;
    public usuario_cpf: string;
    public escola_cnpj: string;
    public status: string;
    public validade: number;

    constructor(codigo_cupom: string, usuario_cpf: string, escola_cnpj: string, status: string, validade: number) {
        this.codigo_cupom = codigo_cupom;
        this.validade = validade;
        this.escola_cnpj = escola_cnpj;
        this.usuario_cpf = usuario_cpf;
        this.status = status;
    }
}

export default DadosCupomCadastrado;
