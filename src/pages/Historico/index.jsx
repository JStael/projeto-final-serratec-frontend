import { useState } from "react";
import { useHistory } from "react-router-dom";
import http from "../../services/http";
import Header from "../../components/Header";
import MenuLateral from "../../components/MenuLateral";
import "./style.css";
import { useEffect } from "react";
import { Group, List } from "@material-ui/icons";
import { ListGroupItem } from "reactstrap";

function Historico() {
  const history = useHistory();

  const [recibos, setRecibos] = useState([]);
  useEffect(() => {
    http
      .get("http://localhost:8080/api/recibos")
      .then((response) => {
        const { data } = response;
        setRecibos(data);
      })
      .catch((erro) => console.error(erro));
  }, []);

  const abrirRecibo = () => {};

  return (
    <>
      <Header />
      <MenuLateral />
      <div className="container">
        <form className="form-cadastro-procedimentos">
          <div className="header-cadastro-procedimentos bg-primary text-white m-0">
            <h5 className="mb-0">Historico de Recibo</h5>
          </div>
          <ul className="list-group">
            {recibos.map((recibo) => (
              <li className="list-group-item">
                <input
                  className="form-check-input me-1"
                  type="checkbox"
                  value={recibo.nome}
                  aria-label="..."
                />
              </li>
            ))}
          </ul>
          <div className=" d-flex flex-row flex-wrap justify-content-center ">
            <div className="corpo-cadastro-procedimentos w-100"></div>
            <div className="botoes-cadastro-paciente">
              <button className="btn btn-primary" onClick={() => abrirRecibo()}>
                Pegar
              </button>
              <button
                className="btn btn-danger"
                onClick={() => history.goBack()}
              >
                Cancelar
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Historico;
