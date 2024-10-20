import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

const palette = ['red', 'blue', 'green', 'yellow'];

export default function PieChartBox() {
    return (
        <PieChart
            series={[
                {
                    arcLabel: (item) => `${item.value}%`,
                    arcLabelMinAngle: 35,
                    arcLabelRadius: '60%',
                    data: [
                        { id: 0, value: 10, label: 'series A' },
                        { id: 1, value: 15, label: 'series B' },
                        { id: 2, value: 20, label: 'series C' }
                    ]
                }
            ]}
            colors={palette}
            margin={{ top: 40, bottom: 40, left: 40, right:40 }}
            slotProps={{
                legend: {
                  direction: 'row',
                  position: { vertical: 'bottom', horizontal: 'middle' },
                  padding: 0,
                },
            }}
            height={400}
        />
    );
}
