import { useState } from "react";
import { motion } from "framer-motion";
import RockPaperScissors from "../games/RockPaperScissors";
import TicTacToe from "../games/TicTacToe";
// import Dominoes from "../games/Dominoes";
import { Container } from "@mui/material";
// Games page - fun mini-games for study breaks with smooth animations
export default function Games() {
  const [selectedGame, setSelectedGame] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <Container
      sx={{
        padding: { xs: "20px", md: "40px" },
        mt: { xs: "45px", md: "0px" },
      }}
    >
      <div className="page games-page">
        <motion.div
          className="page-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>🎮 Take a Study Break</h1>
          <p className="page-subtitle">
            Play some fun games to refresh your mind
          </p>
        </motion.div>

        {!selectedGame ? (
          <div className="games-menu">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              Choose a Game
            </motion.h2>
            <motion.div
              className="games-grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.button
                onClick={() => setSelectedGame("rps")}
                className="game-card"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -8 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="game-icon">✊</div>
                <div className="game-name">Rock Paper Scissors</div>
                <div className="game-description">
                  Play against the computer
                </div>
              </motion.button>
              <motion.button
                onClick={() => setSelectedGame("tictactoe")}
                className="game-card"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -8 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="game-icon">⭕</div>
                <div className="game-name">Tic Tac Toe</div>
                <div className="game-description">
                  Player vs Player or vs AI
                </div>
              </motion.button>
              {/* 
              <motion.button
                onClick={() => setSelectedGame("dominoes")}
                className="game-card"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -8 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="game-icon">🎲</div>
                <div className="game-name">Dominoes</div>
                <div className="game-description">
                  Play with a friend or vs AI
                </div>
              </motion.button>
              */}
            </motion.div>
          </div>
        ) : (
          <motion.div
            className="game-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.button
              onClick={() => setSelectedGame(null)}
              className="btn-back-to-menu"
              whileHover={{ scale: 1.05, x: -4 }}
              whileTap={{ scale: 0.95 }}
            >
              ← Back to Menu
            </motion.button>
            {selectedGame === "rps" && <RockPaperScissors />}
            {selectedGame === "tictactoe" && <TicTacToe />}
            {/* {selectedGame === "dominoes" && <Dominoes />} */}
          </motion.div>
        )}
      </div>
    </Container>
  );
}
