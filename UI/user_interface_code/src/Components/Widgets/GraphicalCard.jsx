import * as React from 'react';
import { Box, Tooltip, Typography } from "@mui/material";
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import COLOR_PALLETE from "../../Theme/ThemeStyle";
import UTILS from '../../Common/Utils';
import BarChartHelper from './BarChartHelper';
import PieChartHelper from './PieChartHelper';

function ChartHelper(props) {
    switch (props.type) {
        case UTILS.SUPPORTED_GRAPHS.BAR_GRAPH:
            return (
                <>
                    <BarChartHelper />
                </>
            );
        case UTILS.SUPPORTED_GRAPHS.PIE_GRAPH:
            return (
                <>
                    <PieChartHelper />
                </>
            );
        case UTILS.SUPPORTED_GRAPHS.LINE_GRAPH:
            return (
                <>line</>
            );
        default:
            return (
                <>none</>
            );
    }
}

export default function GraphicalCard(props) {
    return (
        <Box
            sx={{
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
                {<ChartHelper type={props.type} />}
            </div>
        </Box>
    );
}
