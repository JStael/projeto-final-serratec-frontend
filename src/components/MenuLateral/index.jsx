import { useState } from "react";
import ModalMenu from "../ModalMenu";
import "./style.css";

function MenuLateral() {

  const [expandir, setExpandir] = useState("");
  const [expandirBotao, setExpandirBotao] = useState("");

  const expandirMenu = () => {
    expandir ? setExpandir("") : setExpandir("expandir");
    expandirBotao ? setExpandirBotao("") : setExpandirBotao("expandir-botao");
  };

  return (
    <>
      <nav className={`menu-lateral ${expandir}`}>
        <ul>
          <li data-bs-toggle="modal" data-bs-target="#pacientes">
            <span className="icones">
              <i className="fas fa-id-badge fs-4 text-white"></i>
            </span>
            <span className="texto-menu">PACIENTES</span>
          </li>
          <li data-bs-toggle="modal" data-bs-target="#procedimentos">
            <span className="icones">
              <i className="fas fa-syringe fs-4 text-white"></i>
            </span>
            <span className="texto-menu">PROCEDIMENTOS</span>
          </li>
          <li>
            <span className="icones">
              <i className="fas fa-receipt fs-4 text-white"></i>
            </span>
            <span className="texto-menu">RECIBOS</span>
          </li>
          <li data-bs-toggle="modal" data-bs-target="#usuarios">
            <span className="icones">
              <i className="fas fa-users fs-4 text-white"></i>
            </span>
            <span className="texto-menu">USUÁRIOS</span>
          </li>
          <li onClick={() => history.push("/configuracoes")}> 
            <span className="icones">
              <i className="fas fa-cogs fs-4 text-white"></i>
            </span>
            <span className="texto-menu">CONFIGURAÇÃO</span>
          </li>
        </ul>
      </nav>
      <div className={`botao-menu ${expandirBotao}`} onClick={expandirMenu}>
        <i className="fas fa-angle-right text-white fs-3"></i>
      </div>
      {/* MODAL PACIENTES */}
      <ModalMenu
        id="pacientes"
        titulo="Pacientes"
        rotaCadastrar="cadastrar-paciente"
        rotaConsultar="buscar-paciente"
      />
      <ModalMenu
        id="procedimentos"
        titulo="Procedimentos"
        rotaCadastrar="cadastrar-procedimento"
        rotaConsultar="buscar-procedimento"
      />
      <ModalMenu
        id="usuarios"
        titulo="Usuários"
        rotaCadastrar="cadastrar-usuario"
        rotaConsultar="buscar-usuario"
      />
    </>
  );
}

export default MenuLateral;
