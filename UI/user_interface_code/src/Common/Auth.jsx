import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import requestManager from '../Data/RequestManager';
import UTILS from './Utils';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AuthComponent(props) {

    const [errorMessage, setErrorMessage] = React.useState("");
    const [passKey, setPassKey] = React.useState("");

    const handleClickOpen = () => {
        props.setAuthShow(true);
    };

    const handleClose = () => {
        props.setAuthShow(false);
    };

    const handleCancel = () => {
        handleClose();
    };

    const handleSubmit = () => {
        if (passKey.length == 0) {
            setErrorMessage("Pass Key is required.");
            return;
        }
        var providedPassKey = passKey;
        providedPassKey = providedPassKey.trim();
        if (providedPassKey.length > UTILS.MAX_SIGNIN_FIELD_CHARACTERS_COUNT) {
            setErrorMessage("Pass Key should not exceed " + UTILS.MAX_SIGNIN_FIELD_CHARACTERS_COUNT + " characters.");
            return;
        }
        requestManager.signInUser(providedPassKey, (response) => {
            window.location.reload();
        }, (error) => {
            console.log(error);
            setErrorMessage(error.data.message);
        });
    };

    return (
        <React.Fragment>
            <Dialog
                open={props.authShow}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="Provide Pass Key"
                sx={{
                    zIndex: '1500 !important'
                }}
            >
                <DialogTitle>{'Provide Pass Key'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="pass-key-dialog">
                        <DialogContentText>
                            To access the data of the account, enter your pass key. <br />
                            <span style={{
                                fontSize: 12,
                                fontWeight: 700
                            }}>If this is the first time you are entering, then it will set your pass key.</span>
                        </DialogContentText>
                        <DialogContentText
                            style={{
                                color: UTILS.ERROR_TEXT_COLOR
                            }}
                        >
                            {errorMessage}
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="pass_key"
                            name="pass_key"
                            label="Enter your pass key..."
                            type="password"
                            fullWidth
                            variant="standard"
                            value={passKey}
                            onChange={(e) => {
                                if (e.target.value.length > UTILS.MAX_SIGNIN_FIELD_CHARACTERS_COUNT) {
                                    setErrorMessage("Pass Key should not exceed " + UTILS.MAX_SIGNIN_FIELD_CHARACTERS_COUNT + " characters.");
                                }
                                else {
                                    setErrorMessage("");
                                    setPassKey(e.target.value);
                                }
                            }
                            }
                        />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit}>Submit</Button>
                    {/* <Button
                        onClick={handleCancel}
                        sx={{
                            backgroundColor: 'gray'
                        }}
                    >
                        Cancell
                    </Button> */}
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
