import React from "react";
import { Box } from "@mui/material";

const Paddle = ({ position, isLeft }) => {
  const paddleStyle = {
    position: "absolute",
    width: "10px",
    height: "80px",
    backgroundColor: "white",
    left: isLeft ? "10px" : "auto",
    right: isLeft ? "auto" : "10px",
    top: `${position}px`,
  };

  return <Box sx={paddleStyle} />;
};

export default Paddle;
