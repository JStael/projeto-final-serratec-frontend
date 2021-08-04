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
          <li data-bs-toggle="modal"
            data-bs-target="#recibo">
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
        rota1="cadastrar-paciente"
        rota2="buscar-paciente"
        tituloBtn1="Cadastrar"
        tituloBtn2="Consultar"
      />
      {/* MODAL PROCEDIMENTOS */}
      <ModalMenu
        id="procedimentos"
        titulo="Procedimentos"
        rota1="cadastrar-procedimento"
        rota2="buscar-procedimento"
        tituloBtn1="Cadastrar"
        tituloBtn2="Consultar"
      />
      {/* MODAL USUÁRIOS */}
      <ModalMenu
        id="usuarios"
        titulo="Usuários"
        rota1="cadastrar-usuario"
        rota2="buscar-usuario"
        tituloBtn1="Cadastrar"
        tituloBtn2="Consultar"
      />
      {/* MODAL RECIBO */}
      <ModalMenu
        id="recibo"
        titulo="Recibo"
        rota1="recibo/gerar-recibo"
        rota2="recibo/historico-recibo"
        tituloBtn1="Gerar"
        tituloBtn2="Histórico"
      />
      {/* MODAL CONFIGURAÇÕES */}
      <ModalMenu
        id="configuracoes"
        titulo="Configurações"
        rota1="configuracoes/empresa"
        rota2="configuracoes/sistema"
        tituloBtn1="Empresa"
        tituloBtn2="Sistema"
      />
    </>
  );
}

export default MenuLateral;
