import {
    useState,
    useEffect
} from 'react';

import {
    AreaChart,
    Button,
    Divider,
    Flex
} from "@tremor/react";

import {
    dayweek,
    indexDayWeek
} from './support/helpers';

import type {
    Data,
    UpdateProps
} from './support/types';

export default function Chart({ update = 0, onUpdate = () => {} } : UpdateProps) {

    const goal : number = parseInt(localStorage.getItem('goal') ?? '2500');

    const [ histories, setHistories ] = useState<Array<{ day: number; sum: any }>>([]);

    useEffect(() => setHistories(indexDayWeek(new Date().getDay() + 1).map(dayweek => ({
        day: dayweek,
        sum: JSON.parse(localStorage.getItem(dayweek.toString()) ?? '[]').reduce((p : number, c : Data) => p + c.v, 0)
    }))), [ update ]);

    function reset() {
        // eslint-disable-next-line no-restricted-globals
        if(confirm('Tem certeza que deseja apagar tudo?')) {
            indexDayWeek().forEach(dayweek => localStorage.removeItem(dayweek.toString()));
            onUpdate();
        }

    }

    return <>
    
        <AreaChart
            categories={[ 'Objetivo', 'Ingerido' ]}
            colors={[ 'sky', 'orange' ]}
            dataKey='dayweek'
            data={histories.map(({ day, sum }) => ({
                dayweek: dayweek(day).charAt(0),
                Objetivo: goal,
                Ingerido: sum
            }))}
            valueFormatter={ v => `${ v.toLocaleString() } ml` }
        />

        <Divider />

        <Flex justifyContent='justify-center'>
            <Button
                text='Resetar Informações'
                onClick={ reset }
                color='red'
            />
        </Flex>

    </>;

}