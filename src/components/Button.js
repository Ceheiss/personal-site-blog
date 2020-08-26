import React from "react"
import {
  buttonStyle,
  darkBackground,
  lightBackground,
} from "./Button.module.scss"
const Button = ({ url, children, btnStyle }) => {
  const styles =
    btnStyle === "dark"
      ? `${buttonStyle} ${darkBackground}`
      : `${buttonStyle} ${lightBackground}`
  return (
    <a href={url} target="_blank">
      <button className={styles}>{children}</button>
    </a>
  )
}

export default Button
