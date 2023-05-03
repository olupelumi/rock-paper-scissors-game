import React, { useState } from 'react';
import './App.css';
/**
 * Create rock paper scissors
 * Reqs/Understanding:
 * 2 players, each has three options (r, p, s)
 * 1v1 game and the result is known silmutaneously - game of incomplete information
 * - can't allow a player to know what the other is going to play 
 * r > s, p > r, s > p
 * if both players get the same thing, it's a draw
 * 
 * Approach (generally):
 * player 1 goes first. They pick their item. -> then what they chose is hidden
 * player 2 goes next. They pick their item. -> Then we reveal player1's item and calculate a winner or say it's a draw
 * 
 * 
 * Implementation plan
 * player1's item in state - potentially useState
 * player2's item in state - also potentially useState
 * {player1: '', player2: ''} -> 'R', 'P', 'S'
 * player 1 and player 2 divs
 * 1. If no player has played -> we let player 1 choose some options (we know this if player 1 has empty string)
 * 2. Once player 1 has gone (no longer empty string), we allowe player 2 
 * choose their option. [player 1 no empty string and player 2 empty string]
 * 3. Once player 2 has chosen their item, we want to 1. reveal both items and then 2. calculate both items 
 * here we know to do the reveal and the calculator of a winner based on if both player1 and player2 state values are not empty string
 * reveal based on player1 !== '' && player2 != ''
 * 
 * Calculating the winner look like:
 * calculatewinnerfunc(p1Result, p2Result) { returns a string
 *  # edge cases 
 *  if p1result == p2result -> return "It's a draw"
 * 
 *  if p1r == 'R' and p2r == 'S' -> 'p1 is the winner'
 *  if p1r == 'P' and p2r == 'R' -> 'p1 is the winner'
 *  if p1r == 'S' and p2r == 'P' -> 'p1 is the winner'
 * 
 *  else p2 is the winner
 * 
 * }
 * 
 * 
 * 
 */

function App() {
  type Results = ''|'P'|'R'|'S';
  type GameResult = {
    p1: Results;
    p2: Results;
  }
  const [gameResult, setGameResult] = useState<GameResult>({p1: '', p2: ''});

  const bothPlayed = gameResult.p1 && gameResult.p2

  //calculate winner and show results
  const calculatewinner = ({p1,p2}: GameResult) => {
    if (p1 === p2) {return 'Draw'}
    if (p1 === 'R' && p2 === 'S') {
      return 'P1 is the winner'
    }
    if (p1 === 'P' && p2 === 'R') {
      return 'P1 is the winner'
    }
    if (p1 === 'S' && p2 === 'P') {
      return 'P1 is the winner'
    }
    return 'P2 is the winner'
  }

  const winner = calculatewinner(gameResult);
  return (
  <>
  {!gameResult.p1 && !gameResult.p2? <div>
    Player 1 choose
    <button onClick = {()=> {setGameResult({...gameResult, p1: 'R'})}}>
      Rock
    </button>
    <button onClick = {()=> {setGameResult({...gameResult, p1: 'P'})}}>
      Paper
    </button>
    <button onClick = {()=> {setGameResult({...gameResult, p1: 'S'})}}>
      Scissors
    </button> 
  </div>:<div>Not player 1 turn</div>}

  {gameResult.p1 && !gameResult.p2? <div>
    Player 2 choose
    <button onClick = {()=> {setGameResult({...gameResult, p2: 'R'})}}>
      Rock
    </button>
    <button onClick = {()=> {setGameResult({...gameResult, p2: 'P'})}}>
      Paper
    </button>
    <button onClick = {()=> {setGameResult({...gameResult, p2: 'S'})}}>
      Scissors
    </button> 
  </div>:<div>Not player 2 turn</div>}

  {bothPlayed && <div>
    Player 1 played {gameResult.p1}, {' '}
    Player 2 played: {gameResult.p2}, and {' '}
    {winner}
    </div>}
  </>
  );
}

export default App;
