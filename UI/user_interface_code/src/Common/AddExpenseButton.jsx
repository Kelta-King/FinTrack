import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import AddCircleOutlineTwoToneIcon from '@mui/icons-material/AddCircleOutlineTwoTone';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddExpenseButton() {
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

    const handleSave = () => {
        handleClose();
    };

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen} startIcon={<AddCircleOutlineTwoToneIcon />}>
                Expense
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="Add ExpenseDialog"
            >
                <DialogTitle>{"Expense Details"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="add-expense-dialog">
                        Let Google help apps determine location. This means
                        sending anonymous location data to Google, even when no
                        apps are running.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSave}>Save</Button>
                    <Button onClick={handleCancel} sx={{
                        backgroundColor:"gray",
                    }}>Cancell</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
