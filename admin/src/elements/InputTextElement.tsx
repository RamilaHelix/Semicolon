import React from "react";
import { TextField, StandardTextFieldProps } from "@mui/material";

interface InputTextElementProps extends StandardTextFieldProps {
  onValueChange?: (value: string) => void;
}

export const InputTextElement: React.FC<InputTextElementProps> = (props) => {
  const { onValueChange, ...res } = props;
  return (
    <TextField
      {...res} onChange={(event) => {
        if (onValueChange) onValueChange(event.target.value);
      }}
    />
  );
};
