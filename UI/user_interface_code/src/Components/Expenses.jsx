import * as React from 'react';
import UTILS from '../Common/Utils';
import ContainerBox from './Widgets/ContainerBox';
import DataCard from './Widgets/DataCard';
import Grid from '@mui/material/Grid2';
import { Box, Button } from '@mui/material';
import GraphicalCard from './Widgets/GraphicalCard';
import ListingCard from './Widgets/ListingCard';
import SelectButtonHolder from './Widgets/SelectButtonHolder';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormControl from '@mui/material/FormControl';
import dayjs from 'dayjs';
import requestManager from '../Data/RequestManager';

export default function Expenses(props) {
    document.title = 'Expenses | ' + UTILS.TITLE;
    const [date, selectDate] = React.useState(dayjs());
    const [month, selectMonth] = React.useState(dayjs().month());
    const [year, selectYear] = React.useState(dayjs().year());

    const handleDateChange = (tempDate) => {
        selectDate(tempDate);
    };

    const updateDate = () => {
        selectMonth(date.month());
        selectYear(date.year());
    };

    React.useEffect(() => {
        requestManager.fetchExpensesData(
            (data) =>{
                console.log(data);
            }, 
            (error) => {
                console.log(error);
                props.setAuthShow(true);
            }
        );
    }, []);

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item size={{ lg: 6, md: 6, sm: 12 }}>
                        <Grid container spacing={2}>
                            <Grid item size={{ lg: 12, md: 12, sm: 12 }}>
                                <ContainerBox
                                    children={
                                        <DataCard
                                            title="Select Month to see it's data"
                                            subtitle={
                                                <>
                                                    <FormControl
                                                        sx={{ width: '100%' }}
                                                    >
                                                        <LocalizationProvider
                                                            dateAdapter={
                                                                AdapterDayjs
                                                            }
                                                        >
                                                            <DatePicker
                                                                label={
                                                                    'Select month and year'
                                                                }
                                                                views={[
                                                                    'month',
                                                                    'year'
                                                                ]}
                                                                value={date}
                                                                onChange={
                                                                    handleDateChange
                                                                }
                                                            />
                                                        </LocalizationProvider>
                                                    </FormControl>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={updateDate}
                                                        sx={{ mt: 2 }}
                                                    >
                                                        Change Date
                                                    </Button>
                                                </>
                                            }
                                            description="Select Month to see it's data"
                                        />
                                    }
                                />
                            </Grid>
                            <Grid item size={{ lg: 12, md: 12, sm: 12 }}>
                                <ContainerBox
                                    children={
                                        <>
                                            <ListingCard
                                                title="Expenses history"
                                                description="List of expenses"
                                                type={
                                                    UTILS.LISTS_OPTIONS
                                                        .EXPENSES_LIST
                                                }
                                            />
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
                                        <DataCard
                                            title="Month's Expenses"
                                            value={UTILS.TO_INDIAN_NUMBER_FORMAT(
                                                1234
                                            )}
                                            subtitle={
                                                'For ' +
                                                UTILS.MONTHS_LIST[month] +
                                                ' ' +
                                                year
                                            }
                                            description={
                                                UTILS.MONTHS_LIST[month] +
                                                ' ' +
                                                year +
                                                ' total expense'
                                            }
                                        />
                                    }
                                />
                            </Grid>
                            <Grid item size={{ lg: 6, md: 6, sm: 12 }}>
                                <ContainerBox
                                    children={
                                        <>
                                            <DataCard
                                                title="Year's Expenses"
                                                value={UTILS.TO_INDIAN_NUMBER_FORMAT(
                                                    123444
                                                )}
                                                subtitle={'For Year ' + year}
                                                description={
                                                    year +
                                                    " year's total expense"
                                                }
                                            />
                                        </>
                                    }
                                />
                            </Grid>
                            <Grid item size={{ lg: 6, md: 6, sm: 12 }}>
                                <ContainerBox
                                    children={
                                        <DataCard
                                            title="Total Investment"
                                            value={UTILS.TO_INDIAN_NUMBER_FORMAT(
                                                10234
                                            )}
                                            subtitle="Till the date"
                                            description="Total investment till now"
                                        />
                                    }
                                />
                            </Grid>
                            <Grid item size={{ lg: 6, md: 6, sm: 12 }}>
                                <ContainerBox
                                    children={
                                        <>
                                            <DataCard
                                                title="Total Auto Debit"
                                                value={UTILS.TO_INDIAN_NUMBER_FORMAT(
                                                    800
                                                )}
                                                subtitle="Monthly"
                                                description="Monthly auto debit amount"
                                            />
                                        </>
                                    }
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} sx={{ mt: 2 }}>
                            <Grid item size={{ lg: 6, md: 6, sm: 12 }}>
                                <ContainerBox
                                    children={
                                        <GraphicalCard
                                            title="Pie chart on types"
                                            type={
                                                UTILS.SUPPORTED_GRAPHS.PIE_GRAPH
                                            }
                                            description={
                                                'Monthly pie chart on types of expenses'
                                            }
                                        />
                                    }
                                />
                            </Grid>
                            <Grid item size={{ lg: 6, md: 6, sm: 12 }}>
                                <ContainerBox
                                    children={
                                        <GraphicalCard
                                            title="Pie chart on categories"
                                            type={
                                                UTILS.SUPPORTED_GRAPHS.PIE_GRAPH
                                            }
                                            description={
                                                'Monthly pie chart on categories of expenses'
                                            }
                                        />
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
