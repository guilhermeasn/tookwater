import {
    BarList,
    Callout,
    Dropdown,
    DropdownItem,
    Text
} from "@tremor/react";

import {
    Data as DataType,
    dayweek,
    indexDayWeek
} from "./Main";

import {
    useState,
    useEffect
} from 'react';

import { CgGlassAlt } from "react-icons/cg";
import { UpdateProps } from "./App";

export function getDateByDays(numOfDays : number, date : Date = new Date()) : Date {

    const daysAgo = new Date(date.getTime());
    daysAgo.setDate(date.getDate() + numOfDays);

    return daysAgo;

}

export default function Data({ update = 0 } : UpdateProps) {

    const goal : number = parseInt(localStorage.getItem('goal') ?? '2500');
    const today : number = new Date().getDay() + 1;
    
    const [ date, setDate ] = useState<string>('');
    const [ data, setData ] = useState<DataType[]>([]);

    const current : number = data.reduce((p, c) => p + c.v, 0);

    function loadData(value : number) {

        let calc = value - today;
        if(calc > 0) calc -= 7;

        setDate(getDateByDays(calc).toLocaleDateString());
        
        setData(JSON.parse(localStorage.getItem((value - 1).toString()) ?? '[]'));

    }

    useEffect(() => loadData(today), [ today, update ]);

    return <>
    
        <Dropdown placeholder="Selecione um dia da semana" handleSelect={ loadData } defaultValue={ today }>
            { indexDayWeek.map(day => (
                <DropdownItem
                    key={ day + 1 }
                    value={ day + 1 }
                    text={ dayweek(day) }
                />
            )) }
        </Dropdown>

        <Text color="stone" textAlignment="text-center" marginTop="mt-4">
            <strong>{ date }</strong>
        </Text>

        { data.length > 0 ? <>

            <Callout
                title="Totalização do dia"
                text={ `
                    Neste dia você tomou ${ current.toLocaleString() } ml de água.
                    Foram ${ (current - goal).toLocaleString() } ml a
                    ${ (current < goal) ? 'menos' : 'mais'} do que
                    seu objetivo diário de ${ goal.toString() } ml.
                ` }
                height="h-12"
                color={ (current < goal) ? 'red' : 'green' }
                marginTop="mt-4"
            />

            <BarList
                marginTop="mt-4"
                data={ data.map((d, i) => ({
                    key: i.toString(),
                    name: d.t.toString(),
                    value: d.v,
                    icon: CgGlassAlt
                })) }
                valueFormatter={ v => `${ v.toLocaleString() } ml` }
                showAnimation
            />

        </> : (

            <Callout
                title="Nehuma informação salva"
                text="Neste dia nenhuma água ingerida foi informada"
                height="h-12"
                color="yellow"
                marginTop="mt-4"
            />

        ) }

    </>;

}