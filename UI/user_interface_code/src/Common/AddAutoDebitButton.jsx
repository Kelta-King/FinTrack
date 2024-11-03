import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import AddCircleOutlineTwoToneIcon from '@mui/icons-material/AddCircleOutlineTwoTone';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid2';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import UTILS from './Utils';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddAutoDebitButton() {
    const [open, setOpen] = React.useState(false);
    const [autoDebitCategoryList, setAutoDebitCategoryList] = React.useState(
        []
    );

    const [autoDebitTitle, setAutoDebitTitle] = React.useState('');
    const [autoDebitDescription, setAutoDebitDescription] = React.useState('');
    const [autoDebitType, setAutoDebitType] = React.useState('');
    const [autoDebitCategory, setAutoDebitCategory] = React.useState('');
    const [autoDebitAmount, setAutoDebitAmount] = React.useState(0);
    const [autoDebitFrequency, setAutoDebitFrequency] = React.useState(1);
    const [autoDebitDay, setAutoDebitDay] = React.useState(1);

    const handleAutoDebitTypeChange = (event) => {
        const categoriesList = [];
        if (UTILS.EXPENSES_CATEGORIES[event.target.value] !== undefined) {
            UTILS.EXPENSES_CATEGORIES[event.target.value].map(
                (expenseCategory) => {
                    categoriesList.push(expenseCategory);
                }
            );
        }
        console.log(categoriesList);
        setAutoDebitType(event.target.value);
        setAutoDebitCategory('');
        setAutoDebitCategoryList(categoriesList);
    };

    const handleAutoDebitCategoryChange = (event) => {
        setAutoDebitCategory(event.target.value);
    };

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
            <Button
                variant="outlined"
                onClick={handleClickOpen}
                startIcon={<AddCircleOutlineTwoToneIcon />}
            >
                Auto Debit
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="Add AutoDebitDialog"
            >
                <DialogTitle>{'Auto Debit Details'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="add-auto-debit-dialog">
                        Provide details of the new Auto Debit. It will
                        automatically add expense according to the specified
                        information.
                        <TextField
                            autoFocus
                            margin="dense"
                            id="auto_debit_title"
                            name="auto_debit_title"
                            label="Title"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={autoDebitTitle}
                            onChange={(e) => setAutoDebitTitle(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            id="auto_debit_description"
                            name="auto_debit_description"
                            label="Description"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={autoDebitDescription}
                            onChange={(e) =>
                                setAutoDebitDescription(e.target.value)
                            }
                        />
                        <Grid container spacing={2}>
                            <Grid item size={{ lg: 6, md: 6, sm: 6 }}>
                                <FormControl fullWidth margin="dense">
                                    <InputLabel id="auto-debit-type-helper-label">
                                        Auto Debit Type
                                    </InputLabel>
                                    <Select
                                        labelId="auto-debit-type-helper-label"
                                        id="auto-debit-type-select-helper"
                                        value={autoDebitType}
                                        label="Age"
                                        onChange={handleAutoDebitTypeChange}
                                        variant="standard"
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {Object.keys(
                                            UTILS.EXPENSES_CATEGORIES
                                        ).map((value) => {
                                            return (
                                                <MenuItem value={value}>
                                                    {' '}
                                                    {value}{' '}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item size={{ lg: 6, md: 6, sm: 6 }}>
                                <FormControl fullWidth margin="dense">
                                    <InputLabel id="auto-debit-category-helper-label">
                                        Auto Debit Category
                                    </InputLabel>
                                    <Select
                                        labelId="auto-debit-category-helper-label"
                                        id="auto-debit-category-select-helper"
                                        value={autoDebitCategory}
                                        label="Auto Debit Category"
                                        onChange={handleAutoDebitCategoryChange}
                                        variant="standard"
                                        renderValue={(selected) => {
                                            const selectedItem =
                                                autoDebitCategoryList.find(
                                                    (item) =>
                                                        item.title === selected
                                                );
                                            return selectedItem
                                                ? selectedItem.title
                                                : '';
                                        }}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {autoDebitCategoryList.map((value) => {
                                            return (
                                                <MenuItem value={value.title}>
                                                    {' '}
                                                    {value.icon}
                                                    <span
                                                        style={{
                                                            width: '10px'
                                                        }}
                                                    ></span>{' '}
                                                    {value.title}{' '}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <TextField
                            margin="dense"
                            id="auto_debit_amount"
                            name="auto_debit_amount"
                            label="Amount (₹)"
                            type="number"
                            fullWidth
                            variant="standard"
                            value={autoDebitAmount}
                            onChange={(e) => setAutoDebitAmount(e.target.value)}
                        />
                        <Grid container spacing={2}>
                            <Grid item size={{ lg: 6, md: 6, sm: 6 }}>
                                <TextField
                                    margin="dense"
                                    id="auto_debit_frequency"
                                    name="auto_debit_frequency"
                                    label="Frequecy (Month)"
                                    type="number"
                                    fullWidth
                                    variant="standard"
                                    value={autoDebitFrequency}
                                    onChange={(e) => {
                                        if(e.target.value < 0) return;
                                        setAutoDebitFrequency(e.target.value)
                                    }}
                                />
                            </Grid>
                            <Grid item size={{ lg: 6, md: 6, sm: 6 }}>
                                <TextField
                                    margin="dense"
                                    id="auto_debit_day"
                                    name="auto_debit_day"
                                    label="Transaction Day"
                                    type="number"
                                    fullWidth
                                    variant="standard"
                                    value={autoDebitDay}
                                    onChange={(e) => {
                                        if(e.target.value <= 0 || e.target.value > 28) return;
                                        setAutoDebitDay(e.target.value)
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSave}>Save</Button>
                    <Button
                        onClick={handleCancel}
                        sx={{
                            backgroundColor: 'gray'
                        }}
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
