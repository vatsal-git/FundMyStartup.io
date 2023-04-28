import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setCookie } from "../utils/commonFunctions";
import { useSigninMutation } from "../store/apis/signin.api";
import { useDispatch } from "react-redux";
import { setUser } from "../store/user";
import { Box, Container, TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";

const Signin = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("a@b.c");
  const [password, setPassword] = useState("123456");
  const navigate = useNavigate();

  const [signinMutation, { isLoading, isError, error }] = useSigninMutation();

  const handleSignin = (e) => {
    e.preventDefault();
    signinMutation({ email, password }).then((res) => {
      if (res.data?.success) {
        navigate("/");
        setCookie("token", res.data.token);
        dispatch(setUser(res.data.user));
      }
    });
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign-In
        </Typography>
        <Box component="form" onSubmit={handleSignin} noValidate sx={{ mt: 1 }}>
          {isError && (
            <Typography sx={{ color: "red" }}>{error.data.message}</Typography>
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            loading={isLoading}
            className="primaryBtn"
            sx={{ mt: 3, mb: 2 }}
          >
            <span>Sign-In</span>
          </LoadingButton>
          <Typography color="grey" variant="body2" align="center">
            Don't have an account? <Link to="/signup">Sign-Up</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Signin;
