import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import requestManager from '../Data/RequestManager';
import ErrorTwoToneIcon from '@mui/icons-material/ErrorTwoTone';
import UTILS from './Utils';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ErrorMessage(props) {

    const handleClickOpen = () => {
        props.setErrorMessageShow(true);
    };

    const handleClose = () => {
        props.setErrorMessageShow(false);
    };

    return (
        <React.Fragment>
            <Dialog
                open={props.errorMessageShow}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="Error Message Pop Up"
                sx={{
                    zIndex: '1600 !important'
                }}
            >
                <DialogContent>
                    <DialogContentText id="pass-key-dialog">
                        <DialogContentText
                            style={{
                                color: UTILS.ERROR_TEXT_COLOR,
                                fontSize: 18,
                                textAlign: 'center'
                            }}
                        >
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                            }}>
                                <ErrorTwoToneIcon fontSize='large' /> 
                                <span style={{paddingLeft: 12}}>{props.globalErrorMessage}</span>
                            </div>
                        </DialogContentText>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}
