import React from "react";
import "./Button.scss";

function Button({ text, type, color, noActive }) {
  return noActive ? (
    <div className={`form-button ${type} ${color}-no-active`}> {text}</div>
  ) : (
    <button className={`form-button ${type} ${color}`} type="submit">
      {text}
    </button>
  );
}

export default Button;
