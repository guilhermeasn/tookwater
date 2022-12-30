import type {
    CardProps,
    DataSet
} from '../support/types';

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

import {
    getDataSet,
    getFillDataSet,
    getSettings,
    resetDataSet
} from '../support/data';

export default function Chart({ update = 0, onUpdate = () => {} } : CardProps) {

    const { goal } = getSettings();

    const [ days, setDays ] = useState<number>(7);
    const [ data, setData ] = useState<DataSet>([]);

    useEffect(() => setData(days > 0 ? getFillDataSet(days) : getDataSet()), [ days, update ]);

    function reset() {

        // eslint-disable-next-line no-restricted-globals
        if(confirm('Tem certeza que deseja apagar tudo?')) {

            resetDataSet();
            onUpdate();
            
        }

    }

    return <>

        <Dropdown defaultValue={ days } handleSelect={ setDays }>
            <DropdownItem text='Últimos três dias'   value={ 3 }  />
            <DropdownItem text='Últimos sete dias'   value={ 7 }  />
            <DropdownItem text='Últimos quinze dias' value={ 15 } />
            <DropdownItem text='Últimos trinta dias' value={ 30 } />
            <DropdownItem text='Dias com informação' value={ -1 } />
        </Dropdown>
    
        <AreaChart
            marginTop='mt-4'
            categories={[ 'Objetivo', 'Ingerido' ]}
            colors={[ 'sky', 'orange' ]}
            dataKey='dayweek'
            data={data.map(day => ({
                dayweek: data.length < 10 ? dayWeek(day.date).substring(0, 3) : day.date.replace(/.*(\d{2}$)/, '$1'),
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