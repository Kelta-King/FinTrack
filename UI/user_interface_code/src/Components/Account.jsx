import * as React from 'react';
import UTILS from '../Common/Utils';
import ContainerBox from './Widgets/ContainerBox';
import Grid from '@mui/material/Grid2';
import { Box, Button } from '@mui/material';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import requestManager from '../Data/RequestManager';

export default function Account(props) {
    document.title = 'Account | ' + UTILS.TITLE;
    React.useEffect(() => {
        requestManager.fetchAccountData(
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
                        <ContainerBox
                            children={
                                <>
                                    <Box
                                        sx={{
                                            m: 2,
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: '100%', 
                                                display: 'flex', 
                                                justifyContent: 'center',
                                                alignItems: 'center' 
                                            }}
                                        >
                                            <AccountCircleTwoToneIcon
                                                sx={{
                                                    fontSize: 256
                                                }}
                                            />
                                        </Box>
                                        <Box
                                            sx={{
                                                width: '100%', 
                                                display: 'flex', 
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                fontSize: 32,
                                                p: 4
                                            }}
                                        >
                                            {"User name"}
                                        </Box>
                                    </Box>
                                </>
                            }
                        />
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}
