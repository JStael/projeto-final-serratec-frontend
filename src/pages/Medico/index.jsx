import { useState, useContext } from "react";
import axios from "axios";
import { GlobalContext } from "../../providers/GlobalContext";
import Header from "../../components/Header";
import MenuLateral from "../../components/MenuLateral";
import "./style.css";

function Medico() {
  const context = useContext(GlobalContext);
  const { medico } = context;

  const [readOnly, setReadOnly] = useState(true);

  const id = medico.id;
  const [nome, setNome] = useState(medico.nome);
  const [email, setEmail] = useState(medico.email);
  const [cpf, setCpf] = useState(medico.cpf);
  const [telefone, setTelefone] = useState(medico.telefone);
  const [dataNascimento, setDataNascimento] = useState(medico.dataNascimento);
  const [cep, setCep] = useState(medico.endereco.cep);
  const [rua, setRua] = useState(medico.endereco.logradouro);
  const [numero, setNumero] = useState(medico.endereco.numero);
  const [bairro, setBairro] = useState(medico.endereco.bairro);
  const [cidade, setCidade] = useState(medico.endereco.localidade);
  const [estado, setEstado] = useState(medico.endereco.uf);

  const cpfHandle = (evento) => {
    if (evento.target.value.length <= 11) setCpf(evento.target.value);
  };

  const cepHandle = (evento) => {
    if (evento.target.value.length <= 8) setCep(evento.target.value);
  };

  const obterCep = (evento) => {
    if (!evento.target.value) return;

    const url = `https://viacep.com.br/ws/${evento.target.value}/json/`;
    axios
      .get(url)
      .then((response) => {
        if (!response.data.erro) {
          setRua(response.data.logradouro);
          setBairro(response.data.bairro);
          setCidade(response.data.localidade);
          setEstado(response.data.uf);
        }
      })
      .catch();
  };

  const editarCadastro = (evento) => {
    evento.preventDefault();
    setReadOnly(true);
    const medico = {
      id: id,
      nome: nome,
      email: email,
      cpf: cpf,
      telefone: telefone,
      dataNascimento: dataNascimento,
      endereco: {
        cep: cep,
        logradouro: rua,
        numero: numero,
        bairro: bairro,
        localidade: cidade,
        uf: estado,
      },
    };

    axios
      .put(`http://localhost:8080/api/secretarias/${id}`, medico)
      .then((response) => {
        alert(`Cadastro do médico ${nome} alterado com sucesso!`);
      })
      .catch((erro) => {
        console.log("Hmmm.. Tem algo errado");
        console.log(erro);
      });
  };

  return (
    <>
      <Header />
      <MenuLateral />
      <div className="container p-0">
        <form className="form-consulta-medico" onSubmit={editarCadastro}>
          <div className="header-consulta-medico bg-primary text-white">
            <h5 className="mb-0">Consulta de usuário medico</h5>
            <i
              className="fas fa-edit text-white fs-3 icone-consultar-medico"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              title="Editar cadastro"
              onClick={() =>
                readOnly ? setReadOnly(false) : setReadOnly(true)
              }
            ></i>
          </div>
          <div className=" d-flex flex-row flex-wrap p-4 mb-2 justify-content-around">
            <div className="corpo-consulta-medico1">
              <div>
                <label className="mb-2">Nome</label>
                <input
                  readOnly={readOnly}
                  className="form-control py-1 px-4"
                  required
                  type="text"
                  value={nome}
                  onChange={(evento) => setNome(evento.target.value)}
                  placeholder="Digite o nome do usuário"
                />
              </div>
              <div>
                <label className="mb-2">Email</label>
                <input
                  readOnly={readOnly}
                  className="form-control py-1 px-4"
                  required
                  type="email"
                  value={email}
                  onChange={(evento) => setEmail(evento.target.value)}
                  placeholder="Digite o email do usuário"
                />
              </div>
              <div>
                <label className="mb-2">CPF</label>
                <input
                  readOnly={readOnly}
                  className="form-control py-1 px-4"
                  required
                  type="number"
                  value={cpf}
                  onChange={cpfHandle}
                  placeholder="Apenas os 11 digitos"
                />
              </div>
              <div>
                <label className="mb-2">Telefone</label>
                <input
                  readOnly={readOnly}
                  className="form-control py-1 px-4"
                  required
                  type="number"
                  value={telefone}
                  onChange={(evento) => setTelefone(evento.target.value)}
                  placeholder="(XX) 99999-9999"
                />
              </div>
              <div>
                <label className="mb-2">Data de Nascimento</label>
                <input
                  readOnly={readOnly}
                  className="form-control py-1 px-4"
                  required
                  type="data"
                  value={dataNascimento}
                  onChange={(evento) => setDataNascimento(evento.target.value)}
                  placeholder="YYYY-MM-DD"
                />
              </div>
            </div>
            <div className="corpo-consulta-medico2">
              <div>
                <label className="mb-2">Cep</label>
                <input
                  readOnly={readOnly}
                  className="form-control py-1 px-4"
                  required
                  type="number"
                  value={cep}
                  onBlur={obterCep}
                  onChange={cepHandle}
                  placeholder="Apenas os 8 digitos"
                />
              </div>
              <div>
                <label className="mb-2">Rua</label>
                <input
                  readOnly={readOnly}
                  className="form-control py-1 px-4"
                  required
                  type="text"
                  value={rua}
                  onChange={(evento) => setRua(evento.target.value)}
                />
              </div>
              <div>
                <label className="mb-2">Número da Residência</label>
                <input
                  readOnly={readOnly}
                  className="form-control py-1 px-4"
                  required
                  type="number"
                  value={numero}
                  onChange={(evento) => setNumero(evento.target.value)}
                  placeholder="Digite o número da residência"
                />
              </div>
              <div>
                <label className="mb-2">Bairro</label>
                <input
                  readOnly={readOnly}
                  className="form-control py-1 px-4"
                  required
                  type="text"
                  value={bairro}
                  onChange={(evento) => setBairro(evento.target.value)}
                />
              </div>
              <div>
                <label className="mb-2">Cidade</label>
                <input
                  readOnly={readOnly}
                  className="form-control py-1 px-4"
                  required
                  type="text"
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
                  type="text"
                  value={estado}
                  onChange={(evento) => setEstado(evento.target.value)}
                />
              </div>
            </div>
            <div className="botoes-consulta-medico">
              {!readOnly && <button className="btn btn-primary">Salvar</button>}
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Medico;
