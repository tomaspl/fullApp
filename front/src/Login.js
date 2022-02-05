import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [formValues, setFormValues] = useState({ name: "", email: "" });

  const onHandleSubmit = (e) => {
    e.preventDefault();
    // TODO Submit de login
  };

  const handleChange = (evt) => {
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
      <button>Login</button>

      <Link to="/signup">Sign up</Link>
    </form>
  );
}
export default Login;
