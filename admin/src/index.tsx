import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./utilities/theme";
import { UserProvider } from "./context/userContext";
const adm: string = localStorage.getItem('admin_id') ?? ''
// localStorage.setItem('admin_id', JSON.stringify({ contest_id: 'df8973ed-37fe-42b8-9593-d1219ebb7423', admin_id: "6fa87aa3-f1f6-47d6-a23b-9cb22228b92d" }))
let admin = {}
if (adm)
  admin = JSON.parse(adm)
ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <UserProvider user={admin}>
        <App />
      </UserProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
