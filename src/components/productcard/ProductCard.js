import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import { Box } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

const ProductCard = ({ data }) => {
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
                            maxWidth: '70%' // Adjust this as needed
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
                <Button variant='contained' size="small" color="primary">
                    Buy
                </Button>
                <Box display="flex" gap={'12px'} justifyContent="space-between" alignItems="center">
                    {/* Edit */}
                    <span>
                        <Edit
                            sx={{ color: '#757575' }}
                        />
                    </span>
                    {/* delete */}
                    <span>
                        <Delete
                            sx={{ color: '#757575' }}
                        />
                    </span>
                </Box>
            </CardActions>
        </Card>
    );
};

export default ProductCard;