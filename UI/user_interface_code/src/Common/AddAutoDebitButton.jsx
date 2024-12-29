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
import ConfirmationDialogue from '../Components/Widgets/ConfirmationDialogue';
import { Typography } from '@mui/material';
import requestManager from '../Data/RequestManager';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddAutoDebitButton(props) {
    const [open, setOpen] = React.useState(false);
    const [autoDebitCategoryList, setAutoDebitCategoryList] = React.useState(
        []
    );

    const [confirmShow, setConfirmShow] = React.useState(false);
    const [autoDebitTitle, setAutoDebitTitle] = React.useState('');
    const [autoDebitDescription, setAutoDebitDescription] = React.useState('');
    const [autoDebitType, setAutoDebitType] = React.useState('');
    const [autoDebitCategory, setAutoDebitCategory] = React.useState('');
    const [autoDebitAmount, setAutoDebitAmount] = React.useState(0);
    const [autoDebitFrequency, setAutoDebitFrequency] = React.useState(1);
    const [autoDebitDay, setAutoDebitDay] = React.useState(1);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [successMessage, setSuccessMessage] = React.useState("");

    const handleAutoDebitTypeChange = (event) => {
        const categoriesList = [];
        if (UTILS.EXPENSES_CATEGORIES[event.target.value] !== undefined) {
            UTILS.EXPENSES_CATEGORIES[event.target.value].map(
                (expenseCategory) => {
                    categoriesList.push(expenseCategory);
                }
            );
        }
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
        var data = {
            autoDebitTitle: autoDebitTitle,
            autoDebitDescription: autoDebitDescription,
            autoDebitType: autoDebitType,
            autoDebitCategory: autoDebitCategory,
            autoDebitAmount: autoDebitAmount,
            autoDebitFrequency: autoDebitFrequency,
            autoDebitDay: autoDebitDay,
        };

        if(data.autoDebitTitle == "") {
            setErrorMessage("Title is required.");
            return;
        }

        if(data.autoDebitType == "") {
            setErrorMessage("Type is required.");
            return;
        }

        if(data.autoDebitCategory == "") {
            setErrorMessage("Category is required.");
            return;
        }

        if(data.autoDebitAmount == "" || isNaN(data.autoDebitAmount)) {
            setErrorMessage("Invalid amount.");
            return;
        }

        if(data.autoDebitAmount <= 0 || data.autoDebitAmount > UTILS.MAX_ALLOWED_AMOUNT_FOR_AUTO_DEBIT) {
            setErrorMessage(`Amount should be in range of 1 - ${UTILS.MAX_ALLOWED_AMOUNT_FOR_AUTO_DEBIT}.`);
            return;
        }

        if(data.autoDebitFrequency == "" || isNaN(data.autoDebitFrequency) || data.autoDebitFrequency < 0 || data.autoDebitFrequency > UTILS.MAX_ALLOWED_MONTHS_FOR_AUTO_DEBIT) {
            setErrorMessage("Invalid frequency.");
            return;
        }

        if(data.autoDebitDay == "" || isNaN(data.autoDebitDay) || data.autoDebitDay < 1 || data.autoDebitDay > UTILS.MAX_ALLOWED_DAY_FOR_AUTO_DEBIT) {
            setErrorMessage("Invalid day of the month.");
            return;
        }

        setConfirmShow(true);
    };

    const handleSubmit = () => {
        props.setLoaderShow(true);
        var data = {
            autoDebitTitle: autoDebitTitle,
            autoDebitDescription: autoDebitDescription,
            autoDebitType: autoDebitType,
            autoDebitCategory: autoDebitCategory,
            autoDebitAmount: autoDebitAmount,
            autoDebitFrequency: autoDebitFrequency,
            autoDebitDay: autoDebitDay,
        };
        requestManager.addAutoDebitData(data, 
            (response) => {
                props.setLoaderShow(false);
                setSuccessMessage(response.data.message);
                setAutoDebitAmount(0);
                setAutoDebitTitle("");
                setAutoDebitDescription("");
                setAutoDebitType("");
                setAutoDebitCategory("");
                setAutoDebitFrequency(1);
                setAutoDebitDay(1);
                setConfirmShow(false);
            }, 
            (error) => {
                props.setLoaderShow(false);
                if(error.code == 0) {
                    setErrorMessage(error.message);
                    setConfirmShow(false);
                }
                else {
                    setErrorMessage(error.data.message);
                    setConfirmShow(false);
                }
                console.log(error);
            }
        );
    }

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
                        <Typography
                            sx={{
                                color: UTILS.ERROR_TEXT_COLOR,
                                mt: 1
                            }}
                        >
                            {errorMessage}
                        </Typography>
                        <Typography
                            sx={{
                                color: UTILS.SUCCESS_TEXT_COLOR,
                                mt: 1
                            }}
                        >
                            {successMessage}
                        </Typography>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="auto_debit_title"
                            name="auto_debit_title"
                            label="Title*"
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
                            onChange={(e) => {
                                if(e.target.value < 0 || e.target.value > UTILS.MAX_ALLOWED_AMOUNT_FOR_AUTO_DEBIT) {
                                    return;
                                }
                                setAutoDebitAmount(e.target.value)
                            }}
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
                                        if (e.target.value < 0 || e.target.value > UTILS.MAX_ALLOWED_MONTHS_FOR_AUTO_DEBIT) return;
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
                                        if (e.target.value < 1 || e.target.value > UTILS.MAX_ALLOWED_DAY_FOR_AUTO_DEBIT) return;
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
            <ConfirmationDialogue
                confirmShow={confirmShow}
                confirmation_title={"Save Auto Debit Details?"}
                confirmation_message={"Please confirm that you want to save the Auto Debit details..."}
                setConfirmShow={setConfirmShow}
                callback={() => {
                    handleSubmit();
                }}
            />
        </React.Fragment>
    );
}
