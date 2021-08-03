import { useState, useContext } from "react";
import axios from "axios";
import http from "../../services/http";
import { useHistory } from "react-router";
import { GlobalContext } from "../../providers/GlobalContext";
import Header from "../../components/Header";
import MenuLateral from "../../components/MenuLateral";
import "./style.css";

function Medico() {
  const context = useContext(GlobalContext);
  const history = useHistory();

  const { medico } = context;

  const [readOnly, setReadOnly] = useState(true);

  const id = medico.id;
  const [nome, setNome] = useState(medico.nome);
  const [email, setEmail] = useState(medico.email);
  const [cpf, setCpf] = useState(medico.cpf);
  const [telefone, setTelefone] = useState(medico.telefone);
  const [dataNascimento, setDataNascimento] = useState(medico.dataNascimento);
  const [crm, setCrm] = useState(medico.crm);
  const [cep, setCep] = useState(medico.endereco.cep);
  const [rua, setRua] = useState(medico.endereco.logradouro);
  const [numero, setNumero] = useState(medico.endereco.numero);
  const [bairro, setBairro] = useState(medico.endereco.bairro);
  const [cidade, setCidade] = useState(medico.endereco.localidade);
  const [estado, setEstado] = useState(medico.endereco.uf);

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
    const medico = {
      id: id,
      nome: nome,
      email: email,
      cpf: cpf,
      telefone: telefone,
      dataNascimento: dataNascimento,
      crm: crm,
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
      .put(`medicos/${id}`, medico)
      .then((response) => {
        alert(`Cadastro do(a) médico(a) ${nome} alterado com sucesso!`);
      })
      .catch((erro) => {
        console.log("Hmmm.. Tem algo errado");
        console.log(erro);
      });
  };

  const deletarMedico = () => {
    http
      .delete(`medicos/${id}`)
      .then((response) => {
        alert(`Médico(a) ${nome} excluído com sucesso!`);
        history.goBack();
      })
      .catch((erro) => console.error(erro));
  };

  return (
    <>
      <Header />
      <MenuLateral />
      <div className="container p-0">
        <form className="form-consulta-medico" onSubmit={editarCadastro}>
          <div className="header-consulta-medico bg-primary text-white">
            <h5 className="mb-0">Consulta de usuário médico</h5>
            <div>
              <i
                className="fas fa-user-edit text-white mx-2 fs-5 icone-consulta-medico"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title="Editar cadastro"
                onClick={() =>
                  readOnly ? setReadOnly(false) : setReadOnly(true)
                }
              ></i>
              <i
                className="fas fa-trash-alt mx-2 fs-5 icone-consulta-medico"
                data-bs-toggle="modal"
                data-bs-target="#deletar"
              ></i>
            </div>
          </div>
          <div className=" d-flex flex-row flex-wrap p-4 mb-2 justify-content-around">
            <div className="corpo-consulta-medico1">
              <div>
                <label className="mb-2">Nome</label>
                <input
                  readOnly={readOnly}
                  className="form-control py-1 px-4"
                  required
                  type="text"
                  value={nome}
                  onChange={(evento) => setNome(evento.target.value)}
                  placeholder="Digite o nome do usuário"
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
                  placeholder="Digite o email do usuário"
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
              <div>
                <label className="mb-2">CRM</label>
                <input
                  readOnly={readOnly}
                  className="form-control py-1 px-4"
                  required
                  type="text"
                  value={crm}
                  onChange={(evento) => setCrm(evento.target.value)}
                  placeholder="0000000-0/BR"
                />
              </div>
            </div>
            <div className="corpo-consulta-medico2">
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
            <div className="botoes-consulta-medico">
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
              <h5 className="modal-title">Excluir médico</h5>
            </div>
            <p className="text-center mt-4">
              Tem certeza que deseja excluir esse médico?
            </p>
            <div className="modal-body modal-menu">
              <button
                onClick={deletarMedico}
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

export default Medico;
