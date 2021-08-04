import { useState, createContext, useEffect } from "react";

export const GlobalContext = createContext({});

export const GlobalProvider = ({ children }) => {
  const [paciente, setPaciente] = useState({});
  const [colaborador, setColaborador] = useState({});
  const [master, setMaster] = useState({});
  const [medico, setMedico] = useState({});
  const [procedimento, setProcedimento] = useState({});

  const [layout, setLayout] = useState({});

  const [autenticado, setAutenticado] = useState(false);
  const [usuario, setUsuario] = useState("")

  useEffect(() => {
    setAutenticado(localStorage.getItem("token"));
    setUsuario(localStorage.getItem("userName"));
  }, [])

  const logout = () => {
    setUsuario("");
    setAutenticado(false);
    localStorage.removeItem("userName");
    localStorage.removeItem("token");
    localStorage.removeItem("id");
  }

  return (
    <GlobalContext.Provider
      value={{
        paciente,
        setPaciente,
        colaborador,
        setColaborador,
        master,
        setMaster,
        medico,
        setMedico,
        procedimento,
        setProcedimento,
        autenticado,
        usuario,
        logout,
        layout,
        setLayout
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};


