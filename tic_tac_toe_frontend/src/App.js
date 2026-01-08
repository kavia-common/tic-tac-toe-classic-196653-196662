import React, { useMemo, useState } from "react";
import Board from "./components/Board";
import StatusBar from "./components/StatusBar";
import "./App.css";

function calculateWinner(squares) {
  const lines = [
    // rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // cols
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diagonals
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    const v = squares[a];
    if (v && v === squares[b] && v === squares[c]) {
      return { winner: v, line: [a, b, c] };
    }
  }

  return { winner: null, line: null };
}

function isDraw(squares) {
  return squares.every((s) => s !== null);
}

// PUBLIC_INTERFACE
function App() {
  /** Board state: Array<"X" | "O" | null> length 9 */
  const [squares, setSquares] = useState(() => Array(9).fill(null));
  /** Current player: "X" | "O" */
  const [currentPlayer, setCurrentPlayer] = useState("X");

  const { winner, line: winningLine } = useMemo(() => calculateWinner(squares), [squares]);
  const draw = useMemo(() => !winner && isDraw(squares), [squares, winner]);
  const gameOver = Boolean(winner) || draw;

  const status = useMemo(() => {
    if (winner) {
      return { text: `Winner: ${winner}`, type: "win" };
    }
    if (draw) {
      return { text: "Draw — no more moves.", type: "draw" };
    }
    return { text: `Turn: ${currentPlayer}`, type: "turn" };
  }, [winner, draw, currentPlayer]);

  // PUBLIC_INTERFACE
  const handlePlay = (index) => {
    // Ignore moves after game over or on occupied squares.
    if (gameOver || squares[index]) return;

    setSquares((prev) => {
      const next = prev.slice();
      next[index] = currentPlayer;
      return next;
    });

    setCurrentPlayer((prev) => (prev === "X" ? "O" : "X"));
  };

  // PUBLIC_INTERFACE
  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setCurrentPlayer("X");
  };

  return (
    <div className="App">
      <main className="ttt-shell">
        <header className="ttt-header">
          <h1 className="ttt-title">Tic Tac Toe</h1>
          <p className="ttt-subtitle">Two players — take turns placing X and O.</p>
        </header>

        <section className="ttt-surface" aria-label="Game area">
          <StatusBar statusText={status.text} statusType={status.type} />

          <Board
            squares={squares}
            onPlay={handlePlay}
            disabled={gameOver}
            winningLine={winningLine}
          />

          <div className="ttt-actions">
            <button type="button" className="ttt-reset" onClick={handleReset}>
              Reset
            </button>
          </div>
        </section>

        <footer className="ttt-footer">
          <span className="ttt-hint">
            {winner ? "Reset to play again." : draw ? "Try again with Reset." : "First to 3 wins."}
          </span>
        </footer>
      </main>
    </div>
  );
}

export default App;
