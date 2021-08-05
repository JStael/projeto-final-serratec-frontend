import { useState } from "react";
import { useHistory } from "react-router-dom";
import http from "../../services/http";
import Header from "../../components/Header";
import MenuLateral from "../../components/MenuLateral";
import "./style.css";
import { useEffect } from "react";
function Historico() {
  const history = useHistory();

  const [recibos, setRecibos] = useState([]);
  useEffect(() => {
    setRecibos([
      { nome: "Joao", data: "30/07/1996", genero: "masculino" },
      { nome: "Joao", idade: "29", genero: "masculino" },
    ]);
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
          <div className="fora w-100 px-4">
            <table className="table px-2">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">First</th>
                  <th scope="col">Last</th>
                  <th scope="col">Handle</th>
                </tr>
              </thead>
              <tbody>
                {recibos.map((recibo) => (
                  <tr>
                    <th scope="row">
                      {" "}
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                      />
                    </th>
                    <td>{recibo.nome}</td>
                    <td>{recibo.idade}</td>
                    <td>{recibo.genero}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className=" d-flex flex-row flex-wrap justify-content-center ">
            <div className="corpo-cadastro-procedimentos w-100"></div>
            <div className="botoes-cadastro-paciente">
              <button className="btn btn-primary" onClick={() => abrirRecibo()}>
                Abrir
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
