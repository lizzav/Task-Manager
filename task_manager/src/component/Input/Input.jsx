import React from "react";
import "./Input.scss";

function Input({ value, pattern, placeholder, type }) {
  return (
    <input
      className="modal-project__input"
      placeholder={placeholder}
      type={type}
      onChange={e => value.onChange(e)}
      value={value.value}
      onBlur={e => value.onBlur(e)}
      pattern={pattern}
    />
  );
}

export default Input;
