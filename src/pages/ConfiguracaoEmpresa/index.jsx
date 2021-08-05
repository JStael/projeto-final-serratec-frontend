import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./style.css";
import Header from "../../components/Header";
import MenuLateral from "../../components/MenuLateral";
import http from "../../services/http";
import { Toast } from "react-bootstrap"; 

function ConfiguracaoEmpresa() {
  const history = useHistory();
  const [readOnly, setReadOnly] = useState(true);

  const [show, setShow] = useState(false);

  const [id, setId] = useState("");
  const [nomeFantasia, setNomeFantasia] = useState("");
  const [razaoSocial, setRazaoSocial] = useState("");
  const [email, setEmail] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  useEffect(() => {
    http
      .get("empresa")
      .then((response) => {
        const { data } = response;
        setId(data[0].id);
        setNomeFantasia(data[0].nomeFantasia);
        setRazaoSocial(data[0].razaoSocial);
        setEmail(data[0].email);
        setCnpj(data[0].cnpj);
        setTelefone(data[0].telefone);
        setCep(data[0].endereco.cep);
        setRua(data[0].endereco.logradouro);
        setNumero(data[0].endereco.numero);
        setBairro(data[0].endereco.bairro);
        setCidade(data[0].endereco.localidade);
        setEstado(data[0].endereco.uf);
      })
      .catch((error) => console.error(error));
  }, []);

  const editarCadastro = (evento) => {
    evento.preventDefault();
    setReadOnly(true);
    const empresa = {
      nomeFantasia: nomeFantasia,
      razaoSocial: razaoSocial,
      email: email,
      cnpj: cnpj,
      telefone: telefone,
      endereco: {
        cep: cep,
        logradouro: rua,
        numero: numero,
        bairro: bairro,
        localidade: cidade,
        uf: estado,
      },
    };

    http
      .put(`empresa/${id}`, empresa)
      .then((response) => {
        mostrarToast();
      })
      .catch((erro) => {
        console.log(erro);
      });
  };

  const mostrarToast = () => {
    setShow(true);
  }

  return (
    <>
      <Header />
      <MenuLateral />
      <div className="container p-0">
        <form className="form-editar-empresa pb-5" onSubmit={editarCadastro}>
          <div className="header-editar-empresa mb-3 bg-primary text-white">
            <h5 className="mb-0">Informações da Empresa</h5>
            <i
              className="fas fa-edit text-white mx-2 fs-5 icone-editar-empresa"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              title="Editar cadastro"
              onClick={() =>
                readOnly ? setReadOnly(false) : setReadOnly(true)
              }
            ></i>
          </div>
          <div className=" d-flex flex-row flex-wrap justify-content-around mt-2 mb-4">
            <div className="corpo-editar-empresa1">
              <div>
                <label className="mb-2">Razão Social</label>
                <input
                  readOnly
                  className="form-control py-1 px-4"
                  value={razaoSocial}
                  onChange={(evento) => setRazaoSocial(evento.target.value)}
                />
              </div>
              <div>
                <label className="mb-2">Nome Fantasia</label>
                <input
                  readOnly
                  className="form-control py-1 px-4"
                  value={nomeFantasia}
                  onChange={(evento) => setNomeFantasia(evento.target.value)}
                />
              </div>
              <div>
                <label className="mb-2">CNPJ</label>
                <input
                  readOnly
                  className="form-control py-1 px-4"
                  value={cnpj}
                  onChange={(evento) => setCnpj(evento.target.value)}
                />
              </div>
              <div>
                <label className="mb-2">Email</label>
                <input
                  readOnly={readOnly}
                  className="form-control py-1 px-4"
                  required
                  value={email}
                  onChange={(evento) => setEmail(evento.target.value)}
                />
              </div>
              <div>
                <label className="mb-2">Telefone</label>
                <input
                  readOnly={readOnly}
                  className="form-control py-1 px-4"
                  required
                  value={telefone}
                  onChange={(evento) => setTelefone(evento.target.value)}
                />
              </div>
            </div>
            <div className="corpo-editar-empresa2">
              <div>
                <label className="mb-2">Cep</label>
                <input
                  readOnly={readOnly}
                  className="form-control py-1 px-4"
                  required
                  value={cep}
                  onChange={(evento) => setCep(evento.target.value)}
                />
              </div>
              <div>
                <label className="mb-2">Rua</label>
                <input
                  readOnly={readOnly}
                  className="form-control py-1 px-4"
                  required
                  value={rua}
                  onChange={(evento) => setRua(evento.target.value)}
                />
              </div>
              <div>
                <label className="mb-2">Número</label>
                <input
                  readOnly={readOnly}
                  className="form-control py-1 px-4"
                  required
                  value={numero}
                  onChange={(evento) => setNumero(evento.target.value)}
                />
              </div>
              <div>
                <label className="mb-2">Bairro</label>
                <input
                  readOnly={readOnly}
                  className="form-control py-1 px-4"
                  required
                  value={bairro}
                  onChange={(evento) => setBairro(evento.target.value)}
                />
              </div>
              <div className="">
                <label className="mb-2">Cidade</label>
                <input
                  readOnly={readOnly}
                  className="form-control py-1 px-4"
                  required
                  value={cidade}
                  onChange={(evento) => setCidade(evento.target.value)}
                />
              </div>
              <div>
                <label className="mb-2">Estado</label>
                <input
                  readOnly={readOnly}
                  className="form-control py-1 px-4"
                  required
                  value={estado}
                  onChange={(evento) => setEstado(evento.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="botoes-editar-empresa">
            {!readOnly && <button className="btn btn-primary">Salvar</button>}
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => history.goBack()}
            >
              Voltar
            </button>
          </div>
        </form>
      </div>
      <Toast className="toast btn-success bg-success" show={show} delay={5000} autohide>
        <Toast.Body>{`Cadastro da empresa alterado com sucesso!`}</Toast.Body>
      </Toast>
    </>
  );
}
export default ConfiguracaoEmpresa;
