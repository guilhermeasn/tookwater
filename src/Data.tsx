import {
    BarList,
    Callout,
    Dropdown,
    DropdownItem,
    Text
} from "@tremor/react";

import {
    useState,
    useEffect,
    useCallback
} from 'react';

import {
    CgGlassAlt
} from "react-icons/cg";

import {
    dayweek,
    getDateByDays,
    indexDayWeek,
    natural
} from "./support/helpers";

import type {
    Week,
    UpdateProps
} from "./support/types";

export default function Data({ update = 0 } : UpdateProps) {

    const goal : number = parseInt(localStorage.getItem('goal') ?? '2500');
    const today : number = new Date().getDay() + 1;
    
    const [ date, setDate ] = useState<number>(0);
    const [ data, setData ] = useState<Week[]>([]);

    const current : number = data.reduce((p, c) => p + c.v, 0);

    const loadData = useCallback((value : number) => {

        const calc = value - today;
        setDate(calc > 0 ? calc - 7 : calc);

        setData(JSON.parse(localStorage.getItem((value - 1).toString()) ?? '[]'));

    }, [today]);

    useEffect(() => loadData(today), [ today, update, loadData ]);

    return <>
    
        <Dropdown placeholder="Selecione um dia da semana" handleSelect={ loadData } defaultValue={ today }>
            { indexDayWeek().map(day => (
                <DropdownItem
                    key={ day + 1 }
                    value={ day + 1 }
                    text={ dayweek(day) }
                />
            )) }
        </Dropdown>

        <Text color="stone" textAlignment="text-center" marginTop="mt-4">
            <strong>{ getDateByDays(date).toLocaleDateString() }</strong>
        </Text>

        { data.length > 0 ? <>

            <Callout
                title={ (date === 0) ? "Dia atual" : (current < goal) ? "Tomou pouca água!" : "Parabéns, concluiu o objetivo!" }
                text={ `
                    ${ (date === 0) ? 'Hoje' : 'Neste dia' } você tomou
                    ${ current.toLocaleString() } ml de água.
                    São ${ natural(current - goal).toLocaleString() } ml a
                    ${ (current < goal) ? 'menos' : 'mais'} do que
                    seu objetivo diário de ${ goal.toLocaleString() } ml.
                ` }
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
                color="yellow"
                marginTop="mt-4"
            />

        ) }

    </>;

}