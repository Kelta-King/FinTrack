import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AuthComponent() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCancel = () => {
        handleClose();
    };

    const handleSubmit = () => {
        handleClose();
    };

    return (
        <React.Fragment>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="Provide Access Token"
            >
                <DialogTitle>{'Provide Access Token'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="access-token-dialog">
                        <DialogContentText>
                            To access the data of the account, enter your access token
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="access_token"
                            name="access_token"
                            label="Access Token"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit}>Submit</Button>
                    <Button
                        onClick={handleCancel}
                        sx={{
                            backgroundColor: 'gray'
                        }}
                    >
                        Cancell
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
