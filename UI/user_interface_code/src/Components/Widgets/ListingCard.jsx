import * as React from 'react';
import { Box, Tooltip, Typography } from '@mui/material';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import COLOR_PALLETE from '../../Theme/ThemeStyle';
import UTILS from '../../Common/Utils';
import ExpensesList from './Lists/ExpensesList';
import AutoDebitsList from './Lists/AutoDebitsList';

export default function ListingCard(props) {
    const items = [
        { title: 'House Rent', icon: 'House', amount: 9750 },
        { title: 'Maid', icon: 'Housekeeping', amount: 500 },
        { title: 'Maintanance', icon: 'Housekeeping', amount: 3000 }
    ];

    return (
        <Box
            sx={{
                width: '100%',
                textAlign: 'center',
                p: 2,
                cursor: 'context-menu',
                color: COLOR_PALLETE.richBlue
            }}
        >
            <div>
                <div
                    style={{
                        display: 'flex',
                        marginBottom: '8px'
                    }}
                >
                    <Typography
                        variant="p"
                        sx={{
                            lineHeight: 1.5,
                            display: 'inline-block',
                            fontSize: 18,
                            fontWeight: 600,
                            mt: 0.2
                        }}
                    >
                        {props.title}
                    </Typography>
                    <Tooltip
                        title={props.description}
                        sx={{
                            mt: 0.5,
                            ml: 1,
                            cursor: 'pointer',
                            display: 'inline-block'
                        }}
                        placement="right-start"
                        arrow
                    >
                        <InfoTwoToneIcon />
                    </Tooltip>
                </div>
            </div>
            <div>
                {UTILS.LISTS_OPTIONS.EXPENSES_LIST === props.type && (
                    <ExpensesList items={items} />
                )}
                {UTILS.LISTS_OPTIONS.AUTO_DEBITS_LIST === props.type && (
                    <AutoDebitsList items={items} />
                )}
            </div>
        </Box>
    );
}
