import {
    useState,
    useEffect
} from 'react';

import {
    Data,
    dayweek
} from './Main';

import { AreaChart } from "@tremor/react";

export default function Chart({ update = 0 }) {

    const goal : number = parseInt(localStorage.getItem('goal') ?? '2500');

    const [ histories, setHistories ] = useState<number[]>([]);
    useEffect(() => setHistories([0, 1, 2, 3, 4, 5, 6].map(dayweek => JSON.parse(localStorage.getItem(dayweek.toString()) ?? '[]')).map(d => d.reduce((p : number, c : Data) => p + c.v, 0))), [ update ]);

    return (
    
        <AreaChart
            categories={[ 'Objetivo', 'Ingerido' ]}
            colors={[ 'sky', 'orange' ]}
            dataKey='dayweek'
            data={histories.map((sum, i) => ({
                dayweek: dayweek(i).charAt(0),
                Objetivo: goal,
                Ingerido: sum
            }))}
            valueFormatter={ v => `${ v } ml` }
        />

    );

}