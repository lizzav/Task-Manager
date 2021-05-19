import React from "react";
import "./Button.scss";

function Button({ text, type, color, noActive }) {
  return noActive ? (
    <button className={`form-button ${type} ${color}-no-active`} disabled>
      {text}
    </button>
  ) : (
    <button className={`form-button ${type} ${color}`} type="submit">
      {text}
    </button>
  );
}

export default Button;
