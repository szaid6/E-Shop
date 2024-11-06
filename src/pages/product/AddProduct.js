import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import CreatableSelect from 'react-select/creatable';
import axios from 'api/axios';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    manufacturer: '',
    availableItems: '',
    price: '',
    imageUrl: '',
    description: '',
  });

  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/products/categories');
        setCategories(response.data.map(category => ({ value: category, label: category })));
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCategoryChange = (newValue) => {
    setFormData({
      ...formData,
      category: newValue ? newValue.value : '',
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.manufacturer) newErrors.manufacturer = 'Manufacturer is required';
    if (!formData.availableItems || isNaN(formData.availableItems)) newErrors.availableItems = 'Available Items must be a number';
    if (!formData.price || isNaN(formData.price)) newErrors.price = 'Price must be a number';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.post('/products', formData);
      alert('Product added successfully');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" width="100%" maxWidth="500px" margin="auto" marginTop="2rem">
      <Typography variant="h4" marginBottom="2rem">Add Product</Typography>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <TextField
          label="Name *"
          name="name"
          variant="outlined"
          fullWidth
          value={formData.name}
          onChange={handleInputChange}
          error={!!errors.name}
          helperText={errors.name}
          margin="normal"
        />
        <CreatableSelect
          isClearable
          options={categories}
          onChange={handleCategoryChange}
          placeholder="Category *"
          value={categories.find(option => option.value === formData.category)}
          styles={{
            control: (base) => ({
              ...base,
              marginTop: '16px',
              marginBottom: '8px',
            }),
          }}
        />
        {errors.category && <Typography color="error" variant="body2">{errors.category}</Typography>}
        <TextField
          label="Manufacturer *"
          name="manufacturer"
          variant="outlined"
          fullWidth
          value={formData.manufacturer}
          onChange={handleInputChange}
          error={!!errors.manufacturer}
          helperText={errors.manufacturer}
          margin="normal"
        />
        <TextField
          label="Available Items *"
          name="availableItems"
          variant="outlined"
          fullWidth
          value={formData.availableItems}
          onChange={handleInputChange}
          error={!!errors.availableItems}
          helperText={errors.availableItems}
          margin="normal"
        />
        <TextField
          label="Price *"
          name="price"
          variant="outlined"
          fullWidth
          value={formData.price}
          onChange={handleInputChange}
          error={!!errors.price}
          helperText={errors.price}
          margin="normal"
        />
        <TextField
          label="Image URL"
          name="imageUrl"
          variant="outlined"
          fullWidth
          value={formData.imageUrl}
          onChange={handleInputChange}
          margin="normal"
        />
        <TextField
          label="Product Description"
          name="description"
          variant="outlined"
          fullWidth
          value={formData.description}
          onChange={handleInputChange}
          margin="normal"
        />
        <Button variant="contained" color="primary" type="submit" fullWidth style={{ marginTop: '1rem' }}>
          Add Product
        </Button>
      </form>
    </Box>
  );
};

export default AddProduct;
