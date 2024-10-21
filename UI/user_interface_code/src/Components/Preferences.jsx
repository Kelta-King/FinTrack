import * as React from 'react';
import UTILS from "../Common/Utils";

export default function Preferences(props) {
    document.title = "Preferences | " + UTILS.TITLE;
    return (
        <>
            Preferences
        </>
    );
}