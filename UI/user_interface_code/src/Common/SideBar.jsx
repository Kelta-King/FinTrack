import { Box } from '@mui/material';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardTwoToneIcon from '@mui/icons-material/DashboardTwoTone';
import CurrencyExchangeTwoToneIcon from '@mui/icons-material/CurrencyExchangeTwoTone';
import TuneTwoToneIcon from '@mui/icons-material/TuneTwoTone';
import AssuredWorkloadTwoToneIcon from '@mui/icons-material/AssuredWorkloadTwoTone';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import AutoAwesomeTwoToneIcon from '@mui/icons-material/AutoAwesomeTwoTone';
import { Link } from '@mui/material';

const NavListItem = [
    {
        icon: <DashboardTwoToneIcon />,
        label: 'Dashboard',
        url: '/dashboard'
    },
    {
        icon: <CurrencyExchangeTwoToneIcon />,
        label: 'Transactions',
        url: '/transactions'
    },
    {
        icon: <TuneTwoToneIcon />,
        label: 'Custom View',
        url: '/custom-view'
    },
    {
        icon: <AssuredWorkloadTwoToneIcon />,
        label: 'Auto Debits',
        url: '/auto-debits'
    }
];

const UserListItems = [
    {
        icon: <AutoAwesomeTwoToneIcon />,
        label: 'Preferences',
        url: '/preferences'
    },
    {
        icon: <SettingsTwoToneIcon />,
        label: 'Settings',
        url: '/settings'
    }
];

export default function SideBar(props) {
    return (
        <div>
            <center>
                <Box
                    component="img"
                    sx={{
                        width: 100,
                        margin: '16px 0'
                    }}
                    alt="FinTrack Logo"
                    src="Logos/Logo.png"
                />
            </center>
            <Divider />
            <List>
                {NavListItem.map((item) => (
                    <Link href={item.url} underline="none">
                        <ListItem key={item.label} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.label} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}
            </List>
            <Divider />
            <List>
                {UserListItems.map((item) => (
                    <Link href={item.url} underline="none">
                        <ListItem key={item.label} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.label} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}
            </List>
        </div>
    );
}
