import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from '@apollo/client';
import { LOG_USER } from "graphql/mutations";
import { useNavigate } from "react-router-dom";
import TokenContext from 'contexts/TokenContext'

function Login() {
  const [formValues, setFormValues] = useState({ name: "", email: "" });
  const [showError, setShowError] = useState(false)
  const [, setToken] = useContext(TokenContext)

  let navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('token');
    setToken(null)
  },[setToken])

  const [logUser, { loading, error, reset }] = useMutation(LOG_USER, {
    onCompleted:(data) => {
      localStorage.setItem('token', data.login.token)
      setToken(data.login.token)
      navigate("/home");

    },
    onError:(e) => {
      setShowError(true)
    }
  });



  const onHandleSubmit = (e) => {
    e.preventDefault();
    logUser({
      variables: {
        email: formValues.email,
        password: formValues.password,
      },
    })
  };

  const handleChange = (evt) => {
    setShowError(false)
    reset();
    const value = evt.target.value;
    setFormValues({
      ...formValues,
      [evt.target.name]: value,
    });
  };

  return (
    <form onSubmit={onHandleSubmit}>
      <input name="email" onChange={handleChange} type="text" />
      <input name="password" onChange={handleChange} type="text" />
      <button disabled={loading}>Login</button>

      <Link to="/signup">Sign up</Link>
      {showError ? <p>{error.message}</p> : '' }
    </form>
  );
}
export default Login;
