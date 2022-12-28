import {
    BarList,
    Callout,
    Dropdown,
    DropdownItem
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

export default function Data({ update = 0 } : UpdateProps) {

    const defaultDay = new Date().getDay() + 1;
    const [ data, setData ] = useState<DataType[]>([]);
    const loadData = (value : number) => setData(JSON.parse(localStorage.getItem((value - 1).toString()) ?? '[]'));

    useEffect(() => loadData(defaultDay), [ defaultDay, update ]);

    return <>
    
        <Dropdown placeholder="Selecione um dia da semana" handleSelect={ loadData } defaultValue={ defaultDay }>
            { indexDayWeek.map(day => (
                <DropdownItem
                    key={ day + 1 }
                    value={ day + 1 }
                    text={ dayweek(day) }
                />
            )) }
        </Dropdown>

        { data.length > 0 ? (

            <BarList
                marginTop="mt-8"
                data={ data.map((d, i) => ({
                    key: i.toString(),
                    name: d.t.toString(),
                    value: d.v,
                    icon: CgGlassAlt
                })) }
            />

        ) : (

            <Callout
                title="Nehuma informação salva"
                text="Neste dia nenhuma água ingerida foi informada"
                height="h-12"
                color="yellow"
                marginTop="mt-8"
            />

        ) }

    </>;

}