import { useState } from "react";
import "./app.css";
import FormInput from "./components/FormInput";

const App = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    birthday: "",
    country: "",
    password: "",
    confirmPassword: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",

      placeholder: "write your Username",

      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      pattern: "[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}",
      required: true,
    },
    {
      id: 3,
      name: "birthday",
      type: "date",
      placeholder: "Birthday",
      label: "Birthday",
      max: new Date().toISOString().split("T")[0],
      required: true,
    },
    {
      id: 4,
      name: "country",
      type: "select",
      placeholder: "Select your country",
      label: "Country",
      options: [
        "United States",
        "United Kingdom",
        "Canada",
        "Australia",
        "Germany",
        "France",
        "India",
        "Japan",
        "Brazil",
        "Other",
      ],

    },
    {
      id: 5,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 6,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (e.target.checkValidity()) {
      console.log("Form Data:", values);
      alert("form submitted successfully");

      setValues({
        username: "",
        email: "",
        birthday: "",
        country: "",
        password: "",
        confirmPassword: "",
      });
      setSubmitted(false);
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="app">
      <form onSubmit={handleSubmit} noValidate>
        <h1>Register</h1>

        <FormInput {...inputs[0]} value={values.username} onChange={onChange} submitted={submitted} />
        <FormInput {...inputs[1]} value={values.email} onChange={onChange} submitted={submitted} />
        <FormInput {...inputs[2]} value={values.birthday} onChange={onChange} submitted={submitted} />
        <FormInput {...inputs[3]} value={values.country} onChange={onChange} submitted={submitted} />
        <FormInput {...inputs[4]} value={values.password} onChange={onChange} submitted={submitted} />
        <FormInput {...inputs[5]} value={values.confirmPassword} onChange={onChange} submitted={submitted} />

        <button>Submit</button>
      </form>
    </div>
  );
};

export default App;