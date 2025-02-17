import React, { useState, useEffect, useRef } from "react";
import { Box } from "@mui/material";
import Paddle from "./Paddle";
import Ball from "./Ball";

const GameBoard = () => {
  const [leftPaddlePos, setLeftPaddlePos] = useState(150); // Left paddle position
  const [rightPaddlePos, setRightPaddlePos] = useState(150); // Right paddle position
  const [ballPos, setBallPos] = useState({ x: 300, y: 200 }); // Ball position
  const [ballSpeed, setBallSpeed] = useState({ x: 4, y: 4 }); // Ball speed

  const gameBoardRef = useRef(null);

  // Handle user input for the left paddle
  useEffect(() => {
    const gameBoard = gameBoardRef.current;
    const handleKeyDown = (e) => {
      if (e.key === "ArrowUp" && leftPaddlePos > 0) {
        setLeftPaddlePos((prev) => prev - 10); // Move left paddle up
      } else if (e.key === "ArrowDown" && leftPaddlePos < 320) {
        setLeftPaddlePos((prev) => prev + 10); // Move left paddle down
      }
    };

    gameBoard.addEventListener("keydown", handleKeyDown);
    return () => gameBoard.removeEventListener("keydown", handleKeyDown);
  }, [leftPaddlePos]);

  // AI control for the right paddle
  useEffect(() => {
    const aiControl = () => {
      const paddleCenter = rightPaddlePos + 40; // Center of the right paddle
      const ballCenter = ballPos.y + 7.5; // Center of the ball

      if (paddleCenter < ballCenter && rightPaddlePos < 320) {
        setRightPaddlePos((prev) => prev + 4); // Move right paddle down
      } else if (paddleCenter > ballCenter && rightPaddlePos > 0) {
        setRightPaddlePos((prev) => prev - 4); // Move right paddle up
      }
    };

    const interval = setInterval(aiControl, 16);
    return () => clearInterval(interval);
  }, [rightPaddlePos, ballPos]);

  // Ball movement and collision detection
  useEffect(() => {
    const moveBall = () => {
      setBallPos((prev) => ({
        x: prev.x + ballSpeed.x,
        y: prev.y + ballSpeed.y,
      }));

      // Ball collision with top and bottom walls
      if (ballPos.y <= 0 || ballPos.y >= 385) {
        setBallSpeed((prev) => ({ ...prev, y: -prev.y }));
      }

      // Ball collision with left paddle
      if (
        ballPos.x <= 30 &&
        ballPos.y >= leftPaddlePos &&
        ballPos.y <= leftPaddlePos + 80
      ) {
        const hitPosition = (ballPos.y - leftPaddlePos) / 80; // Normalized hit position (0 to 1)
        const angle = (hitPosition - 0.5) * 2; // Map to -1 to 1
        setBallSpeed((prev) => ({
          x: Math.abs(prev.x) + 0.2, // Increase speed slightly
          y: angle * 6, // Adjust vertical speed based on hit position
        }));
      }

      // Ball collision with right paddle
      if (
        ballPos.x >= 560 &&
        ballPos.y >= rightPaddlePos &&
        ballPos.y <= rightPaddlePos + 80
      ) {
        const hitPosition = (ballPos.y - rightPaddlePos) / 80; // Normalized hit position (0 to 1)
        const angle = (hitPosition - 0.5) * 2; // Map to -1 to 1
        setBallSpeed((prev) => ({
          x: -Math.abs(prev.x) - 0.2, // Increase speed slightly
          y: angle * 6, // Adjust vertical speed based on hit position
        }));
      }

      // Ball out of bounds (left or right)
      if (ballPos.x <= 0 || ballPos.x >= 585) {
        setBallPos({ x: 300, y: 200 }); // Reset ball to center
        setBallSpeed({ x: 4, y: 4 }); // Reset ball speed
      }
    };

    const interval = setInterval(moveBall, 16);
    return () => clearInterval(interval);
  }, [ballPos, ballSpeed, leftPaddlePos, rightPaddlePos]);

  return (
    <Box
      ref={gameBoardRef}
      tabIndex="0"
      sx={{
        position: "relative",
        width: "600px",
        height: "400px",
        backgroundColor: "black",
        margin: "auto",
        outline: "none",
      }}
    >
      <Paddle position={leftPaddlePos} isLeft={true} />
      <Paddle position={rightPaddlePos} isLeft={false} />
      <Ball position={ballPos} />
    </Box>
  );
};

export default GameBoard;
