import React from "react";

const Button = ({
    border,
    color,
    children,
    height,
    onClick,
    radius,
    width
}) => {
    return (
        <button
            onClick={onClick}
            style={{
                backgroundColor: color,
                border,
                borderRadius: radius,
                height,
                width
            }}
        >
            {children}
        </button>
    );
}

export default Button;




{/* 
      <Button 
        border="none"
        color="pink"
        height = "200px"
        onClick={() => alert("You clicked on the pink circle!")}
        radius = "50%"
        width = "200px"
        children = "I'm a pink circle!"
      />

      <Button 
        border="dotted"
        color="#f5bc42"
        height = "200px"
        onClick={() => console.log("You clicked on the orange circle!")}
        radius = "50%"
        width = "200px"
        children = "I'm an orange circle!"
      />

      <Button 
        border="dashed"
        color="#fdffc4"
        height = "200px"
        onClick={() => console.log("You clicked on the yellow square!")}
        radius = "10%"
        width = "200px"
        children = "I'm a yellow square!"
      /> 
    */}