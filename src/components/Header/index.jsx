
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import "./style.css";
import { useContext } from "react";
import { GlobalContext } from "../../providers/GlobalContext";

function Header() {

  const { usuario, logout } = useContext(GlobalContext);

  return (
    <header className="py-3 px-5 mb-2 bg-primary text-white">
      <img src={logo} alt="Logo SerraMed" />
      <div className="usuario">
        <div className="dropdown usuario">
          <button
            className="dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <em>Bem vindo,</em>
            <span className="ms-2">
              <strong>{usuario}</strong>
            </span>
            <i className="fas fa-user-circle iconeUsuario"></i>
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <Link
                to="/"
                className="dropdown-item d-flex justify-content-start align-items-center"
                onClick={logout}
              >
                <i className="fas fa-sign-out-alt text-danger"></i>
                <span className="ms-2 text-danger">Sair</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
