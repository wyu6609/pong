import React from "react";
import { Container } from "@mui/material";
import GameBoard from "./components/GameBoard";

function App() {
  return (
    <Container>
      <h1 style={{ textAlign: "center", color: "white" }}>Pong Game</h1>
      <GameBoard />
    </Container>
  );
}

export default App;
