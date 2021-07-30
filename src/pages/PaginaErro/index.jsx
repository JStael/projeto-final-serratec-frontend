import { useHistory } from "react-router-dom";
import Erro from "../../assets/images/1156412.png";
import "./style.css";

function PaginaErro() {
  const history = useHistory();
  return (
    <div className="quadroerro">
      <img src={Erro} alt="404Error" className="erro" />
      <div className="textoerro">
        <h2 className="hi1">Opa! Pagina não encontrada</h2>
        <button
          className="botaoerro btn btn-outline-primary"
          onClick={() => history.goBack()}
        >
          Voltar
        </button>
      </div>
    </div>
  );
}

export default PaginaErro;
