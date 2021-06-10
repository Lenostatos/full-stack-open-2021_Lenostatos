import React, { useState } from 'react'
import './App.css';

// Displays a single anecdote with a count of its votes.
const Anecdote = ({anecdote}) => (
  <>
  <p>{anecdote.text}</p>
  <p>{anecdote.votes + ' vote' + (anecdote.votes === 1 ? '' : 's')}</p>
  </>
);
 
// Displays an anecdote with a vote button.
const VotableAnecdote = ({anecdote, setVotes}) => (
  <>
  <Anecdote anecdote={anecdote} />
  <button onClick={() => setVotes(anecdote.votes + 1)}>Vote</button>
  </>
);

// Determines and displays the most popular anecdote
const MostPopularAnecdote = ({anecdotes}) => {

  // Find the first anecdote with the maximum number of votes.
  const firstMostPopular = anecdotes.reduce((mostPopular, current) => (
    current.votes > mostPopular.votes 
      ? current 
      : mostPopular
  ), anecdotes[0]); // initialize mostPopular with the first anecdote

  // Ensure that the most popular anecdote doesn't change when another anecdote
  // gains the same amount of votes.
  const [mostPopular, setMostPopular] = useState(firstMostPopular);
  if (firstMostPopular.votes > mostPopular.votes) {
    setMostPopular(firstMostPopular);
  }

  return (
    <>
    <h1>Most popular anecdote</h1>
    {mostPopular.votes > 0
      ? <Anecdote anecdote={mostPopular} />
      : <p>No votes casted yet</p>}    
    </>
  );
};

const App = () => {
  
  const [anecdotes, setAnecdotes] = useState(
    [
      'If it hurts, do it more often',
      'Adding manpower to a late software project makes it later!',
      'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
      'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', 
      'Premature optimization is the root of all evil.', 
      'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', 
      'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
    ].map(text => ({text: text, votes: 0}))
    // Map the anecdotes array to an array of objects where each object contains
    // an anecdote and a vote counter.
  );
   
  const [selected, setSelected] = useState(
    Math.floor(Math.random() * anecdotes.length)
  );

  // Prevent the same anecdote from showing up twice in a row by generating
  // random indices until one is found that is different from the current index.
  function selectNextAnecdote() {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * anecdotes.length);
    } while (newIndex === selected);

    setSelected(newIndex);
  }

  function setVotes(votes) {
    const anecdotesCopy = [...anecdotes];
    anecdotesCopy[selected].votes = votes;
    setAnecdotes(anecdotesCopy);
  }

  return (
    <>
    <h1>Anecdote of the day</h1>
    <VotableAnecdote
      anecdote={anecdotes[selected]}
      setVotes={votes => setVotes(votes)} 
    />
    <button onClick={selectNextAnecdote}>Next anecdote</button>
    <MostPopularAnecdote anecdotes={anecdotes} />
    </>
  );
};

export default App;
