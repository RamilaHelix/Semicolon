import * as React from 'react';
import { Stepper, Step, StepButton, Alert, AlertColor, Button, Grid, InputAdornment, Snackbar, TextField, Typography, Box } from "@mui/material";

import { GridCellParams } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import AddCodingQue from "../components/AddCodingQue";
import AddMcqs from "../components/AddMcqs";
import BasicTable from "../elements/BasicTable";
import semicolonApi from "../functions/fetchApi";
import { useUserContext } from "../context/userContext";
import { CodingQuestion } from "../model/CodingQuestion.model";
import { Mcq } from "../model/McqQuestion.model";
import AddCodingQue1 from '../components/AddCodingQue1';
const steps = ['Test Name', 'Add MCQs', 'Add Coding Question', 'Publish Test'];



export default function HorizontalNonLinearStepper() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState<{ [k: number]: boolean }>({});

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                // find the first step that has been completed
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step: number) => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };
    /*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */
    const { user, updateData } = useUserContext();
    const navigate = useNavigate();
    const [name, setName] = React.useState("");
    const [mcqDuration, setMcqDuration] = React.useState<number>(0);
    const [mcqs, setMcqs] = React.useState<Mcq[]>([]);
    const [open, setOpen] = React.useState<{ msg: string, open: boolean, severity?: AlertColor }>({ msg: '', open: false, severity: 'success' })
    const [coding, setCoding] = React.useState<CodingQuestion[]>([]);
    let img: boolean = false;
    const disable = ((coding.length > 0 ? false : true) || !((mcqDuration > 0 ? false : true) && (mcqs.length > 0 ? false : true)))
    //const disabled = disable && (name.length > 0 ? false : true)
    const disabled = ((coding ? false : true) || (mcqs ? false : true))
    console.log((false) || (true))
    const closeAlert = () => {
        setOpen({ open: false, msg: '' })
    }

    const deletedMcq = (id: number | string | undefined) => {
        setMcqs([...mcqs.filter((mcq: Mcq) => mcq.mcq_id !== id)]);
    };

    const deletedCodingQuestion = (id: number | string | undefined) => {
        setCoding([...coding.filter((question) => question.prog_id !== id)]);
    };

    const addMcqs = (value: Mcq[]) => {
        setMcqs([...mcqs, ...value]);
        if (!mcqDuration)
            setOpen({ open: true, msg: 'Add Time for MCQs', severity: "info" })
    };

    const sendQuestion = (value: CodingQuestion) => {
        setCoding([...coding, value]);
    };


    const publishTest = () => {
        // navigate('/invite')
        // return;
        let duration = 0
        coding.forEach(c => duration += c.time)
        duration += mcqDuration ?? 0;

        const contest = { admin_id: user?.admin_id, name, duration };

        semicolonApi('contest/create', contest, "POST")
            .then((res: any) => {
                let id = res.contest;
                const admin = { admin_id: user?.admin_id, contest_id: id }
                localStorage.setItem("admin_id", JSON.stringify(admin));
                updateData({ contest_id: id, constestName: name })

                if (mcqs.length > 0) {
                    mcqs.forEach((mcq: Mcq) => { mcq.contest_id = id })
                    semicolonApi('mcqs/add', { mcqs: mcqs }, "POST")
                        .then(async data => {
                            setOpen({ open: true, msg: 'mcq added', severity: "success" })
                        })
                        .catch(err => setOpen({ open: true, msg: 'Mcq not saved', severity: 'error' }))
                }

                if (coding.length > 0) {
                    coding.forEach(prog => prog.contest_id = id)
                    semicolonApi('program/add', { programs: coding }, "POST")
                        .then(async data => { setOpen({ open: true, msg: 'saved coding question', severity: 'success' }) })
                        .catch(err => setOpen({ open: true, msg: 'ERROR:PROGRAM\n' + err, severity: 'error' }))
                }
                navigate('/invite')
            })
            .catch(err => {
                setOpen({ open: true, msg: 'ERROR:CONTEST', severity: 'error' });
                //delete it  
                navigate('/invite')
            })

        return () => { updateData({ contest_id: "", constestName: "" }) }
    }

    const value = [
        <TextField
            label="Name of Test"
            focused
            placeholder="Enter name of Test"
            size="small"
            variant="outlined"
            fullWidth
            sx={{ margin: "6rem auto", maxWidth: "40%" }}
            value={name}
            onChange={(event) => setName(event?.target.value)}
        />,
        <Grid item md={12} xs={4} marginLeft={.3}>
            <Grid item md={12} xs={4} display={"flex"} justifyContent="center">
                <Typography variant="h4" color="primary.main" gutterBottom>
                    MCQ's
                </Typography>
                <Grid sx={{ marginLeft: "1rem" }}>
                    <TextField
                        label="Duration for Mcqs"
                        placeholder="Duration for Mcqs"
                        size="small"
                        variant="outlined"
                        type="number"
                        margin="dense"
                        inputProps={{ min: 0 }}
                        onChange={(e) => setMcqDuration(parseInt(e.target.value))}
                        value={mcqDuration || ""}
                        InputProps={{ endAdornment: (<InputAdornment position="end">minutes</InputAdornment>) }}
                    />
                </Grid>
                <Grid>
                    <AddMcqs addMCQ={addMcqs} />
                </Grid>
            </Grid>
            {mcqs.length > 0 && (
                <Grid item md={12} marginTop={7}>
                    <BasicTable
                        export={false}
                        rows={mcqs.map(
                            (el: Mcq, index) => (
                                (el.mcq_id = index.toString()),
                                {
                                    id: index.toString(),
                                    Question: el.question,
                                    A: el.a,
                                    B: el.b,
                                    C: el.c,
                                    D: el.d,
                                    Points: el.points,
                                    Correct: el.answer,
                                }
                            )
                        )}
                        columns={[
                            { field: "id", flex: 1, hide: true },
                            {
                                field: "Question",
                                flex: 3,
                                headerName: `Question [Time :${mcqDuration || "?"} mins]`,
                                description: mcqDuration ? "" : "Add MCQ's Duration",
                                headerClassName: (params: any) => {
                                    if (!mcqDuration || mcqDuration === undefined || isNaN(mcqDuration)) {
                                        return "red-line";
                                    }
                                    return "";
                                },
                            },
                            { field: "A", flex: 1 },
                            { field: "B", flex: 1 },
                            { field: "C", flex: 1 },
                            { field: "D", flex: 1 },
                            { field: "Points", flex: 1, headerAlign: "center", align: "center" },
                            {
                                field: "Correct", flex: 1, sortable: false, disableColumnMenu: true,
                                headerAlign: "center", align: "center",
                            },
                        ]}
                        deletedId={deletedMcq}
                    />
                </Grid>)}
        </Grid>,
        <>
            {/* <AddCodingQue sendQuestion={sendQuestion} /> */}
            <AddCodingQue1 sendQuestion={sendQuestion} />
            {coding.length > 0 && (
                <Grid item md={12} width={"100%"} sx={{ margin: "0.5rem" }}>
                    <BasicTable export={false}
                        rows={coding.map(
                            (el: CodingQuestion, index) => (
                                (el.prog_id = index.toString()),
                                (img = el.question.includes("figure")),
                                {
                                    id: index.toString(),
                                    Question$: el.question,
                                    TestCase: el.testCases, //sequence is important here 
                                    Question: img ? "🖼️" : el.question?.replace(/<[^<|>]+?>|&nbsp;|&lt|&gt;|&quot|;|&|#39|\//gi, ""),
                                    JavaScript: el.boilerplateCodeJS,
                                    Duration: el.time + " mins",
                                }
                            )
                        )}
                        columns={[
                            { field: "id", flex: 1, hide: true },
                            {
                                field: "Question",
                                flex: 1,
                                cellClassName: (params: GridCellParams<number>) => {
                                    if (params.row.Question$.includes("img")) {
                                        return "img-icon";
                                    }
                                    return "";
                                },
                            },
                            {
                                field: "JavaScript",
                                flex: 1,
                                sortable: false,

                            },
                            {
                                field: "Duration",
                                //flex: 1,
                                sortable: false,
                                headerAlign: "center",
                                align: "center",
                            },

                        ]}
                        deletedId={deletedCodingQuestion}
                    />
                </Grid>
            )}
        </>,
        <>
            {mcqs.length > 0 && (
                <Grid item md={12} width={"100%"} sx={{ margin: "1rem" }}>
                    <Typography
                        variant="h5"
                        gutterBottom
                        sx={{ pl: 1 }}
                        color={"primary.main"}
                    >
                        MCQ Questions:
                    </Typography>

                    <BasicTable
                        export={false}
                        rows={mcqs.map(
                            (el: Mcq, index) => (
                                (el.mcq_id = index.toString()),
                                {
                                    id: index.toString(),
                                    Question: el.question,
                                    A: el.a,
                                    B: el.b,
                                    C: el.c,
                                    D: el.d,
                                    Points: el.points,
                                    Correct: el.answer,
                                }
                            )
                        )}
                        columns={[
                            { field: "id", flex: 1, hide: true },
                            {
                                field: "Question",
                                flex: 3,
                                headerName: `Question [Time :${mcqDuration || "?"} mins]`,
                                description: mcqDuration ? "" : "Add MCQ's Duration",
                                headerClassName: (params: any) => {
                                    if (!mcqDuration || mcqDuration === undefined || isNaN(mcqDuration)) {
                                        return "red-line";
                                    }
                                    return "";
                                },
                            },
                            { field: "A", flex: 1 },
                            { field: "B", flex: 1 },
                            { field: "C", flex: 1 },
                            { field: "D", flex: 1 },
                            { field: "Points", flex: 1, headerAlign: "center", align: "center" },
                            {
                                field: "Correct", flex: 1, sortable: false, disableColumnMenu: true,
                                headerAlign: "center", align: "center",
                            },
                        ]}
                        deletedId={deletedMcq}
                    />
                </Grid>
            )}
            {coding.length > 0 && (
                <Grid item md={12} width={"100%"} sx={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}>
                    <Typography variant="h5" gutterBottom sx={{ pl: 1 }} color={"primary.main"}>
                        Codind Questions:
                    </Typography>
                    <BasicTable export={false}
                        rows={coding.map(
                            (el: CodingQuestion, index) => (
                                (el.prog_id = index.toString()),
                                (img = el.question.includes("figure")),
                                {
                                    id: index.toString(),
                                    Question$: el.question,
                                    TestCase: el.testCases, //sequence is important here 
                                    Question: img ? "🖼️" : el.question?.replace(/<[^<|>]+?>|&nbsp;|&lt|&gt;|&quot|;|&|#39|\//gi, ""),
                                    JavaScript: el.boilerplateCodeJS,
                                    Duration: el.time + " mins",
                                }
                            )
                        )}
                        columns={[
                            { field: "id", flex: 1, hide: true },
                            {
                                field: "Question",
                                flex: 1,
                                cellClassName: (params: GridCellParams<number>) => {
                                    if (params.row.Question$.includes("img")) {
                                        return "img-icon";
                                    }
                                    return "";
                                },
                            },
                            {
                                field: "JavaScript",
                                flex: 1,
                                sortable: false,

                            },
                            {
                                field: "Duration",
                                //flex: 1,
                                sortable: false,
                                headerAlign: "center",
                                align: "center",
                            },

                        ]}
                        deletedId={deletedCodingQuestion}
                    />
                </Grid>
            )}
            <Button
                variant="contained"
                sx={{ margin: "1.9rem auto" }}
                onClick={publishTest}
                disabled={disabled}
            >
                Publish
            </Button>
        </>
    ]

    return (
        <Box sx={{ width: '99.5%' }}>
            <Stepper activeStep={activeStep} nonLinear>
                {steps.map((label, index) => (
                    <Step key={label} completed={completed[index]}>
                        <StepButton color="inherit" onClick={handleStep(index)}>
                            {label}
                        </StepButton>
                    </Step>
                ))}
            </Stepper>
            <div>
                {allStepsCompleted() ? (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleReset}>Reset</Button>
                        </Box>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
                        <Grid container spacing={1}>
                            <Snackbar open={open.open} autoHideDuration={6000}
                                anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
                                onClose={closeAlert}>
                                <Alert onClose={closeAlert} severity={open.severity} variant="filled" sx={{ width: '100%' }}>
                                    {open.msg}
                                </Alert>
                            </Snackbar>
                            {value[activeStep]}

                        </Grid >
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                variant="contained"
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ ml: 1 }}
                            >
                                Back
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleNext} sx={{ mr: 1 }} variant="contained">
                                Next
                            </Button>
                            {activeStep !== steps.length &&
                                (completed[activeStep] ? (
                                    <Typography variant="caption" sx={{ display: 'inline-block' }}>
                                        Step {activeStep + 1} already completed
                                    </Typography>
                                ) : (<></>
                                    // <Button onClick={handleComplete}>
                                    //     {completedSteps() === totalSteps() - 1
                                    //         ? 'Saved'
                                    //         : 'save'}
                                    // </Button>
                                ))}
                        </Box>
                    </React.Fragment>
                )}
            </div>
        </Box>
    );
}
