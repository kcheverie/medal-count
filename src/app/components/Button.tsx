import React from "react";

type Props = {
  type: string,
  handleClick: Function
}

const Button = ({type, handleClick} : Props) => { 
  return (
    <button onClick={() => handleClick(type)}>{type}</button>
  )
}

export default Button;
