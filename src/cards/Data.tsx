import {
    BarList,
    Block,
    Callout,
    Dropdown,
    DropdownItem
} from "@tremor/react";

import {
    useState,
    useEffect
} from 'react';

import {
    CgGlassAlt
} from "react-icons/cg";

import { getDataSet, getDay, getSettings } from "../support/data";

import {
    dayWeek,
    nativeDate,
    natural,
    sum
} from "../support/helpers";

import type {
    CardProps,
    DataSet,
    DateString,
    Day
} from "../support/types";

export default function Data({ update = 0 } : CardProps) {

    const { goal } = getSettings();

    const [ data, setData ] = useState<DataSet>([]);
    const [ date, setDate ] = useState<DateString>();

    const day : Day | null = date ? getDay(date) : null;
    const sumDay : number = day ? sum(day) : 0;
    
    useEffect(() => setData(getDataSet().reverse()), [ update ]);

    return <>
    
        <Dropdown placeholder="Selecione um dia" handleSelect={ setDate }>
            { data.map((day, index) => (
                <DropdownItem
                    key={ index }
                    value={ day.date }
                    text={ nativeDate(day.date).toLocaleDateString() + ' - ' + dayWeek(day.date) }
                />
            )) }
        </Dropdown>

        <Block marginTop="mt-4">

            { day ? <>

                <Callout
                    title={ goal > sumDay ? "Tomou pouca água!" : "Parabéns, concluiu o objetivo!" }
                    color={ goal > sumDay ? 'red' : 'green' }
                    text={ `
                        Neste dia você tomou ${ sumDay.toLocaleString() } ml de água.
                        São ${ natural(sumDay - goal).toLocaleString() } ml a
                        ${ goal > sumDay ? 'menos' : 'mais'} do que
                        seu objetivo diário de ${ goal.toLocaleString() } ml.
                    ` }
                />

                <BarList
                    marginTop="mt-4"
                    data={ day.data.map((d, i) => ({
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
                    title="Nenhum dia selecionado"
                    text="Selecione uma data para visualizar o seu histórico"
                    color="yellow"
                />

            ) }

        </Block>

    </>;

}