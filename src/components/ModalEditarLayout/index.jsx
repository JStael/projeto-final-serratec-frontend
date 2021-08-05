import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../../providers/GlobalContext";
import http from "../../services/http";
import "./style.css";

function ModalEditarLayout() {
  const { layout } = useContext(GlobalContext);
  const [checkedDataEmissao, setCheckedDataEmissao] = useState(false);
  const [checkedColab, setCheckedColab] = useState(false);
  const [checkedFormaPagamento, setCheckedFormaPagamento] = useState(false);
  const [checkedAtivo, setCheckedAtivo] = useState(false);

  const id = layout.id;
  const [nome, setNome] = useState(false);
  const [dataEmissao, setDataEmissao] = useState(false);
  const [colaborador, setColadorador] = useState(false);
  const [formaPagamento, setFormaPagamento] = useState(false);
  const [ativo, setAtivo] = useState(false);

  useEffect(() => {
    setCheckedColab(layout.secretaria);
    setCheckedDataEmissao(layout.data);
    setCheckedFormaPagamento(layout.formaPagamento);
    setCheckedAtivo(layout.ativo);
    setNome(layout.nome);
    setDataEmissao(layout.data);
    setColadorador(layout.secretaria);
    setFormaPagamento(layout.formaPagamento);
    setAtivo(layout.ativo);
    return
  }, [layout]);

  const editarLayout = (evento) => {
    evento.preventDefault();

    const layoutEditado = {
      nome: nome,
      secretaria: colaborador,
      data: dataEmissao,
      formaPagamento: formaPagamento,
      ativo: ativo,
    };

    http
      .put(`layouts/${id}`, layoutEditado)
      .then((response) => { 
        alert(`Layout ${nome} alterado com sucesso!`)
        console.log(response);
      })
      .catch((erro) => console.error(erro));
  };

  const deletarLayout = () => {
    http
      .delete(`layouts/${id}`)
      .then((response) => {
        alert(`Layout ${nome} excluído com sucesso!`)
      })
      .catch((erro) => console.error(erro));
  };

  const handleChangeColab = ({ target }) => {
    setCheckedColab(!checkedColab);
    setColadorador(target.checked);
  };

  const handleChangeData = ({ target }) => {
    setCheckedDataEmissao(!checkedDataEmissao);
    setDataEmissao(target.checked);
  };

  const handleChangePgto = ({ target }) => {
    setCheckedFormaPagamento(!checkedFormaPagamento);
    setFormaPagamento(target.checked);
  };

  const handleChangeAtivo = ({ target }) => {
    setCheckedAtivo(!checkedAtivo);
    setAtivo(target.checked);
  };

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
                onChange={({target}) => setNome(target.value)}
              />
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="dataEmissao"
                  value={dataEmissao}
                  checked={checkedDataEmissao}
                  onChange={handleChangeData}
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
                  value={colaborador}
                  checked={checkedColab}
                  onChange={handleChangeColab}
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
                  checked={checkedFormaPagamento}
                  onChange={handleChangePgto}
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
                  checked={checkedAtivo}
                  onChange={handleChangeAtivo}
                />
                <label className="form-check-label" htmlFor="ativo">
                  Ativo
                </label>
              </div>
            </div>
            <div className="botoes-modal-layout">
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
              <button
                type="button"
                className="botao-delete-modal"
                onClick={deletarLayout}
                data-bs-dismiss="modal"
              >
                <i className="far fa-trash-alt fs-4 text-danger"></i>
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
  );
}

export default ModalEditarLayout;
