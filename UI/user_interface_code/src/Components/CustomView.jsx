import * as React from 'react';
import UTILS from "../Common/Utils";

export default function CustomView(props) {
    document.title = "Custom View | " + UTILS.TITLE;
    return (
        <>
            Custom View
        </>
    );
}