import { Button, ButtonProps } from '@mui/material';
import React from 'react';

const WhiteButton: React.FC<ButtonProps> = React.forwardRef((props, ref) => {
    const sx1 = props.sx
    return <Button variant="contained" size="large" ref={ref}
        {...props}
        sx={{
            marginX: '1rem', backgroundColor: "white",
            height: "2.7rem", color: "#1e3a5b",
            "&:hover": { backgroundColor: "white" },
            ...sx1
        }}
    >
        {props.children}
    </Button>
})

export default WhiteButton