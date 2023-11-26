import React, { useState } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { changePassword2 } from '../services/api'; // Import the changePassword function from your API file

export default function ChangePasswordPatient() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "oldPassword") setOldPassword(value);
    else if (name === "newPassword") setNewPassword(value);
    else if (name === "confirmPassword") setConfirmPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make the API request to change password
      const response = await changePassword2({
        oldPassword,
        newPassword,
        confirmPassword,
      });

      // Handle the response accordingly, e.g., show success message
      console.log(response.data.message);
    } catch (error) {
      // Handle errors, e.g., show error message
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Reset Password | Admin</title>
        </Helmet>
      </HelmetProvider>

      <form onSubmit={handleSubmit}>
        <label>
          Old Password:
          <input
            type="password"
            name="oldPassword"
            value={oldPassword}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          New Password:
          <input
            type="password"
            name="newPassword"
            value={newPassword}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Confirm Password:
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <button type="submit">Change Password</button>
      </form>
    </>
  );
} 