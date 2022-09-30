import React, { useState } from "react";
import GridCell from "./components/Grid-Cell";
import "./App.css";

const App = () => {
  const [xTurn, setXTurn] = useState(true);
  const winnerCombinations = [
    ["0", "1", "2"],
    ["3", "4", "5"],
    ["6", "7", "8"],
    ["0", "3", "6"],
    ["1", "4", "7"],
    ["2", "5", "8"],
    ["0", "4", "8"],
    ["2", "4", "6"],
  ];

  const [playGrid, setPlayGrid] = useState(Array(9).fill(null));
  const [xNumbers, setXNumbers] = useState([]);
  const [oNumbers, setONumbers] = useState([]);
  const [gameOutcome, setGameOutcome] = useState("");
  const [gameOver, setGameOver] = useState("auto");

  const handleClick = (id) => {
    let updateGameBoardArray = [...playGrid];
    let xArr = [...xNumbers];
    let oArr = [...oNumbers];
    if (xTurn) {
      updateGameBoardArray[id] = "❌";
      xArr.push(id);
      setXTurn(false);
      checkOutcome(xArr, "X");
      setXNumbers(xArr);
    } else {
      updateGameBoardArray[id] = "⭕️";
      oArr.push(id);
      setXTurn(true);
      checkOutcome(oArr, "O");
      setONumbers(oArr);
    }
    setPlayGrid(updateGameBoardArray);
  };

  const checkOutcome = (arr, symbol) => {
    winnerCombinations.forEach((combination) => {
      let result = combination.every((element) => {
        return arr.includes(element);
      });
      return (
        result && [
          setGameOutcome(`${symbol} is the Winner`),
          setGameOver("none"),
        ]
      );
    });
    return arr.length === 5 && symbol === "X" && setGameOutcome("Tie Game");
  };

  const resetGame = () => {
    setPlayGrid(Array(9).fill(null));
    setXTurn(true);
    setGameOutcome("");
    setXNumbers([]);
    setONumbers([]);
    setGameOver("auto");
  };

  return (
    <div className="container">
      <h1>Tic Tac Toe</h1>
      <div className="reset-game">
        <button onClick={resetGame}>Reset Game</button>
      </div>
      <div className="grid" style={{ pointerEvents: gameOver }}>
        {playGrid.map((e, i) => {
          return (
            <GridCell handleClick={handleClick} key={i} index={i} element={e} />
          );
        })}
      </div>
      {gameOutcome && <div className="game-winner">{gameOutcome}</div>}
    </div>
  );
};
export default App;
