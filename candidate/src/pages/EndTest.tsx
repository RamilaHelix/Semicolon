import { Typography } from '@mui/material';
import React from 'react';
const style = {
    background: 'white',
    width: '100vw',
    height: '100vh',
    display: 'grid',
    placeItems: 'center'

}
const EndTest: React.FC = () => {
    return <div style={style}>
        <Typography variant="h2"
            fontWeight={600}
            color="#f90000de"
            textAlign="center"
        >
            TEST ENDED !!
        </Typography>
    </div>;
}

export default EndTest