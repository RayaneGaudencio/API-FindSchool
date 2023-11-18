class DadosCupomCadastrado {
    public codigo_cupom: string;
    public validade: Date;
    public escola: string;

    constructor(codigo_cupom: string, validade: Date, escola: string) {
        this.codigo_cupom = codigo_cupom;
        this.validade = validade;
        this.escola = escola;
    }
}

export default DadosCupomCadastrado;
