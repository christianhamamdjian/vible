import React from "react"

export default function Star({ selected = false, onSelect }) {
  return (
    <div
      style={{
        width: ".8rem",
        height: ".8rem",
        marginBottom: ".6rem",
        userSelect: "none",
      }}
      onClick={onSelect}
    >{selected ? (<span style={{
      fontSize: "1rem",
      color: 'gold'
    }}>&#x2605;</span>) :
      (<span style={{
        fontSize: "1rem",
        color: 'lightgray', opacity: ".4"
      }}>&#x2606;</span>)}</div>
  )
}
