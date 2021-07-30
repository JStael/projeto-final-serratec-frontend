import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../providers/GlobalContext";
import http from "../../services/http";
import Header from "../../components/Header";
import MenuLateral from "../../components/MenuLateral";
import "./style.css";

function BuscarPaciente() {
  const context = useContext(GlobalContext);

  const [nome, setNome] = useState("");
  const [pacientes, setPacientes] = useState([]);
  const [pacienteNaoEncontrado, setPacienteNaoEncontrado] = useState("")

  const pesquisarPaciente = (ev) => {
    ev.preventDefault();
    setPacienteNaoEncontrado("");
    setPacientes([]);
    http
      .get(`pacientes/nome/${nome}`)
      .then((response) => {
        setPacientes(response.data);
        setNome("");
        console.log(pacientes);
      })
      .catch((response) => {
        if (response.request.status === 404) setPacienteNaoEncontrado("Paciente não encontrado.")
      });
  };

  return (
    <div>
      <Header />
      <MenuLateral />
      <form className="form-consultar-paciente" onSubmit={pesquisarPaciente}>
        <div className="header-consultar-paciente mb-3 bg-primary text-white">
          <h5 className="mb-0">Buscar paciente</h5>
        </div>
        <div className="d-flex flex-row flex-wrap justify-content-between">
          <div className="corpo-consultar-paciente">
            <div className="w-75">
              <label className="mb-2">Nome</label>
              <input
                className="form-control py-1 px-4"
                required
                type="text"
                value={nome}
                onChange={(evento) => setNome(evento.target.value)}
                placeholder="Digite o nome completo do paciente"
              />
            </div>
            <button className="btn btn-primary botao-consultar-paciente">
              Consultar
            </button>
          </div>
        </div>
        <hr />
        <div className="resultado-pesquisa">
          <h6 className="titulo-resultado-pesquisa">{`Pacientes encontrados: ${pacientes.length}`}</h6>
            {pacienteNaoEncontrado}
          <ul>
            {pacientes.map((paciente) => (
              <Link to={`/paciente`} className="paciente-consulta" key={paciente.id}>                
                <li
                  onClick={() => context.setPaciente(paciente)}
                >
                  {paciente.nome}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </form>
    </div>
  );
}

export default BuscarPaciente;
