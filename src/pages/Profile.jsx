import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { useUser } from "../userContext";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { loginUser, user } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    loginUser();
    navigate("/login");
  };
  return (
    <Container fixed="true" sx={{ display: "grid" }}>
      {user ? (
        <Box sx={cardBox}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ fontSize: "1.7rem", textAlign: "center" }}>
              Profile
            </Typography>
            <Button
              variant="contained"
              size="small"
              sx={{
                fontSize: "1.1rem",
                background: "#2196f3",
                borderRadius: "2rem",
              }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: "1.1rem",
            }}
          >
            <Typography style={{ fontSize: "1rem", color: "darkgray" }}>
              Name :
            </Typography>
            <Typography style={{ fontSize: "1.2rem" }}> {user.name}</Typography>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: "1.1rem",
            }}
          >
            <Typography style={{ fontSize: "1rem", color: "darkgray" }}>
              Email :
            </Typography>
            <Typography style={{ fontSize: "1.2rem" }}>
              {" "}
              {user.email}
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: "1.1rem",
            }}
          >
            <Typography style={{ fontSize: "1rem", color: "darkgray" }}>
              Number :
            </Typography>
            <Typography style={{ fontSize: "1.2rem" }}>
              {" "}
              {user.number}
            </Typography>
          </div>
        </Box>
      ) : (
        <Box sx={cardBox}>
          <Typography sx={{ fontSize: "1.7rem", textAlign: "center" }}>
            Please log in to view your profile.
          </Typography>
        </Box>
      )}
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
export default Profile;
