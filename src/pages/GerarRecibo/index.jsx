import { useState } from "react";
import { useHistory } from "react-router";
import Header from "../../components/Header";
import MenuLateral from "../../components/MenuLateral";
import "./style.css";

function GerarRecibo() {
  const history = useHistory();

  const [paciente, setPaciente] = useState("");
  const [medico, setMedico] = useState("");
  const [procedimento, setProcedimento] = useState("");

  const gerarRecibo = () => {};

  return (
    <>
      <Header />
      <MenuLateral />
      <div className="container p-0">
        <form className="form-gerar-recibo" onSubmit={gerarRecibo}>
          <div className="header-gerar-recibo bg-primary text-white">
            <h5 className="mb-0">Gerar recibo</h5>
          </div>
          <div className=" d-flex flex-row flex-wrap p-4 mb-2 justify-content-around">
            <div className="corpo-gerar-recibo">
              <div>
                <label className="mb-2">Layout do recibo</label>
                <select className="form-select">
                  <option defaultValue>Selecione o modelo do layout</option>
                  <option defaultValue="1">1</option>
                  <option defaultValue="2">2</option>
                  <option defaultValue="3">3</option>
                </select>
              </div>
              <div>
                <label className="mb-2">Paciente</label>
                <input
                  className="form-control py-1 px-4"
                  required
                  type="text"
                  value={paciente}
                  onChange={(evento) => setPaciente(evento.target.value)}
                  placeholder="Digite o nome do paciente"
                />
              </div>
              <div>
                <label className="mb-2">Médico</label>
                <input
                  className="form-control py-1 px-4"
                  required
                  type="text"
                  value={medico}
                  onChange={(evento) => setMedico(evento.target.value)}
                  placeholder="Digite o nome do médico"
                />
              </div>
              <div>
                <label className="mb-2">Procedimento</label>
                <input
                  className="form-control py-1 px-4"
                  required
                  type="text"
                  value={procedimento}
                  onChange={(evento) => setProcedimento(evento.target.value)}
                  placeholder="Digite o tipo do procedimento"
                />
              </div>
            </div>
            <div className="botoes-gerar-recibo">
              <button className="btn btn-primary">Gerar</button>
              <button
                className="btn btn-outline-primary"
                onClick={() => history.goBack()}
              >
                Voltar
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default GerarRecibo;
