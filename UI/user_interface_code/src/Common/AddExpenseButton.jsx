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
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import NativeSelect from '@mui/material/NativeSelect';
import UTILS from './Utils';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddExpenseButton() {
    const [open, setOpen] = React.useState(false);
    const [expenseCategoryList, setExpenseCategoryList] = React.useState([]);

    const [expenseTitle, setExpenseTitle] = React.useState('');
    const [expenseDescription, setExpenseDescription] = React.useState('');
    const [expenseType, setExpenseType] = React.useState('');
    const [expenseCategory, setExpenseCategory] = React.useState('');
    const [expenseAmount, setExpenseAmount] = React.useState(0);
    const [transactionDate, setTransactionDate] = React.useState(dayjs());

    const handleExpenseTypeChange = (event) => {
        const categoriesList = [];
        if(UTILS.EXPENSES_CATEGORIES[event.target.value] !== undefined) {
            UTILS.EXPENSES_CATEGORIES[event.target.value].map((expenseCategory) => {
                categoriesList.push(expenseCategory);
            });
        }
        console.log(categoriesList);        
        setExpenseType(event.target.value);
        setExpenseCategory('');
        setExpenseCategoryList(categoriesList);
    };

    const handleExpenseCategoryChange = (event) => {
        setExpenseCategory(event.target.value);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleTransactionDateChange = (date) => {
        setTransactionDate(date);
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
                Expense
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="Add ExpenseDialog"
            >
                <DialogTitle>{'Expense Details'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="add-expense-dialog">
                        Provide details of the new expense.
                        <TextField
                            autoFocus
                            margin="dense"
                            id="expense_title"
                            name="expense_title"
                            label="Title"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={expenseTitle}
                            onChange={(e) => setExpenseTitle(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            id="expense_description"
                            name="expense_description"
                            label="Description"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={expenseDescription}
                            onChange={(e) => setExpenseDescription(e.target.value)}
                        />
                        <Grid container spacing={2}>
                            <Grid item size={{ lg: 6, md: 6, sm: 6 }}>
                                <FormControl fullWidth margin="dense">
                                    <InputLabel id="expense-type-helper-label">
                                        Expense Type
                                    </InputLabel>
                                    <Select
                                        labelId="expense-type-helper-label"
                                        id="expense-type-select-helper"
                                        value={expenseType}
                                        label="Age"
                                        onChange={handleExpenseTypeChange}
                                        variant="standard"
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {Object.keys(UTILS.EXPENSES_CATEGORIES).map((value) => {
                                            return <MenuItem value={value}> {value} </MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item size={{ lg: 6, md: 6, sm: 6 }}>
                                <FormControl fullWidth margin="dense">
                                    <InputLabel id="expense-category-helper-label">
                                        Expense Category
                                    </InputLabel>
                                    <Select
                                        labelId="expense-category-helper-label"
                                        id="expense-category-select-helper"
                                        value={expenseCategory}
                                        label="Expense Category"
                                        onChange={handleExpenseCategoryChange}
                                        variant="standard"
                                        renderValue={(selected) => {
                                            const selectedItem = expenseCategoryList.find(item => item.title === selected);
                                            return selectedItem ? selectedItem.title : '';
                                        }}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {expenseCategoryList.map((value) => {
                                            return <MenuItem value={value.title}> {value.icon}<span style={{width:"10px"}}></span> {value.title} </MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <TextField
                            margin="dense"
                            id="expense_amount"
                            name="expense_amount"
                            label="Amount (₹)"
                            type="number"
                            fullWidth
                            variant="standard"
                            value={expenseAmount}
                            onChange={(e) => setExpenseAmount(e.target.value)}
                        />
                        <LocalizationProvider 
                            dateAdapter={AdapterDayjs}
                            sx={{width: '100%'}}
                        >
                            <DatePicker 
                                label="Transaction Date"
                                sx={{width: '100%', mt:4}}
                                variant="standard"
                                onChange={handleTransactionDateChange}
                                format="DD/MM/YYYY"
                                value={transactionDate}
                            />
                        </LocalizationProvider>
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
