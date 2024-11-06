import React, { useState, useEffect } from 'react';
import { Stepper, Step, StepLabel, Button, Typography, Box, TextField } from '@mui/material';
import Select from '@mui/material/Select';
import axios, { PrivateComponent } from 'api/axios';
import MenuItem from '@mui/material/MenuItem';
import useAuth from 'hooks/useAuth';
import ConfirmOrder from './ConfirmOrder'
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
const steps = ['Items', 'Select Address', 'Confirm Order'];



const Order = () => {
  const { productId, quantity } = useParams();
  const navigate = useNavigate()

  const privateAxios = PrivateComponent();
  const { auth } = useAuth();
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

    if (selectedAddress === "-1") {
      toast.error("Please select address")
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      // mark the step as completed
      setCompleted(new Set([...completed, activeStep]));
    }
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
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: { value, error: !valid, errorMessage: message },
    }));
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
          valid = /^\d{6}$/.test(value);
          message = valid ? null : 'Please enter a valid 6-digit zip code.';
          break;
        default:
          break;
      }
    }

    return { valid, message };
  };

  const validateForm = () => {
    let updatedFormData = { ...formData };
    let isFormValid = true;

    Object.keys(formData).forEach((field) => {
      const { value } = formData[field];
      const { valid, message } = validateField(field, value);

      if (!valid) {
        isFormValid = false;
      }

      updatedFormData[field] = {
        ...formData[field],
        error: !valid,
        errorMessage: message,
      };
    });

    setFormData(updatedFormData);
    return isFormValid;
  };

  const handleSaveAddress = async () => {
    if (validateForm()) {
      try {

        const payload = {

          name: formData.name.value,
          contactNumber: formData.contactNumber.value,
          street: formData.street.value,
          city: formData.city.value,
          state: formData.state.value,
          landmark: formData.landmark.value,
          zipcode: formData.zipCode.value,
          user: auth.userId
        }



        const res = await privateAxios.post("/addresses", payload);
        const { data } = res;
        await getAddresses();
        alert("address added select it from the dropdown")




      } catch (error) {
        alert("erorr adding address")
      }


    }
  };

  const [selectedAddressDetails, setSelectedAddressDetails] = useState({})
  const [product, setProduct] = useState({});
  const [selectedAddress, setSelectedAddress] = useState("-1")
  const [address, setAddress] = useState([]);

  const getAddresses = async () => {
    try {
      const res = await privateAxios.get("/addresses");
      const { data } = res;
      setAddress(data);

    } catch (error) {
      alert("error getting Address Data")
    }
  }

  const getProductDetails = async () => {
    // Call API to get product details using axios
    try {
      const response = await axios.get(`/products/${productId}`);

      setProduct(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getAddresses();
    getProductDetails();
  }, [])

  useEffect(() => {
    setSelectedAddressDetails(address.find((add) => add.id === selectedAddress))

  }, [selectedAddress])



  const handlePlaceOrder = async () => {
    try {
      const payload = {
        user: auth.userId,
        product: productId,
        address: selectedAddress,
        quantity: quantity
      }
      const res = await privateAxios.post("/orders", payload)
      alert("Product Order Successfully")
      navigate("/products", { replace: true })
    } catch (error) {
      alert("error placing Order")
    }
  }

  return (
    <>
      <ToastContainer />
      <Box display={'flex'} flexDirection={'row'} justifyContent={'center'} width={'100%'} bgcolor={'#fafafa'} height={'100%'} >
        <Box sx={{ width: '70%' }} marginTop={'3rem'} >
          <Stepper activeStep={activeStep} style={{ backgroundColor: '#fff', padding: '1.5rem' }}>
            {steps.map((label, index) => (
              <Step key={label} completed={completed.has(index)} >
                <StepLabel >{label}</StepLabel>
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
                      // options={[{ value: 0, label: "Select An Adress" }, ...address].map((address) => ({ value: address.id, label: address.address }))}
                      placeholder="Select..."
                      onChange={(e) => setSelectedAddress(e.target.value)}
                      value={selectedAddress}
                      style={{ width: "100%" }}
                    >
                      <MenuItem value="-1">Select An Address</MenuItem>
                      {
                        address.map((add) => {
                          return (
                            <MenuItem value={add.id}>{add.name},{add.street},{add.landmark},{add.city},{add.state},{add.zipcode}</MenuItem>
                          )
                        })
                      }

                    </Select>
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
                      fullWidth
                      onClick={handleSaveAddress}
                      style={{ marginTop: '1rem', backgroundColor: '#3f51b5' }}
                      disabled={selectedAddress === "-1" ? false : true}
                    >
                      Save Address
                    </Button>
                  </Box>
                </Box>
              )}
              {activeStep === 2 && (
                <ConfirmOrder address={selectedAddressDetails} order={product} quantity={quantity} placeOrder={handlePlaceOrder} />
              )}

              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, marginX: "auto", justifyContent: "center" }} maxWidth={'500px'}>
                <Button
                  color="inherit"
                  disabled={activeStep === 1}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>

                <Button variant='contained' style={{ backgroundColor: '#3f51b5', color: '#fff' }} onClick={() => activeStep === steps.length - 1 ? handlePlaceOrder() : handleNext()}>
                  {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
                </Button>
              </Box>
            </div>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default Order;
