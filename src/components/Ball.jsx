import React from "react";
import { Box } from "@mui/material";

const Ball = ({ position }) => {
  const ballStyle = {
    position: "absolute",
    width: "15px",
    height: "15px",
    backgroundColor: "white",
    borderRadius: "50%",
    left: `${position.x}px`,
    top: `${position.y}px`,
  };

  return <Box sx={ballStyle} />;
};

export default Ball;
