import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setUser } from "../../store/user";
import { useSigninMutation } from "../../store/apis/signin.api";
import { setCookie } from "../../utils/commonFunctions";

import "./index.css";
import { Box, Container, TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { HandleResponse } from "../../components/commons/feedback";

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("testemail@test.com");
  const [password, setPassword] = useState("test123");

  const [signinMutation, signinMutationRes] = useSigninMutation();

  const handleSignin = (e) => {
    e.preventDefault();
    signinMutation({ email, password }).then((res) => {
      if (res.data?.success) {
        dispatch(setUser(res.data.user));
        setCookie("token", res.data.token);
        navigate("/");
      }
    });
  };

  return (
    <Box className="signin-container">
      <Typography variant="h5">Sign-In 🔑</Typography>
      <HandleResponse response={signinMutationRes} />
      <Box component="form" onSubmit={handleSignin} noValidate>
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
          fullWidth
          type="submit"
          variant="contained"
          loading={signinMutationRes?.isLoading}
          sx={{ mt: 3, mb: 2 }}
        >
          Sign-In
        </LoadingButton>
        <Typography color="GrayText" variant="body2" align="center">
          Don't have an account? <Link to="/signup">Sign-Up</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Signin;
