import { DadosEnderecoDTO } from '../../../dtos/escolas/endereco/dados-endereco.dto'
import Endereco from '../../../models/endereco.model';
import Escola from '../../../models/escola.model';
import ErrosValidacao from '../../erros/erros-validacao-dados';

export default class DadosEnderecoService {


    async adicionarEndereco(dadosEnderecoDTO: DadosEnderecoDTO): Promise<DadosEnderecoDTO | string[]> {
        try {
            const { cep, rua, bairro, cidade, uf, numero, cnpj } = dadosEnderecoDTO;

            const erros: string[] = [];

            const escolaExiste = await Escola.findOne({
                where: [{ cnpj }]
            })

            if (escolaExiste) {
                await Endereco.create({
                  cep,
                  rua,
                  bairro,
                  cidade,
                  uf,
                  numero,
                  cnpj, 
                });
            } else {
                erros.push(ErrosValidacao.EscolaNaoCadastrada)
                return erros;
            }
        
            return dadosEnderecoDTO;
        } catch (error) {
            throw new Error('Erro ao adicionar endereço à escola.')
        }
    }
}