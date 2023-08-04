import React from "react"

export default function Star({ selected = false, onSelect }) {
  return (
    <div
      style={{
        width: "8px",
        height: "8px",
        // transform: "rotate(45deg)",
        backgroundColor: `${selected ? 'gold' : 'lightgray'}`,
        marginBottom: ".4rem"
      }}
      onClick={onSelect}
    ></div>
  )
}
