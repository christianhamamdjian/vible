import React from "react";

const ColorListItem = ({ button, color }) => {
    return (
        <li
            style={{
                backgroundColor: color
            }}
        // onClick={() => {
        //     // document.querySelector("body").style.backgroundColor = color
        //     let buttons = document.getElementsByTagName("button" || "input")
        //     for (var i = 0; i < buttons.length; i++) {
        //         buttons[i].style.backgroundColor = button;
        //     }
        // }}
        />
    );
};

const ColorList = ({ colors, buttons }) => {
    let colorItems = colors.map((color, i) => (
        <ColorListItem color={color} colors={colors} button={buttons[i]} key={i} />
    ));

    return <ul className="switcher">{colorItems}</ul>;
};

const ThemeSwitcher = () => {
    const colors = ["#5856d6", "#007aff", "#34aadc", "#5ac8fa", "#4cd964", "#ff2d55", "#ff3b30", "#ff9500", "#ffCc00", "#8e8e93",];
    const buttons = ["#5856d6", "#007aff", "#34aadc", "#5ac8fa", "#4cd964", "#ff2d55", "#ff3b30", "#ff9500", "#ffCc00", "#8e8e93"];
    return (
        <section>
            <ColorList colors={colors} buttons={buttons} />
        </section>
    );
}

export default ThemeSwitcher
