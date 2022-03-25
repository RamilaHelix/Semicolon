import { Box, TextField, Button, Typography, Snackbar, Alert } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useContext } from '../context/candidateContest';
import semicolonApi from '../hooks/useApi';

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

export default function StartTest() {
    const [pin, setPin] = React.useState('')
    const [open, setOpen] = React.useState(false)
    const navigation = useNavigate();
    const { setContest } = useContext();

    const varifyCandidate = () => {
        // setContest({
        //     contest_id: '3',
        //     candidate_id: '407cb7b5-d265-4f46-907f-e703dae77d2c',
        //     name: 'HelixStack',
        //     duration: 61 * 60
        // })
        // navigation('/menu')
        //return

        if (pin.length === 6) {
            semicolonApi('candidate/' + pin, {}, 'GET')
                .then((res: any) => {
                    if (isEmpty(res)) {
                        setOpen(true)
                        return
                    }
                    const contest: {
                        contest_id: string, name: string, duration: number,
                        candidate_id: string
                    } = (res.candidate.contest_id)
                    contest.candidate_id = res.candidate.candidate_id
                    setContest(contest)
                    navigation('/menu')
                })
                .catch(err => {
                    setOpen(true);
                })
            setPin('')
        }

    }

    const closeAlert = () => {
        setOpen(false)
    }
    return (
        <Box
            sx={{
                maxWidth: "700px",
                padding: "1rem",
                margin: "auto",
                marginTop: 6,
                boxShadow: "1px 1px 1px 1px #050a4d",
            }}
        >
            {/* <img src={logo} width="100%" /> */}
            <TextField
                label="PIN"
                placeholder="Enter Your PIN here"
                type="number"
                fullWidth
                sx={{ mb: 2 }}
                required
                value={pin}
                error={(pin.length > 6)}
                helperText="6 digit pin"
                inputProps={{ maxLength: 6 }}
                onChange={(event) => setPin((event.target.value))}
            />

            <Button size="large" variant="contained"
                fullWidth sx={{ mb: 2 }}
                onClick={varifyCandidate}
            >
                Start Test
            </Button>

            <Typography
                variant="h5"
                sx={{ margin: "auto", marginTop: 4 }}
                color={"primary"}
            >
                Enter your Unique Test Pin shared by Admin on your Email
            </Typography>
            <Snackbar open={open} autoHideDuration={600}
                anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
                onClose={closeAlert}>
                <Alert onClose={closeAlert} severity="error"
                    variant="filled" sx={{ width: '100%' }}>
                    Pin Not Found !!
                </Alert>
            </Snackbar>
        </Box>
    );
}
