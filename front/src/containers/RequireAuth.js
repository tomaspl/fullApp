import { TokenContext } from 'contexts/TokenContext';
import { Navigate } from 'react-router-dom';
const { useContext } = require("react");

export default function RequireAuth({ children }) {
  let [token] = useContext(TokenContext);
  if(!token) {
    return <Navigate to="/"/>;
  }
  return children;
}