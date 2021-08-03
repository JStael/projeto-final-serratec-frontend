import { useState } from "react";
import { useHistory } from "react-router-dom";
import ModalMenu from "../ModalMenu";
import "./style.css";

function MenuLateral() {

  const history = useHistory();

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
          <li onClick={() => history.push("/recibo/gerar-recibo")}>
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
          <li
            data-bs-toggle="modal"
            data-bs-target="#configuracoes"
          >
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
        tituloBtn1="Cadastrar"
        tituloBtn2="Consultar"
      />
      {/* MODAL PROCEDIMENTOS */}
      <ModalMenu
        id="procedimentos"
        titulo="Procedimentos"
        rotaCadastrar="cadastrar-procedimento"
        rotaConsultar="buscar-procedimento"
        tituloBtn1="Cadastrar"
        tituloBtn2="Consultar"
      />
      {/* MODAL USUÁRIOS */}
      <ModalMenu
        id="usuarios"
        titulo="Usuários"
        rotaCadastrar="cadastrar-usuario"
        rotaConsultar="buscar-usuario"
        tituloBtn1="Cadastrar"
        tituloBtn2="Consultar"
      />
      {/* MODAL CONFIGURAÇÕES */}
      <ModalMenu
        id="configuracoes"
        titulo="Configurações"
        rotaCadastrar="configuracoes/empresa"
        rotaConsultar="configuracoes/sistema"
        tituloBtn1="Empresa"
        tituloBtn2="Sistema"
      />
    </>
  );
}

export default MenuLateral;
