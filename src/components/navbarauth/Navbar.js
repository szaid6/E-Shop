import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from 'react-redux';
import { setLogout } from 'state/AppState';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import useAuth from 'hooks/useAuth';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const dispatch = useDispatch();
    const { auth } = useAuth()
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    }

    const handleLogout = () => {
        dispatch(setLogout());
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar style={{ backgroundColor: '#3f51b5', display: 'flex', justifyContent: 'space-between' }}>
                    {/* Logo Section */}

                    <Box display='flex' flexDirection='row' alignItems='center'>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{ mr: 2 }}
                        >
                            <ShoppingCartIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block' } }}
                        >
                            upGrad E-Shop
                        </Typography>
                    </Box>

                    {/* Other Buttons */}
                    <Box display='flex' gap={'2rem'} flexDirection='row' alignItems='center'>
                        {/* Login link */}
                        <Link
                            to='/login'
                            style={{ textDecoration: 'underline', color: 'white', fontSize: '1rem' }}
                        >Login</Link>
                        {/* Sign Up */}
                        <Link
                            to='/signup'
                            style={{ textDecoration: 'underline', color: 'white', fontSize: '1rem' }}
                        >Sign Up</Link>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Navbar
