import { useState, useContext } from "react";
import http from "../../services/http";
import { GlobalContext } from "../../providers/GlobalContext";
import Header from "../../components/Header";
import MenuLateral from "../../components/MenuLateral";
import "./style.css";

function Procedimento() {
  const context = useContext(GlobalContext);
  const { procedimento } = context;

  const [readOnly, setReadOnly] = useState(true);

  const id = procedimento.id;
  const [nome, setNome] = useState(procedimento.nomeProcedimento);
  const [descricao, setDescricao] = useState(procedimento.descricao);
  const [honorario, setHonorario] = useState(procedimento.valor);

  const editarCadastro = (evento) => {
    evento.preventDefault();
    setReadOnly(true);
    const procedimento = {
      id: id,
      nomeProcedimento: nome,
      descricao: descricao,
      valor: honorario,
    };

    http
      .put(`procedimentos/${id}`, procedimento)
      .then((response) => {
        alert(`Cadastro do procedimento ${nome} alterado com sucesso!`);
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
      <div className="container p-0">
        <form className="form-consulta-procedimento" onSubmit={editarCadastro}>
          <div className="header-consulta-procedimento mb-3 bg-primary text-white">
            <h5 className="mb-0">Consulta de procedimento</h5>
            <i
              className="fas fa-edit text-white fs-3 icone-consulta-procedimento"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              title="Editar consulta"
              onClick={() =>
                readOnly ? setReadOnly(false) : setReadOnly(true)
              }
            ></i>
          </div>
          <div className=" d-flex flex-row flex-wrap justify-content-around">
            <div className="corpo-consulta-procedimento">
              <div>
                <label className="mb-2">Nome</label>
                <input
                  readOnly={readOnly}
                  className="form-control py-1 px-4"
                  required
                  type="text"
                  value={nome}
                  onChange={(evento) => setNome(evento.target.value)}
                  placeholder="Digite o nome do procedimento"
                />
              </div>
              <div>
                <label className="mb-2">Descrição</label>
                <input
                  readOnly={readOnly}
                  className="form-control py-1 px-4"
                  required
                  value={descricao}
                  onChange={(evento) => setDescricao(evento.target.value)}
                  placeholder="Digite a descrição do procedimento"
                />
              </div>
              <div>
                <label className="mb-2">Honorário</label>
                <input
                  readOnly={readOnly}
                  className="form-control py-1 px-4"
                  required
                  type="number"
                  value={honorario}
                  onChange={(evento) => setHonorario(evento.target.value)}
                  placeholder="Digite o valor do procedimento"
                />
              </div>
            </div>
            <div className="botoes-consulta-procedimento">
              {!readOnly && <button className="btn btn-primary">Salvar</button>}
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Procedimento;
