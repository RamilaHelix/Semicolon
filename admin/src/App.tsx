import React, { useEffect } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import CreateTest from "./pages/CreateTest";
import SignIn from "./pages/SignIn";
import Invite from "./pages/Invite";
import SignUp from "./pages/SignUp";
import { useUserContext } from "./context/userContext";
import "./App.css";
import AdminPanel from "./pages/AdminPanel";
function App() {

  const { user } = useUserContext();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        { //user?.admin_id ?
          <Route>
            <Route path="createtest"
              element={(!user?.contest_id) ? (<CreateTest />) : (<Navigate to={"/adminpanel"} replace />)}
            />
            <Route path="/adminpanel" element={<AdminPanel />} />
            <Route path="/invite" element={<Invite />} />
          </Route>
          //: <Route path="/" element={<SignIn />} />
        }
      </Routes>
    </Router>
  );
}

export default App;
