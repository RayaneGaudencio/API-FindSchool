class DadosGerarCupom {
    public id_desconto: number;
    public usuario_cpf: string;

    constructor(id_desconto: number, usuario_cpf: string) {
        this.id_desconto = id_desconto;
        this.usuario_cpf = usuario_cpf;
    }
}

export default DadosGerarCupom;
