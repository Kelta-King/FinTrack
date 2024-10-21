import * as React from 'react';
import UTILS from '../Common/Utils';
import ContainerBox from './Widgets/ContainerBox';
import DataCard from './Widgets/DataCard';
import Grid from '@mui/material/Grid2';
import { Box } from '@mui/material';
import GraphicalCard from './Widgets/GraphicalCard';
import ListingCard from './Widgets/ListingCard';

export default function Dashboard(props) {
    document.title = 'Dashboard | ' + UTILS.TITLE;
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
                                            value={UTILS.TO_INDIAN_NUMBER_FORMAT(
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
                                                value={UTILS.TO_INDIAN_NUMBER_FORMAT(
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
                                        <GraphicalCard
                                            title="Monthly chart"
                                            type={UTILS.SUPPORTED_GRAPHS.PIE_GRAPH}
                                            description={"Monthly expenses in Pie chart"}
                                        />
                                    }
                                />
                            </Grid>
                            <Grid item size={{ lg: 6, md: 6, sm: 12 }}>
                                <ContainerBox 
                                    children={
                                        <GraphicalCard
                                            title="Yearly chart"
                                            type={UTILS.SUPPORTED_GRAPHS.PIE_GRAPH}
                                            description={"Yearly expenses in Pie chart"}
                                        />
                                    }
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} sx={{ mt: 2 }}>
                            <Grid item size={{ lg: 12, md: 12, sm: 12 }}>
                                <ContainerBox 
                                    children={
                                        <ListingCard 
                                            title="Upcoming Auto Debits"
                                            description="Upcoming auto debits"
                                        />
                                    }
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item size={{ lg: 6, md: 6, sm: 12 }}>
                        <Grid container spacing={2}>
                            <Grid item size={{ lg: 12, md: 12, sm: 12 }}>
                                <ContainerBox 
                                    children={
                                        <ListingCard 
                                            title="Recent 3 expenses"
                                            description="Recent 3 expenses"
                                        />
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
                            <Grid item size={{ lg: 12, md: 12, sm: 12 }}>
                                <ContainerBox 
                                    children={
                                        <GraphicalCard
                                            title="Past Month's expenses"
                                            type={UTILS.SUPPORTED_GRAPHS.BAR_GRAPH}
                                            description={"Past Month's expenses"}
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
