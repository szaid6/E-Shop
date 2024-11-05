import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Grid, CircularProgress, Backdrop } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'api/axios';
import Navbar from 'components/navbarauth/Navbar';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: { value: '', error: false, errorMessage: null },
    lastName: { value: '', error: false, errorMessage: null },
    email: { value: '', error: false, errorMessage: null },
    password: { value: '', error: false, errorMessage: null },
    confirmPassword: { value: '', error: false, errorMessage: null },
    contactNumber: { value: '', error: false, errorMessage: null },
  });
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const validateField = (field, value) => {
    let valid = true;
    let message = null;

    if (value == null || value.length === 0) {
      valid = false;
      message = 'This field is required.';
    } else {
      switch (field) {
        case 'email':
          valid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value);
          message = valid ? null : 'Please enter a valid email.';
          break;
        case 'password':
          valid = value.length >= 6 && value.length <= 40;
          message = valid ? null : "Password's length must be between 6 and 40.";
          break;
        case 'confirmPassword':
          valid = value === formData.password.value;
          message = valid ? null : 'Passwords do not match.';
          break;
        case 'contactNumber':
          valid = /^\d{10}$/.test(value);
          message = valid ? null : 'Please enter a valid 10-digit contact number.';
          break;
        default:
          break;
      }
    }

    return { valid, message };
  };

  const handleFieldChange = (field, value) => {
    const { valid, message } = validateField(field, value);
    setFormData({
      ...formData,
      [field]: { value, error: !valid, errorMessage: message },
    });
  };

  const handleSubmit = async () => {
    setBusy(true);
    let validForm = true;
    const data = {};

    for (let field in formData) {
      const { value, error } = formData[field];
      if (error || value === '') {
        validForm = false;
        handleFieldChange(field, value);
      } else {
        data[field] = value;
      }
    }

    if (validForm) {
      try {
        await axios.post('/auth/signup', data);
        navigate('/login');
      } catch (error) {
        console.error('Signup error:', error);
      }
    }

    setBusy(false);
  };

  return (
    <>
      <Navbar />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid container item spacing={3}>
            <Grid item xs={4} />
            <Grid item xs={4}>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10%' }}>
                <Typography variant="h5">Sign Up</Typography>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                <TextField
                  id="firstName"
                  label="First Name *"
                  variant="outlined"
                  fullWidth
                  value={formData.firstName.value}
                  onChange={(event) => handleFieldChange('firstName', event.target.value)}
                  error={formData.firstName.error}
                  helperText={formData.firstName.error && formData.firstName.errorMessage}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                <TextField
                  id="lastName"
                  label="Last Name *"
                  variant="outlined"
                  fullWidth
                  value={formData.lastName.value}
                  onChange={(event) => handleFieldChange('lastName', event.target.value)}
                  error={formData.lastName.error}
                  helperText={formData.lastName.error && formData.lastName.errorMessage}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                <TextField
                  id="email"
                  label="Email Address *"
                  variant="outlined"
                  fullWidth
                  type="email"
                  value={formData.email.value}
                  onChange={(event) => handleFieldChange('email', event.target.value)}
                  error={formData.email.error}
                  helperText={formData.email.error && formData.email.errorMessage}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                <TextField
                  id="password"
                  label="Password *"
                  variant="outlined"
                  fullWidth
                  type="password"
                  value={formData.password.value}
                  onChange={(event) => handleFieldChange('password', event.target.value)}
                  error={formData.password.error}
                  helperText={formData.password.error && formData.password.errorMessage}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                <TextField
                  id="confirmPassword"
                  label="Confirm Password *"
                  variant="outlined"
                  fullWidth
                  type="password"
                  value={formData.confirmPassword.value}
                  onChange={(event) => handleFieldChange('confirmPassword', event.target.value)}
                  error={formData.confirmPassword.error}
                  helperText={formData.confirmPassword.error && formData.confirmPassword.errorMessage}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                <TextField
                  id="contactNumber"
                  label="Contact Number *"
                  variant="outlined"
                  fullWidth
                  value={formData.contactNumber.value}
                  onChange={(event) => handleFieldChange('contactNumber', event.target.value)}
                  error={formData.contactNumber.error}
                  helperText={formData.contactNumber.error && formData.contactNumber.errorMessage}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                  SIGN UP
                </Button>
              </div>
              <div style={{ display: 'flex', justifyContent: 'left', marginTop: '30px' }}>
                <Link to="/login">
                  <Typography variant="body1">Already have an account? Sign In</Typography>
                </Link>
              </div>
            </Grid>
            <Grid item xs={4} />
          </Grid>
        </Grid>
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={busy}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </>
  );
};

export default Signup;
