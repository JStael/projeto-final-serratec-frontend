import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { GlobalContext } from "./providers/GlobalContext";

const PrivateRoute = ({ component: Component, ...rest }) => {

  const { autenticado } = useContext(GlobalContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        autenticado ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
};

export default PrivateRoute;