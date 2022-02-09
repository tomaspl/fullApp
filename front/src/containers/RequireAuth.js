import TokenContext from 'contexts/TokenContext'
import { Navigate, Outlet } from 'react-router-dom';
const { useContext } = require("react");

export default function RequireAuth(props) {
  let [token] = useContext(TokenContext);
  if(!token) return <Navigate to="/"/>;

  return <Outlet/>;
}