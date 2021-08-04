import { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
//import Avatar from "react-avatar-edit";

function ConfiguracaoSistema() {
  return (
    <div className="container p-0">
      <form className="form-editar-empresa">
        <div className="header-editar-empresa mb-3 bg-primary text-white">
          <h5 className="mb-0">Editar Estetica da Empresa</h5>
        </div>
        <div className=" d-flex flex-row flex-wrap justify-content-around ">
          <div className="corpo-editar-empresa1">
            <select class="form-select" aria-label="Default select example">
              <option selected>Escolha a cor do site</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div className="botoes-editar-empresa-color">
            <button className="btn btn-primary">Salvar</button>
            <Link to="/home" className="btn btn-danger">
              Cancelar
            </Link>
          </div>
        </div>
        <div className="Jesus">
          <div className="to-perdido">
            <button onClick={() => Avatare()}></button>
          </div>
          <div className="Meachei">
            <div className="botoes-editar-empresa-color">
              <div>
                <button className="btn btn-primary" id="22">
                  Salvar
                </button>
              </div>
              <div>
                <Link to="/home" className="btn btn-danger">
                  Cancelar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
  function Avatare() {
    const [preview, setPreview] = useState(null);
    function onClose() {
      setPreview(null);
    }
    function onCrop(pv) {
      setPreview(pv);
    }
    function onBeforeFileLoad(elem) {
      if (elem.target.files[0].size > 2000000) {
        alert("File is too big!");
        elem.target.value = "";
      }

      function readImage() {
        if (this.files && this.files[0]) {
          var file = new FileReader();
          file.onload = function (e) {
            document.getElementById("preview").src = e.target.result;
          };
          file.readAsDataURL(this.files[0]);

          document
            .getElementById("img-input")
            .addEventListener("change", readImage, false);
        }
      }
    }
    return (
      <div className="avatari">
        {/* <Avatar
          width={600}
          height={300}
          onCrop={onCrop}
          onClose={onClose}
          onBeforeFileLoad={onBeforeFileLoad}
          src={null}
        /> */}
        <br />
        {preview && (
          <>
            <img src={preview} alt="Preview" />
            <a href={preview} download="avatar">
              Download image
            </a>
          </>
        )}
      </div>
    );
  }
}
export default ConfiguracaoSistema;
