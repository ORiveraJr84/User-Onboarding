import React from "react";

const Form = () => {
  return (
    <form>
      <label htmlFor="name"></label>
      <input name="name" type="text" />
      <label htmlFor="email"></label>
      <input name="email" type="text" />
      <label htmlFor="password"></label>
      <input name="password" type="text" />
      <label htmlFor="terms"></label>
      <input name="terms" type="checkbox" />
      <button type="submit">submit</button>
    </form>
  );
};

export default Form;
