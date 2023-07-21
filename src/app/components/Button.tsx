import React from 'react';
import '../styles/ui.css';

function Button(props) {
//   const [codeOutput, setCodeOutput] = React.useState(undefined)
    console.log({props})
//   React.useEffect(() => {
//     // This is how we read messages sent from the plugin controller
//     window.onmessage = (event) => {
//       console.log("event.data: ", event.data.pluginMessage)
//       const { type, code } = event.data.pluginMessage;
//       console.log({code})
//       setCodeOutput(code)
//       if (type === 'react-code') {
//         console.log(`Figma Says: ${code}`);
//       }
//     };
//   }, []);

  return (
    <div>
      <p>Button</p>
    </div>
  );
}

export default Button;
