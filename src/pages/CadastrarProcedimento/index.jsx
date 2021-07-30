import { useState } from "react";
import { useHistory } from "react-router-dom";
import http from "../../services/http";
import Header from "../../components/Header";
import MenuLateral from "../../components/MenuLateral";

import "./style.css";

function CadastroProcedimento() {
  const [tipoProcedimento, setProcedimento] = useState("");
  const [descricaoProcedimento, setDescricaoProcedimento] = useState("");
  const [honorario, setHonorario] = useState("");

  const history = useHistory();

  const efetuarCadastro = (evento) => {
    evento.preventDefault();
    const procedimento = {
      nomeProcedimento: tipoProcedimento,
      descricao: descricaoProcedimento,
      valor: honorario,
    };
    http
      .post("procedimentos/", procedimento)
      .then((response) => {
        alert(`Procedimento ${tipoProcedimento} cadastrado com sucesso!`);
        setProcedimento("");
        setDescricaoProcedimento("");
        setHonorario("");
      })
      .catch((erro) => {
        console.log("Hmmm.. Tem algo errado");
        console.log(erro);
      });
  };

  return (
    <>
      <Header />
      <MenuLateral />
      <div className="container">
        <form
          className="form-cadastro-procedimentos"
          onSubmit={efetuarCadastro}
        >
          <div className="header-cadastro-procedimentos bg-primary text-white m-0">
            <h5 className="mb-0">Cadastro de procedimentos</h5>
          </div>
          <div className=" d-flex flex-row flex-wrap justify-content-center">
            <div className="corpo-cadastro-procedimentos w-100">
              <div className="w-75">
                <label className="mb-2">Procedimento</label>
                <input
                  className="form-control py-1 px-4"
                  required
                  type="text"
                  value={tipoProcedimento}
                  onChange={(evento) => setProcedimento(evento.target.value)}
                />
              </div>
              <div className="w-75">
                <label className="mb-2">Descrição</label>
                <textarea
                  className="form-control py-1 px-4"
                  required
                  value={descricaoProcedimento}
                  onChange={(evento) =>
                    setDescricaoProcedimento(evento.target.value)
                  }
                />
              </div>
              <div className="w-75">
                <label className="mb-2">Honorários</label>
                <input
                  className="form-control py-1 px-4"
                  required
                  type="double"
                  value={honorario}
                  onChange={(evento) => setHonorario(evento.target.value)}
                />
              </div>
            </div>
            <div className="botoes-cadastro-procedimentos mb-4">
              <button className="btn btn-primary">Cadastrar</button>
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

export default CadastroProcedimento;
