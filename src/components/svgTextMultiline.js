function svg_textMultiline() {

    var x = 0;
    var y = 20;
    var width = 360;
    var lineHeight = 10;



    /* get the text */
    var element = document.getElementById('test');
    var text = element.innerHTML;

    /* split the words into array */
    var words = text.split(' ');
    var line = '';

    /* Make a tspan for testing */
    element.innerHTML = '<tspan id="PROCESSING">busy</tspan >';

    for (var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        var testElem = document.getElementById('PROCESSING');
        /*  Add line in testElement */
        testElem.innerHTML = testLine;
        /* Messure textElement */
        var metrics = testElem.getBoundingClientRect();
        testWidth = metrics.width;

        if (testWidth > width && n > 0) {
            element.innerHTML += '<tspan x="0" dy="' + y + '">' + line + '</tspan>';
            line = words[n] + ' ';
        } else {
            line = testLine;
        }
    }

    element.innerHTML += '<tspan x="0" dy="' + y + '">' + line + '</tspan>';
    document.getElementById("PROCESSING").remove();

}


svg_textMultiline();


//   body {
//     font - family: arial;
//     font - size: 20px;
// }
//   svg {
//     background: #dfdfdf;
//     border: 1px solid #aaa;
// }
//   svg text {
//     fill: blue;
//     stroke: red;
//     stroke - width: 0.3;
//     stroke - linejoin: round;
//     stroke - linecap: round;
// }
<svg height="300" width="500" xmlns="http://www.w3.org/2000/svg" version="1.1">

    <text id="test" y="0">GIETEN - Het college van Aa en Hunze is in de fout gegaan met het weigeren van een zorgproject in het failliete hotel Braams in Gieten. Dat stelt de PvdA-fractie in een brief aan het college. De partij wil opheldering over de kwestie en heeft schriftelijke
        vragen ingediend. Verkeerde route De PvdA vindt dat de gemeenteraad eerst gepolst had moeten worden, voordat het college het plan afwees. "Volgens ons is de verkeerde route gekozen", zegt PvdA-raadslid Henk Santes.</text>

</svg>