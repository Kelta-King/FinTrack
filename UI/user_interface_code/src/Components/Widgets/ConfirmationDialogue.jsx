import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmationDialogue(props) {

    const handleClose = () => {
        props.setConfirmShow(false);
    };

    const handleCancel = () => {
        handleClose();
    };

    const handleAgree = () => {
        props.callback();
        handleClose();
    };

    return (
        <React.Fragment>
            <Dialog
                open={props.confirmShow}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="Confirmation"
            >
                <DialogTitle>{props.confirmation_title ? props.confirmation_title : "Are you sure?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="confirmation-dialog">
                        <DialogContentText>
                            {props.confirmation_message ? props.confirmation_message : "Press Agree to confirm..."}
                        </DialogContentText>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick={handleAgree}
                        sx={{
                            backgroundColor: 'gray'
                        }}
                    >Agree</Button>
                    <Button
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
