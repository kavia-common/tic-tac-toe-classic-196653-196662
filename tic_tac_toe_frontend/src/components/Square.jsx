import React from "react";

/**
 * A single Tic Tac Toe square.
 *
 * Props:
 * - value: "X" | "O" | null
 * - onClick: () => void
 * - disabled: boolean
 * - highlight: boolean (true if part of winning line)
 */
export default function Square({ value, onClick, disabled, highlight }) {
  return (
    <button
      type="button"
      className={`ttt-square${highlight ? " is-highlight" : ""}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={value ? `Square ${value}` : "Empty square"}
    >
      {value}
    </button>
  );
}
