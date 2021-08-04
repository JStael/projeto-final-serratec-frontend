import { BrowserRouter, Route, Switch } from "react-router-dom";
import CadastrarUsuario from "./pages/CadastrarUsuario";
import CadastrarMedico from "./pages/CadastrarMedico";
import CadastrarColaborador from "./pages/CadastrarColaborador";
import CadastrarMaster from "./pages/CadastrarMaster";
import CadastrarPaciente from "./pages/CadastrarPaciente";
import Paciente from "./pages/Paciente";
import CadastrarProcedimento from "./pages/CadastrarProcedimento";
import Login from "./pages/Login";
import Home from "./pages/Home";
import BuscarPaciente from "./pages/BuscarPaciente";
import { GlobalProvider } from "./providers/GlobalContext";
import PaginaErro from "./pages/PaginaErro";
import BuscarColaborador from "./pages/BuscarColaborador";
import BuscarUsuario from "./pages/BuscarUsuario";
import Colaborador from "./pages/Colaborador";
import BuscarMaster from "./pages/BuscarMaster";
import Master from "./pages/Master";
import BuscarMedico from "./pages/BuscarMedico";
import Medico from "./pages/Medico";
import BuscarProcedimento from "./pages/BuscarProcedimento";
import Procedimento from "./pages/Procedimento";
import PrivateRoute from "./PrivateRoute";
import ConfiguracaoEmpresa from "./pages/ConfiguracaoEmpresa";
import ConfiguracaoSistema from "./pages/ConfiguracaoSistema";
import GerarRecibo from "./pages/GerarRecibo";
import Historico from "./pages/Historico";

export function Routes() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <PrivateRoute exact path="/home" component={Home} />
          <PrivateRoute
            exact
            path="/cadastrar-usuario"
            component={CadastrarUsuario}
          />
          <PrivateRoute
            path="/cadastrar-usuario/medico"
            component={CadastrarMedico}
          />
          <PrivateRoute
            path="/cadastrar-usuario/colaborador"
            component={CadastrarColaborador}
          />
          <PrivateRoute
            path="/cadastrar-usuario/master"
            component={CadastrarMaster}
          />
          <PrivateRoute
            path="/cadastrar-paciente"
            component={CadastrarPaciente}
          />
          <PrivateRoute
            exact
            path="/buscar-usuario"
            component={BuscarUsuario}
          />
          <PrivateRoute
            exact
            path="/buscar-usuario/buscar-colaborador"
            component={BuscarColaborador}
          />
          <PrivateRoute
            path="/buscar-usuario/buscar-colaborador/colaborador"
            component={Colaborador}
          />
          <PrivateRoute
            exact
            path="/buscar-usuario/buscar-master"
            component={BuscarMaster}
          />
          <PrivateRoute
            path="/buscar-usuario/buscar-master/master"
            component={Master}
          />
          <PrivateRoute
            exact
            path="/buscar-usuario/buscar-medico"
            component={BuscarMedico}
          />
          <PrivateRoute
            exact
            path="/buscar-usuario/buscar-medico/medico"
            component={Medico}
          />
          <PrivateRoute path="/buscar-paciente" component={BuscarPaciente} />
          <PrivateRoute path="/paciente" component={Paciente} />
          <PrivateRoute
            path="/cadastrar-procedimento"
            component={CadastrarProcedimento}
          />
          <PrivateRoute
            exact
            path="/buscar-procedimento"
            component={BuscarProcedimento}
          />
          <PrivateRoute
            path="/buscar-procedimento/procedimento"
            component={Procedimento}
          />
          <PrivateRoute
            path="/configuracoes/empresa"
            component={ConfiguracaoEmpresa}
          />
          <PrivateRoute
            path="/configuracoes/sistema"
            component={ConfiguracaoSistema}
          />
          <PrivateRoute
            exact
            path="/recibo"
            component={GerarRecibo}
          />
          <PrivateRoute
            path="/recibo/gerar-recibo"
            component={GerarRecibo}
          />
           <PrivateRoute
           exact
            path="/recibo/historico-recibo"
            component={Historico}
          />
          <PrivateRoute component={PaginaErro} />
        </Switch>
      </BrowserRouter>
    </GlobalProvider>
  );
}
