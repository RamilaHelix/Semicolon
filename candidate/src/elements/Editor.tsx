import React, { useEffect, useState } from "react";
import Editor, { Monaco } from "@monaco-editor/react";
import { Box, Button } from "@mui/material";
import useSessionStorage, { deleteSavedValue } from "../hooks/useSessionStorage";
import { Langages } from "../model/CodingQuestion.model";

const style = {
  backgroundColor: "#404040",
  color: "#acacac",
  height: "2rem",
  margin: "1rem",
  border: 'none',
  padding: " 0 14px",
  fontSize: "0.900rem",
  borderRadius: "4px",
  fontFamily: 'Work Sans,sans-serif',
  fontWeight: 700,
  lineHeight: 1.75,
}
const option = {
  fontSize: 36,
  formatOnType: true,
  selectOnLineNumbers: true,
  automaticLayout: true,
  folding: true,
  lineNumbers: false,
  quickSuggestions: false,
  minimap: {
    enabled: false,
  },
}

interface EditorProps {
  disabled: boolean;
  name: string;
  JSCode: string,
  submitCode: (finalCode: string, language: Langages) => void
  runProgram?: (finalCode: string, language: Langages) => void
  saveCode?: (finalCode: string, language: Langages) => void

}

export default function BasicEditor(props: EditorProps) {

  const [language, setLanguage] = useState<Langages>("javascript");
  const [savedCode, setSavedCode] = useSessionStorage(`${props.name}`, {})
  const editorRef = React.useRef<Monaco>(null);
  const valuesRef = React.useRef("");
  const LangRef = React.useRef<Langages>("javascript");

  function saveChanges(value) {
    valuesRef.current = value
  }
  useEffect(() => {
    return () => {
      let val = { ...savedCode, [LangRef.current]: valuesRef.current }
      if (valuesRef.current &&
        (valuesRef.current !== pythonComment &&
          valuesRef.current !== comment &&
          valuesRef.current !== ""
        )) {
        sessionStorage.setItem(`${props.name}`, JSON.stringify(val))
      }

      if (sessionStorage.getItem(`${props.name}`) && sessionStorage.getItem(`${props.name}`).length === 2)
        deleteSavedValue(`${props.name}`)
      else {
        let code = JSON.parse(sessionStorage.getItem(`${props.name}`))
        if (code && code[LangRef.current] && (code[LangRef.current] !== pythonComment
          && valuesRef.current !== comment))
          //props.submitCode(code[LangRef.current], LangRef.current)
          //console.log({ [props.name]: { [LangRef.current]: valuesRef.current } })
          props.saveCode(code[LangRef.current], LangRef.current)
      }
    }
  }, [])


  const comment: string = "/* let's write some code 😈 */"
  const pythonComment: string = "# let's write some code 😈"
  const javaScriptSTD = `/* let's write some code 😈 */
  'use strict';

  process.stdin.resume();
  process.stdin.setEncoding('utf-8');
  
  let inputString = '';
  
  process.stdin.on('data', function(inputStdin) {
      inputString += inputStdin;
  });
  
  process.stdin.on('end', function() {
      main();
  });
  
  function readLine() {
      return inputString;
  }
 
   
  function main() {
      const n = parseInt(readLine().trim(), 10);    
  }
  `

  function handleEditorDidMount(editor: any, monaco: any) {

    if (savedCode.javascript)
      editor.setValue(savedCode.javascript)

    else editor.setValue(props.JSCode !== "" ? props.JSCode : javaScriptSTD)
    editorRef.current = editor;

    // editor.onKeyDown((event: any) => {
    //   const { keyCode, ctrlKey, metaKey } = event;
    //   if (
    //     (keyCode === 33 || keyCode === 52 || keyCode === 54) &&
    //     (metaKey || ctrlKey)
    //   ) {
    //     event.preventDefault();
    //   }
    // });
    // editor.layout();
    // editor.updateOptions({ contextmenu: false });
  }

  function submit() {
    props.submitCode(editorRef.current?.getValue(), language)
    setSavedCode({ [language]: editorRef.current?.getValue() })
  }

  function runProgram() {
    props.runProgram(editorRef.current?.getValue(), language)
  }

  function onLanguageChange(e) {

    let program: string = editorRef.current.getValue();
    if (program !== pythonComment &&
      program !== comment &&
      program !== javaScriptSTD &&
      program !== props.JSCode) {
      setSavedCode(e => ({ ...e, [language]: program }))
    }

    let currentLang = e.target.value;
    LangRef.current = currentLang

    if (savedCode[currentLang] && savedCode[currentLang] !== '') {
      editorRef.current.setValue(savedCode[currentLang])

    }
    else {
      if (currentLang === 'python') {
        editorRef.current.setValue(pythonComment)
      }
      else if (currentLang === 'javascript') {
        editorRef.current.setValue(javaScriptSTD)
      }
      else
        editorRef.current.setValue(comment)
    }
    setLanguage(currentLang)
  }

  return (
    <Box
      id="helix-editor"
      className="editor-container"
      maxWidth={{ md: "90%" }}
      fontSize="1.7rem"
    >
      <div
        className="button-container"
        style={{
          display: "flex",
          justifyContent: "end",
          backgroundColor: "#1e1e1e",
        }}
      >
        <Button variant="contained"
          sx={{
            backgroundColor: "#04AA6D",
            height: "2rem", margin: "1rem",
            marginRight: "auto", padding: " 0 4rem"
          }}
          onClick={runProgram}>
          Run
        </Button>
        <Button
          onClick={submit}
          color="primary"
          variant="contained"
          sx={{
            height: "2rem",
            marginTop: "1rem",
            bgcolor: "#404040",
            color: "#acacac",
            textTransform: "lowercase",
            fontSize: "0.900rem",
          }}
        >
          Submit Result
        </Button>

        <select name="langage" id="langage" aria-label="langage"
          value={language}
          style={style} onChange={onLanguageChange}>
          <option value="javascript" >javascript</option>
          <option value="python">python</option>
          <option value="java">java</option>
          <option value="c">c</option>
          <option value="cpp">cpp</option>
        </select>
      </div>
      <Editor
        width="100%"
        height="80vh"
        //defaultLanguage="javascript"
        defaultValue={javaScriptSTD}
        language={language}
        theme="vs-dark"
        loading="Loading"
        onChange={saveChanges}
        line={4}
        onMount={handleEditorDidMount}
        options={option}
      />
    </Box>
  );
}
