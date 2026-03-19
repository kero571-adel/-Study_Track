import { useState } from "react";
import { motion } from "framer-motion";

// Tic Tac Toe game - supports Player vs Player and Player vs Computer (AI)
export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameHistory, setGameHistory] = useState({ x: 0, o: 0, draws: 0 });
  const [gameMode, setGameMode] = useState(null); // null = selection, "pvp" = player vs player, "pvc" = player vs computer
  const [isComputerThinking, setIsComputerThinking] = useState(false);

  // Calculate winner with line information
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return { winner: squares[a], line: lines[i] };
      }
    }
    return null;
  };

  // Simple AI strategy for computer moves
  const getComputerMove = (currentBoard) => {
    // Check if computer can win
    for (let i = 0; i < 9; i++) {
      if (currentBoard[i] === null) {
        const testBoard = [...currentBoard];
        testBoard[i] = "O";
        if (calculateWinner(testBoard)?.winner === "O") {
          return i;
        }
      }
    }

    // Check if player can win and block
    for (let i = 0; i < 9; i++) {
      if (currentBoard[i] === null) {
        const testBoard = [...currentBoard];
        testBoard[i] = "X";
        if (calculateWinner(testBoard)?.winner === "X") {
          return i;
        }
      }
    }

    // Take center if available
    if (currentBoard[4] === null) return 4;

    // Take corners
    const corners = [0, 2, 6, 8].filter((i) => currentBoard[i] === null);
    if (corners.length > 0)
      return corners[Math.floor(Math.random() * corners.length)];

    // Take any available space
    const available = currentBoard
      .map((val, idx) => (val === null ? idx : null))
      .filter((val) => val !== null);
    return available[Math.floor(Math.random() * available.length)];
  };

  const winner = calculateWinner(board);
  const isBoardFull = board.every((square) => square !== null);
  const isGameOver = winner || isBoardFull;

  const handleClick = (index) => {
    if (board[index] || isGameOver || isComputerThinking) return;

    // Player move
    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);

    // Check if game ends after player move
    if (calculateWinner(newBoard) || newBoard.every((s) => s !== null)) {
      return;
    }

    // Computer move in PvC mode
    if (gameMode === "pvc") {
      setIsComputerThinking(true);
      setTimeout(() => {
        const computerIndex = getComputerMove(newBoard);
        newBoard[computerIndex] = "O";
        setBoard(newBoard);
        setIsXNext(true);
        setIsComputerThinking(false);
      }, 600);
    }
  };

  const resetGame = () => {
    const newBoard = Array(9).fill(null);
    setBoard(newBoard);
    setIsXNext(true);

    // Update history if game was completed
    if (winner) {
      setGameHistory((prev) => ({
        ...prev,
        [winner.winner.toLowerCase()]: prev[winner.winner.toLowerCase()] + 1,
      }));
    } else if (isBoardFull) {
      setGameHistory((prev) => ({
        ...prev,
        draws: prev.draws + 1,
      }));
    }
  };

  const resetHistory = () => {
    setGameHistory({ x: 0, o: 0, draws: 0 });
    resetGame();
  };

  const selectMode = (mode) => {
    setGameMode(mode);
    resetGame();
  };

  const renderSquare = (index) => {
    const isWinningSquare = winner && winner.line.includes(index);
    const hasContent = board[index] !== null;

    return (
      <motion.button
        key={index}
        className={`ttt-square ${isWinningSquare ? "winning" : ""}`}
        onClick={() => handleClick(index)}
        disabled={isComputerThinking}
        whileHover={!isComputerThinking && !board[index] ? { scale: 1.08 } : {}}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {hasContent && (
          <motion.span
            className={`ttt-mark ttt-mark-${board[index].toLowerCase()}`}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            {board[index]}
          </motion.span>
        )}
      </motion.button>
    );
  };

  // Mode selection screen
  if (gameMode === null) {
    return (
      <div className="game-ttt">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          ⭕ Tic Tac Toe
        </motion.h2>

        <div className="game-mode-selection">
          <motion.button
            className="mode-button"
            onClick={() => selectMode("pvp")}
            whileHover={{ scale: 1.05, y: -6 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <span className="mode-icon">👥</span>
            <span>Player vs Player</span>
            <small style={{ fontSize: "0.875rem", color: "inherit" }}>
              2 Players, Take Turns
            </small>
          </motion.button>

          <motion.button
            className="mode-button primary"
            onClick={() => selectMode("pvc")}
            whileHover={{ scale: 1.05, y: -6 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <span className="mode-icon">🤖</span>
            <span>Player vs Computer</span>
            <small style={{ fontSize: "0.875rem", color: "inherit" }}>
              Challenge the AI
            </small>
          </motion.button>
        </div>

        <motion.div
          className="game-instructions"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ marginTop: "2rem" }}
        >
          <p>
            🎮 First to get 3 in a row (horizontally, vertically, or diagonally)
            wins!
          </p>
        </motion.div>
      </div>
    );
  }

  // Game screen
  return (
    <div className="game-ttt">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        ⭕ Tic Tac Toe {gameMode === "pvc" ? "- vs Computer" : "- 2 Players"}
      </motion.h2>

      {/* Score Board */}
      <motion.div
        className="score-board"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="score-item">
          <span className="score-label">
            {gameMode === "pvc" ? "You (X)" : "Player X"}
          </span>
          <motion.span
            className="score-value"
            style={{ color: "#3b82f6" }}
            key={gameHistory.x}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
          >
            {gameHistory.x}
          </motion.span>
        </div>
        <div className="score-item">
          <span className="score-label">Draws</span>
          <motion.span
            className="score-value"
            style={{ color: "#f59e0b" }}
            key={gameHistory.draws}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
          >
            {gameHistory.draws}
          </motion.span>
        </div>
        <div className="score-item">
          <span className="score-label">
            {gameMode === "pvc" ? "Computer (O)" : "Player O"}
          </span>
          <motion.span
            className="score-value"
            style={{ color: "#ef4444" }}
            key={gameHistory.o}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
          >
            {gameHistory.o}
          </motion.span>
        </div>
      </motion.div>

      {/* Game Status */}
      <motion.div
        className="game-status"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {winner && (
          <div className="status-winner">
            🎉{" "}
            {gameMode === "pvc" && winner.winner === "X"
              ? "You Win!"
              : gameMode === "pvc" && winner.winner === "O"
              ? "Computer Wins!"
              : `Player ${winner.winner} Wins!`}
          </div>
        )}
        {!winner && isBoardFull && (
          <div className="status-draw">🤝 It's a Draw!</div>
        )}
        {!isGameOver && (
          <div className="status-turn">
            {gameMode === "pvc" ? (
              isComputerThinking ? (
                <>🤔 Computer is thinking...</>
              ) : isXNext ? (
                <>
                  Your Turn: <span className="turn-player turn-x">X</span>
                </>
              ) : (
                <>
                  Computer's Turn: <span className="turn-player turn-o">O</span>
                </>
              )
            ) : isXNext ? (
              <>
                Current Turn:{" "}
                <span className="turn-player turn-x">Player X</span>
              </>
            ) : (
              <>
                Current Turn:{" "}
                <span className="turn-player turn-o">Player O</span>
              </>
            )}
          </div>
        )}
      </motion.div>

      {/* Game Board */}
      <motion.div
        className="ttt-board"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((index) => renderSquare(index))}
      </motion.div>

      {/* Control Buttons */}
      <motion.div
        className="game-controls"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <motion.button
          onClick={resetGame}
          className="btn btn-primary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isGameOver ? "New Game" : "Reset Game"}
        </motion.button>
        <motion.button
          onClick={() => setGameMode(null)}
          className="btn btn-secondary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Change Mode
        </motion.button>
        <motion.button
          onClick={resetHistory}
          className="btn btn-secondary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Reset History
        </motion.button>
      </motion.div>

      {/* Instructions */}
      <motion.div
        className="game-instructions"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        {gameMode === "pvc" ? (
          <p>
            🤖 You are <strong>X</strong> and the computer is <strong>O</strong>
            . Get 3 in a row to win!
          </p>
        ) : (
          <p>
            👥 <strong>Player X</strong> goes first. Take turns clicking
            squares. First to get 3 in a row wins!
          </p>
        )}
      </motion.div>
    </div>
  );
}
