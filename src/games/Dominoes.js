/*
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Dominoes() {
  const [gameMode, setGameMode] = useState(null); // null, "pvp", "pvc"
  const [gameState, setGameState] = useState("playing");
  const [board, setBoard] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [player2Hand, setPlayer2Hand] = useState([]);
  const [computerHand, setComputerHand] = useState([]);
  const [boneyard, setBoneyard] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(1); // 1 or 2, or "computer"
  const [gameHistory, setGameHistory] = useState({
    player1: 0,
    player2: 0,
    draws: 0,
  });
  const [selectedDomino, setSelectedDomino] = useState(null);
  const [gameMessage, setGameMessage] = useState("");
  const [computerThinking, setComputerThinking] = useState(false);
  const [passCount, setPassCount] = useState(0);

  // Initialize game
  const initializeGame = () => {
    const dominoes = [];
    for (let i = 0; i <= 6; i++) {
      for (let j = i; j <= 6; j++) {
        dominoes.push([i, j]);
      }
    }

    const shuffled = dominoes.sort(() => Math.random() - 0.5);
    const p1 = shuffled.slice(0, 7);
    const p2 = shuffled.slice(7, 14);
    const remaining = shuffled.slice(14);

    setBoard([p1[0]]);
    setPlayerHand(p1.slice(1));

    if (gameMode === "pvp") {
      setPlayer2Hand(p2);
    } else {
      setComputerHand(p2);
    }

    setBoneyard(remaining);
    setCurrentPlayer(gameMode === "pvp" ? 2 : "computer");
    setGameState("playing");
    setGameMessage("اللعبة بدأت!");
    setPassCount(0);
    setSelectedDomino(null);
  };

  useEffect(() => {
    if (gameMode) {
      initializeGame();
    }
  }, [gameMode]);

  const getValidPlays = (hand) => {
    if (board.length === 0) return hand;
    const left = board[0][0];
    const right = board[board.length - 1][1];
    return hand.filter(
      (d) => d[0] === left || d[1] === left || d[0] === right || d[1] === right
    );
  };

  const canPlayDomino = (domino, position) => {
    if (board.length === 0) return true;
    const left = board[0][0];
    const right = board[board.length - 1][1];
    if (position === "left") return domino[0] === left || domino[1] === left;
    return domino[0] === right || domino[1] === right;
  };

  const playDomino = (domino, position) => {
    if (gameState !== "playing") return;
    if (currentPlayer !== 1 && gameMode === "pvp") return;
    if (currentPlayer !== 1 && gameMode === "pvc") return;

    if (!canPlayDomino(domino, position)) return;

    const newBoard = [...board];
    let dominoToPlay = [...domino];

    if (position === "left") {
      if (newBoard[0][0] === domino[1]) {
        dominoToPlay = [domino[1], domino[0]];
      }
      newBoard.unshift(dominoToPlay);
    } else {
      if (newBoard[newBoard.length - 1][1] === domino[0]) {
        dominoToPlay = [domino[1], domino[0]];
      }
      newBoard.push(dominoToPlay);
    }

    setBoard(newBoard);
    setPlayerHand(playerHand.filter((d) => d !== domino));
    setSelectedDomino(null);
    setPassCount(0);

    if (playerHand.filter((d) => d !== domino).length === 0) {
      endGame(gameMode === "pvp" ? "player1Wins" : "playerWins");
      return;
    }

    if (gameMode === "pvp") {
      setCurrentPlayer(2);
    } else {
      setCurrentPlayer("computer");
    }
  };

  const drawBone = () => {
    if (gameState !== "playing" || currentPlayer !== 1) return;
    if (boneyard.length === 0) {
      setPassCount(passCount + 1);
      if (passCount >= 1) {
        endGame("blocked");
      } else {
        setGameMessage("لا توجد عظام متبقية - يتنقل اللاعب الآخر");
        if (gameMode === "pvp") {
          setCurrentPlayer(2);
        } else {
          setCurrentPlayer("computer");
        }
      }
      return;
    }

    const drawn = boneyard[0];
    setPlayerHand([...playerHand, drawn]);
    setBoneyard(boneyard.slice(1));
    setGameMessage("أخذت عظمة من المقبرة");
    setPassCount(0);

    if (gameMode === "pvp") {
      setCurrentPlayer(2);
    } else {
      setCurrentPlayer("computer");
    }
  };

  // Computer AI moves
  useEffect(() => {
    if (currentPlayer === "computer" && gameState === "playing") {
      setComputerThinking(true);
      const timer = setTimeout(() => {
        makeComputerMove();
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [currentPlayer, gameState, board, computerHand, boneyard]);

  const makeComputerMove = () => {
    const validPlays = getValidPlays(computerHand);

    if (validPlays.length === 0) {
      if (boneyard.length === 0) {
        endGame("computerPass");
        setComputerThinking(false);
        return;
      }
      const drawn = boneyard[0];
      setComputerHand([...computerHand, drawn]);
      setBoneyard(boneyard.slice(1));
      setGameMessage("الكمبيوتر أخذ عظمة");
      setCurrentPlayer(1);
      setComputerThinking(false);
      return;
    }

    const domino = validPlays[Math.floor(Math.random() * validPlays.length)];
    const canLeft = canPlayDomino(domino, "left");
    const canRight = canPlayDomino(domino, "right");

    let position = "right";
    if (canLeft && !canRight) position = "left";
    else if (canRight && !canLeft) position = "right";
    else if (canLeft && canRight)
      position = Math.random() < 0.5 ? "left" : "right";

    const newBoard = [...board];
    let dominoToPlay = [...domino];

    if (position === "left") {
      if (newBoard[0][0] === domino[1]) {
        dominoToPlay = [domino[1], domino[0]];
      }
      newBoard.unshift(dominoToPlay);
    } else {
      if (newBoard[newBoard.length - 1][1] === domino[0]) {
        dominoToPlay = [domino[1], domino[0]];
      }
      newBoard.push(dominoToPlay);
    }

    setBoard(newBoard);
    setComputerHand(computerHand.filter((d) => d !== domino));
    setGameMessage("لعب الكمبيوتر عظمة");

    if (computerHand.filter((d) => d !== domino).length === 0) {
      endGame("computerWins");
      setComputerThinking(false);
      return;
    }

    setCurrentPlayer(1);
    setComputerThinking(false);
  };

  const endGame = (reason) => {
    setGameState("gameOver");
    let message = "";

    if (reason === "playerWins") {
      message = "🎉 أنت فزت!";
      setGameHistory((prev) => ({ ...prev, player1: prev.player1 + 1 }));
    } else if (reason === "player1Wins") {
      message = "🎉 اللاعب 1 فاز!";
      setGameHistory((prev) => ({ ...prev, player1: prev.player1 + 1 }));
    } else if (reason === "computerWins") {
      message = "😢 الكمبيوتر فاز!";
      setGameHistory((prev) => ({ ...prev, player2: prev.player2 + 1 }));
    } else if (reason === "computerPass") {
      message = "🤝 أنت فزت - الكمبيوتر لا يستطيع اللعب!";
      setGameHistory((prev) => ({ ...prev, player1: prev.player1 + 1 }));
    } else if (reason === "blocked") {
      message = "🤝 اللعبة انتهت - لا يمكن اللعب!";
      setGameHistory((prev) => ({ ...prev, draws: prev.draws + 1 }));
    }

    setGameMessage(message);
  };

  const renderDomino = (
    domino,
    index,
    isInHand = false,
    isSelected = false,
    isHidden = false
  ) => {
    return (
      <motion.button
        key={`${domino[0]}-${domino[1]}-${index}`}
        className={`domino-piece ${isSelected ? "selected" : ""} ${
          isHidden ? "hidden" : ""
        }`}
        onClick={() =>
          isInHand && setSelectedDomino(isSelected ? null : domino)
        }
        whileHover={
          isInHand && currentPlayer === 1 && !computerThinking
            ? { scale: 1.12, y: -8 }
            : {}
        }
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200 }}
        disabled={!isInHand}
      >
        <div className="domino-dot">{isHidden ? "?" : domino[0]}</div>
        <div className="domino-middle"></div>
        <div className="domino-dot">{isHidden ? "?" : domino[1]}</div>
      </motion.button>
    );
  };

  // Mode Selection Screen
  if (!gameMode) {
    return (
      <div className="game-dominoes-wrapper">
        <motion.h2
          className="game-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          🎲 لعبة الدومينو
        </motion.h2>

        <div className="game-mode-selection">
          <motion.button
            className="mode-button"
            onClick={() => setGameMode("pvp")}
            whileHover={{ scale: 1.05, y: -6 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <span className="mode-icon">👥</span>
            <span>لعب مع صديق</span>
            <small>لاعب ضد لاعب - تناوب الأدوار</small>
          </motion.button>

          <motion.button
            className="mode-button primary"
            onClick={() => setGameMode("pvc")}
            whileHover={{ scale: 1.05, y: -6 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <span className="mode-icon">🤖</span>
            <span>لعب مع الكمبيوتر</span>
            <small>تحدى الذكاء الاصطناعي</small>
          </motion.button>
        </div>

        <motion.div
          className="game-instructions"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p>
            🎮 اربط قطع الدومينو بنفس الأرقام! الفائز هو من يتخلص من جميع قطعه
            أولاً.
          </p>
        </motion.div>
      </div>
    );
  }

  // Game Screen
  return (
    <div className="game-dominoes-wrapper">
      <motion.h2
        className="game-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        🎲 الدومينو {gameMode === "pvc" ? "- ضد الكمبيوتر" : "- لاعبان"}
      </motion.h2>

      {/* Score Board * /}
      <motion.div
        className="score-board dominoes-score"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="score-item">
          <span className="score-label">
            {gameMode === "pvc" ? "أنت" : "لاعب 1"}
          </span>
          <motion.span
            className="score-value"
            style={{ color: "#3b82f6" }}
            key={gameHistory.player1}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
          >
            {gameHistory.player1}
          </motion.span>
        </div>
        <div className="score-item">
          <span className="score-label">تعادل</span>
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
            {gameMode === "pvc" ? "الكمبيوتر" : "لاعب 2"}
          </span>
          <motion.span
            className="score-value"
            style={{ color: "#ef4444" }}
            key={gameHistory.player2}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
          >
            {gameHistory.player2}
          </motion.span>
        </div>
      </motion.div>

      {/* Game Status * /}
      <motion.div
        className="game-status"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div
          className={`status-message ${
            gameState === "gameOver" ? "game-over" : ""
          }`}
        >
          {gameMessage}
        </div>
        {gameState === "playing" && (
          <div className="game-turn-info">
            {currentPlayer === 1 ? (
              <span className="turn-label">🎮 دورك الآن</span>
            ) : (
              <span className="turn-label">
                {gameMode === "pvc" ? "🤖 دور الكمبيوتر" : "👤 دور لاعب 2"}
              </span>
            )}
          </div>
        )}
      </motion.div>

      {/* Board * /}
      <motion.div
        className="dominoes-board-container"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="board-stats">
          <div className="stat">📦 عظام المقبرة: {boneyard.length}</div>
          {gameMode === "pvp" && (
            <div className="stat">👤 عظام اللاعب 2: {player2Hand.length}</div>
          )}
          {gameMode === "pvc" && (
            <div className="stat">🤖 عظام الكمبيوتر: {computerHand.length}</div>
          )}
        </div>

        <div className="board-wrapper">
          {board.length === 0 ? (
            <div className="empty-board">ابدأ اللعبة</div>
          ) : (
            <div className="dominoes-line">
              {board.map((domino, index) => renderDomino(domino, index))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Player 2 Hand (PvP) * /}
      {gameMode === "pvp" && currentPlayer === 2 && gameState === "playing" && (
        <motion.div
          className="player2-hand-display"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h3>عظام لاعب 2</h3>
          <div className="hidden-dominoes-row">
            {player2Hand.map((_, index) =>
              renderDomino([0, 0], index, false, false, true)
            )}
          </div>
        </motion.div>
      )}

      {/* Controls * /}
      <motion.div
        className="dominoes-action-buttons"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <motion.button
          className="action-btn draw-btn"
          onClick={drawBone}
          disabled={
            currentPlayer !== 1 ||
            gameState !== "playing" ||
            boneyard.length === 0
          }
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="btn-icon">🏚️</span>
          <span>أخذ عظمة ({boneyard.length})</span>
        </motion.button>
      </motion.div>

      {/* Player Hand * /}
      <motion.div
        className="player-hand-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <h3>عظامك ({playerHand.length})</h3>
        <div className="player-dominoes-container">
          {playerHand.length === 0 ? (
            <div className="no-dominoes">لا توجد عظام</div>
          ) : (
            playerHand.map((domino, index) => (
              <div key={index} className="domino-wrapper">
                {renderDomino(domino, index, true, selectedDomino === domino)}
                {selectedDomino === domino &&
                  currentPlayer === 1 &&
                  gameState === "playing" && (
                    <motion.div
                      className="play-options-popup"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {canPlayDomino(domino, "left") && (
                        <motion.button
                          className="play-option-btn left-btn"
                          onClick={() => playDomino(domino, "left")}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          ← يسار
                        </motion.button>
                      )}
                      {canPlayDomino(domino, "right") && (
                        <motion.button
                          className="play-option-btn right-btn"
                          onClick={() => playDomino(domino, "right")}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          يمين →
                        </motion.button>
                      )}
                    </motion.div>
                  )}
              </div>
            ))
          )}
        </div>
      </motion.div>

      {/* Control Buttons * /}
      <motion.div
        className="game-controls"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        {gameState === "gameOver" && (
          <motion.button
            onClick={() => initializeGame()}
            className="btn btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            لعبة جديدة
          </motion.button>
        )}
        <motion.button
          onClick={() => setGameMode(null)}
          className="btn btn-secondary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          العودة للقائمة
        </motion.button>
      </motion.div>
    </div>
  );
}
*/

// Dominoes game is currently disabled for future development
export default function Dominoes() {
  return null;
}
