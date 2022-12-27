import { Datepicker } from "@tremor/react";

export default function History() {

    return <>
    
        <Datepicker
            maxWidth="max-w-lg"
            maxDate={ new Date() }
            handleSelect={ (s, e) => console.dir({
                start: s.toLocaleDateString('pt-BR'),
                end: e.toLocaleDateString('pt-BR')
            }) }
        />

    </>;

}