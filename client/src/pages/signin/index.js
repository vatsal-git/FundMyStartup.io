import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setUser } from "../../store/user";
import { useSigninMutation } from "../../store/apis/signin.api";
import { Error } from "../../components/commons/feedback";
import { setCookie } from "../../utils/commonFunctions";
import { DEFAULT_SIGNIN_DATA } from "../../utils/defaultVariables";

import "./index.css";
import { Box, TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState(DEFAULT_SIGNIN_DATA);
  const [showPassword, setShowPassword] = useState(false);

  const [signinMutation, signinMutationRes] = useSigninMutation();

  const handleSignin = (e) => {
    e.preventDefault();
    signinMutation(form);
  };

  useEffect(() => {
    if (signinMutationRes?.isSuccess) {
      dispatch(setUser(signinMutationRes.data.user));
      setCookie("token", signinMutationRes.data.token);
      navigate("/");
    }
  }, [
    dispatch,
    navigate,
    signinMutationRes?.data?.token,
    signinMutationRes?.data?.user,
    signinMutationRes?.isSuccess,
  ]);

  return (
    <Box className="signin-container">
      <Box className="signin-container-box">
        <Typography variant="h5">Sign-In 🔑</Typography>
        <Error
          show={signinMutationRes?.isError}
          message={signinMutationRes?.error?.data?.message}
        />
        <Box component="form" onSubmit={handleSignin} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            InputProps={{
              endAdornment: showPassword ? (
                <VisibilityIcon
                  onClick={() => setShowPassword(!showPassword)}
                  sx={{ cursor: "pointer" }}
                />
              ) : (
                <VisibilityOffIcon
                  onClick={() => setShowPassword(!showPassword)}
                  sx={{ cursor: "pointer" }}
                />
              ),
            }}
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
    </Box>
  );
};

export default Signin;
