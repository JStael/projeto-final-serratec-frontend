import http from "../../services/http";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../providers/GlobalContext";
import Header from "../../components/Header";
import MenuLateral from "../../components/MenuLateral";
import "./style.css";

function BuscarColaborador() {
  const context = useContext(GlobalContext);

  const [nome, setNome] = useState("");
  const [colaboradores, setColaboradores] = useState([]);
  const [colaboradorNaoEncontrado, setColaboradorNaoEncontrado] = useState("")

  const pesquisarColaborador = (ev) => {
    ev.preventDefault();
    setColaboradorNaoEncontrado("");
    setColaboradores([]);
    http
      .get(`usuarios/nome/${nome}`)
      .then((response) => {
        setColaboradores(response.data);
        setNome("");
      })
      .catch((response) => {
        if (response.request.status === 404) setColaboradorNaoEncontrado("Colaborador não encontrado.")
      });
  };

  return (
    <div>
      <Header />
      <MenuLateral />
      <form className="form-consultar-colaborador" onSubmit={pesquisarColaborador}>
        <div className="header-consultar-colaborador mb-3 bg-primary text-white">
          <h5 className="mb-0">Buscar colaborador</h5>
        </div>
        <div className="d-flex flex-row flex-wrap justify-content-between">
          <div className="corpo-consultar-colaborador">
            <div className="w-75">
              <label className="mb-2">Nome</label>
              <input
                className="form-control py-1 px-4"
                required
                type="text"
                value={nome}
                onChange={(evento) => setNome(evento.target.value)}
                placeholder="Digite o nome do colaborador"
              />
            </div>
            <button className="btn btn-primary botao-consultar-colaborador">
              Consultar
            </button>
          </div>
        </div>
        <hr />
        <div className="resultado-pesquisa py-4">
          <h6 className="titulo-resultado-pesquisa">{`Colaboradores encontrados: ${colaboradores.length}`}</h6>
            {colaboradorNaoEncontrado}
          <ul>
            {colaboradores.map((colaborador) => (
              <Link to={`/buscar-usuario/buscar-colaborador/colaborador`} className="colaborador-consulta" key={colaborador.id}>                
                <li
                  onClick={() => context.setColaborador(colaborador)}
                >
                  {colaborador.nome}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </form>
    </div>
  );
}

export default BuscarColaborador;
