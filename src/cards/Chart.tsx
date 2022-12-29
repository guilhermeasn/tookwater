import {
    useState,
    useEffect
} from 'react';

import {
    AreaChart,
    Button,
    Divider,
    Dropdown,
    DropdownItem,
    Flex
} from "@tremor/react";

import {
    dayWeek,
    sum
} from '../support/helpers';

import { getFillDataSet, getSettings, resetDataSet } from '../support/data';

import type {
    CardProps, DataSet
} from '../support/types';

export default function Chart({ update = 0, onUpdate = () => {} } : CardProps) {

    const { goal } = getSettings();

    const [ mode, setMode ] = useState<'w'|'m'>('w');
    const [ data, setData ] = useState<DataSet>([]);

    useEffect(() => setData(getFillDataSet(mode === 'w' ? 7 : 30)), [ mode, update ]);

    function reset() {

        // eslint-disable-next-line no-restricted-globals
        if(confirm('Tem certeza que deseja apagar tudo?')) {

            resetDataSet();
            onUpdate();
            
        }

    }

    return <>

        <Dropdown defaultValue={ mode } handleSelect={ setMode }>
            <DropdownItem text='Últimos sete dias' value='w' />
            <DropdownItem text='Últimos trinta dias' value='m' />
        </Dropdown>
    
        <AreaChart
            marginTop='mt-4'
            categories={[ 'Objetivo', 'Ingerido' ]}
            colors={[ 'sky', 'orange' ]}
            dataKey='dayweek'
            data={data.map(day => ({
                dayweek: mode === 'w' ? dayWeek(day.date).substring(0, 3) : day.date.replace(/.*(\d{2}$)/, '$1'),
                Objetivo: goal,
                Ingerido: sum(day)
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