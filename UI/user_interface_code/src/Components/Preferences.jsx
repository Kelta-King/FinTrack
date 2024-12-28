import * as React from 'react';
import UTILS from '../Common/Utils';
import ContainerBox from './Widgets/ContainerBox';
import DataCard from './Widgets/DataCard';
import Grid from '@mui/material/Grid2';
import { Box, Button, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import requestManager from '../Data/RequestManager';
import ConfirmationDialogue from './Widgets/ConfirmationDialogue';

export default function Preferences(props) {
    document.title = 'Preferences | ' + UTILS.TITLE;

    const [confirmShow, setConfirmShow] = React.useState(false);
    const [successMessage, setSuccessMessage] = React.useState("");

    React.useEffect(() => {
        props.setLoaderShow(true);
        requestManager.fetchPreferencesData(
            (data) => {
                props.setLoaderShow(false);
                console.log(data);
            },
            (error) => {
                props.setLoaderShow(false);
                console.log(error);
                if (error.code == 0) {
                    props.setGlobalErrorMessage("Network Issue. Please check...")
                    props.setErrorMessageShow(true);
                }
                else {
                    props.setAuthShow(true);
                }
            }
        );
    }, []);

    const handleResetToEmpty = () => {
        props.setLoaderShow(true);
        requestManager.resetDBRequest(
            (data) => {
                props.setLoaderShow(false);
                console.log(data);
                setSuccessMessage(data.message);
            },
            (error) => {
                props.setLoaderShow(false);
                console.log(error);
                props.setGlobalErrorMessage("Failed to reset the Data to empty. Returned: " + error.data.message)
                props.setErrorMessageShow(true);
            }
        )
    }

    return (
        <>
            <ConfirmationDialogue
                confirmShow={confirmShow}
                confirmation_message={"Please confirm that you want to reset the Data to empty..."}
                setConfirmShow={setConfirmShow}
                callback={() => {
                    handleResetToEmpty();
                }}
            />
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
                                        <>
                                            <DataCard
                                                title="Reset Database"
                                                description="Reset the database to empty. It will delete all the records. Be cautious..."
                                                sx={{
                                                    pb: 0
                                                }}
                                            />
                                            <Typography
                                                sx={{
                                                    fontSize: 18,
                                                    color: UTILS.SUCCESS_TEXT_COLOR,
                                                    m: 2,
                                                    mt: 0
                                                }}
                                            >
                                                {successMessage}
                                            </Typography>
                                            <Box
                                                sx={{
                                                    m: 2
                                                }}
                                            >
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => {
                                                        setConfirmShow(true);
                                                    }}
                                                >
                                                    RESET DATABASE TO EMPTY
                                                </Button>
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
