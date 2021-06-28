import TemporaryMessage from './TemporaryMessage';

const errorMessageStyle = {
  fontSize: 'large',
  color: 'red',
  borderStyle: 'ridge',
  borderColor: 'red',
  borderWidth: 7,
  // borderImage: 'radial-gradient(at top left, red, orange) 1',
  margin: 10,
  boxShadow: '0px 0px 10px 3px grey',
  padding: 10
};

const TemporaryErrorMessage = ({ text, timeout, time }) => {
  return (
    <TemporaryMessage 
      text={text} 
      timeout={timeout}
      time={time}
      style={errorMessageStyle}
    />
  );
};

export default TemporaryErrorMessage;