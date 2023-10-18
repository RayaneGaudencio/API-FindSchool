import Administrador from '../../models/admin.model';
import { Op } from 'sequelize';
import CadastroAdminDTO from '../../dtos/admin/cadastro-admin.dto';
import ErrosValidacao from '../erros/erros-validacao-dados';
import Admins from '../../models/admin.model';
import { DadosLoginAdminDTO } from '../../dtos/admin/dados-login-admin.dto';
import { DadosCadastroAdministradorDTO } from '../../dtos/admin/dados-cadastro-admin.dto';

export default class AdminService {
    async criarAdmin(adminDTO: CadastroAdminDTO): Promise<CadastroAdminDTO> {
        try {
            const { nome, email, cpf, senha } = adminDTO;

            console.log("recebeu os dados")

            const erros: string[] = [];

            const adminExiste = await Admins.findOne({
                where: {
                    [Op.or]: [{ email }, { cpf }]
                }
            });

            console.log("consultou")

            if (adminExiste) {
                erros.push(ErrosValidacao.AdminExistente);
            }

            if (!validarCPF(cpf)) {
                erros.push(ErrosValidacao.CPFInvalido);
            }

            if (!validarEmail(email)) {
                erros.push(ErrosValidacao.EmailInvalido);
            }

            if (!validarSenha(senha)) {
                erros.push(ErrosValidacao.SenhaFraca);
            }

            if (!nome) {
                erros.push(ErrosValidacao.NomeVazio);
            }

            if (erros.length > 0) {
                return Promise.reject(erros);
            }

            console.log("Validou")

            await Administrador.create({
                nome,
                email,
                cpf,
                senha
            });

            console.log("Criou")
            return adminDTO;
        } catch (error) {
            console.error('Erro ao criar administrador:', error);
            throw new Error('Erro ao criar administrador.');
        }
    }


    async encontrarPorEmailESenha(dadosDTO: DadosLoginAdminDTO): Promise<string[] | { email: string, nome: string}> {
        try {
            const erros: string[] = [];
            const { email, senha } = dadosDTO;
    
            console.log("Email e senha:", email, senha)
            const admin = await Administrador.findOne({
                where: { email }
            })

            if (admin) {
                const respostaDTO: DadosCadastroAdministradorDTO = {
                    email: admin.dataValues.email,
                    nome: admin.dataValues.nome,
                    cpf: ""
                }
                return respostaDTO;
            } else {
                erros.push(ErrosValidacao.EmailNaoCadastrado);
            }
            // validando apenas email, por enquanto

            return erros;
        } catch (error) {
            throw new Error('Erro ao procurar administrador.')
        }
    }
}

function validarEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validarCPF(cpf: string): boolean {
    const regex = /^\d{11}$/;
    return regex.test(cpf);
}

function validarSenha(senha: string): boolean {
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9a-z]).{8,}$/;
    return regex.test(senha);
}
