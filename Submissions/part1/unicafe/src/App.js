import React, { useState } from 'react';
import './App.css';

const FeedbackButton = ({text, onClick}) => (
  <button onClick={onClick}>{text}</button>
)

const Statistic = ({name, value}) => (
  <tr><td>{name}</td><td>{value}</td></tr>
)

const Statistics = ({numGood, numNeutral, numBad}) => {

  const numRatings = numGood + numNeutral + numBad;
  const meanRating = (numGood - numBad) / numRatings;
  const percentPositive = numGood / numRatings * 100;

  return(
    <>
    <h1>Feedback statistics</h1>
    {numRatings === 0
      ? <p>No ratings yet</p>
      : <table style={{textAlign: "left", margin: "auto"}}>
          <tbody>
            <Statistic 
              name={'Good'} 
              value={numGood} />
            <Statistic
              name={'Neutral'} 
              value={numNeutral} />
            <Statistic 
              name={'Bad'}
              value={numBad} />
            <Statistic 
              name={'Number of ratings'}
              value={numRatings} />
            <Statistic 
              name={'Average rating'}
              value={meanRating.toPrecision(2)} />
            <Statistic 
              name={'Positive ratings'}
              value={percentPositive.toPrecision(2) + '%'} />
          </tbody>
        </table>
    }
    </>
  );
}

const App = () => {

  const [numGood, setNumGood] = useState(0);
  const [numNeutral, setNumNeutral] = useState(0);
  const [numBad, setNumBad] = useState(0);

  return(
    <div className="App">
      <h1>What do you think about our service?</h1>
      <FeedbackButton 
        text={'good'} 
        onClick={() => setNumGood(numGood + 1)} />
      <FeedbackButton 
        text={'neutral'}
        onClick={() => setNumNeutral(numNeutral + 1)} />
      <FeedbackButton 
        text={'bad'}
        onClick={() => setNumBad(numBad + 1)} />
      <Statistics 
        numGood={numGood}
        numNeutral={numNeutral} 
        numBad={numBad} />
    </div>
  );
}

export default App;
