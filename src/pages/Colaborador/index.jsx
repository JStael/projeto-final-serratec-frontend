import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import http from "../../services/http";
import { GlobalContext } from "../../providers/GlobalContext";
import Header from "../../components/Header";
import MenuLateral from "../../components/MenuLateral";
import "./style.css";

function Colaborador() {
  const context = useContext(GlobalContext);
  const { colaborador } = context;
  const { endereco } = context.colaborador;
  const history = useHistory();

  const [readOnly, setReadOnly] = useState(true);

  const id = colaborador.id;
  const [nome, setNome] = useState(colaborador.nome);
  const [userName, setUserName] = useState(colaborador.username);
  const [senha, setSenha] = useState("");
  const [email, setEmail] = useState(colaborador.email);
  const [cpf, setCpf] = useState(colaborador.cpf);
  const [telefone, setTelefone] = useState(colaborador.telefone);
  const [dataNascimento, setDataNascimento] = useState(
    colaborador.dataNascimento
  );
  const [cep, setCep] = useState(endereco.cep);
  const [rua, setRua] = useState(endereco.logradouro);
  const [numero, setNumero] = useState(endereco.numero);
  const [bairro, setBairro] = useState(endereco.bairro);
  const [cidade, setCidade] = useState(endereco.localidade);
  const [estado, setEstado] = useState(endereco.uf);

  const cpfHandle = (evento) => {
    if (evento.target.value.length <= 11) setCpf(evento.target.value);
  };

  const cepHandle = (evento) => {
    if (evento.target.value.length <= 9) setCep(evento.target.value);
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

  const editarCadastro = (evento) => {
    evento.preventDefault();
    setReadOnly(true);
    const colaborador = {
      id: id,
      nome: nome,
      email: email,
      senha: senha,
      cpf: cpf,
      telefone: telefone,
      dataNascimento: dataNascimento,
      endereco: {
        cep: cep,
        logradouro: rua,
        numero: numero,
        bairro: bairro,
        localidade: cidade,
        uf: estado
      },
    };

    http
      .put(`secretarias/${id}`, colaborador)
      .then((response) => {
        alert(`Cadastro do colaborador ${nome} alterado com sucesso!`);
        console.log(response);
        setNome("");
        setEmail("");
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
        console.log("Hmmm.. Tem algo errado");
        console.log(erro);
      });
  };

  const deletarColaborador = () => {
    http
      .delete(`usuarios/${id}`)
      .then((response) => {
        alert(`Cadastro do colaborador ${nome} excluído com sucesso!`);
        history.goBack();
      })
      .catch((erro) => console.error(erro));
  };

  return (
    <>
      <Header />
      <MenuLateral />
      <div className="container p-0">
        <form className="form-consulta-colaborador" onSubmit={editarCadastro}>
          <div className="header-consulta-colaborador mb-3 bg-primary text-white">
            <h5 className="mb-0">Consulta de colaborador</h5>
            <div>
              <i
                className="fas fa-user-edit text-white mx-2 fs-5 icone-consulta-colaborador"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title="Editar cadastro"
                onClick={() =>
                  readOnly ? setReadOnly(false) : setReadOnly(true)
                }
              ></i>
              <i
                className="fas fa-trash-alt mx-2 fs-5 icone-consulta-master"
                data-bs-toggle="modal"
                data-bs-target="#deletar"
              ></i>
            </div>
          </div>
          <div className=" d-flex flex-row flex-wrap justify-content-around">
            <div className="corpo-cadastro-paciente1">
              <div>
                <label className="mb-2">Nome</label>
                <input
                  readOnly={readOnly}
                  className="form-control py-1 px-4"
                  required
                  type="text"
                  value={nome}
                  onChange={(evento) => setNome(evento.target.value)}
                  placeholder="Digite o nome completo do colaborador"
                />
              </div>
              <div>
                <label className="mb-2">Usuário</label>
                <input
                  readOnly={readOnly}
                  className="form-control py-1 px-4"
                  required
                  type="text"
                  value={userName}
                  onChange={(evento) => setUserName(evento.target.value)}
                  placeholder="Digite seu nome de usuário"
                />
              </div>
              <div>
                <label className="mb-2">Senha</label>
                <input
                  readOnly={readOnly}
                  className="form-control py-1 px-4"
                  required
                  type="password"
                  value={senha}
                  onChange={(evento) => setSenha(evento.target.value)}
                  placeholder="Crie uma senha"
                />
              </div>
              <div>
                <label className="mb-2">Email</label>
                <input
                  readOnly={readOnly}
                  className="form-control py-1 px-4"
                  required
                  type="email"
                  value={email}
                  onChange={(evento) => setEmail(evento.target.value)}
                  placeholder="Digite o email do colaborador"
                />
              </div>
              <div>
                <label className="mb-2">CPF</label>
                <input
                  readOnly={readOnly}
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
                  readOnly={readOnly}
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
                  readOnly={readOnly}
                  className="form-control py-1 px-4"
                  required
                  type="date"
                  value={dataNascimento}
                  onChange={(evento) => setDataNascimento(evento.target.value)}
                  placeholder="YYYY-MM-DD"
                />
              </div>
            </div>
            <div className="corpo-cadastro-paciente2">
              <div>
                <label className="mb-2">Cep</label>
                <input
                  readOnly={readOnly}
                  className="form-control py-1 px-4"
                  required
                  type="text"
                  value={cep}
                  onBlur={obterCep}
                  onChange={cepHandle}
                />
              </div>
              <div>
                <label className="mb-2">Rua</label>
                <input
                  readOnly={readOnly}
                  className="form-control py-1 px-4"
                  required
                  type="text"
                  value={rua}
                  onChange={(evento) => setRua(evento.target.value)}
                />
              </div>
              <div>
                <label className="mb-2">Número da Residência</label>
                <input
                  readOnly={readOnly}
                  className="form-control py-1 px-4"
                  required
                  type="number"
                  value={numero}
                  onChange={(evento) => setNumero(evento.target.value)}
                  placeholder="Digite o número da residência"
                />
              </div>
              <div>
                <label className="mb-2">Bairro</label>
                <input
                  readOnly={readOnly}
                  className="form-control py-1 px-4"
                  required
                  type="text"
                  value={bairro}
                  onChange={(evento) => setBairro(evento.target.value)}
                />
              </div>
              <div>
                <label className="mb-2">Cidade</label>
                <input
                  readOnly={readOnly}
                  className="form-control py-1 px-4"
                  required
                  type="text"
                  value={cidade}
                  onChange={(evento) => setCidade(evento.target.value)}
                />
              </div>
              <div>
                <label className="mb-2">Estado</label>
                <input
                  readOnly={readOnly}
                  className="form-control py-1 px-4"
                  required
                  type="text"
                  value={estado}
                  onChange={(evento) => setEstado(evento.target.value)}
                />
              </div>
            </div>
            <div className="botoes-cadastro-paciente">
              {!readOnly && <button className="btn btn-primary">Salvar</button>}
              <button
                className="btn btn-outline-primary"
                onClick={() => history.goBack()}
              >
                Voltar
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="modal fade" id="deletar" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content ">
            <div className="modal-header btn-primary">
              <h5 className="modal-title">Excluir colaborador</h5>
            </div>
            <p className="text-center mt-4">
              Tem certeza que deseja excluir esse colaborador?
            </p>
            <div className="modal-body modal-menu">
              <button
                onClick={deletarColaborador}
                className="btn btn-danger btn-card-home fs-6"
                data-bs-dismiss="modal"
              >
                Excluir
              </button>
              <button
                className="btn btn-outline-primary btn-card-home fs-6"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Colaborador;
