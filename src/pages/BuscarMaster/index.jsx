import axios from "axios";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../providers/GlobalContext";
import Header from "../../components/Header";
import MenuLateral from "../../components/MenuLateral";
import "./style.css";

function BuscarMaster() {
  const context = useContext(GlobalContext);

  const [nome, setNome] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioNaoEncontrado, setUsuarioNaoEncontrado] = useState("")

  const pesquisarMaster = (ev) => {
    ev.preventDefault();
    setUsuarioNaoEncontrado("");
    setUsuarios([]);
    axios
      .get(`http://localhost:8080/api/usuarios/nome/${nome}`)
      .then((response) => {
        setUsuarios(response.data);
        setNome("");
      })
      .catch((response) => {
        if (response.request.status === 404) setUsuarioNaoEncontrado("Usuário não encontrado.")
      });
  };

  return (
    <div>
      <Header />
      <MenuLateral />
      <form className="form-consultar-master" onSubmit={pesquisarMaster}>
        <div className="header-consultar-master mb-3 bg-primary text-white">
          <h5 className="mb-0">Consulta de usuario master</h5>
        </div>
        <div className="d-flex flex-row flex-wrap justify-content-between">
          <div className="corpo-consultar-master">
            <div className="w-75">
              <label className="mb-2">Nome</label>
              <input
                className="form-control py-1 px-4"
                required
                type="text"
                value={nome}
                onChange={(evento) => setNome(evento.target.value)}
                placeholder="Digite o nome completo do usuário"
              />
            </div>
            <button className="btn btn-primary botao-consultar-master">
              Consultar
            </button>
          </div>
        </div>
        <hr />
        <div className="resultado-pesquisa py-4">
          <h6 className="titulo-resultado-pesquisa">{`Usuários encontrados: ${usuarios.length}`}</h6>
            {usuarioNaoEncontrado}
          <ul>
            {usuarios.map((usuario) => (
              <Link to={`/buscar-usuario/buscar-master/master`} className="master-consulta" key={usuario.id}>                
                <li
                  onClick={() => context.setMaster(usuario)}
                >
                  {usuario.nome}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </form>
    </div>
  );
}

export default BuscarMaster;
