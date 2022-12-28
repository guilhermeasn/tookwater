import { BarList, Dropdown, DropdownItem } from "@tremor/react";
import { Data as DataType, dayweek } from "./Main";
import { useState, useEffect } from 'react';
import { CgGlassAlt } from "react-icons/cg";

export default function Data({ update = 0 }) {

    const defaultDay = new Date().getDay() + 1;
    const [ data, setData ] = useState<DataType[]>([]);
    const loadData = (value : number) => setData(JSON.parse(localStorage.getItem((value - 1).toString()) ?? '[]'));

    useEffect(() => loadData(defaultDay), [ defaultDay, update ]);

    return <>
    
        <Dropdown placeholder="Selecione um dia da semana" handleSelect={ loadData } defaultValue={ defaultDay }>
            { [1, 2, 3, 4, 5, 6, 7].map(day => (
                <DropdownItem
                    key={ day }
                    value={ day }
                    text={ dayweek(day - 1) }
                />
            )) }
        </Dropdown>

        <BarList
            marginTop="mt-8"
            data={ data.map((d, i) => ({
                key: i.toString(),
                name: d.t.toString(),
                value: d.v,
                icon: CgGlassAlt
            })) }
        />

    </>;

}