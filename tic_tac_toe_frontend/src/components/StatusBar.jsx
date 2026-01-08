import React from "react";

/**
 * Displays the current game status (turn, win, draw).
 *
 * Props:
 * - statusText: string
 * - statusType: "turn" | "win" | "draw"
 */
export default function StatusBar({ statusText, statusType }) {
  const typeClass =
    statusType === "win" ? "is-success" : statusType === "draw" ? "is-neutral" : "is-turn";

  return (
    <div className={`ttt-status ${typeClass}`} role="status" aria-live="polite">
      {statusText}
    </div>
  );
}
