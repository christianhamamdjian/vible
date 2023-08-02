import React, { useState } from "react";
import Star from "./Star";
import { createArray } from "./lib";
import { MoodboardContext } from "../../context/moodboardContext"

const StarRating = ({ style = {}, rating, id, totalStars = 5, ...props }) => {
  const { selectedStars, handleRating } = React.useContext(MoodboardContext);

  return (
    <div style={{ padding: 5, ...style }} {...props}>
      {createArray(totalStars).map((n, i) => (
        <Star
          key={i}
          selected={rating > i}
          //selected={rating}
          onSelect={() => handleRating(i, id)}
        />
      ))}
    </div>
  );
}

export default StarRating