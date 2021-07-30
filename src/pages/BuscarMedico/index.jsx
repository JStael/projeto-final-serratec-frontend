import axios from "axios";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../providers/GlobalContext";
import Header from "../../components/Header";
import MenuLateral from "../../components/MenuLateral";
import "./style.css";

function BuscarMedico() {
  const context = useContext(GlobalContext);

  const [nome, setNome] = useState("");
  const [medicos, setMedicos] = useState([]);
  const [medicoNaoEncontrado, setMedicoNaoEncontrado] = useState("")

  const pesquisarMedico = (ev) => {
    ev.preventDefault();
    setMedicoNaoEncontrado("");
    setMedicos([]);
    axios
      .get(`http://localhost:8080/api/medicos/nome/${nome}`)
      .then((response) => {
        setMedicos(response.data);
        setNome("");
        console.log(medicos);
      })
      .catch((response) => {
        if (response.request.status === 404) setMedicoNaoEncontrado("Médico não encontrado.")
      });
  };

  return (
    <div>
      <Header />
      <MenuLateral />
      <form className="form-consultar-medico" onSubmit={pesquisarMedico}>
        <div className="header-consultar-medico mb-3 bg-primary text-white">
          <h5 className="mb-0">Consulta de medico</h5>
        </div>
        <div className="d-flex flex-row flex-wrap justify-content-between">
          <div className="corpo-consultar-medico">
            <div className="w-75">
              <label className="mb-2">Nome</label>
              <input
                className="form-control py-1 px-4"
                required
                type="text"
                value={nome}
                onChange={(evento) => setNome(evento.target.value)}
                placeholder="Digite o nome completo do medico"
              />
            </div>
            <button className="btn btn-primary botao-consultar-medico">
              Consultar
            </button>
          </div>
        </div>
        <hr />
        <div className="resultado-pesquisa">
          <h6 className="titulo-resultado-pesquisa">{`Médicos encontrados: ${medicos.length}`}</h6>
            {medicoNaoEncontrado}
          <ul>
            {medicos.map((medico) => (
              <Link to={`/buscar-usuario/buscar-medico/medico`} className="medico-consulta" key={medico.id}>                
                <li
                  onClick={() => context.setMedico(medico)}
                >
                  {medico.nome}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </form>
    </div>
  );
}

export default BuscarMedico;
