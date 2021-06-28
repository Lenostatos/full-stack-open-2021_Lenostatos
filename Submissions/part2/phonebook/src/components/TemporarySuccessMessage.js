import TemporaryMessage from './TemporaryMessage';

const successMessageStyle = {
  fontSize: 'large',
  color: 'green',
  borderStyle: 'ridge',
  borderColor: 'green',
  borderWidth: 7,
  // borderImage: 'radial-gradient(at top left, green, lightgreen) 1',
  margin: 10,
  boxShadow: '0px 0px 10px 3px grey',
  padding: 10
};

const TemporarySuccessMessage = ({ text, timeout, time }) => {
  return (
    <TemporaryMessage 
      text={text} 
      timeout={timeout}
      time={time} 
      style={successMessageStyle}
    />
  );
};

export default TemporarySuccessMessage;