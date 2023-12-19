import React from "react"

export default function Star({ selected = false, onSelect }) {
  return (
    <div
      id="rating-star"
      className="rating-star"
      style={{
        backgroundColor: `${selected ? 'gold' : 'transparent'}`,
        border: `${selected ? "1px solid transparent" : "1px solid lightgray"}`
      }}
      onClick={onSelect}
    ></div>
  )
}
