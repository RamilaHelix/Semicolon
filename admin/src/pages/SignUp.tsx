import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Avatar, Button, Container, Typography, Link, Box, Grid, TextField } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import semicolonApi from "../functions/fetchApi";
import { useUserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

interface User1 {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const userContext = useUserContext();
  const navigate = useNavigate();
  const [user, setUser] = React.useState<User1>({
    first_name: "", last_name: "",
    email: "", password: ""
  })

  function handleSubmit() {

    semicolonApi('auth/signup', user, "POST")
      .then(res => {
        userContext.updateData({ admin_id: res.admin_id, email: res.email })
        localStorage.setItem('admin_id', JSON.stringify({ admin_id: res.admin_id }));
        navigate("/createTest")
      })
      .catch(err => console.log(err))
  }
  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  fullWidth
                  sx={{ mb: 2 }}
                  required
                  value={user.first_name}
                  onChange={(e) => setUser(u => ({ ...u, first_name: e.target.value }))}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name"
                  fullWidth
                  required
                  sx={{ mb: 2 }}
                  value={user.last_name}
                  onChange={(e) => setUser(u => ({ ...u, last_name: e.target.value }))}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  fullWidth
                  required
                  sx={{ mb: 2 }}
                  value={user.email}
                  onChange={(e) => setUser(u => ({ ...u, email: e.target.value }))}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  fullWidth
                  required
                  sx={{ mb: 2 }}
                  value={user.password}
                  onChange={(e) => setUser(u => ({ ...u, password: e.target.value }))}
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              size="large"
              fullWidth
              sx={{ mb: 2, color: "#fff " }}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default SignUp;
