import React from "react"

const Button = ({ clickHandler, name, orange, wide }) => {
  const handleClick = () => {
    clickHandler(name)
  };
  const className = [
    "component-button main",
    orange ? "orange" : "",
    wide ? "wide" : "",
  ];
  return (
    <div className={className.join(" ").trim()}>
      <button onClick={handleClick}>{name}</button>
    </div>
  )
}

export default Button