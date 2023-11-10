import Escola from '../../models/escola.model';
import { Op } from 'sequelize';
import CadastroEscolaDTO from '../../dtos/escolas/cadastro-escola.dto'
import { DadosLoginEscolaDTO } from '../../dtos/escolas/dados-login-escola.dto';
import { DadosCadastroEscolaDTO } from '../../dtos/escolas/dados-cadastro-escola.dto';
import ErrosValidacao from '../erros/erros-validacao-dados';

export default class EscolaService {
    async criarEscola(escolaDTO: CadastroEscolaDTO): Promise<CadastroEscolaDTO>{
        try {
            const { nome, email, cnpj, senha } = escolaDTO;

            const erros: string[] = [];

            const escolaExiste = await Escola.findOne({
                where: {
                    [Op.or]: [{ email }, { cnpj }]
                }
            }).catch(err => {
                console.error('Erro ao consultar o banco de dados:', err);
            });

            if (escolaExiste) {
                erros.push('Já existe uma escola com este email ou CNPJ.');
            }

            if (!validarCNPJ(cnpj)) {
                erros.push('CNPJ inválido.');
            }

            if (!validarEmail(email)) {
                erros.push('Email inválido.');
            }

            if (!validarSenha(senha)) {
                erros.push('Senha não atende aos requisitos.');
            }

            if (nome == null) {
                erros.push('Nome deve ser informado.');
            }

            if (erros.length > 0) {
                return Promise.reject(erros);
            }

            await Escola.create({
                nome: escolaDTO.nome, 
                email: escolaDTO.email,
                cnpj: escolaDTO.cnpj,
                senha: escolaDTO.senha
            })
            return escolaDTO;
        } catch (error) {
            throw new Error('Erro ao criar escola.')
        }
    }

async encontrarPorEmailESenha(dadosDTO: DadosLoginEscolaDTO): Promise<string[] | { email: string, nome: string}> {
    try {
        const erros: string[] = [];
        const { email, senha } = dadosDTO;

        const escola = await Escola.findOne({
            where: { email }
        })

        if (escola) {
            const respostaDTO: DadosCadastroEscolaDTO = {
                email: escola.dataValues.email,
                nome: escola.dataValues.nome,
                cnpj: escola.dataValues.cnpj
            }
            return respostaDTO;
        } else {
            erros.push(ErrosValidacao.EmailNaoCadastrado);
        }
        // validando apenas email, por enquanto

        return erros;
    } catch (error) {
        throw new Error('Erro ao procurar por escola.')
    }    
}
}

function validarEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validarCNPJ(cnpj: string): boolean {
    const regex = /^\d{14}$/;
    return regex.test(cnpj);
}

function validarSenha(senha: string): boolean {
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9a-z]).{8,}$/;
    return regex.test(senha);
}
