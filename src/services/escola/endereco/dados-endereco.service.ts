import { DadosEnderecoDTO } from '../../../dtos/escolas/endereco/dados-endereco.dto'
import Endereco from '../../../models/endereco.model';
import Escola from '../../../models/escola.model';

export default class DadosEnderecoService {


    async adicionarEndereco(dadosEnderecoDTO: DadosEnderecoDTO): Promise<DadosEnderecoDTO> {
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
                erros.push('Escola não está cadastrada.')
            }

            if (erros.length > 0) {
                return Promise.reject(erros);
            }
        
            return dadosEnderecoDTO;
        } catch (error) {
            throw new Error('Erro ao adicionar endereço à escola.')
        }
    }
}