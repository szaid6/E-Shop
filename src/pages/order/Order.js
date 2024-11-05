import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, Typography, Box, TextField } from '@mui/material';
import Select from 'react-select';

const steps = ['Items', 'Select Address', 'Confirm Order'];

const Order = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [completed, setCompleted] = useState(new Set([0]));
  const [formData, setFormData] = useState({
    name: { value: '', error: false, errorMessage: null },
    contactNumber: { value: '', error: false, errorMessage: null },
    street: { value: '', error: false, errorMessage: null },
    city: { value: '', error: false, errorMessage: null },
    state: { value: '', error: false, errorMessage: null },
    landmark: { value: '', error: false, errorMessage: null },
    zipCode: { value: '', error: false, errorMessage: null },
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // mark the step as completed
    setCompleted(new Set([...completed, activeStep]));
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    console.log(activeStep);

    // remove the step from completed
    const newCompleted = new Set(completed);
    newCompleted.delete(1);
    setCompleted(newCompleted);
  };

  const handleFieldChange = (field, value) => {
    const { valid, message } = validateField(field, value);
    setFormData({
      ...formData,
      [field]: { value, error: !valid, errorMessage: message },
    });
  };

  const validateField = (field, value) => {
    let valid = true;
    let message = null;

    if (value == null || value.length === 0) {
      valid = false;
      message = 'This field is required.';
    } else {
      switch (field) {
        case 'contactNumber':
          valid = /^\d{10}$/.test(value);
          message = valid ? null : 'Please enter a valid 10-digit contact number.';
          break;
        case 'zipCode':
          valid = /^\d{5}$/.test(value);
          message = valid ? null : 'Please enter a valid 5-digit zip code.';
          break;
        default:
          break;
      }
    }

    return { valid, message };
  };

  const handleSaveAddress = () => {
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
      console.log('Address saved:', data);
    }
  };

  const address = [
    {
      'id': 1,
      'address': 'address 1'
    },
    {
      'id': 2,
      'address': 'address 2'
    },
    {
      'id': 3,
      'address': 'address 3'
    }
  ];

  return (
    <Box display={'flex'} flexDirection={'row'} justifyContent={'center'} width={'100%'} bgcolor={'#fafafa'} height={'90vh'} >
      <Box sx={{ width: '70%' }} marginTop={'3rem'} >
        <Stepper activeStep={activeStep} style={{ backgroundColor: '#fff', padding: '1.5rem' }}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed.has(index)}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          <div>
            {activeStep === 1 && (
              <Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} >
                <div style={{ width: '500px', marginTop: '1rem' }}>
                  <label>Select Address</label>
                  <Select
                    options={address.map((address) => ({ value: address.id, label: address.address }))}
                    placeholder="Select..."
                    // onChange={handleSorting}
                    value='default'
                  />
                </div>

                <Typography variant="h6" align="center" marginTop={'1rem'}>
                  -OR-
                </Typography>
                <Typography variant="h6" align="center" marginTop={'1.5rem'}>
                  Add Address
                </Typography>

                {/* add address fields */}
                <Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} width={'100%'} maxWidth={'500px'} marginTop={'1rem'}>
                  <TextField
                    label="Name *"
                    variant="outlined"
                    fullWidth
                    value={formData.name.value}
                    onChange={(event) => handleFieldChange('name', event.target.value)}
                    error={formData.name.error}
                    helperText={formData.name.error && formData.name.errorMessage}
                    margin="normal"
                  />
                  <TextField
                    label="Contact Number *"
                    variant="outlined"
                    fullWidth
                    value={formData.contactNumber.value}
                    onChange={(event) => handleFieldChange('contactNumber', event.target.value)}
                    error={formData.contactNumber.error}
                    helperText={formData.contactNumber.error && formData.contactNumber.errorMessage}
                    margin="normal"
                  />
                  <TextField
                    label="Street *"
                    variant="outlined"
                    fullWidth
                    value={formData.street.value}
                    onChange={(event) => handleFieldChange('street', event.target.value)}
                    error={formData.street.error}
                    helperText={formData.street.error && formData.street.errorMessage}
                    margin="normal"
                  />
                  <TextField
                    label="City *"
                    variant="outlined"
                    fullWidth
                    value={formData.city.value}
                    onChange={(event) => handleFieldChange('city', event.target.value)}
                    error={formData.city.error}
                    helperText={formData.city.error && formData.city.errorMessage}
                    margin="normal"
                  />
                  <TextField
                    label="State *"
                    variant="outlined"
                    fullWidth
                    value={formData.state.value}
                    onChange={(event) => handleFieldChange('state', event.target.value)}
                    error={formData.state.error}
                    helperText={formData.state.error && formData.state.errorMessage}
                    margin="normal"
                  />
                  <TextField
                    label="Landmark *"
                    variant="outlined"
                    fullWidth
                    value={formData.landmark.value}
                    onChange={(event) => handleFieldChange('landmark', event.target.value)}
                    error={formData.landmark.error}
                    helperText={formData.landmark.error && formData.landmark.errorMessage}
                    margin="normal"
                  />
                  <TextField
                    label="Zip Code *"
                    variant="outlined"
                    fullWidth
                    value={formData.zipCode.value}
                    onChange={(event) => handleFieldChange('zipCode', event.target.value)}
                    error={formData.zipCode.error}
                    helperText={formData.zipCode.error && formData.zipCode.errorMessage}
                    margin="normal"
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleSaveAddress}
                    style={{ marginTop: '1rem' }}
                  >
                    Save Address
                  </Button>
                </Box>
              </Box>
            )}
            {activeStep === 2 && (
              <Typography variant="h6" align="center">
                Confirm Order
              </Typography>
            )}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 1}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
              </Button>
            </Box>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default Order;
