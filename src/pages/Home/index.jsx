import { Link } from "react-router-dom";
import Header from "../../components/Header";
import "./style.css";

function Home() {
  return (
    <>
      <Header />
      <div className="container">
        <div className="card-home">
          <div className="bg-primary background">
            <div className="titulo-card-home">
              <i className="fas fa-id-badge mx-3 fs-2 text-white"></i>
              <h4 className="text-white">PACIENTES</h4>
            </div>
            <div className="corpo-card-home">
              <Link
                to="/cadastrar-paciente"
                className="btn btn-primary btn-card-home"
              >
                Cadastrar
              </Link>
              <Link
                to="/buscar-paciente"
                className="btn btn-primary btn-card-home"
              >
                Consultar
              </Link>
            </div>
          </div>
        </div>

        {/* PROCEDIMENTOS */}

        <div className="card-home">
          <div className="bg-primary background">
            <div className="titulo-card-home">
              <i className="fas fa-syringe mx-3 fs-2 text-white"></i>
              <h4 className="text-white">PROCEDIMENTOS</h4>
            </div>
            <div className="corpo-card-home">
              <Link
                to="/cadastrar-procedimento"
                className="btn btn-primary btn-card-home"
              >
                Cadastrar
              </Link>
              <Link
                to="/buscar-procedimento"
                className="btn btn-primary btn-card-home"
              >
                Consultar
              </Link>
            </div>
          </div>
        </div>

        {/* RECIBOS */}

        <div className="card-home">
          <div className="bg-primary background">
            <div className="titulo-card-home">
              <i className="fas fa-receipt mx-3 fs-2 text-white"></i>
              <h4 className="text-white">RECIBOS</h4>
            </div>
            <div className="corpo-card-home">
              <Link
                to="/recibo/gerar-recibo"
                className="btn btn-primary btn-card-home"
              >
                Gerar
              </Link>
              <Link
                to="/recibo/historico-recibo"
                className="btn btn-primary btn-card-home"
              >
                Hist??rico
              </Link>
            </div>
          </div>
        </div>

        {/* USUARIOS */}

        <div className="card-home">
          <div className="bg-primary background">
            <div className="titulo-card-home">
              <i className="fas fa-users mx-3 fs-2 text-white"></i>
              <h4 className="text-white">USUARIOS</h4>
            </div>
            <div className="corpo-card-home">
              <Link
                to="/cadastrar-usuario"
                className="btn btn-primary btn-card-home"
              >
                Cadastrar
              </Link>
              <Link
                to="/buscar-usuario"
                className="btn btn-primary btn-card-home"
              >
                Consultar
              </Link>
            </div>
          </div>
        </div>

        {/* CONFIGURA????O */}

        <div className="card-home">
          <div className="bg-primary background">
            <div className="titulo-card-home">
              <i className="fas fa-cogs mx-3 fs-2 text-white"></i>
              <h4 className="text-white">CONFIGURA????O</h4>
            </div>
            <div className="corpo-card-home">
              <Link
                to="/configuracoes/empresa"
                className="btn btn-primary btn-card-home"
              >
                Empresa
              </Link>
              <Link
                to="/configuracoes/sistema"
                className="btn btn-primary btn-card-home"
              >
                Sistema
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
