import CadastroUsuarioDTO from "../../dtos/usuario/cadastro-usuario.dto";
import { DadosCadastroUsuarioDTO } from "../../dtos/usuario/dados-cadastro-usuario.dto";
import Usuario from "../../models/usuario.model.";
import ErrosValidacao from "../erros/erros-validacao-dados";
import { DadosLoginUsuarioDTO } from "../../dtos/usuario/dados-login-usuario.dto";

export default class UsuarioService {
    async criarUsuario(cadastroUsuario: CadastroUsuarioDTO): Promise<DadosCadastroUsuarioDTO> {
        try {
            
            const { nome, email, cpf, telefone, senha } = cadastroUsuario;
    
            const erros: string[] = [];
    
            const emailCadastrado = await Usuario.findOne({
                where: { email }
            })
    
            const cpfCadastrado = await Usuario.findOne({
                where: { cpf }
            })
    
            if (emailCadastrado) {
                erros.push(ErrosValidacao.EmailCadastrado)
            } 
            
            if (cpfCadastrado) {
                erros.push(ErrosValidacao.CPFCadastrado)
            }
    
            if (!validarCPF(cpf)) {
                erros.push(ErrosValidacao.CPFInvalido);
            }
    
            if (!validarEmail(email)) {
                erros.push(ErrosValidacao.EmailInvalido);
            }

            if (!validarTelefone(telefone)) {
                erros.push(ErrosValidacao.TelefoneInvalido)
            }
    
            if (!validarSenha(senha)) {
                erros.push(ErrosValidacao.SenhaFraca);
            }
    
            console.log(erros)
            if (erros.length > 0) {
                return Promise.reject(erros);
            }
    
            await Usuario.create({
                nome,
                email, 
                cpf,
                telefone,
                senha
            })
    
            return cadastroUsuario;
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            throw new Error('Erro ao criar usuário.');
        }
    }

    async encontrarPorEmailESenha(dadosLogin: DadosLoginUsuarioDTO): Promise<string[] | DadosCadastroUsuarioDTO> {
        try {
            const erros: string[] = [];
            const { email, senha } = dadosLogin;
    
            const usuario = await Usuario.findOne({
                where: { email }
            })

            if (usuario) {
                const respostaDTO: DadosCadastroUsuarioDTO = {
                    email: usuario.dataValues.email,
                    nome: usuario.dataValues.nome,
                    cpf: usuario.dataValues.cpf,
                    telefone: usuario.dataValues.telefone
                }
                return respostaDTO;
            } else {
                erros.push(ErrosValidacao.EmailNaoCadastrado);
            }
            // validando apenas email, por enquanto

            return erros;
        } catch (error) {
            throw new Error('Erro ao procurar usuário.')
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


function validarTelefone(valor: string): boolean {
    const valorSemEspacos = valor.replace(/\s/g, ''); 

    return valorSemEspacos.length === 11;
  }
