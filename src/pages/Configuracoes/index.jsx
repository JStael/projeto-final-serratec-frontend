import { Link } from "react-router-dom";
import "./style.css";
import Header from "../../components/Header";
import MenuLateral from "../../components/MenuLateral";

function Configuração() {
  return (
    <>
      <Header />
      <MenuLateral />
      <div className="container p-0">
        <form className="form-editar-empresa">
          <div className="header-editar-empresa mb-3 bg-primary text-white">
            <h5 className="mb-0">Editar Informações da Empresa</h5>
          </div>
          <div className=" d-flex flex-row flex-wrap justify-content-around">
            <div className="corpo-editar-empresa1">
              <div>
                <label className="mb-2">Email</label>
                <input className="form-control py-1 px-4" required />
              </div>
              <div>
                <label className="mb-2">Telefone</label>
                <input className="form-control py-1 px-4" required />
              </div>
              <div>
                <label className="mb-2">Cep</label>
                <input className="form-control py-1 px-4" required />
              </div>
              <div>
                <label className="mb-2">Rua</label>
                <input className="form-control py-1 px-4" required />
              </div>
            </div>
            <div className="corpo-editar-empresa2">
              <div>
                <label className="mb-2">Número do Estabelecimento</label>
                <input className="form-control py-1 px-4" required />
              </div>
              <div>
                <label className="mb-2">Bairro</label>
                <input className="form-control py-1 px-4" required />
              </div>
              <div className="">
                <label className="mb-2">Cidade</label>
                <input className="form-control py-1 px-4" required />
              </div>
              <div>
                <label className="mb-2">Estado</label>
                <input className="form-control py-1 px-4" required />
              </div>
            </div>
            <div className="botoes-editar-empresa-color">
              <button className="btn btn-primary">Salvar</button>
              <Link to="/home" className="btn btn-danger">
                Cancelar
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
export default Configuração;
