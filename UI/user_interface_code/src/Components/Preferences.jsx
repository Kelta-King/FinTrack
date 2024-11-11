import * as React from 'react';
import UTILS from '../Common/Utils';
import ContainerBox from './Widgets/ContainerBox';
import DataCard from './Widgets/DataCard';
import Grid from '@mui/material/Grid2';
import { Box, Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

export default function Preferences(props) {
    document.title = 'Preferences | ' + UTILS.TITLE;
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item size={{ lg: 12, md: 12, sm: 12 }}>
                        <Grid container spacing={2}>
                            <Grid item size={{ lg: 6, md: 6, sm: 12 }}>
                                <ContainerBox
                                    children={
                                        <>
                                            <DataCard
                                                title="Change currency"
                                                description="Provide your currency preference"
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
                                                    id="standard-select-currency"
                                                    select
                                                    label="Select"
                                                    defaultValue="INR"
                                                    helperText="Please select your currency"
                                                    variant="standard"
                                                    fullWidth
                                                >
                                                    {UTILS.CURRENCIES.map(
                                                        (option) => (
                                                            <MenuItem
                                                                key={
                                                                    option.value
                                                                }
                                                                value={
                                                                    option.value
                                                                }
                                                            >
                                                                {option.label} - {option.value}
                                                            </MenuItem>
                                                        )
                                                    )}
                                                </TextField>
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
                                                        Change Currency
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
                                        <></>
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
