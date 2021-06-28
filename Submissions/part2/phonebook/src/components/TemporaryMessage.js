import { useState, useEffect } from 'react';

// Renders a message for a specified time and returns null afterwards.
// Renders the message indefinitely if timeout is set to null.
const TemporaryMessage = ({ text, timeout, time, style }) => {
  const [drawMessage, setDrawMessage] = useState(false);

  // Whenever text, timeout and/or time change fire this effect to determine 
  // whether there is a message to be rendered and optionally set up a timeout
  // for it.
  useEffect(
    () => {
      console.log('Start effect...');
      
      const thereIsText = text && text !== '';
      
      setDrawMessage(thereIsText);
      console.log('set drawMessage to', thereIsText, `for text "${text}"`);
      
      // If there is a message and timeout data, set up a timeout and return a 
      // clean up function.
      if (thereIsText && timeout && timeout > 0) {
        const timeoutId = setTimeout(() => {
          setDrawMessage(false);
          console.log('set drawMessage to', false, 'after timeout');
        }, timeout);
        console.log(
          'set up a timeout with id', timeoutId, 
          'for', timeout / 1000, 's'
        );
        console.log('...end effect.');
        return (() => {
          clearTimeout(timeoutId);
          console.log('clear timeout with id', timeoutId);
        });
      }
      
      console.log('...end effect.');
    },
    [text, timeout, time]
  );

  return (
    drawMessage
      ? <div style={style}>
          {text + ' '}
          <button onClick={() => setDrawMessage(false)}> X </button>
        </div>
      : null
  );
};

export default TemporaryMessage;