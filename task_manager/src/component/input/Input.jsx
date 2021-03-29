import React from "react";
import './Input.scss.scss'

function Input({text, handleLoginChange}) {


  return(


  <input
    placeholder={"text"}
   name="login"
   value={text}
  onChange={handleLoginChange}
  />
  )


}

export default Input;