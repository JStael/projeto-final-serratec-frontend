import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import CadastrarUsuario from './pages/CadastrarUsuario';
import CadastrarMedico from './pages/CadastrarMedico';
import CadastrarColaborador from './pages/CadastrarColaborador';
import CadastrarMaster from './pages/CadastrarMaster';
import CadastrarPaciente from './pages/CadastrarPaciente';
import CadastrarProcedimento from './pages/CadastrarProcedimento';
import Login from './pages/Login';
import Home from './pages/Home';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <>
          <Header />
          <Route path="/home" component={Home} />
          <Route path="/cadastrar-usuario" component={CadastrarUsuario} />
          <Route path="/cadastrar-medico" component={CadastrarMedico} />
          <Route path="/cadastrar-colaborador" component={CadastrarColaborador} />
          <Route path="/cadastrar-master" component={CadastrarMaster} />
          <Route path="/cadastrar-paciente" component={CadastrarPaciente} />
          <Route path="/cadastrar-procedimento" component={CadastrarProcedimento} />
        </>
      </Switch>
    </BrowserRouter>
  )
}

export default App;
