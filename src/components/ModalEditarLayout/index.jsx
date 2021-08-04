import { useContext, useState } from "react";
import { GlobalContext } from "../../providers/GlobalContext";
import http from "../../services/http";
import { Toast } from "react-bootstrap";

function ModalEditarLayout() {

  const { layout } = useContext(GlobalContext)
  console.log(layout);

  const [showAlterar, setShowAlterar] = useState(false);
  const [showDeletar, setShowDeletar] = useState(false);

  const id = layout.id;
  const [nome, setNome] = useState(layout.nome);
  const [dataEmissao, setDataEmissao] = useState(layout.data);
  const [colaborador, setColadorador] = useState(layout.secretaria);
  const [formaPagamento, setFormaPagamento] = useState(layout.formaPagamento);
  const [ativo, setAtivo] = useState(layout.ativo);

  console.log(colaborador);
  console.log(layout.secretaria);
  const editarLayout = (evento) => {
    evento.preventDefault();

    const layout = {
      nome: nome,
      secretaria: colaborador,
      data: dataEmissao,
      formaPagamento: formaPagamento,
    };
    console.log(layout);

    http.put(`layouts/${id}`, layout).then((response) => mostrarToastAlterar());
  };

  const deletarLayout = () => {
    http
      .delete(`delete/${id}`)
      .then(response => {
        mostrarToastDeletar();
      })
  }

  const mostrarToastAlterar = () => {
    setShowAlterar(true);
  }

  const mostrarToastDeletar = () => {
    setShowDeletar(true);
  }

  return (
    <div className="modal fade " id="alterarLayout" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content ">
          <div className="modal-header btn-primary">
            <h5 className="modal-title">Editar layout</h5>
          </div>
          <form className="modal-body p-4" onSubmit={editarLayout}>
            <div className="corpo-criar-layout">
              <label>
                <strong>Insira o nome do layout</strong>
              </label>
              <input
                required
                className="form-control mb-3"
                type="text"
                value={nome}
                onChange={(evento) => setNome(evento.target.value)}
              />
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="dataEmissao"
                  value={dataEmissao}
                  onChange={(evento) => setDataEmissao(evento.target.value)}
                />
                <label className="form-check-label" htmlFor="dataEmissao">
                  Data de emissão
                </label>
              </div>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="colaborador"
                  value={[colaborador]}
                  onChange={(evento) => setColadorador(evento.target.checked)}
                />
                <label className="form-check-label" htmlFor="colaborador">
                  Coladorador
                </label>
              </div>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="formaPagamento"
                  value={formaPagamento}
                  onChange={(evento) => setFormaPagamento(evento.target.checked)}
                />
                <label className="form-check-label" htmlFor="formaPagamento">
                  Forma de pagamento
                </label>
              </div>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="ativo"
                  value={ativo}
                  onChange={(evento) => setAtivo(evento.target.checked)}
                />
                <label className="form-check-label" htmlFor="ativo">
                  Ativo
                </label>
              </div>
            </div>
            <button
              className="btn btn-primary btn-card-home fs-6"
              data-bs-dismiss="modal"
            >
              Salvar
            </button>
            <button
              type="button"
              className="btn btn-outline-primary btn-card-home fs-6"
              data-bs-dismiss="modal"
            >
              Cancelar
            </button>
            <button type="button" onClick={deletarLayout}><i class="far fa-trash-alt"></i></button>
          </form>
        </div>
      </div>
      <Toast className="toast btn-success bg-success" show={showAlterar} delay={5000} autohide>
        <Toast.Body>{`Layout ${nome} alterado com sucesso!`}</Toast.Body>
      </Toast>
      <Toast className="toast btn-success bg-success" show={showDeletar} delay={5000} autohide>
        <Toast.Body>{`Layout ${nome} excluído com sucesso!`}</Toast.Body>
      </Toast>
    </div>
  );
}

export default ModalEditarLayout;
