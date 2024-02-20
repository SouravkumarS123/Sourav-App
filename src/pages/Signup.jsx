import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import USERS from "../users";
import { useUser } from "../userContext";

function Signup() {
  const { loginUser } = useUser();
  const navigate = useNavigate();
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    number: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
    number: false,
  });

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return value.trim() === "";
      case "email":
        return !(value.includes("@") && value.includes("."));
      case "password":
        return value.trim() === "" || value.length < 8;
      case "confirmPassword":
        return value !== signupForm.password;
      case "number":
        return value.trim() === "" || isNaN(value);
      default:
        return false;
    }
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    const updatedForm = { ...signupForm, [name]: value };
    const updatedErrors = { ...formErrors, [name]: validateField(name, value) };

    setSignupForm(updatedForm);
    setFormErrors(updatedErrors);
  };

  const handleValidation = () => {
    const { name, email, password, confirmPassword, number } = signupForm;

    const isNameValid = name.trim() !== "";
    const isEmailValid = email.includes("@") && email.includes(".");
    const isPasswordValid = password.trim() !== "" && password.length >= 8;
    const isConfirmPasswordValid = confirmPassword === password;
    const isNumberValid = number.trim() !== "" && !isNaN(number);

    return (
      isNameValid &&
      isEmailValid &&
      isPasswordValid &&
      isConfirmPasswordValid &&
      isNumberValid
    );
  };

  const handleFormSubmit = () => {
    const { email } = signupForm;
    const isExistingUser = USERS.some((user) => user.email === email);

    if (isExistingUser) {
      alert("Email already exists. Please use a different email.");
    } else {
      loginUser(signupForm);
      navigate("/profile");
    }
  };

  return (
    <Container fixed sx={{ display: "grid" }}>
      <Box sx={cardBox}>
        <Typography sx={{ fontSize: "1.7rem", textAlign: "center" }}>
          Register
        </Typography>
        <TextField
          type="text"
          name="name"
          placeholder="Enter full name"
          variant="outlined"
          margin="dense"
          value={signupForm.name}
          error={formErrors.name}
          onChange={handleFormChange}
        />
        <TextField
          type="email"
          name="email"
          placeholder="Enter email"
          variant="outlined"
          margin="dense"
          value={signupForm.email}
          error={formErrors.email}
          onChange={handleFormChange}
        />
        <TextField
          type="password"
          name="password"
          placeholder="Enter password"
          variant="outlined"
          margin="dense"
          value={signupForm.password}
          error={formErrors.password}
          onChange={handleFormChange}
        />
        <TextField
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          variant="outlined"
          margin="dense"
          value={signupForm.confirmPassword}
          error={formErrors.confirmPassword}
          onChange={handleFormChange}
        />
        <TextField
          type="number"
          name="number"
          placeholder="Enter phone number"
          variant="outlined"
          margin="dense"
          value={signupForm.number}
          error={formErrors.number}
          onChange={handleFormChange}
        />
        <Button
          disabled={!handleValidation()}
          variant="contained"
          size="large"
          fullWidth
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
          Already Registered?{" "}
          <Button variant="text" onClick={() => navigate("/login")}>
            Login
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

export default Signup;
