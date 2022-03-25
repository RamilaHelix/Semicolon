import React, { RefObject } from 'react'
import { AppBar, Toolbar, Box, Snackbar, Alert, AlertColor, CardContent, Card, CardHeader } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import SplitPane from 'react-split-pane';
import CodingQueCard from '../components/CodingQueCard';
import { ProgrammingTabs } from '../components/ProgrammingTabs';
import { useContext } from '../context/candidateContest';
import BasicEditor from '../elements/Editor';
import WhiteButton from '../elements/WhiteButton'
import IFrame from '../elements/IFrame';
import semicolonApi from '../hooks/useApi';
import useSessionStorage from '../hooks/useSessionStorage';
import { CodingQuestion } from '../model/CodingQuestion.model';
import VerticalTabs from '../components/VerticalTabs';
import "../styles/components/Splitter.scss";
import "../styles/pages/Program.scss"
interface Question {
    fullscreen?: boolean,
    programs: CodingQuestion[],
    timeUp: (program: string) => void,
    ref: any
}
const style = {
    display: "flex",
    justifyContent: "center",
    marginTop: " 9rem",
    fontSize: "3rem",
    fontWeight: "600",
}

function TestCases({ result }) {
    const { input, expected, output } = result
    return (<>
        <Card className='testcases-result' >
            <CardHeader title="Input (stdin)" titleTypographyProps={{ "fontWeight": "bold" }} sx={{ paddingBottom: 0 }} />
            <CardContent sx={{ background: "aliceblue", borderRadius: 2 }} component="div">
                <ol>
                    {
                        input.split('\n').map(out => {
                            return (
                                <li className='line' key={out}>{out}</li>
                            )
                        })
                    }
                </ol>
            </CardContent>
        </Card>
        <Card className='testcases-result' sx={{ marginTop: 1 }} >
            <CardHeader title="Expected Output" titleTypographyProps={{ "fontWeight": "bold" }} sx={{ paddingBottom: 0 }} />
            <CardContent sx={{ background: "aliceblue", borderRadius: 2 }}>
                <ol>
                    {
                        expected.split('\n').map(out => {
                            return (
                                <li className='line' key={out}>{out}</li>
                            )
                        })
                    }
                </ol>
            </CardContent>
        </Card>
        <Card className='testcases-result' sx={{ marginTop: 1 }}>
            <CardHeader title="Your Output (stdout)" titleTypographyProps={{ "fontWeight": "bold" }} sx={{ paddingBottom: 0 }} />
            <CardContent sx={{ background: "aliceblue", borderRadius: 2 }}>
                <ol>
                    {
                        output.split('\n').map(out => {
                            return (
                                <li className='line' key={out}>{out}</li>
                            )
                        })
                    }
                </ol>
            </CardContent>
        </Card>
    </>)
}
const Program: React.FC<Question> = React.forwardRef((props, ref) => {
    React.useImperativeHandle(ref, () => ({ unMountEditor() { setMountedEditor(false) } }))

    const [programs] = React.useState<CodingQuestion[]>(props.programs)
    const [open, setOpen] = React.useState<{ msg: string, open: boolean, severity?: AlertColor }>({ msg: '', open: false, severity: 'success' })
    const [loading, setLoading] = React.useState(false);
    const [outputs, setOutputs] = React.useState<{ input: string, output: string, expected: string, passed: boolean }[]>([]);
    const [error, setError] = React.useState<string>(null)
    const [mountedEditor, setMountedEditor] = React.useState<boolean>(true)

    const { contest } = useContext();
    const navigation = useNavigate();

    function finalCode(script, language, prog_id, testCases) {

        /** If code is submitted don't save it to the sessionStorage */
        const prog_index = programs.findIndex(x => x.prog_id === prog_id);
        if (programs[prog_index].saved)
            return

        const data = {
            script, prog_id, language, testCases,
            contest_id: contest.contest_id,
            candidate_id: contest.candidate_id
        }
        saveToSessionStorage(data);
    }

    function saveToSessionStorage(value) {
        let sessionprograms = JSON.parse(sessionStorage.getItem("programs"))

        if (!sessionprograms) {
            const session = [];
            session.push(value)
            sessionStorage.setItem("programs", JSON.stringify(session))
            return;
        }
        const index = sessionprograms.findIndex(x => x.prog_id === value.prog_id);
        index === -1 ? sessionprograms.push(value) : sessionprograms[index] = value;
        console.log(sessionprograms, index)
        sessionStorage.setItem("programs", JSON.stringify(sessionprograms))
    }
    function filterOutSubmittedProgram(prog_id) {
        let sessionprograms = JSON.parse(sessionStorage.getItem("programs"))
        const newprograms = sessionprograms.filter(item => item.prog_id !== prog_id)
        sessionStorage.setItem("programs", JSON.stringify(newprograms)); //updated list without submitted script
    }


    function runProgram(script, language, prog_id, testCases) {
        setLoading(true);
        let data = {
            script, prog_id, language,
            testCases, //: [{ points: 4, input: '1,3', output: '3,6' },{ points: 4, input: '1,3', output: '1' }],
            contest_id: contest.contest_id,
            candidate_id: contest.candidate_id,
            // contest_id: '3',
            // candidate_id: '407cb7b5-d265-4f46-907f-e703dae77d2c',
        }

        semicolonApi("submit/run", data, "POST")
            .then((result: any[]) => {
                setLoading(false);
                setError(null)
                console.log(result)
                setOutputs(result);

            })
            .catch(error => {
                setLoading(false)
                setError(error)
            });
    }

    function submitCode(script, language, prog_id, testCases) {
        let data = {
            script, prog_id, language, testCases,
            contest_id: contest.contest_id,
            candidate_id: contest.candidate_id,
        }
        const index = programs.findIndex(x => x.prog_id === prog_id);
        programs[index].saved = true; //script is submitted to DB
        semicolonApi("submit/program", data, "POST")
            .then(msg => {
                setOpen({ open: true, msg: "SUBMITTED" });
                filterOutSubmittedProgram(prog_id)
            })
            .catch(error => {
                setOpen({ open: true, msg: "NOT SUBMITTED", severity: "error" })
                programs[index].saved = false; //script is NOT saved to DB
                finalCode(script, language, prog_id, testCases)
            });
    }

    const backButton = () => {
        navigation('/menu')
    }

    const closeAlert = () => {
        setOpen({ open: false, msg: '' })
    }

    return (<>
        <Snackbar open={open.open} autoHideDuration={600}
            anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
            onClose={closeAlert}>
            <Alert onClose={closeAlert} severity={open.severity}
                variant="filled" sx={{ width: '100%' }}>
                {open.msg}
            </Alert>
        </Snackbar>
        <AppBar position="static" sx={{ padding: '0 1rem' }}>
            <Toolbar disableGutters>
                <WhiteButton onClick={backButton}>Back</WhiteButton>
                {/* <Box position={"absolute"} right={0} display="flex">
                    <WhiteButton onClick={() => props.timeUp("programs")}>End Test</WhiteButton>
                </Box> */}
            </Toolbar>
        </AppBar>
        < div className="coding-question" id="coding-question">
            <ProgrammingTabs
                tabs={programs && programs.map((prog) => {
                    return {
                        title: prog.title,
                        disabled: prog.saved,
                        value: (<>
                            <SplitPane split="vertical" minSize={300} defaultSize={900} maxSize={900}>
                                <CodingQueCard title={prog.title} question={prog.question}
                                    input={prog.testCases[0].input} output={prog.testCases[0].output} />
                                <div className='editor'>
                                    {mountedEditor && <BasicEditor disabled={false} name={prog.title} JSCode={prog.boilerplateCodeJS}
                                        saveCode={(code, lang) => finalCode(code, lang, prog.prog_id, prog.testCases)}
                                        submitCode={(code, lang) => submitCode(code, lang, prog.prog_id, prog.testCases)}
                                        runProgram={(program, lang) => runProgram(program, lang, prog.prog_id, prog.testCases)}
                                    />}
                                    <div>{loading ? <div style={style}>Loading...</div> :
                                        error ? <IFrame>
                                            {
                                                error.split(new RegExp("/\r\n|\n|\r/gm"))
                                                    .map(function (item, idx) {
                                                        return (
                                                            <span key={idx}>
                                                                {item}<br />
                                                            </span>)
                                                    })
                                            }
                                        </IFrame>
                                            : <VerticalTabs tabs={
                                                outputs.map((output, index) => {
                                                    return {
                                                        title: "test case " + index,
                                                        color: output.passed,
                                                        value: <>
                                                            <CardContent className={output.passed ? 'success' : 'failed'}>
                                                                {output.passed ?
                                                                    <div>  <h2>Congratulations !</h2>
                                                                        <p style={{ color: "#576871", fontSize: '16px' }}>You have passed the sample test cases.
                                                                            Click the submit button to run your code against all the test cases.</p>
                                                                    </div> : <h2>Wrong Answer :( </h2>}
                                                            </CardContent>
                                                            <TestCases result={output} />
                                                        </>
                                                    }
                                                })
                                            } />
                                    }
                                    </div>
                                </div>
                            </SplitPane>
                        </>)
                    };
                })} />
        </div>
    </>
    )
})
export default Program;