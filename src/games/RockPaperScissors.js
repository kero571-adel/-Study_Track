import { useState } from "react";
import { motion } from "framer-motion";

// Rock Paper Scissors game - user vs computer with smooth animations
export default function RockPaperScissors() {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState({ wins: 0, losses: 0, draws: 0 });
  const [gameStarted, setGameStarted] = useState(false);

  const choices = ["rock", "paper", "scissors"];
  const choiceEmojis = {
    rock: "✊",
    paper: "📄",
    scissors: "✌️",
  };

  const getComputerChoice = () => {
    return choices[Math.floor(Math.random() * choices.length)];
  };

  const determineWinner = (user, computer) => {
    if (user === computer) return "draw";
    if (
      (user === "rock" && computer === "scissors") ||
      (user === "paper" && computer === "rock") ||
      (user === "scissors" && computer === "paper")
    ) {
      return "win";
    }
    return "lose";
  };

  const handlePlay = (choice) => {
    const computer = getComputerChoice();
    const gameResult = determineWinner(choice, computer);

    setUserChoice(choice);
    setComputerChoice(null); // Reset for animation
    setResult(null);
    setGameStarted(true);

    // Animate computer's choice after a delay
    setTimeout(() => {
      setComputerChoice(computer);
      setResult(gameResult);

      // Update score
      setScore((prev) => ({
        ...prev,
        wins: gameResult === "win" ? prev.wins + 1 : prev.wins,
        losses: gameResult === "lose" ? prev.losses + 1 : prev.losses,
        draws: gameResult === "draw" ? prev.draws + 1 : prev.draws,
      }));
    }, 800);
  };

  const resetGame = () => {
    setUserChoice(null);
    setComputerChoice(null);
    setResult(null);
    setGameStarted(false);
  };

  const resetScore = () => {
    setScore({ wins: 0, losses: 0, draws: 0 });
    resetGame();
  };

  return (
    <div className="game-rps">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        ✊ Rock Paper Scissors
      </motion.h2>

      {/* Score Board */}
      <motion.div
        className="score-board"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <motion.div
          className="score-item"
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <span className="score-label">Wins</span>
          <motion.span
            className="score-value"
            style={{ color: "#10b981" }}
            key={score.wins}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
          >
            {score.wins}
          </motion.span>
        </motion.div>
        <motion.div
          className="score-item"
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <span className="score-label">Losses</span>
          <motion.span
            className="score-value"
            style={{ color: "#ef4444" }}
            key={score.losses}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
          >
            {score.losses}
          </motion.span>
        </motion.div>
        <motion.div
          className="score-item"
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <span className="score-label">Draws</span>
          <motion.span
            className="score-value"
            style={{ color: "#f59e0b" }}
            key={score.draws}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
          >
            {score.draws}
          </motion.span>
        </motion.div>
      </motion.div>

      {/* Game Board */}
      <motion.div
        className="rps-game-board"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <div className="rps-column">
          <h3>You</h3>
          <motion.div
            className="rps-choice-display"
            animate={{
              rotateY: userChoice ? 0 : 0,
            }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            {userChoice ? (
              <motion.div
                className="choice-display"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                {choiceEmojis[userChoice]}
              </motion.div>
            ) : (
              <div className="choice-placeholder">?</div>
            )}
          </motion.div>
        </div>

        <motion.div
          className="rps-vs"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
        >
          <span>vs</span>
        </motion.div>

        <div className="rps-column">
          <h3>Computer</h3>
          <motion.div
            className="rps-choice-display"
            animate={{
              rotateY: gameStarted && !computerChoice ? 360 : 0,
            }}
            transition={{
              duration: 0.6,
              repeat: gameStarted && !computerChoice ? Infinity : 0,
            }}
          >
            {gameStarted && computerChoice ? (
              <motion.div
                className="choice-display"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                {choiceEmojis[computerChoice]}
              </motion.div>
            ) : gameStarted && !computerChoice ? (
              <motion.div
                className="choice-display"
                animate={{ rotateY: 360 }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                }}
              >
                🤔
              </motion.div>
            ) : (
              <div className="choice-placeholder">?</div>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Result */}
      {result && (
        <motion.div
          className={`result-message result-${result}`}
          initial={{ opacity: 0, y: -10, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          {result === "win" && "🎉 You Won!"}
          {result === "lose" && "😢 You Lost!"}
          {result === "draw" && "🤝 It's a Draw!"}
        </motion.div>
      )}

      {/* Action Buttons */}
      <motion.div
        className="rps-buttons"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        {choices.map((choice, index) => (
          <motion.button
            key={choice}
            onClick={() => handlePlay(choice)}
            className={`rps-btn ${userChoice === choice ? "selected" : ""}`}
            title={choice}
            whileHover={{ scale: 1.08, y: -4 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.35 + index * 0.1 }}
            disabled={gameStarted && !result}
          >
            <motion.span
              className="rps-btn-emoji"
              whileHover={{ scale: 1.3, rotate: 15 }}
            >
              {choiceEmojis[choice]}
            </motion.span>
            <span className="rps-btn-label">{choice}</span>
          </motion.button>
        ))}
      </motion.div>

      {/* Control Buttons */}
      <motion.div
        className="game-controls"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.65 }}
      >
        <motion.button
          onClick={resetGame}
          className="btn btn-secondary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Reset Round
        </motion.button>
        <motion.button
          onClick={resetScore}
          className="btn btn-secondary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Reset Score
        </motion.button>
      </motion.div>
    </div>
  );
}
