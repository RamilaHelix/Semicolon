import { Grid, TextField, InputAdornment, Box, Typography, TextareaAutosize, Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import React, { useRef } from "react";
import BasicTable from "../elements/BasicTable";
import { CodingQuestion, TestCases } from "../model/CodingQuestion.model";
import { CkEditor } from "./CkEditor";
import "../styles/component/CreateTest.scss";
const javaScriptSTD = `/* let's write some code 😈 */
  'use strict';

  process.stdin.resume();
  process.stdin.setEncoding('utf-8');
  
  let inputString = '';
  let currentLine = 0;
  
  process.stdin.on('data', function(inputStdin) {
      inputString += inputStdin;
  });
  
  process.stdin.on('end', function() {
     // inputString = inputString.split('\\n');
      main();
  });
  
  function readLine() {
      return inputString;
  }
  
  /*
   * Complete the 'demoFunction' function below.
   *
   * The function accepts  arr as parameter.
   */
  
  function demoFunction(arr) {
      // Write your code here
  
  }
  
  function main() {
      const n = parseInt(readLine().trim(), 10);
    
      /*Extract arguments here*/
      const arr = readLine()//.replace(/\\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));
  
      demoFunction(arr);
  }
  `
export default function AddCodingQue(props) {
  const [codingQuestionDuration, setCodingQuestionDuration] = React.useState<number>();
  const [points, setPoints] = React.useState<number>(6);
  const [sampleInput, setSampleInput] = React.useState("");
  const [sampleOutput, setSampleOutput] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [boilerCode, setBoilerCode] = React.useState(javaScriptSTD);
  const [testCase, setTestCase] = React.useState<TestCases[]>([]);
  let codingQuestion = "";


  const openCodeModal = () => {
    if (!title) { alert("Empty title"); return }

    if (!codingQuestionDuration) { alert("Empty duration"); return }

    if (testCase.length === 0) { alert("Empty testcase"); return }

    setOpen(true)
  }

  const submitQuestion = () => {
    const codingQuestion1: CodingQuestion = {
      question: "",
      title: "",
      time: 0,
      testCases: [],
      prog_id: "",
      boilerplateCodeJS: "",
    };

    if (childRef.current) {
      childRef.current.clearData();
    }
    if (codingQuestion) {

      codingQuestion1.question = codingQuestion;
      codingQuestion1.title = title;
      codingQuestion1.time = codingQuestionDuration ?? 0;
      codingQuestion1.testCases = testCase;
      codingQuestion1.boilerplateCodeJS = boilerCode;

      if (props.sendQuestion) {
        props.sendQuestion(codingQuestion1);
      }
      setTestCase([]);
      setPoints(0);
      setBoilerCode(javaScriptSTD);
      setTitle('')
      setCodingQuestionDuration(0);
      setOpen(false)

    }
    else {
      alert("question is empty");
      setOpen(false)
    }


  };

  const childRef = useRef<any>(null);

  const addTestCase = () => {
    setTestCase([
      ...testCase,
      {
        testcase_id: Math.random().toString(36).slice(2),
        hidden: false,
        points,
        output: sampleOutput,
        input: sampleInput,
      },
    ]);
    setSampleInput("");
    setSampleOutput("");
  };
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Grid container display={"flex"}>
        <Grid item md={8} xs={4} marginBottom={4}>
          <Typography
            variant="h4"
            color="primary.main"
            gutterBottom
            sx={{ marginLeft: "1rem", marginY: '2rem' }}
          >
            Add programm
          </Typography>

          <TextField
            label="Title for question"
            focused margin="dense"
            placeholder="Enter title"
            size="small"
            variant="outlined"
            fullWidth
            sx={{ margin: "0 2rem", maxWidth: '17rem' }}
            value={title}
            onChange={(event) => setTitle(event?.target.value)}
          />

          <TextField placeholder="duration for question"
            label="Duration" size="small"
            variant="outlined" name="duration"
            type="number"
            sx={{ margin: "0 2rem" }}
            onChange={(e) =>
              setCodingQuestionDuration(parseInt(e.target.value))
            }
            value={codingQuestionDuration || ""}
            inputProps={{ min: 30 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">minutes</InputAdornment>
              )
            }}
          />
        </Grid>

        <Grid display={"grid"} md={7} item xs={12} sm={6} >
          <Grid>
            <CkEditor
              ref={childRef}
              sendData={(value: string) => (codingQuestion = value)}
            />
          </Grid>
          <Grid display={"grid"} className="input-output">
            <Grid item display={"flex"} md={12} xs={12}>

              <Box sx={{ marginLeft: "1rem" }}>
                <Typography
                  variant="h5"
                  sx={{ marginBottom: 2, marginTop: 2 }}
                  color="primary.main"
                >
                  Sample Input
                </Typography>
                <TextareaAutosize
                  aria-label="sample input"
                  minRows={3}
                  placeholder="1 2 3"
                  value={sampleInput}
                  onChange={(e) => setSampleInput(e.target.value)}
                />
              </Box>
              <Box sx={{ marginLeft: "1rem" }}>

                <Typography
                  variant="h5"
                  color="primary.main"
                  sx={{ marginBottom: 2, marginTop: 2 }}
                >
                  Sample Output
                </Typography>
                <TextareaAutosize
                  aria-label="sample output"
                  minRows={3}
                  placeholder="1,2,3"
                  value={sampleOutput}
                  onChange={(e) => setSampleOutput(e.target.value)}
                />
              </Box>
              <TextField
                label="Points"
                placeholder="add points for question"
                size="small"
                variant="outlined"
                name="duration"
                type="number"
                value={points || ""}
                margin="dense"
                inputProps={{ min: 0 }}
                sx={{ marginTop: "auto", marginLeft: 3, maxWidth: "8rem" }}
                onChange={(e) => setPoints(parseInt(e.target.value))}
              />
            </Grid>
            <Grid item display={"flex"} md={8} xs={12} justifyContent={"center"}>
              <Grid>
                <Button
                  variant="contained"
                  sx={{ marginTop: "2rem" }}
                  onClick={addTestCase}
                  disabled={!sampleOutput || !sampleInput}
                >
                  Add Test Case
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    marginTop: "2rem",
                    marginLeft: "2rem",
                  }}
                  //onClick={submitQuestion}
                  onClick={openCodeModal}
                  disabled={
                    !(testCase.length > 0 ? true : false) ||
                    !codingQuestionDuration
                  }
                >
                  Add Program
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={5} sm={4} xs={12}>
          <BasicTable
            sx={{
              marginLeft: "0.5rem",
              marginRight: "0.5rem",
            }}
            export={false}
            rows={testCase.map((el, index) => ({
              id: index,
              input: el.input,
              output: el.output,
              points: el.points
            }))}
            columns={[
              { field: "id", flex: 1, hide: true },
              {
                field: "input", flex: 1, sortable: false, align: "center",
                disableColumnMenu: true, headerAlign: "center",
              },
              {
                field: "output", flex: 1, sortable: false, align: "center",
                disableColumnMenu: true, headerAlign: "center",
              },
              { field: "points", flex: 1, headerAlign: "center", align: "center", }
            ]}
            deletedId={(id) => {
              setTestCase([...testCase.filter((t) => t.testcase_id !== id)]);
            }}
          />
        </Grid>
      </Grid>
      <Dialog open={open}
        onClose={submitQuestion}
        aria-labelledby="Dialog-Dialog-title"
        aria-describedby="Dialog-Dialog-description"
        fullWidth
        maxWidth="lg"
      >
        <DialogContent>
          <DialogTitle>Write a code for JavaScript
            <Button onClick={submitQuestion} sx={{ marginLeft: '23rem', fontSize: '1.3rem' }}>Close</Button>
          </DialogTitle>

          <TextareaAutosize
            spellCheck="false"
            aria-label="minimum height"
            minRows={13}
            placeholder="Minimum 3 rows"
            value={boilerCode}
            onChange={(e) => setBoilerCode(e.target.value)}
            style={{
              minWidth: "100%",
              backgroundColor: "#1e1e1e",
              color: '#2add27',
              fontSize: '36px',
              fontFamily: ' Consolas,  monospace'
            }}
          />
        </DialogContent>

      </Dialog>
    </>
  );
}
