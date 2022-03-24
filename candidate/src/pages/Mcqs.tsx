import React from 'react'
import { AppBar, Toolbar, Typography, Box, Grid, Card } from '@mui/material';
import { KeyboardDoubleArrowLeft as KeyboardDoubleArrowLeftIcon, KeyboardDoubleArrowRight as KeyboardDoubleArrowRightIcon } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import WhiteButton from '../elements/WhiteButton';
import BlueButton from '../elements/BlueButton';
import QueTable from '../components/QueTable';
import Quiz from '../components/Quiz';
import useSessionStorage from '../hooks/useSessionStorage';
import semicolonApi from '../hooks/useApi';
import { useContext } from '../context/candidateContest';
interface Question {
    fullscreen?: boolean,
    MCQs: any[],
    contestName: string;
    timeUp: (mcqs: string) => void
}
const Mcqs: React.FC<Question> = (props) => {

    const [mcqs] = React.useState(props.MCQs);
    const [i, setI] = React.useState(0)
    const navigation = useNavigate();
    const { contest } = useContext();
    const [setNotSavedMcqs] = useSessionStorage("mcqs", [])

    function sendAnswer(choice: string) {
        mcqs[i].choice = choice;
        let data = {
            contest_id: contest.contest_id,
            candidate_id: contest.candidate_id,
            mcq_id: mcqs[i].mcq_id,
            answer: choice
        }

        semicolonApi("submit/mcq", data, "POST")
            .then(msg => { console.log(msg) })
            .catch(error => { setNotSavedMcqs(e => ([...e, data])); })
    }

    return (<>
        <AppBar position="static" sx={{ padding: '0 1rem' }}>
            <Toolbar disableGutters>
                <WhiteButton onClick={() => navigation('/menu')}>Back</WhiteButton>
                <Typography variant="h5"
                    noWrap fontSize="1.8rem"
                >
                    {props.contestName ?? 'challenge1'}
                </Typography>
                {/* <Box position={"absolute"} right={0} display="flex">
                    <WhiteButton onClick={() => props.timeUp("mcqs")}>End Test</WhiteButton>
                </Box> */}
            </Toolbar>
        </AppBar>

        <Grid display="flex" marginTop={'3rem'}>
            <Grid item md={2} marginX="1rem">
                <QueTable disableChips={false}
                    sendIndex={(index) => setI(index)} mcqs={mcqs} />
            </Grid>
            <Grid item md={12} marginRight="1rem">
                <Card elevation={5}>
                    <Quiz data={mcqs[i]}
                        sx={[]}
                        sendAnd={sendAnswer} />
                    <Box padding="1rem">
                        <BlueButton
                            onClick={() => { setI(i => i - 1); }}
                            disabled={i === 0}
                            sx={{ margin: "0 1rem" }}
                        >
                            <KeyboardDoubleArrowLeftIcon />
                            Previous
                        </BlueButton>
                        <BlueButton
                            sx={{ width: "123px" }}
                            onClick={() => { setI(i => i + 1); }}
                            disabled={i === (mcqs.length - 1)}
                        >
                            Next <KeyboardDoubleArrowRightIcon />
                        </BlueButton>
                    </Box>
                </Card>
            </Grid>
        </Grid>
    </>
    )
}
export default Mcqs