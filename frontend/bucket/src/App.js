import React from "react";
import { Container, Typography, Paper } from "@mui/material";
import Bucket from "./Bucket";

const App = () => {
  return (
    <Container maxWidth="sm" >
      <Paper elevation={3} sx={{ p: 3, mt: 5, textAlign: "center", 
        backgroundColor: "#4158D0",
        backgroundImage:
          "linear-gradient(43deg,rgb(56, 158, 171) 0%,rgb(177, 46, 168) 46%,rgb(208, 157, 63) 100%)",
       }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
          AWS S3 Bucket Creator
        </Typography>
        <Bucket />
      </Paper>
    </Container>
  );
};

export default App;