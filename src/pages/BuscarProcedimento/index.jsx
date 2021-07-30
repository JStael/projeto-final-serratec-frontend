import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../providers/GlobalContext";
import http from "../../services/http";
import Header from "../../components/Header";
import MenuLateral from "../../components/MenuLateral";
import "./style.css";

function BuscarProcedimento() {
  const context = useContext(GlobalContext);

  const [nome, setNome] = useState("");
  const [procedimentos, setProcedimentos] = useState([]);
  const [procedimentoNaoEncontrado, setProcedimentoNaoEncontrado] = useState("")

  const pesquisarProcedimento = (ev) => {
    ev.preventDefault();
    setProcedimentoNaoEncontrado("");
    setProcedimentos([]);
    
    http
      .get(`procedimentos/nome/${nome}`)
      .then((response) => {
        setProcedimentos(response.data);
        setNome("");
        console.log(procedimentos);
      })
      .catch((response) => {
        if (response.request.status === 404) setProcedimentoNaoEncontrado("Procedimento não encontrado.")
      });
  };

  return (
    <div>
      <Header />
      <MenuLateral />
      <form className="form-consultar-procedimento" onSubmit={pesquisarProcedimento}>
        <div className="header-consultar-procedimento mb-3 bg-primary text-white">
          <h5 className="mb-0">Buscar procedimento</h5>
        </div>
        <div className="d-flex flex-row flex-wrap justify-content-between">
          <div className="corpo-consultar-procedimento">
            <div className="w-75">
              <label className="mb-2">Nome</label>
              <input
                className="form-control py-1 px-4"
                required
                type="text"
                value={nome}
                onChange={(evento) => setNome(evento.target.value)}
                placeholder="Digite o nome do procedimento"
              />
            </div>
            <button className="btn btn-primary botao-consultar-procedimento">
              Consultar
            </button>
          </div>
        </div>
        <hr />
        <div className="resultado-pesquisa py-4">
          <h6 className="titulo-resultado-pesquisa">{`Procedimentos encontrados: ${procedimentos.length}`}</h6>
            {procedimentoNaoEncontrado}
          <ul>
            {procedimentos.map((procedimento) => (
              <Link to={`buscar-procedimento/procedimento`} className="procedimento-consulta" key={procedimento.id}>                
                <li
                  onClick={() => context.setProcedimento(procedimento)}
                >
                  {procedimento.nomeProcedimento}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </form>
    </div>
  );
}

export default BuscarProcedimento;
