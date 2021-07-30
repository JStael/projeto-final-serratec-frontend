import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./style.css";
import Header from "../../components/Header";
import MenuLateral from "../../components/MenuLateral";
import http from "../../services/http";

function ConfiguracaoEmpresa() {

  const history = useHistory();
  const [readOnly, setReadOnly] = useState(true)

  const [nome, setNome] = useState("");
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

  // useEffect(() => {
  //   http
  //     .get("empresa")
  //     .then(response => {
  //       setNome(nome);
  //       setRazaoSocial(razaoSocial);
  //       setEmail(email);
  //       setCnpj(cnpj);
  //       setTelefone(telefone);
  //       setCep(cep);
  //       setRua(logradouro);
  //       setNumero(numero);
  //       setBairro(bairro);
  //       setCidade(localidade);
  //       setEstado(uf);
  //     })
  // }, []);

  const editarCadastro = (evento) => {
    evento.preventDefault();
    setReadOnly(true);
    const empresa = {
      nome: nome,
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
      .put(`empresa`, empresa)
      .then((response) => {
        alert(`Cadastro da empresa alterado com sucesso!`);
      })
      .catch((erro) => {
        console.log(erro);
      });
  };

  return (
    <>
      <Header />
      <MenuLateral />
      <div className="container p-0">
        <form className="form-editar-empresa" onSubmit={editarCadastro}>
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
          <div className=" d-flex flex-row flex-wrap justify-content-around">
            <div className="corpo-editar-empresa1">
              <div>
                <label className="mb-2">Razão Social</label>
                <input readOnly className="form-control py-1 px-4"value={razaoSocial} onChange={(evento) => setRazaoSocial(evento.target.value)} />
              </div>
              <div>
                <label className="mb-2">Nome Fantasia</label>
                <input readOnly className="form-control py-1 px-4"value={nome} onChange={(evento) => setNome(evento.target.value)} />
              </div>
              <div>
                <label className="mb-2">CNPJ</label>
                <input readOnly className="form-control py-1 px-4"value={cnpj} onChange={(evento) => setCnpj(evento.target.value)} />
              </div>
              <div>
                <label className="mb-2">Email</label>
                <input readOnly={readOnly} className="form-control py-1 px-4" required value={email} onChange={(evento) => setEmail(evento.target.value)} />
              </div>
              <div>
                <label className="mb-2">Telefone</label>
                <input readOnly={readOnly} className="form-control py-1 px-4" required value={telefone} onChange={(evento) => setTelefone(evento.target.value)} />
              </div>
            </div>
            <div className="corpo-editar-empresa2">
              <div>
                <label className="mb-2">Cep</label>
                <input readOnly={readOnly} className="form-control py-1 px-4" required value={cep} onChange={(evento) => setCep(evento.target.value)} />
              </div>
              <div>
                <label className="mb-2">Rua</label>
                <input readOnly={readOnly} className="form-control py-1 px-4" required value={rua} onChange={(evento) => setRua(evento.target.value)} />
              </div>
              <div>
                <label className="mb-2">Número</label>
                <input readOnly={readOnly} className="form-control py-1 px-4" required value={numero} onChange={(evento) => setNumero(evento.target.value)} />
              </div>
              <div>
                <label className="mb-2">Bairro</label>
                <input readOnly={readOnly} className="form-control py-1 px-4" required value={bairro} onChange={(evento) => setBairro(evento.target.value)} />
              </div>
              <div className="">
                <label className="mb-2">Cidade</label>
                <input readOnly={readOnly} className="form-control py-1 px-4" required value={cidade} onChange={(evento) => setCidade(evento.target.value)} />
              </div>
              <div>
                <label className="mb-2">Estado</label>
                <input readOnly={readOnly} className="form-control py-1 px-4" required value={estado} onChange={(evento) => setEstado(evento.target.value)} />
              </div>
            </div>
            <div className="botoes-editar-empresa-color">
              {!readOnly && <button className="btn btn-primary">Salvar</button>}
              <button
                type="button"
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
export default ConfiguracaoEmpresa;
