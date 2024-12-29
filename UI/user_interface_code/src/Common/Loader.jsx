import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Loader(props) {
    return (
        <Dialog
            open={props.loaderShow}
            TransitionComponent={Transition}
            keepMounted
            aria-describedby="alert-dialog-slide-description"
            sx={{
                zIndex: '1700 !important',
            }}
        >
            <DialogContent>
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            </DialogContent>
        </Dialog>
    );
}
