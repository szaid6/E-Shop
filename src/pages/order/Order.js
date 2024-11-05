import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, Typography, Box } from '@mui/material';

const steps = ['Select Address', 'Review Order', 'Place Order'];

const Order = () => {
  const [activeStep, setActiveStep] = useState(1);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={index === 0}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <Typography variant="h5" align="center">
            All steps completed - your order has been placed!
          </Typography>
        ) : (
          <div>
            <Typography variant="h6" align="center">
              {steps[activeStep]}
            </Typography>
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
        )}
      </div>
    </Box>
  );
};

export default Order;
