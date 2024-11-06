import React from 'react'
import { Stepper, Step, StepLabel, Button, Typography, Box, TextField } from '@mui/material';
const ConfirmOrder = ({ address, order }) => {



    return (
        <div style={{display:"flex",flexDirection:"column",gap:"20px",justifyContent:"center"}}>
            
        <Box sx={{ display: "grid", gridTemplateColumns: "2fr 1fr", marginTop: "30px", background: "white", padding: "15px" }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "10px",borderRight:"1px solid black",padding:"10px" }} >
                <Typography sx={{ fontSize: "24px", fontWeight: "500" }}>
                    {order.name}
                </Typography>
                <p>
                    Quantity: 1
                </p>
                <p>
                    Category: {order.category}
                </p>
                <p>
                    Category: {order.description}
                </p>
                <h3 style={{color:"red"}}>
                    Total Price <span>$ {order.price}</span>
                </h3>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "10px",padding:"10px" }} >
                <Typography sx={{ fontSize: "24px", fontWeight: "500" }}>
                    Address Details:
                </Typography>
                <div style={{display:"flex",flexDirection:"column",gap:"5px"}}>
                <p>
                    {address.name},
                </p>
                <p>
                   Contact Number {address.contactNumber},
                </p>
                <p>

                    {address.street},
                </p>
                <p>

                    {address.landmark},
                </p>
                <p>

                    {address.city},
                </p>
                <p>

                    {address.state},
                </p>
                <p>
                    {address.zipcode}
                </p>
                </div>
               
            </Box>
        </Box>
        <div style={{display:"flex",gap:"10px",justifyContent:"center"}}>
            <a style={{padding:"7px"}}> Back</a>
            <a style={{background:"blue",color:"white",padding:"7px"}}> PLACE ORDER</a>
        </div>
        </div>
    )
}

export default ConfirmOrder
