import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { PrivateComponent } from 'api/axios';
import useAuth from 'hooks/useAuth';

const ProductCard = ({ data }) => {
    const navigate = useNavigate();
    const { auth } = useAuth();
    const privateAxios = PrivateComponent();
    const [open, setOpen] = useState(false);

    const moveToDetailPage = (productId) => {
        navigate(`/productdetail/${productId}`, { replace: false });
    }

    const handleEdit = (productId) => {
        navigate(`/update-product/${productId}`, { replace: false });
    }

    const handleDelete = async (productId) => {
        try {
            await privateAxios.delete(`/products/${productId}`);
            window.location.reload();
            setOpen(false);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Card sx={{ width: 300, marginBottom: '1rem' }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="200"
                    image={data.imageUrl}
                    alt={data.name}
                />
                <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography gutterBottom variant="h6" component="div" sx={{
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            maxWidth: '70%'
                        }}>
                            {data.name}
                        </Typography>
                        <Typography gutterBottom variant="h6" color="text.primary">
                            ₹{data.price}
                        </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {data.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions sx={{ justifyContent: 'space-between' }}>
                <Button variant='contained' size="small" color="primary"
                    onClick={() => moveToDetailPage(data.id)}
                >
                    Buy
                </Button>
                {
                    auth.isAdmin &&
                    <Box display="flex" gap={'12px'} justifyContent="space-between" alignItems="center">
                        <span onClick={() => handleEdit(data.id)}>
                            <Edit sx={{ color: '#757575' }} />
                        </span>
                        <span onClick={handleClickOpen}>
                            <Delete sx={{ color: '#757575' }} />
                        </span>
                    </Box>

                }
            </CardActions>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Confirm Deletion of product!"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete the product?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="outlined" color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => handleDelete(data.id)} variant="contained" color="primary" autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
};

export default ProductCard;
