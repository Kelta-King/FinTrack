import * as React from 'react';
import { Box, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import UTILS from '../../Common/Utils';
import COLOR_PALLETE from '../../Theme/ThemeStyle';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function SelectButtonCard(props) {
    const [val, setVal] = React.useState(dayjs());
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
            <FormControl sx={{ width: '100%' }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label={'Select month and year'}
                        views={['month', 'year']}
                        value={val}
                        onChange={(date) => {
                            console.log(date);
                            setVal(date)
                        }}
                    />
                </LocalizationProvider>
            </FormControl>
        </Box>
    );
}
