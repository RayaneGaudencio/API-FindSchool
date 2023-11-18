import CadastroDescontoMatricula from "../../../dtos/escolas/desconto_matricula/cadastro-desconto-matricula.dto";
import Admins from "../../../models/admin.model";
import DescontoMatricula from "../../../models/escola.desconto_matricula.model";
import Escola from "../../../models/escola.model";
import ErrosValidacao from "../../erros/erros-validacao-dados";

export default class DescontoMatriculaService {
    async adicionaDesconto(dadosCadastroDescontoDTO: CadastroDescontoMatricula): Promise<CadastroDescontoMatricula | string[]> {
        try {
            const { admin_cpf, escola_cnpj, porcentagem_desconto, data_inicio, data_expiracao } = dadosCadastroDescontoDTO;

            const erros: string[] = [];
            
            const adminExiste = await Admins.findOne({
                where: { cpf: admin_cpf }
            });

            const escolaExiste = await Escola.findOne({
                where: [{ cnpj: escola_cnpj }]
            })

            if (escolaExiste && adminExiste) {
                await DescontoMatricula.create({
                    admin_cpf, 
                    escola_cnpj, 
                    porcentagem_desconto, 
                    data_inicio, 
                    data_expiracao
                });
                return dadosCadastroDescontoDTO;
            } else if (!escolaExiste){
                erros.push(ErrosValidacao.EscolaNaoCadastrada)
            } else if (!adminExiste) {
                erros.push(ErrosValidacao.AdminNaoCadastrado)
            }
        
            return erros;
        } catch (error) {
            throw new Error('Erro ao adicionar desconto à matricula da escola.')
        }
    }
}