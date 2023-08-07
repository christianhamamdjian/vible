import React, { useState } from 'react';

const FontSelector = ({ selectedFont, setSelectedFont }) => {
    const fontOptions = [
        { value: 'Roboto', label: 'Roboto' },
        { value: 'Open Sans', label: 'Open Sans' },
        { value: 'Lato', label: 'Lato' },
        { value: 'Playfair', label: 'Playfair' },
        { value: 'Poppins', label: 'Poppins' },
        
        // Add more font options as needed
    ];

    const handleChange = (event) => {
        setSelectedFont(event.target.value);
        let texts = document.getElementsByTagName("p" || "textarea")
        for (var i = 0; i < texts.length; i++) {
            texts[i].style.fontFamily = event.target.value;
        }
    };

    return (
        <div>
            <select style={{ fontSize:"1rem"}} value={selectedFont} onChange={handleChange}>
                {fontOptions.map((option) => (
                    <option style={{ fontSize:"2rem",fontFamily: selectedFont, minHeight: '200px', width: '100%', padding: '10px' }} key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {/* <textarea
                style={{ fontFamily: selectedFont, minHeight: '200px', width: '100%', padding: '10px' }}
                placeholder="Type something..."
            /> */}
        </div>
    );
};

export default FontSelector;


// import React, { useState } from 'react';
// import FontSelector from './FontSelector';

// const App = () => {
//   const [selectedFont, setSelectedFont] = useState('Roboto');

//   return (
//     <div>
//       <h1>Font Selector</h1>
//       <FontSelector selectedFont={selectedFont} setSelectedFont={setSelectedFont} />
//     </div>
//   );
// };

// export default App;



// @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');
// @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');
// @import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap');
// @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
// @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap');
// @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&display=swap');
// @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');
// @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap');
// @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap');
// @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;700&display=swap');
// @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&display=swap');
// @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&display=swap');
// @import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;700&display=swap');
// @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap');
// @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap');
// @import url('https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;700&display=swap');
// @import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;700&display=swap');
// @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
// @import url('https://fonts.googleapis.com/css2?family=Exo:wght@400;700&display=swap');
// @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;700&display=swap');
// @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap');
// @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;700&display=swap');
// @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;700&display=swap');
// @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
// @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap');
// @import url('https://fonts.googleapis.com/css2?family=Muli:wght@400;700&display=swap');
// @import url('https://fonts.googleapis.com/css2?family=Cabin:wght@400;700&display=swap');
// @import url('https://fonts.googleapis.com/css2?family=Hind:wght@400;700&display=swap');
// @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;700&display=swap');
// @import url('https://fonts.googleapis.com/css2?family=Lalezar&display=swap');

// body {
//     font-family: 'Poppins', sans-serif;
//   }
  
//   h1 {
//     font-family: 'Montserrat', sans-serif;
//   }
  
//   p {
//     font-family: 'Lato', sans-serif;
//   }
  