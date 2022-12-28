import {
    useState,
    useEffect
} from 'react';

import {
    Data,
    dayweek,
    indexDayWeek
} from './Main';

import {
    AreaChart,
    Button,
    Divider,
    Flex
} from "@tremor/react";

import { UpdateProps } from './App';

export default function Chart({ update = 0, onUpdate = () => {} } : UpdateProps) {

    const goal : number = parseInt(localStorage.getItem('goal') ?? '2500');

    const [ histories, setHistories ] = useState<number[]>([]);
    useEffect(() => setHistories(indexDayWeek.map(dayweek => JSON.parse(localStorage.getItem(dayweek.toString()) ?? '[]')).map(d => d.reduce((p : number, c : Data) => p + c.v, 0))), [ update ]);

    function reset() {
        // eslint-disable-next-line no-restricted-globals
        if(confirm('Tem certeza que deseja apagar tudo?')) {
            indexDayWeek.forEach(dayweek => localStorage.removeItem(dayweek.toString()));
            onUpdate();
        }

    }

    return <>
    
        <AreaChart
            categories={[ 'Objetivo', 'Ingerido' ]}
            colors={[ 'sky', 'orange' ]}
            dataKey='dayweek'
            data={histories.map((sum, i) => ({
                dayweek: dayweek(i).charAt(0),
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