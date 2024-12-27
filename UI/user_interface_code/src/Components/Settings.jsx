import * as React from 'react';
import UTILS from '../Common/Utils';
import ContainerBox from './Widgets/ContainerBox';
import DataCard from './Widgets/DataCard';
import Grid from '@mui/material/Grid2';
import { Box, Button, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import requestManager from '../Data/RequestManager';
import NETWORK_CONFIG from '../Data/Network/NetworkConfig';

export default function Settings(props) {
    document.title = 'Settings | ' + UTILS.TITLE;

    const [userName, setUserName] = React.useState("");
    const [userNameError, setUserNameError] = React.useState("");
    const [passKey, setPassKey] = React.useState("");
    const [passKeyError, setPassKeyError] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [emailError, setEmailError] = React.useState("");

    const handleUpdateEmail = () => {
        var providedEmail = email;
        providedEmail = providedEmail.trim();
        if(providedEmail.length == 0) {
            setEmailError("Email cannot be empty");
            return;
        }
        if(providedEmail.length > UTILS.MAX_INPUT_FIELD_CHARACTERS_COUNT) {
            setEmailError("Email should not exceed " + UTILS.MAX_INPUT_FIELD_CHARACTERS_COUNT + " characters.");
            return;
        }
        setEmailError("");
        props.setLoaderShow(true);
        requestManager.updateEmail(
            providedEmail,
            (data) => {
                props.setLoaderShow(false);
                window.location.reload();
            },
            (error) => {
                props.setLoaderShow(false);
                console.log(error);
                if(error.code == 0) {
                    props.setGlobalErrorMessage("Network Issue. Please check...") 
                    props.setErrorMessageShow(true);
                }
                else if(error.code == NETWORK_CONFIG.STATUS_CODES.UNAUTHORIZED) {
                    props.setGlobalErrorMessage("")
                    props.setErrorMessageShow(false);
                    props.setAuthShow(true);
                }
                else {
                    setEmailError(error.data.message)
                    props.setErrorMessageShow(false);
                    props.setAuthShow(false);
                }
            }
        );
    }

    const handleUpdatePassKey = () => {
        var providedPassKey = passKey;
        providedPassKey = providedPassKey.trim();
        if(providedPassKey.length == 0) {
            setPassKeyError("Pass Key cannot be empty");
            return;
        }
        if(providedPassKey.length > UTILS.MAX_INPUT_FIELD_CHARACTERS_COUNT) {
            setPassKeyError("Pass Key should not exceed " + UTILS.MAX_INPUT_FIELD_CHARACTERS_COUNT + " characters.");
            return;
        }
        setPassKeyError("");
        props.setLoaderShow(true);
        requestManager.updatePassKey(
            providedPassKey,
            (data) => {
                props.setLoaderShow(false);
                window.location.reload();
            },
            (error) => {
                props.setLoaderShow(false);
                console.log(error);
                if(error.code == 0) {
                    props.setGlobalErrorMessage("Network Issue. Please check...") 
                    props.setErrorMessageShow(true);
                }
                else if(error.code == NETWORK_CONFIG.STATUS_CODES.UNAUTHORIZED) {
                    props.setGlobalErrorMessage("")
                    props.setErrorMessageShow(false);
                    props.setAuthShow(true);
                }
                else {
                    setPassKeyError(error.data.message)
                    props.setErrorMessageShow(false);
                    props.setAuthShow(false);
                }
            }
        );
    }

    const handleUpdateName = () => {
        var uName = userName;
        uName = uName.trim();
        if(uName.length == 0) {
            setUserNameError("Name cannot be empty");
            return;
        }
        if(uName.length > UTILS.MAX_INPUT_FIELD_CHARACTERS_COUNT) {
            setUserNameError("Name should not exceed " + UTILS.MAX_INPUT_FIELD_CHARACTERS_COUNT + " characters.");
            return;
        }
        setUserNameError("");
        props.setLoaderShow(true);
        requestManager.updateUserName(
            uName,
            (data) => {
                props.setLoaderShow(false);
                window.location.reload();
            },
            (error) => {
                props.setLoaderShow(false);
                console.log(error);
                if(error.code == 0) {
                    props.setGlobalErrorMessage("Network Issue. Please check...") 
                    props.setErrorMessageShow(true);
                }
                else if(error.code == NETWORK_CONFIG.STATUS_CODES.UNAUTHORIZED) {
                    props.setGlobalErrorMessage("")
                    props.setErrorMessageShow(false);
                    props.setAuthShow(true);
                }
                else {
                    setUserNameError(error.data.message)
                    props.setErrorMessageShow(false);
                    props.setAuthShow(false);
                }
            }
        );
    };

    React.useEffect(() => {
        requestManager.fetchSettingData(
            (data) =>{
                
            }, 
            (error) => {
                console.log(error);
                if(error.code == 0) {
                    props.setGlobalErrorMessage("Network Issue. Please check...") 
                    props.setErrorMessageShow(true);
                }
                else {
                    props.setAuthShow(true);
                }
            }
        );
    }, []);

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
                                        description="Provide Cloud API key for backup. Not Implemented yet."
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
                                                <Typography style={{color: UTILS.ERROR_TEXT_COLOR}}>
                                                    {userNameError}
                                                </Typography>
                                                <TextField
                                                    id="standard-basic"
                                                    label="Your Name"
                                                    variant="standard"
                                                    value={userName}
                                                    onChange={(e) => {
                                                        if(e.target.value.length > UTILS.MAX_INPUT_FIELD_CHARACTERS_COUNT) {
                                                            setUserNameError("Name should not exceed " + UTILS.MAX_INPUT_FIELD_CHARACTERS_COUNT + " characters.");
                                                            return;
                                                        }
                                                        setUserNameError("");
                                                        setUserName(e.target.value)
                                                    }}
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
                                                        onClick={handleUpdateName}
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
                                                <Typography style={{color: UTILS.ERROR_TEXT_COLOR}}>
                                                    {passKeyError}
                                                </Typography>
                                                <TextField
                                                    id="standard-basic"
                                                    label="Your new passkey"
                                                    variant="standard"
                                                    type='password'
                                                    value={passKey}
                                                    onChange={(e) => {
                                                        if(e.target.value.length > UTILS.MAX_INPUT_FIELD_CHARACTERS_COUNT) {
                                                            setPassKeyError("Passkey should not exceed " + UTILS.MAX_INPUT_FIELD_CHARACTERS_COUNT + " characters.");
                                                            return;
                                                        }
                                                        setPassKeyError("");
                                                        setPassKey(e.target.value)
                                                    }}
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
                                                        onClick={handleUpdatePassKey}
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
                    <Grid item size={{ lg: 6, md: 6, sm: 12 }}>
                        <Grid container spacing={2}>
                            <Grid item size={{ lg: 6, md: 6, sm: 12 }}>
                                <ContainerBox
                                    children={
                                        <>
                                            <DataCard
                                                title="Change Email"
                                                description="Provide your email to update"
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
                                                <Typography style={{color: UTILS.ERROR_TEXT_COLOR}}>
                                                    {emailError}
                                                </Typography>
                                                <TextField
                                                    id="standard-basic"
                                                    label="Your Email"
                                                    variant="standard"
                                                    value={email}
                                                    onChange={(e) => {
                                                        if(e.target.value.length > UTILS.MAX_INPUT_FIELD_CHARACTERS_COUNT) {
                                                            setEmailError("Email should not exceed " + UTILS.MAX_INPUT_FIELD_CHARACTERS_COUNT + " characters.");
                                                            return;
                                                        }
                                                        setEmailError("");
                                                        setEmail(e.target.value)
                                                    }}
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
                                                        onClick={handleUpdateEmail}
                                                    >
                                                        Update Email
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
