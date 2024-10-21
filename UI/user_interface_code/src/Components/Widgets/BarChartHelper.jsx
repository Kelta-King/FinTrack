import * as React from 'react';
import { BarChart } from '@mui/x-charts';
import UTILS from '../../Common/Utils';

export default function BarChartHelper(props) {
    return (
        <BarChart
            xAxis={[
                {
                    scaleType: 'band',
                    data: [
                        'Jan',
                        'Feb',
                        'Mar',
                        'Apr',
                        'May',
                        'Jun',
                        'Jul',
                        'Aug',
                        'Sept',
                        'Oct',
                        'Nov',
                        'Dec'
                    ]
                }
            ]}
            colors={UTILS.GRAPH_COLORS}
            series={[
                { 
                    data: [23444, 26444, 33444, 24444, 25444, 30444, 24444, 23844, 21444, 27444, 28444, 24414], 
                    stack: 'A', 
                    label: 'Investment' 
                },
                { 
                    data: [23444, 26444, 33444, 24444, 25444, 30444, 24444, 23844, 21444, 27444, 28444, 24414],
                    stack: 'A', 
                    label: 'Spent' 
                },
                { 
                    data: [23444, 26444, 33444, 24444, 25444, 30444, 24444, 23844, 21444, 27444, 28444, 24414],
                    stack: 'A', 
                    label: 'Remainings' 
                }
            ]}
            height={400}
        />
    );
}
