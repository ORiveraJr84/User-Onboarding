import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";

const Form = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    terms: true,
  });

  const [post, setPost] = useState();

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    terms: "",
  });

  const [buttonIsDisabled, setButtonIsDisabled] = useState(true);

  useEffect(() => {
    formSchema.isValid(formState).then((valid) => {
      setButtonIsDisabled(!valid);
    });
  }, [formState]);

  const inputChange = (e) => {
    e.persist();
    const newFormState = {
      ...formState,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    };
    validateChange(e);
    setFormState(newFormState);
  };

  const validateChange = (e) => {
    yup
      .reach(formSchema, e.target.name)
      .validate(
        e.target.type === "checkbox" ? e.target.checked : e.target.value
      )
      .then((valid) => {
        setErrors({ ...errors, [e.target.name]: "" });
      })
      .catch((error) => {
        setErrors({ ...errors, [e.target.name]: error.errors[0] });
      });
  };

  const formSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://reqres.in/api/users", formState)
      .then((resp) => {
        console.log(resp);
        setPost(resp.data);
        setFormState({
          name: "",
          email: "",
          password: "",
          terms: true,
        });
      })
      .catch((resp) => {
        console.log(resp);
        setPost(resp.data);
      });
  };

  const formSchema = yup.object().shape({
    name: yup.string().required("Please provide your name."),
    email: yup
      .string()
      .email("Please provide a valid email address.")
      .required("Please provide a valid email address."),
    password: yup.string().required(),
    terms: yup
      .boolean()
      .oneOf([true], "You must accept our Terms to continue."),
  });

  return (
    <form onSubmit={formSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        id="name"
        name="name"
        type="text"
        value={formState.name}
        onChange={inputChange}
      />
      {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        name="email"
        type="text"
        value={formState.email}
        onChange={inputChange}
      />
      {errors.email.length > 0 ? <p className="error">{errors.email}</p> : null}
      <label htmlFor="password">Password:</label>
      <input
        id="password"
        name="password"
        type="text"
        value={formState.password}
        onChange={inputChange}
      />
      {errors.password.length > 0 ? (
        <p className="error">{errors.password}</p>
      ) : null}
      <label htmlFor="terms">
        Accept terms?{" "}
        {errors.terms.length > 0 ? (
          <p className="error">{errors.terms}</p>
        ) : null}
      </label>
      <input
        id="terms"
        name="terms"
        type="checkbox"
        checked={formState.terms}
        onChange={inputChange}
      />
      <button type="submit" disabled={buttonIsDisabled}>
        submit
      </button>
      <pre>{JSON.stringify(post, null, 2)}</pre>
    </form>
  );
};

export default Form;
