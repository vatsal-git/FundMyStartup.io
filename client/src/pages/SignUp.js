import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignupMutation } from "../store/apis/signup.api";
import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";

const SignupPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("a@b.c");
  const [password, setPassword] = useState("123456");
  const [name, setName] = useState("vatsal");
  const [role, setRole] = useState("entrepreneur");
  const [location, setLocation] = useState("surat");
  const [phoneNumber, setPhoneNumber] = useState("7016403794");

  const [signupMutation, { isLoading, isError, error }] = useSignupMutation();

  const handleSignup = async (e) => {
    e.preventDefault();
    signupMutation({
      email,
      password,
      name,
      role,
      location,
      phoneNumber,
    }).then((res) => {
      if (res.data?.success) {
        navigate("/signin");
      }
    });
  };

  return (
    <Container maxWidth="xs">
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
            Sign-Up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSignup}
            noValidate
            sx={{ mt: 1 }}
          >
            {isError && (
              <Typography sx={{ color: "red" }}>
                {error.data.message}
              </Typography>
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="name"
              label="Name"
              type="text"
              id="name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <FormControl margin="normal" fullWidth>
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                id="role"
                label="Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <MenuItem value={"entrepreneur"}>Entrepreneur</MenuItem>
                <MenuItem value={"investor"}>Investor</MenuItem>
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
              value={location}
              onChange={(e) => setLocation(e.target.value)}
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
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              className={isLoading ? "" : "primaryBtn"}
              loading={isLoading}
              sx={{ mt: 3, mb: 2 }}
            >
              <span>Sign-Up</span>
            </LoadingButton>
            <Typography color="grey" variant="body2" align="center">
              Already have an account? <Link to="/signin">Sign-In</Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Container>
  );
};

export default SignupPage;
