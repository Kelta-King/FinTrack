import * as React from 'react';
import { Box, Typography } from '@mui/material';
import COLOR_PALLETE from '../../Theme/ThemeStyle';

export default function SelectButtonCard(props) {
    return (
        <Box sx={{ mr: 2, ml: 2, mt: 2 }}>
            <Typography
                variant="p"
                sx={{
                    lineHeight: 1.5,
                    display: 'inline-block',
                    fontSize: 18,
                    fontWeight: 600,
                    mt: 0.2,
                    mb: 2,
                    color: COLOR_PALLETE.richBlue
                }}
            >
                {props.title}
            </Typography>
            {props.children}
        </Box>
    );
}
