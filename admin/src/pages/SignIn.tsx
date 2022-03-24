import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { InputTextElement } from "../elements/InputTextElement";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/userContext";
import { Alert, AlertColor, Avatar, Button, Snackbar } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import semicolonApi from "../functions/fetchApi";

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const userContext = useUserContext();
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [open, setOpen] = useState<{ msg: string, open: boolean, severity?: AlertColor }>({ msg: '', open: false, severity: 'success' })

  const handleSubmit = () => {
    if (!validEmail.test(email)) {
      return;
    }
    const user = { email, password }

    semicolonApi('auth/login', user, "POST")
      .then((admin) => {
        let _id = admin.admin_id
        userContext.updateData({ admin_id: _id, email, })
        localStorage.setItem('admin_id', JSON.stringify({ admin_id: _id }));
        navigate("/createTest")
      })
      .catch(() => {
        setOpen({ open: true, msg: 'User NOT Found', severity: 'error' })
        // userContext.updateData({ admin_id: '9f90f837-03c1-4c3d-93d4-80f8cb926ed9' });//, email, contest_id: '10deca51-01c8-442c-9e5a-e2474dc5cef1' });
        // localStorage.setItem('admin_id', JSON.stringify({ admin_id: "9f90f837-03c1-4c3d-93d4-80f8cb926ed9" }));//, contest_id: "10deca51-01c8-442c-9e5a-e2474dc5cef1" }));
        // navigate("/createTest")
      })

  }

  return (
    <Container component="main" maxWidth="xs">
      <Snackbar open={open.open} autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
        onClose={() => { setOpen({ open: false, msg: '', }) }}>
        <Alert onClose={() => setOpen({ open: false, msg: '', })} severity={open.severity} variant="filled" sx={{ width: '100%' }}>
          {open.msg}
        </Alert>
      </Snackbar>
      <CssBaseline />
      <Box sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Avatar sx={{ m: 1, bgcolor: "success.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <InputTextElement
            label="Email"
            fullWidth
            sx={{ mb: 2 }}
            value={email}
            onValueChange={(email) => setEmail(email)}
          />
          <InputTextElement
            fullWidth
            type="password"
            label="Password"
            value={password}
            autoComplete="on"
            sx={{ mb: 2 }}
            onValueChange={(password) => setPassword(password)}
          />

          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            color="success"
            variant="contained"
            size="large"
            fullWidth={true}
            sx={{ mb: 2, color: "#fff " }}
            onClick={() => handleSubmit()}
            disabled={!validEmail.test(email)}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default SignIn;
