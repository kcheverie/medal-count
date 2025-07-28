import React from "react";
import styles from "../page.module.css"

type Props = {
  type: string,
  sortType: string,
  handleClick: Function
}

const Button = ({type, handleClick, sortType} : Props) => { 
  return (
    <button className={`${styles.button} ${type === sortType ? styles.active : ''}`} onClick={() => handleClick(type)}>{type}</button>
  )
}

export default Button;
