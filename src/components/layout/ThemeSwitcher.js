import React from "react";

const ColorListItem = ({ button, color }) => {
    return (
        <li
            style={{
                backgroundColor: color
            }}
            onClick={() => {
                document.querySelector("body").style.backgroundColor = color;
                let buttons = document.getElementsByTagName("button" || "input")
                for (var i = 0; i < buttons.length; i++) {
                    buttons[i].style.backgroundColor = button;
                }
            }}
        />
    );
};

const ColorList = ({ colors, buttons }) => {
    let colorItems = colors.map((color, i) => (
        <ColorListItem color={color} colors={colors} button={buttons[i]} key={i} />
    ));

    return <ul id="switcher">{colorItems}</ul>;
};

const ThemeSwitcher = () => {
    const colors = ["orange", "gray", "lightblue", "Moccasin"];
    const buttons = ["gray", "orange", "gray", "orange"];
    return (
        <section>
            <ColorList colors={colors} buttons={buttons} />
        </section>
    );
}

export default ThemeSwitcher
