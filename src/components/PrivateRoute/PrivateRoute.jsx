import { useContext } from "react";
import { Navigate } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useContext(CurrentUserContext);

  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
