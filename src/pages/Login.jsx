import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import USERS from "../users";
import { useNavigate } from "react-router-dom";
import { useUser } from "../userContext";

function Login() {
  const navigate = useNavigate();
  const { loginUser } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState({
    email: false,
    password: false,
  });
  const validateField = (name, value) => {
    switch (name) {
      case "email":
        return !(value.includes("@") && value.includes("."));
      case "password":
        return value.trim() === "" || value.length < 8;
      default:
        return false;
    }
  };
  const handleFormChange = (event) => {
    const { name, value } = event.target;
    const updatedForm = { ...loginForm, [name]: value };
    const updatedErrors = { ...formError, [name]: validateField(name, value) };

    setLoginForm(updatedForm);
    setFormError(updatedErrors);
  };
  const handleValidation = () => {
    const { email, password } = loginForm;
    const isEmailValid = email.includes("@") && email.includes(".");
    const isPasswordValid = password.trim() !== "" && password.length >= 8;

    return isEmailValid && isPasswordValid;
  };

  const handleFormSubmit = () => {
    console.log(loginForm);
    const { email, password } = loginForm;
    const user = USERS.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      alert("Log in successful");
      loginUser(user);
      navigate("/profile");
    } else {
      alert("Invalid credentials");
    }
    setIsLoading(false);
  };
  return (
    <Container fixed="true" sx={{ display: "grid" }}>
      <Box sx={cardBox}>
        <Typography sx={{ fontSize: "1.7rem", textAlign: "center" }}>
          Login
        </Typography>
        <TextField
          type="email"
          name="email"
          placeholder="Enter email"
          variant="outlined"
          margin="dense"
          value={loginForm.email}
          error={formError.name}
          onChange={handleFormChange}
        />
        <TextField
          type="password"
          name="password"
          placeholder="Enter password"
          variant="outlined"
          margin="dense"
          value={loginForm.password}
          error={formError.password}
          onChange={handleFormChange}
        />
        <Button
          disabled={!handleValidation() || isLoading}
          variant="contained"
          size="large"
          fullWidth={true}
          sx={{
            fontSize: "1.1rem",
            background: "#2196f3",
            borderRadius: "2rem",
          }}
          onClick={handleFormSubmit}
        >
          Submit
        </Button>
        <Typography sx={{ textAlign: "center" }}>
          New here?{" "}
          <Button variant="text" onClick={() => navigate("/signup")}>
            Register
          </Button>
        </Typography>
      </Box>
    </Container>
  );
}

const cardBox = {
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
  margin: "4rem",
  borderRadius: "2rem",
  padding: "2rem 4rem",
  width: "500px",
  justifyContent: "center",
  justifySelf: "center",
  boxShadow:
    "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
};

export default Login;
