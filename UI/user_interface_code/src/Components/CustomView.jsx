import * as React from 'react';
import UTILS from "../Common/Utils";
import requestManager from '../Data/RequestManager';

export default function CustomView(props) {
    document.title = "Custom View | " + UTILS.TITLE;
    React.useEffect(() => {
        requestManager.fetchDashboardData(
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
            Custom View
        </>
    );
}