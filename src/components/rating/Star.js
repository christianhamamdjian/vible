import React from "react"

export default function Star({ selected = false, onSelect }) {
  return (
    <div
      className="rating-star"
      style={{
        backgroundColor: `${selected ? 'gold' : 'transparent'}`,
        border: `${selected ? "1px solid transparent" : "1px solid lightgray"}`
      }}
      onClick={onSelect}
    ></div>
  )
}
