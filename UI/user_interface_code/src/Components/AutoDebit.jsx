import * as React from 'react';
import UTILS from '../Common/Utils';
import ContainerBox from './Widgets/ContainerBox';
import Grid from '@mui/material/Grid2';
import { Box, Button } from '@mui/material';
import ListingCard from './Widgets/ListingCard';
import DataCard from './Widgets/DataCard';
import GraphicalCard from './Widgets/GraphicalCard';
import requestManager from '../Data/RequestManager';

export default function AutoDebits(props) {
    document.title = 'AutoDebits | ' + UTILS.TITLE;
    React.useEffect(() => {
        requestManager.fetchAutoDebitsData(
            (data) =>{
                console.log(data);
            }, 
            (error) => {
                console.log(error);
                if(error.code == 0) {
                    props.setGlobalErrorMessage("Network Issue. Please check...") 
                    props.setErrorMessageShow(true);
                }
                else {
                    props.setAuthShow(true);
                }
            }
        );
    }, []);
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item size={{ lg: 12, md: 12, sm: 12 }}>
                        <Grid container spacing={2}>
                            <Grid item size={{ lg: 6, md: 6, sm: 12 }}>
                                <ContainerBox
                                    children={
                                        <ListingCard
                                            title="Upcoming Auto Debits"
                                            description="Upcoming auto debits"
                                            type={
                                                UTILS.LISTS_OPTIONS
                                                    .AUTO_DEBITS_LIST
                                            }
                                        />
                                    }
                                />
                            </Grid>
                            <Grid item size={{ lg: 6, md: 6, sm: 12 }}>
                                <Grid container spacing={2}>
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
                                    <Grid item size={{ lg: 6, md: 6, sm: 12 }}>
                                        <ContainerBox
                                            children={
                                                <>
                                                    <DataCard
                                                        title="Total Investment"
                                                        value={UTILS.TO_INDIAN_NUMBER_FORMAT(
                                                            10234
                                                        )}
                                                        subtitle="Till the date"
                                                        description="Total investment till now"
                                                    />
                                                </>
                                            }
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        size={{ lg: 6, md: 6, sm: 12 }}
                                    >
                                        <ContainerBox
                                            children={
                                                <GraphicalCard
                                                    title="Auto debits categories pie"
                                                    type={
                                                        UTILS.SUPPORTED_GRAPHS.PIE_GRAPH
                                                    }
                                                    description={
                                                        'Pie chart of Auto debits categories'
                                                    }
                                                />
                                            }
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        size={{ lg: 6, md: 6, sm: 12 }}
                                    >
                                        <ContainerBox
                                            children={
                                                <GraphicalCard
                                                    title="Auto debits types pie"
                                                    type={
                                                        UTILS.SUPPORTED_GRAPHS.PIE_GRAPH
                                                    }
                                                    description={
                                                        'Pie chart of Auto debits types'
                                                    }
                                                />
                                            }
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}
