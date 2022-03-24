import { Button, ButtonProps } from "@mui/material";
import React from "react";

const BlueButton: React.FC<ButtonProps> = (props) => {
  const sx1 = props.sx;
  return (
    <Button
      variant="contained"
      size="large"
      {...props}
      sx={{
        "&:hover": { backgroundColor: "#1e3a5b" },
        ...sx1,
      }}
    >
      {props.children}
    </Button>
  );
};

export default BlueButton;
