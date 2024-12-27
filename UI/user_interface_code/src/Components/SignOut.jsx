import * as React from 'react';
import UTILS from "../Common/Utils";
import requestManager from '../Data/RequestManager';

export default function SignOut(props) {
    document.title = "Signing user Out | " + UTILS.TITLE;
    React.useEffect(() => {
        console.log("Yoman");
        requestManager.signOutUser(           
            (data) =>{
                console.log("Here");
                window.location.replace("/dashboard");
            }, 
            (error) => {
                console.log(error);
                window.location.replace("/dashboard");
            }
        );
    }, []);
    return (
        <>
            Sign Out
        </>
    );
}