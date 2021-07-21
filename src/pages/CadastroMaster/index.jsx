import { useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

import "./style.css";

function CadastroMaster() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [senha, setSenha] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  const cpfHandle = (evento) => {
    if (evento.target.value.length <= 11) setCpf(evento.target.value);
  };

  const cepHandle = (evento) => {
    if (evento.target.value.length <= 8) setCep(evento.target.value);
  };

  const obterCep = (evento) => {
    if (!evento.target.value) return;

    const url = `https://viacep.com.br/ws/${evento.target.value}/json/`;
    axios
      .get(url)
      .then((response) => {
        if (!response.data.erro) {
          setRua(response.data.logradouro);
          setBairro(response.data.bairro);
          setCidade(response.data.localidade);
          setEstado(response.data.uf);
        }
      })
      .catch();
  };

  const efetuarCadastro = (evento) => {
    evento.preventDefault();
    const usuario = {
      nome: nome,
      email: email,
      username: userName,
      senha: senha,
      cpf: cpf,
      telefone: telefone,
      dataNascimento: dataNascimento,
      endereco: {
        cep: cep,
        rua: rua,
        numeroResidencia: numero,
        bairro: bairro,
        cidade: cidade,
        estado: estado,
      },
    };

    axios
      .post("http://localhost:8080/api/usuarios", usuario)
      .then((response) => {
        //localStorage.setItem("token", response.data.access_token);
        alert(`Usuário ${nome} cadastrado com sucesso!`);
        setNome("");
        setEmail("");
        setUserName("");
        setSenha("");
        setCpf("");
        setTelefone("");
        setDataNascimento("");
        setCep("");
        setRua("");
        setNumero("");
        setBairro("");
        setCidade("");
        setEstado("");
      })
      .catch((erro) => {
        console.log("Algo deu erro");
        console.log(erro);
      });
  };

  return (
    <div className="container">
        <form className="formCadastro" onSubmit={efetuarCadastro}>
          <div className="header mb-3 bg-primary text-white">
            <h5 className="mb-0">Cadastro de usuário master</h5>
          </div>
          <div className=" d-flex flex-row flex-wrap justify-content-around">
            <div className="cadastro1">
              <div>
                <label className="mb-2">Nome</label>
                <input
                  className="form-control py-1 px-4"
                  required
                  type="text"
                  value={nome}
                  onChange={(evento) => setNome(evento.target.value)}
                  placeholder="Digite seu nome completo"
                />
              </div>
              <div>
                <label className="mb-2">Email</label>
                <input
                  className="form-control py-1 px-4"
                  required
                  type="email"
                  value={email}
                  onChange={(evento) => setEmail(evento.target.value)}
                  placeholder="Digite seu email"
                />
              </div>
              <div>
                <label className="mb-2">Username</label>
                <input
                  className="form-control py-1 px-4"
                  required
                  type="text"
                  value={userName}
                  onChange={(evento) => setUserName(evento.target.value)}
                  minLength="5"
                  placeholder="Digite seu nome de usuário"
                />
              </div>
              <div>
                <label className="mb-2">Senha</label>
                <input
                  className="form-control py-1 px-4"
                  required
                  type="password"
                  value={senha}
                  onChange={(evento) => setSenha(evento.target.value)}
                  placeholder="Crie uma senha de 8 a 15 digitos"
                />
              </div>
              <div>
                <label className="mb-2">CPF</label>
                <input
                  className="form-control py-1 px-4"
                  required
                  type="number"
                  value={cpf}
                  onChange={cpfHandle}
                  placeholder="Apenas os 11 digitos"
                />
              </div>
              <div>
                <label className="mb-2">Telefone</label>
                <input
                  className="form-control py-1 px-4"
                  required
                  type="number"
                  value={telefone}
                  onChange={(evento) => setTelefone(evento.target.value)}
                  placeholder="(XX) 99999-9999"
                />
              </div>
              <div>
                <label className="mb-2">Data de Nascimento</label>
                <input
                  className="form-control py-1 px-4"
                  
                  type="data"
                  value={dataNascimento}
                  onChange={(evento) => setDataNascimento(evento.target.value)}
                  placeholder="YYYY-MM-DD"
                />
              </div>
            </div>
            <div className="cadastro2">
              <div>
                <label className="mb-2">Cep</label>
                <input
                  className="form-control py-1 px-4"
                  
                  type="number"
                  value={cep}
                  onBlur={obterCep}
                  onChange={cepHandle}
                  placeholder="Apenas os 8 digitos"
                />
              </div>
              <div>
                <label className="mb-2">Rua</label>
                <input
                  className="form-control py-1 px-4"
                  
                  type="text"
                  value={rua}
                  onChange={(evento) => setRua(evento.target.value)}
                />
              </div>
              <div>
                <label className="mb-2">Numero Residência</label>
                <input
                  className="form-control py-1 px-4"
                  
                  type="number"
                  value={numero}
                  onChange={(evento) => setNumero(evento.target.value)}
                  placeholder="Digite o número da sua residência"
                />
              </div>
              <div>
                <label className="mb-2">Bairro</label>
                <input
                  className="form-control py-1 px-4"
                  
                  type="text"
                  value={bairro}
                  onChange={(evento) => setBairro(evento.target.value)}
                />
              </div>
              <div>
                <label className="mb-2">Cidade</label>
                <input
                  className="form-control py-1 px-4"
                  
                  type="text"
                  value={cidade}
                  onChange={(evento) => setCidade(evento.target.value)}
                />
              </div>
              <div>
                <label className="mb-2">Estado</label>
                <input
                  className="form-control py-1 px-4"
                  
                  type="text"
                  value={estado}
                  onChange={(evento) => setEstado(evento.target.value)}
                />
              </div>
            </div>
            <div className="px-4 ms-4 mb-3">
              <button className="btn btn-primary">Cadastrar</button>
              <Link to="/" className="btn btn-danger">Cancelar</Link>
            </div>
          </div>
        </form>
    </div>
  );
}

export default CadastroMaster;