import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { GlobalContext } from "../../providers/GlobalContext";
import Header from "../../components/Header";
import MenuLateral from "../../components/MenuLateral";
import "./style.css";

function Paciente() {
  const context = useContext(GlobalContext);
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
        rua: rua,
        numeroResidencia: numero,
        bairro: bairro,
        cidade: cidade,
        estado: estado,
      },
    };

    axios
      .put(`http://localhost:8080/api/pacientes/${id}`, paciente)
      .then((response) => {
        alert(`Cadastro do paciente ${nome} alterado com sucesso!`);
      })
      .catch((erro) => {
        console.log("Hmmm.. Tem algo errado");
        console.log(erro);
      });
  };

  return (
    <>
      <Header />
      <MenuLateral />
      <div className="container p-0">
        <form className="form-cadastro-paciente" onSubmit={editarCadastro}>
          <div className="header-cadastro-paciente mb-3 bg-primary text-white">
            <h5 className="mb-0">Consulta de paciente</h5>
            <i
              className="fas fa-edit text-white fs-3 icone-cadastro-paciente"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              title="Editar cadastro"
              onClick={() =>
                readOnly ? setReadOnly(false) : setReadOnly(true)
              }
            ></i>
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
            <div className="corpo-cadastro-paciente2">
              <div>
                <label className="mb-2">Cep</label>
                <input
                  readOnly={readOnly}
                  className="form-control py-1 px-4"
                  required
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
              <Link to="/home" className="btn btn-outline-primary">
                Gerar recibo
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Paciente;
