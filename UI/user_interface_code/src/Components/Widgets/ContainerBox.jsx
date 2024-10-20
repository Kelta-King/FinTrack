import * as React from 'react';
import Paper from '@mui/material/Paper';

export default function ContainerBox(props) {
    return (
        <Paper
            {...props}
            variant="elevation"
            square={false}
            elevation={1}
        >
            {props.children}
        </Paper>
    )
}