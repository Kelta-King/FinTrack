import * as React from 'react';
import UTILS from '../Common/Utils';
import ContainerBox from './Widgets/ContainerBox';
import DataCard from './Widgets/DataCard';
import Grid from '@mui/material/Grid2';
import { Box } from '@mui/material';
import ChartBox from './Widgets/PieChartBox';
import BarChartBox from './Widgets/BarChartBox';

export default function Dashboard(props) {
    document.title = 'Dashboard | ' + UTILS.Title;
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item size={{ lg: 6, md: 6, sm: 12 }}>
                        <Grid container spacing={2}>
                            <Grid item size={{ lg: 6, md: 6, sm: 12 }}>
                                <ContainerBox
                                    children={
                                        <DataCard
                                            title="Month's Expenses"
                                            value={UTILS.toIndianNumberFormat(
                                                1234
                                            )}
                                            subtitle="For March 2014"
                                            description="March 2014 total expense"
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
                                                value={UTILS.toIndianNumberFormat(
                                                    123444
                                                )}
                                                subtitle="For Year 2014"
                                                description="2014 year's total expense"
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
                                        <ChartBox />
                                    }
                                />
                            </Grid>
                            <Grid item size={{ lg: 6, md: 6, sm: 12 }}>
                                <ContainerBox 
                                    children={
                                        <ChartBox />
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
                                            title="Total Investment"
                                            value={UTILS.toIndianNumberFormat(
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
                                                value={UTILS.toIndianNumberFormat(
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
                            <Grid item size={{ lg: 12, md: 12, sm: 12 }}>
                                <ContainerBox 
                                    children={
                                        <BarChartBox />
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
