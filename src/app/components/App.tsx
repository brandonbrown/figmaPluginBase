import React from 'react';
import logo from '../assets/logo.svg';
import '../styles/ui.css';
// import Button from './Button';

function App() {
  const textbox = React.useRef<HTMLInputElement>(undefined);
  const [codeOutput, setCodeOutput] = React.useState(undefined)

  const countRef = React.useCallback((element: HTMLInputElement) => {
    if (element) element.value = '5';
    textbox.current = element;
  }, []);

  const onCreate = () => {
    const count = parseInt(textbox.current.value, 10);
    parent.postMessage({ pluginMessage: { type: 'create-react-code', count } }, '*');
  };

  const onCancel = () => {
    parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*');
  };

  React.useEffect(() => {
    // This is how we read messages sent from the plugin controller
    window.onmessage = (event) => {
      console.log("event.data: ", event.data.pluginMessage)
      const { type, code } = event.data.pluginMessage;
      console.log({code})
      setCodeOutput(code)
      if (type === 'react-code') {
        console.log(`Figma Says: ${code}`);
      }
    };
  }, []);

  return (
    <div>
      <img src={logo} />
      <h2>Rectangle Creator</h2>
      <p>
        Count: <input ref={countRef} />
      </p>
      <button id="create" onClick={onCreate}>
        Create
      </button>
      <button onClick={onCancel}>Cancel</button>
      <h2>Code:</h2>
      <section>
        {codeOutput}
      </section>
    </div>
  );
}

export default App;
