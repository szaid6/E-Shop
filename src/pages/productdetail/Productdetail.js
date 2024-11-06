import React, { useEffect, useState } from 'react'
import './Productdetail.css'
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'api/axios';

const Productdetail = () => {
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

    // get id from the URL
    const { productId } = useParams();

    // get product details from the API using the productId
    const getProductDetails = async () => {
        // Call API to get product details using axios
        try {
            const response = await axios.get(`/products/${productId}`);
            console.log(response.data);
            setProduct(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getProductDetails();
    }, []);


    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
    };

    const handlePlaceOrder = () => {
        navigate(`/order/${productId}`);

    };

    return (
        <div className="page">
            <div className="product-card">
                <img
                    src={product?.image || 'https://via.placeholder.com/150'}
                    alt={product?.name}
                    className="product-image"
                />
                <div className="product-details">
                    <Box display='flex' alignItems='center'>
                        <Typography variant="h3">{product?.name}</Typography>
                        <span className="quantity-badge">Available Quantity : {product?.availableItems}</span>
                    </Box>
                    <p className="category">Category: <strong>{product?.category}</strong></p>
                    <p className="description">{product?.description}</p>
                    <p className="price">₹ {product?.price}</p>

                    <div className="order-section">
                        <TextField
                            label="Enter Quantity *"
                            id="quantity"
                            type="number"
                            value={quantity}
                            onChange={handleQuantityChange}
                        />

                        <Button
                            variant="contained"
                            // color 4050b5
                            style={{ backgroundColor: '#4050b5', marginTop: '1rem', width: '150px' }}
                            onClick={handlePlaceOrder}>
                            Place Order
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Productdetail