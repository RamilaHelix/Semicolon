import React from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { useUserContext } from "./context/userContext";
import CreateTest from "./pages/CreateTest";
import AdminPanel from "./pages/AdminPanel";
import SignIn from "./pages/SignIn";
import Invite from "./pages/Invite";
import SignUp from "./pages/SignUp";
import "./App.css";
import Stepper from "./pages/Stepper";
import ResponsiveAppBar from "./Header/Nav";
import Ques from "./pages/Ques";
import AddCodingQue1 from "./components/AddCodingQue1";
function App() {

  const { user } = useUserContext();

  return (
    <Router>
      {/* <Routes>
        <Route path="/s" element={<Stepper />} />
        <Route path="/nav" element={<Nav />} />
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        { //user?.admin_id ?
          <Route>
            <Route path="createtest"
              element={(!user?.contest_id) ? (<CreateTest />) :
                (<Navigate to={"/adminpanel"} replace />)}
            />
            <Route path="/adminpanel" element={<AdminPanel />} />
            <Route path="/invite" element={<Invite />} />
          </Route>
          // : <Route path="/" element={<SignIn />} />
        }
      </Routes> */}
      <Routes>
        <Route element={<ResponsiveAppBar />}>
          <Route path="/createtest" element={<Stepper />} />
          <Route path="/adminpanel" element={<AdminPanel />} />
          <Route path="/invite" element={<Invite />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<SignIn />} />
        <Route path="/edi" element={<AddCodingQue1 />} />
      </Routes>
    </Router>
  );
}

export default App;
