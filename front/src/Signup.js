import { useState } from "react";
import { useMutation } from "@apollo/client";
import { USERS } from "./graphql/queries";
import { NEW_USER } from "./graphql/mutations";

function Signup() {
  const [formValues, setFormValues] = useState({ name: "", email: "" });
  const [addUser, { loading, error }] = useMutation(NEW_USER);

  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;

  const onHandleSubmit = (e) => {
    e.preventDefault();
    addUser({
      variables: {
        email: formValues.email,
        name: formValues.name,
        password: formValues.password,
      },
    });
    setFormValues({ name: "", email: "" });
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
      <input
        name="name"
        placeholder="name"
        onChange={handleChange}
        type="text"
      />
      <input
        name="email"
        placeholder="email"
        onChange={handleChange}
        type="text"
      />
      <input
        name="password"
        placeholder="password"
        onChange={handleChange}
        type="password"
      />
      <button>Enviar</button>
    </form>
  );
}
export default Signup;
