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
    const colors = ["hsl(46deg 35% 63%)", "hsl(52deg 89% 63%)", "hsl(0deg 77% 88%)", "hsl(175deg 76% 57%)"];
    const buttons = ["hsl(350deg 100% 29%)", "hsl(330deg 100% 70%)", "hsl(256deg 99% 71%)", "hsl(29deg 23% 58%)"];
    return (
        <section>
            <ColorList colors={colors} buttons={buttons} />
        </section>
    );
}

export default ThemeSwitcher
