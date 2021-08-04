import { useState } from "react";
import http from "../../services/http";

function ModalCriarLayout() {
  const [nome, setNome] = useState("");
  const [dataEmissao, setDataEmissao] = useState(false);
  const [coladorador, setColadorador] = useState(false);
  const [formaPagamento, setFormaPagamento] = useState(false);

  const cadastrarLayout = (evento) => {
    evento.preventDefault();

    const layout = {
      nome: nome,
      secretaria: coladorador,
      data: dataEmissao,
      formaPagamento: formaPagamento,
    };

    http.post("layouts", layout).then((response) => console.log(response.data));
  };

  return (
    <div className="modal fade " id="criarLayout" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content ">
          <div className="modal-header btn-primary">
            <h5 className="modal-title">Criar layout</h5>
          </div>
          <form className="modal-body p-4" onSubmit={cadastrarLayout}>
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
                  value={coladorador}
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
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModalCriarLayout;
