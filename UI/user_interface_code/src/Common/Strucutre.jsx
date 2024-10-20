import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SideBar from './SideBar';
import UserOptions from './UserOptions';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddExpenseButton from './AddExpenseButton';
import AddAutoDebitButton from './AddAutoDebitButton';
import Dashboard from '../Components/Dashboard';
import Transactions from '../Components/Transactions';
import CustomView from '../Components/CustomView';
import AutoDebits from '../Components/AutoDebit';
import Preferences from '../Components/Preferences';
import Settings from '../Components/Settings';
import Account from '../Components/Account';

const drawerWidth = 240;

export default function Strucutre(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const container =
        window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` }
                }}
            >
                <Toolbar disableGutters>
                    <IconButton
                        color="inherit"
                        aria-label="Open Menu"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ ml:2, mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{
                            display: { xs: 'flex' },
                            flexGrow: 1,
                            marginLeft: 2
                        }}
                    >
                        <AddExpenseButton />
                        <div style={{padding: 8}}></div>
                        <AddAutoDebitButton />
                    </Typography>
                    <Box sx={{ flexGrow: 0, marginRight: 2 }}>
                        <UserOptions />
                    </Box>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="Sidenav"
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth
                        }
                    }}
                >
                    <SideBar />
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth
                        }
                    }}
                    open
                >
                    <SideBar />
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    padding: "32px 14px",
                    width: { sm: `calc(100% - ${drawerWidth}px)` }
                }}
            >
                <Toolbar />
                <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/transactions" element={<Transactions />} />
                    <Route path="/custom-view" element={<CustomView />} />
                    <Route path="/auto-debits" element={<AutoDebits />} />
                    <Route path="/preferences" element={<Preferences />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/account" element={<Account /> } />
                </Routes>
                </BrowserRouter>
            </Box>
        </Box>
    );
}
