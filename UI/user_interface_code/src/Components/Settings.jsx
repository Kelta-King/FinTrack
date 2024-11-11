import * as React from 'react';
import UTILS from '../Common/Utils';
import ContainerBox from './Widgets/ContainerBox';
import DataCard from './Widgets/DataCard';
import Grid from '@mui/material/Grid2';
import { Box, Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

export default function Settings(props) {
    document.title = 'Settings | ' + UTILS.TITLE;
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item size={{ lg: 6, md: 6, sm: 12 }}>
                        <ContainerBox
                            children={
                                <>
                                    <DataCard
                                        title="Provide API key for backup"
                                        description="Provide Cloud API key for backup"
                                        sx={{
                                            pb: 0
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            mr: 2,
                                            ml: 2,
                                            mt: 1
                                        }}
                                    >
                                        <TextField
                                            id="standard-basic"
                                            label="Backup API key"
                                            variant="standard"
                                            fullWidth
                                        />
                                        <Box
                                            sx={{
                                                mt: 3,
                                                mb: 3
                                            }}
                                        >
                                            <Button
                                                variant="contained"
                                                color="primary"
                                            >
                                                Update Key
                                            </Button>
                                        </Box>
                                    </Box>
                                </>
                            }
                        />
                    </Grid>
                    <Grid item size={{ lg: 6, md: 6, sm: 12 }}>
                        <Grid container spacing={2}>
                            <Grid item size={{ lg: 6, md: 6, sm: 12 }}>
                                <ContainerBox
                                    children={
                                        <>
                                            <DataCard
                                                title="Change name"
                                                description="Provide your name to update"
                                                sx={{
                                                    pb: 0
                                                }}
                                            />
                                            <Box
                                                sx={{
                                                    mr: 2,
                                                    ml: 2,
                                                    mt: 1
                                                }}
                                            >
                                                <TextField
                                                    id="standard-basic"
                                                    label="Your Name"
                                                    variant="standard"
                                                    fullWidth
                                                />
                                                <Box
                                                    sx={{
                                                        mt: 3,
                                                        mb: 3
                                                    }}
                                                >
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                    >
                                                        Update Name
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </>
                                    }
                                />
                            </Grid>
                            <Grid item size={{ lg: 6, md: 6, sm: 12 }}>
                                <ContainerBox
                                    children={
                                        <>
                                            <DataCard
                                                title="Change passkey"
                                                description="Provide your new passkey"
                                                sx={{
                                                    pb: 0
                                                }}
                                            />
                                            <Box
                                                sx={{
                                                    mr: 2,
                                                    ml: 2,
                                                    mt: 1
                                                }}
                                            >
                                                <TextField
                                                    id="standard-basic"
                                                    label="Your new passkey"
                                                    variant="standard"
                                                    type='password'
                                                    fullWidth
                                                />
                                                <Box
                                                    sx={{
                                                        mt: 3,
                                                        mb: 3
                                                    }}
                                                >
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                    >
                                                        Update Passkey
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </>
                                    }
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}
