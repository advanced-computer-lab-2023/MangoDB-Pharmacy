import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Grid,
  Paper,
  Typography,
  Input,
  FormHelperText,
} from "@mui/material";
import { pharmacistReg as PharmacistRegService } from "../services/api";

const PharmacistReg = () => {
  const uploadIcon = `${process.env.PUBLIC_URL}/icons/upload.svg`;
  //Pharmacist
  const [rate, setRate] = useState("");
  const [documents, setDocuments] = useState([]); // Initialize as an empty array

  const [affiliation, setAffiliation] = useState("");
  const [education, setEducation] = useState("");
  //User
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDOB] = useState("");
  const [addresses, setAddresses] = useState("");
  const [successOpen, setSuccessOpen] = useState(false);

  //Docs

  //Other
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("dob", dob);
    formData.append("affiliation", affiliation);
    formData.append("rate", rate);
    formData.append("education", education);
    formData.append("addresses", addresses);
    documents.forEach((file) => formData.append("documents", file));

    setIsPending(true);

    PharmacistRegService(formData)
      .then(() => {
        setIsPending(false);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error adding Pharmacist:", error);
        setIsPending(false);
      });
  };

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    console.log("Selected Files:", selectedFiles);
    if (selectedFiles.length > 0) {
      // Concatenate the new files with the existing ones
      setDocuments((prevDocuments) => [...prevDocuments, ...selectedFiles]);
      console.log(documents);
    }
  };

  return (
    <Grid container justifyContent="center" style={{ padding: "2rem" }}>
      <Grid item xs={6}>
        <Paper
          elevation={3}
          sx={{ maxWidth: "80%", margin: "auto" }}
          style={{ padding: "2rem" }}
        >
          <Typography variant="h3">Register as a Pharmacist</Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="First Name"
                  type="text"
                  fullWidth
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  style={{ marginBottom: "1rem" }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Last Name"
                  type="text"
                  fullWidth
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  style={{ marginBottom: "1rem" }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Username"
                  type="text"
                  size="large"
                  fullWidth
                  required
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  style={{ marginBottom: "1rem" }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ marginBottom: "1rem" }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Password"
                  type="password"
                  required
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ marginBottom: "1rem" }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Date of Birth"
                  type="date"
                  required
                  fullWidth
                  value={dob}
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => setDOB(e.target.value)}
                  style={{ marginBottom: "1rem" }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="Address"
                  type="text"
                  size="large"
                  fullWidth
                  required
                  value={addresses}
                  onChange={(e) => setAddresses(e.target.value)}
                  style={{ marginBottom: "1rem" }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Affiliation"
                  type="text"
                  size="large"
                  fullWidth
                  required
                  value={affiliation}
                  onChange={(e) => setAffiliation(e.target.value)}
                  style={{ marginBottom: "1rem" }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="Education"
                  type="text"
                  size="large"
                  fullWidth
                  required
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  style={{ marginBottom: "1rem" }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="Rate"
                  type="number"
                  required
                  fullWidth
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  style={{ marginBottom: "1rem" }}
                />
              </Grid>

              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="secondary"
                  component="label"
                  startIcon={
                    <img
                      src={uploadIcon}
                      alt="Upload Icon"
                      style={{ filter: "invert(1)" }}
                      width="20"
                      height="20"
                    />
                  }
                  onClick={() => document.getElementById("fileInput").click()}
                  fullWidth // This makes the button take up the full width of the Grid item
                >
                  Upload
                </Button>
                <Input
                  id="fileInput"
                  type="file"
                  name="picture"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                  multiple // Add this attribute to allow multiple file selection
                />
                <FormHelperText>
                  Upload id , pharmacy degree or working license
                </FormHelperText>
              </Grid>
            </Grid>
            {!isPending ? (
              <Button variant="contained" type="submit" fullWidth>
                Register
              </Button>
            ) : (
              <Button variant="contained" disabled fullWidth>
                Registering
              </Button>
            )}
            <Grid item xs sx={{ pt: 3 }}>
              <Typography variant="body2">Already registered?</Typography>
              <Link href="/login" variant="body2" sx={{ color: "#15678d" }}>
                Login
              </Link>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};
export default PharmacistReg;
