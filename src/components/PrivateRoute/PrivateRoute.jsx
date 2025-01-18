import { useContext } from "react";
import { Navigate } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const PrivateRoute = ({ children }) => {
  const { isLoggedIn, isAuthenticating } = useContext(CurrentUserContext);

  // Wait for authentication check to complete
  if (isAuthenticating) {
    return null; // or a loading spinner
  }

  return isLoggedIn ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
