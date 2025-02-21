import React, { useState } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import axios from "axios";

const Bucket = () => {
  const [bucketName, setBucketName] = useState("");
  const [message, setMessage] = useState("");

  const handleCreateBucket = async () => {
    if (!bucketName.trim()) {
      setMessage("❌ Bucket name cannot be empty!");
      return;
    }

    setMessage(`⏳ Creating bucket "${bucketName}"... Please wait.`);

    try {
      const response = await axios.post("http://127.0.0.1:8000/create-bucket", {
        bucket_name: bucketName,
      });

      if (response.status === 200) {
        setMessage(`✅ Bucket "${bucketName}" created successfully!`);
      } else {
        setMessage(`❌ Failed to create bucket.`);
      }
    } catch (error) {
      setMessage(`❌ Error: ${error.response?.data?.detail || "Something went wrong"}`);
    }
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        textAlign: "center",
        mt: 2,
        backgroundColor: "#4158D0",
        backgroundImage:
          "linear-gradient(43deg,rgb(90, 192, 206) 0%, #C850C0 46%, #FFCC70 100%)",
      }}
    >
      <TextField
        label="Enter S3 Bucket Name"
        variant="outlined"
        fullWidth
        value={bucketName}
        onChange={(e) => setBucketName(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateBucket}
        sx={{
          mb: 2,
          transition: "0.3s",
          "&:hover": { backgroundColor: "#1976d2", transform: "scale(1.05)" },
        }}
      >
        Submit
      </Button>
      {message && (
        <Typography variant="body1" sx={{ mt: 2, fontWeight: "bold", color: "#333" }}>
          {message}
        </Typography>
      )}
    </Paper>
  );
};

export default Bucket;
