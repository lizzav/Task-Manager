import React from "react";
import './Button.scss'

function Button({text, type, color}) {


  return(
    <button
     className={`form-button ${type} ${color}`}
     type="submit"
    >{text}</button>
  )


}

export default Button;