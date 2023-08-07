import React from "react"

export default function Star({ selected = false, onSelect }) {
  return (
    <div
      style={{
        width: ".8rem",
        height: ".8rem",
        backgroundColor: `${selected ? 'gold' : 'transparent'}`,
        border: `${selected ? "1px solid transparent" : "1px solid lightgray"}`,
        marginBottom: ".4rem",
        borderRadius: "50%",
        userSelect: "none",
      }}
      onClick={onSelect}
    ></div>
  )
}
