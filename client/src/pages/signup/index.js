import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Error, HandleResponse } from "../../components/commons/feedback";
import { useSignupMutation } from "../../store/apis/signup.api";
import { DEFAULT_SIGNUP_DATA } from "../../utils/defaultVariables";

import "./index.css";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setFrom] = useState(DEFAULT_SIGNUP_DATA);
  const [showPassword, setShowPassword] = useState(false);

  const [signupMutation, signupMutationRes] = useSignupMutation();

  useEffect(() => {
    if (signupMutationRes.isSuccess) navigate("/signin");
  }, [navigate, signupMutationRes.isSuccess]);

  const handleSignup = async (e) => {
    e.preventDefault();
    signupMutation(form);
  };

  return (
    <Box className="signup-container">
      <Box className="signup-container-box">
        <Typography variant="h5">Sign-Up 🔐</Typography>
        <Error
          show={signupMutationRes?.isError}
          message={signupMutationRes?.error?.data?.message}
        />
        <Box component="form" onSubmit={handleSignup} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => setFrom({ ...form, email: e.target.value })}
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
            onChange={(e) => setFrom({ ...form, password: e.target.value })}
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
          <TextField
            margin="normal"
            required
            fullWidth
            name="name"
            label="Name"
            type="text"
            id="name"
            autoComplete="name"
            value={form.name}
            onChange={(e) => setFrom({ ...form, name: e.target.value })}
          />
          <FormControl margin="normal" fullWidth>
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              id="role"
              label="Role"
              value={form.role}
              onChange={(e) => setFrom({ ...form, role: e.target.value })}
            >
              <MenuItem value="ENTREPRENEUR">Entrepreneur</MenuItem>
              <MenuItem value="INVESTOR">Investor</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="normal"
            required
            fullWidth
            name="location"
            label="Location"
            type="text"
            id="location"
            autoComplete="location"
            value={form.location}
            onChange={(e) => setFrom({ ...form, location: e.target.value })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="phoneNumber"
            label="Phone Number"
            type="telephone"
            id="phoneNumber"
            autoComplete="phoneNumber"
            value={form.phoneNumber}
            onChange={(e) => setFrom({ ...form, phoneNumber: e.target.value })}
          />
          <LoadingButton
            fullWidth
            type="submit"
            variant="contained"
            loading={signupMutationRes.isLoading}
            sx={{ mt: 3, mb: 2 }}
          >
            Sign-Up
          </LoadingButton>
          <Typography color="GrayText" variant="body2" align="center">
            Already have an account? <Link to="/signin">Sign-In</Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Signup;
