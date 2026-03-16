import { useState } from "react";
import "./formInput.css";

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { label, errorMessage, onChange, options, submitted, ...inputProps } = props;

  const isFocused = inputProps.value ? focused : false;

  const handleFocus = () => {
    setFocused(true);
  };

  const isEmpty = !inputProps.value || inputProps.value === "";
  const showRequiredError = submitted && inputProps.required && isEmpty;

  if (inputProps.type === "select") {
    return (
      <div className="formInput">
        <label>{label}</label>
        <select
          name={inputProps.name}
          onChange={onChange}
          onBlur={handleFocus}
          focused={isFocused.toString()}
          value={inputProps.value}
          className={showRequiredError ? "input-error" : ""}
        >
          <option value="">{inputProps.placeholder}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {showRequiredError
          ? <span className="show">This field is required.</span>
          : <span>{errorMessage}</span>
        }
      </div>
    );
  }

  if (inputProps.type === "password")
    return (
      <div className="formInput">
        <label>{label}</label>
        <input
          {...inputProps}
          type={showPassword ? "text" : "password"}
          onChange={onChange}
          onBlur={handleFocus}
          onFocus={() => setFocused(true)}
          focused={isFocused.toString()}
          className={showRequiredError ? "input-error" : ""}
        />
        <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? "🙈" : "👀"}
        </span>
        {showRequiredError
          ? <span className="show">This field is required.</span>
          : <span>{errorMessage}</span>
        }
      </div>
    );

  return (
    <div className="formInput">
      <label>{label}</label>
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() => setFocused(true)}
        focused={isFocused.toString()}
        className={showRequiredError ? "input-error" : ""}
      />
      {showRequiredError
        ? <span className="show">This field is required.</span>
        : <span>{errorMessage}</span>
      }
    </div>
  );
};

export default FormInput;