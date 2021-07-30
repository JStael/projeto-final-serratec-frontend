import { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { GlobalContext } from "../../providers/GlobalContext";
import Header from "../../components/Header";
import MenuLateral from "../../components/MenuLateral";
import http from "../../services/http";
import "./style.css";

function Paciente() {
  const context = useContext(GlobalContext);
  const history = useHistory();

  const { paciente } = context;

  const [readOnly, setReadOnly] = useState(true);

  const id = paciente.id;
  const [nome, setNome] = useState(paciente.nome);
  const [email, setEmail] = useState(paciente.email);
  const [cpf, setCpf] = useState(paciente.cpf);
  const [telefone, setTelefone] = useState(paciente.telefone);
  const [dataNascimento, setDataNascimento] = useState(paciente.dataNascimento);
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
    const paciente = {
      id: id,
      nome: nome,
      email: email,
      cpf: cpf,
      telefone: telefone,
      dataNascimento: dataNascimento,
      endereco: {
        cep: cep,
        logradouro: rua,
        numero: numero,
        bairro: bairro,
        localidade: cidade,
        uf: estado,
      },
    };

    http
      .put(`pacientes/${id}`, paciente)
      .then((response) => {
        alert(`Cadastro do(a) paciente ${nome} alterado com sucesso!`);
      })
      .catch((erro) => {
        console.log("Hmmm.. Tem algo errado");
        console.log(erro);
      });
  };

  const deletarPaciente = () => {
    http
      .delete(`pacientes/${id}`)
      .then((response) => {
        alert(`Paciente ${nome} excluído com sucesso!`);
        history.goBack();
      })
      .catch((erro) => console.error(erro));
  };

  return (
    <>
      <Header />
      <MenuLateral />
      <div className="container p-0">
        <form className="form-consulta-paciente" onSubmit={editarCadastro}>
          <div className="header-consulta-paciente mb-3 bg-primary text-white">
            <h5 className="mb-0">Consulta de paciente</h5>
            <div>
              <i
                className="fas fa-user-edit text-white mx-2 fs-5 icone-consulta-paciente"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title="Editar cadastro"
                onClick={() =>
                  readOnly ? setReadOnly(false) : setReadOnly(true)
                }
              ></i>
              <i
                className="fas fa-trash-alt mx-2 fs-5 icone-consulta-paciente"
                data-bs-toggle="modal"
                data-bs-target="#deletar"
              ></i>
            </div>
          </div>
          <div className=" d-flex flex-row flex-wrap justify-content-around">
            <div className="corpo-consulta-paciente1">
              <div>
                <label className="mb-2">Nome</label>
                <input
                  readOnly={readOnly}
                  className="form-control py-1 px-4"
                  required
                  type="text"
                  value={nome}
                  onChange={(evento) => setNome(evento.target.value)}
                  placeholder="Digite o nome completo do paciente"
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
                  placeholder="Digite o email do paciente"
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
                  type="data"
                  value={dataNascimento}
                  onChange={(evento) => setDataNascimento(evento.target.value)}
                  placeholder="YYYY-MM-DD"
                />
              </div>
            </div>
            <div className="corpo-consulta-paciente2">
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
            <div className="botoes-consulta-paciente">
              {!readOnly && <button className="btn btn-primary">Salvar</button>}
              <Link to="/home" className="btn btn-outline-primary">
                Gerar recibo
              </Link>
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
              <h5 className="modal-title">Excluir paciente</h5>
            </div>
            <p className="text-center mt-4">
              Tem certeza que deseja excluir esse paciente?
            </p>
            <div className="modal-body modal-menu">
              <button
                onClick={deletarPaciente}
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

export default Paciente;
