import React from "react";
import Square from "./Square";

/**
 * Tic Tac Toe board (3x3).
 *
 * Props:
 * - squares: Array<"X" | "O" | null> length 9
 * - onPlay: (index: number) => void
 * - disabled: boolean (true when game over)
 * - winningLine: number[] | null
 */
export default function Board({ squares, onPlay, disabled, winningLine }) {
  const isWinningIndex = (idx) => Array.isArray(winningLine) && winningLine.includes(idx);

  return (
    <div className="ttt-board" role="grid" aria-label="Tic Tac Toe board">
      {squares.map((value, idx) => (
        <Square
          key={idx}
          value={value}
          onClick={() => onPlay(idx)}
          disabled={disabled || Boolean(value)}
          highlight={isWinningIndex(idx)}
        />
      ))}
    </div>
  );
}
