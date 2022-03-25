import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Mcqs from './pages/Mcqs';
import Program from './pages/Program';
import StartTest from './pages/StartTest';
import EndTest from './pages/EndTest';
import TestLayout from './layouts/TestLayout';
import { CodingQuestion } from './model/CodingQuestion.model';
import semicolonApi from './hooks/useApi';
import { useContext } from './context/candidateContest';
import { Mcq } from './model/McqQuestion.model';
import MenuPage from './pages/MenuPage';
import './App.css';

function App() {
    const [programmingQuestion, setProgrammingQuestion] = React.useState<CodingQuestion[]>([])
    const [mcqs, setMcqs] = React.useState<Mcq[]>([])
    const { contest } = useContext();

    React.useEffect(() => {
        const ac = new AbortController();
        if (contest.contest_id) {
            semicolonApi(`startTest/${contest.contest_id}`, {}, "GET")
                .then((data: any) => {
                    if (data.MCQs) {
                        const MCQS = data.MCQs.map(mcq => ({ ...mcq, choice: '' }));
                        setMcqs(MCQS);
                    }
                    if (data.progs) {
                        const progs = data.progs.map(progs => ({ ...progs, saved: false }));
                        setProgrammingQuestion(progs);
                    }
                })
                .catch(err => console.log(err))
        }

        return () => { }
    }, [contest])

    const [saveitem, setSaveItem] = React.useState<{ mcq: boolean, prog: boolean }>({ mcq: false, prog: false });
    function timeEnd(session: string) {
        semicolonApi(`contest/endcontest?candidate_id=${contest.candidate_id}`, {}, "GET")
        getAllPrograms()
        const Mcqs = JSON.parse(sessionStorage.getItem("mcqs"));
        if (Mcqs && Mcqs.length > 0)
            semicolonApi("submit/mcqs", { Mcqs: Mcqs }, "POST")
                .then(res => {
                    setSaveItem(e => ({ ...e, mcqs: true }))
                })
                .catch(err => console.log(err))
        else setSaveItem(e => ({ ...e, mcq: true }))

        const progs = JSON.parse(sessionStorage.getItem("programs"));
        if (progs && progs.length > 0)
            semicolonApi("submit/programs", { progs: progs }, "POST")
                .then(res => {
                    console.log(res)
                    setSaveItem(e => ({ ...e, prog: true }))
                })
                .catch(err => setSaveItem(e => ({ ...e, prog: true })))
        else setSaveItem(e => ({ ...e, prog: true }))
    }

    React.useEffect(() => {
        if (saveitem.mcq && saveitem.prog) {
            sessionStorage.clear();
        }
    }, [saveitem])

    const ref = React.useRef<any>();
    const getAllPrograms = () => {
        if (ref.current) {
            ref.current?.unMountEditor()
        }
    }
    return (
        <Router>
            <Routes>
                <Route path="/endtest" element={<EndTest />} />
                <Route path="/" element={<StartTest />} />
                {contest.contest_id ?
                    <Route element={<TestLayout timeUp={timeEnd} time={contest.duration * 30} />}>
                        <Route path="/menu" element={(programmingQuestion || mcqs) &&
                            <MenuPage programmingQuestion={programmingQuestion} mcqs={mcqs} />}
                        />
                        <Route path="/mcqs" element={<Mcqs MCQs={mcqs} timeUp={timeEnd}
                            contestName={contest.name} />}
                        />
                        <Route path="/program" element={programmingQuestion &&
                            <Program timeUp={timeEnd} programs={programmingQuestion} ref={ref} />}
                        />
                    </Route>
                    : <Route path="*" element={<Navigate to="/" />}
                    />}
                {/* <Route element={<TestLayout //timeOut={timeUp} 
                    timeUp={timeEnd} time={170} />}>
                    <Route path="/menu" element={<MenuPage
                        programmingQuestion={programmingQuestion1} mcqs={mcqs1} />} />
                    <Route path="/mcqs"
                        element={<Mcqs MCQs={mcqs1} timeUp={timeEnd} contestName={contest.name} />} />
                    <Route path="/program"
                        element={<Program timeUp={timeEnd} programs={programmingQuestion1} ref={ref} />} />
                </Route> */}
            </Routes>
        </Router>
    )
}

const javaScriptSTD = `/* let's write some code 😈 */
  'use strict';

  process.stdin.resume();
  process.stdin.setEncoding('utf-8');

  let inputString = '';

  process.stdin.on('data', function(inputStdin) {
      inputString += inputStdin;
  });

  process.stdin.on('end', function() {
      //inputString = inputString.split('\\n');
      main();
  });

  function readLine() {
      return inputString;
  }

  /*
   * Complete the 'plusMinus' function below.
   *
   * The function accepts INTEGER_ARRAY arr as parameter.
   */

  function plusMinus(arr) {
      // Write your code here

  }

  function main() {
     // const n = parseInt(readLine().trim(), 10);
    //  const arr = readLine().replace(/\\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));
        const arr= readLine();
      plusMinus(arr);
  }
  `
const programmingQuestion1: CodingQuestion[] = [
    {
        title: 'factorial',
        question: 'write a program to add two number',
        testCases: [
            { points: 4, input: '1,3', output: '4' },
            { points: 4, input: '2,3', output: '5' }
        ],
        contest_id: "928d581f-130a-4bda-8cbe-c17c1de0deaa",
        prog_id: "4",
        saved: false,
        boilerplateCodeJS: javaScriptSTD
    },
    {
        title: 'factorial 1',
        question: 'write a program to factoral',
        testCases: [{ points: 4, input: '1,3', output: '3,6' }],
        contest_id: "928d581f-130a-4bda-8cbe-c17c1de0deaa",
        prog_id: "53",
        saved: false,
        boilerplateCodeJS: ""
    },
    {
        title: 'factorial 2',
        question: 'write a program to factoral',
        testCases: [{ points: 4, input: '1,3', output: '3,6' }],
        contest_id: "928d581f-130a-4bda-8cbe-c17c1de0deaa",
        prog_id: "24",
        saved: false,
        boilerplateCodeJS: ""
    },
    /*  {
          title: 'factorial 3',
          question: 'write a program to factoral',
          testCases: [{ points: 4, input: '1,3', output: '3,6' }],
          contest_id: "928d581f-130a-4bda-8cbe-c17c1de0deaa",
          prog_id: "4",
          saved:false,
          boilerplateCodeJS:""     
        },
      {
          title: 'factorial 4',
          question: 'write a program to factoral',
          testCases: [{ points: 4, input: '1,3', output: '3,6' }],
          contest_id: "928d581f-130a-4bda-8cbe-c17c1de0deaa",
          prog_id: "4",
          saved:false,
          boilerplateCodeJS:""
        },
      {
          title: 'factorial 5',
          question: 'write a program to factoral',
          testCases: [{ points: 4, input: '1,3', output: '3,6' }],
          contest_id: "928d581f-130a-4bda-8cbe-c17c1de0deaa",
          prog_id: "4",
          saved:false,
          boilerplateCodeJS:"" 
        }*/
]
const mcqs1: Mcq[] = [
    {
        mcq_id: '1',
        question_number: 3,
        points: 5,
        question: 'question 1 Lorem, ipsum dolor sit amet consectetur adipisicing elit.Voluptate ipsam exercitationem maiores.Vitae at architecto magnam, quaerat similique dicta neque blanditiis perferendis tempore deleniti quod fugiat debitis quisquam, distinctio velit sunt cum? Eius deleniti itaque praesentium laborum repellat deserunt laudantium!' + 'question 1 Lorem, ipsum dolor sit amet consectetur adipisicing elit.Voluptate ipsam exercitationem maiores.Vitae at architecto magnam, quaerat similique dicta neque blanditiis perferendis tempore deleniti quod fugiat debitis quisquam, distinctio velit sunt cum? Eius deleniti itaque praesentium laborum repellat deserunt laudantium!',
        choice: '',
        disabled: false,
        a: 'loraafla', b: 'basdffaf', c: 'cafdsasdf', d: 'dasdfsdf',

    },
    {
        question: 'question 2',
        choice: '',
        mcq_id: '2',
        question_number: 3,
        points: 5,
        disabled: false,
        a: 'a', b: 'b', c: 'c', d: 'd'
    },
    {
        question: 'question 3', choice: '',
        mcq_id: '3',
        question_number: 3,
        points: 5,
        disabled: false,
        a: 'a', b: 'b', c: 'c', d: 'd'
    },
    {
        question: 'question 4', choice: '',
        mcq_id: '4',
        question_number: 3,
        points: 5,
        disabled: false,
        a: 'a', b: 'b', c: 'c', d: 'd'
    },
    {
        question: 'question 5', choice: '',
        mcq_id: '5',
        question_number: 3,
        points: 5,
        disabled: false,
        a: 'a', b: 'b', c: 'c', d: 'd'
    },
    {
        question: 'question 6', choice: '',
        mcq_id: '6',
        question_number: 3,
        points: 5,
        disabled: false,
        a: 'a', b: 'b', c: 'c', d: 'd'
    },
]
export default App;

