import * as React from 'react';

import Tooltip from '@mui/material/Tooltip';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import { Link } from '@mui/material';

const options = [
    {label: 'Account', url: '/account'}, 
    {label: 'Preferences', url: '/preferences'}, 
    {label: 'Sign Out', url: '/user-signout'}
];

export default function UserOptions(props) {
    
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return(
        <>
            <Tooltip title="Options">
                <IconButton
                    onClick={handleOpenUserMenu}
                    sx={{ p: 0 }}
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle fontSize="large" />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {options.map((option) => (
                    <MenuItem key={option.label} onClick={handleCloseUserMenu}>
                        <Link href={option.url} underline="none">
                            <Typography sx={{ textAlign: 'center' }}>
                                {option.label}
                            </Typography>
                        </Link>
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}
