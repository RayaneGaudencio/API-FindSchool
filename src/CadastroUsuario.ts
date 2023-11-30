import { useState } from 'react';

interface Erros {
  nome: { temErros: boolean, mensagem: string },
  email: { temErros: boolean, mensagem: string },
  cpf: { temErros: boolean, mensagem: string },
  senha: { temErros: boolean, mensagem: string }
}

interface FormData {
  nome: string,
  email: string,
  cpf: string,
  senha: string
}

const CadastroUsuario = () => {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    email: "",
    cpf: "",
    senha: ""
  });

  const [erros, setErros] = useState<Erros>({
    nome: { temErros: false, mensagem: "" },
    email: { temErros: false, mensagem: "" },
    cpf: { temErros: false, mensagem: "" },
    senha: { temErros: false, mensagem: "" }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const verificaPreenchimentoCampos = (name: keyof FormData) => {
    // Validação dos campos
  }

  const editarPerfil = (novosDados: FormData) => {
    setFormData(novosDados);
  }
}
