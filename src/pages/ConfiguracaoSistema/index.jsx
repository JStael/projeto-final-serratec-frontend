import { useContext } from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Header from "../../components/Header";
import MenuLateral from "../../components/MenuLateral";
import ModalCriarLayout from "../../components/ModalCriarLayout";
import ModalEditarLayout from "../../components/ModalEditarLayout";
import { GlobalContext } from "../../providers/GlobalContext";
import http from "../../services/http";

import "./style.css";

function ConfiguracaoSistema() {

  const { setLayout } = useContext(GlobalContext);
  const history = useHistory();

  const [layouts, setLayouts] = useState([]);

  useEffect(() => {
    http.get("layouts").then((response) => {
      const { data } = response;
      setLayouts(data);
    });
  }, []);

  return (
    <>
      <Header />
      <MenuLateral />
      <div className="container p-0">
        <form className="form-config-sistema">
          <div className="header-config-sistema mb-3 bg-primary text-white">
            <h5 className="mb-0">Configurações do sistema</h5>
          </div>
          <div className="aparencia mb-2">
            <h5 className="titulo-aparencia">Aparência</h5>
            <div className="d-flex justify-content-start w-100">
              <div className="corpo-tema">
                <label className="me-3">Tema:</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option defaultValue="light">Light</option>
                  <option defaultValue="dark">Dark</option>
                </select>
              </div>
              <div className="corpo-logo">
                <label>Logo:</label>
                <input type="file" className="form-control" />
              </div>
            </div>
            <div className="botoes-tema">
              <button className="btn btn-primary mx-2">Salvar</button>
              <button
                type="button"
                className="btn btn-outline-danger mx-2"
                onClick={() => history.goBack()}
              >
                Cancelar
              </button>
            </div>
          </div>
          <hr />
          <div className="recibo mb-5">
            <h5 className="titulo-aparencia">Recibo</h5>
            <div className="botoes-recibo">
              <button
                type="button"
                className="btn btn-primary m-2"
                data-bs-toggle="modal"
                data-bs-target="#criarLayout"
              >
                Criar layout de recibo
              </button>
              <div className="btn-group dropend">
                <button
                  type="button"
                  className="btn btn-primary m-2 dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Alterar layout de recibo
                </button>
                <ul className="dropdown-menu lista-recibo">
                  {layouts.map((layout) => (
                    <li
                      className="layout p-2"
                      key={layout.id}
                      data-bs-toggle="modal"
                      data-bs-target="#alterarLayout"
                      onClick={() => setLayout(layout)}
                    >
                      {layout.nome}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </form>

        {/* MODAL CRIAR LAYOUT */}
        <ModalCriarLayout />
        {/* MODAL ALTERAR LAYOUT */}
        <ModalEditarLayout />
      </div>
    </>
  );
}
export default ConfiguracaoSistema;
