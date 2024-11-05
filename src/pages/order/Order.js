import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, Typography, Box } from '@mui/material';
import Select from 'react-select';

const steps = ['Items', 'Select Address', 'Confirm Order'];

const Order = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [completed, setCompleted] = useState(new Set([0]));

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

  // // get user address from the API
  // const getUserAddress = async () => {
  //   try {


  //     // const response = await axios.get("/user/address");
  //     // setAddress(response.data);
  //     setAddress(['address 1', 'address 2', 'address 3']);
  //   } catch (error) {
  //     console.error("Error fetching address:", error);
  //   }
  // };

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
                <Box>

                </Box>
              </Box>
            )}
            {activeStep === 2 && (
              <Typography variant="h6" align="center">
                Confirm Order
              </Typography>
            )}
            {/* <Typography variant="h6" align="center">
              {steps[activeStep]}
            </Typography> */}
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
