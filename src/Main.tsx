import {
    Text,
    Flex,
    Metric,
    ProgressBar,
    TextInput,
    Button,
    ButtonInline,
    BarList,
    Bold
} from '@tremor/react';

import {
    CgGlassAlt,
    CgTime,
    CgAdd
} from 'react-icons/cg';

import {
    useState,
    useEffect
} from 'react';

type Data = Array<{
    t: string;
    v: number;
}>;

export default function Main() {

    const [ wait, setWait ] = useState<boolean>(false);
    const [ goal, setGoal ] = useState<number>(parseInt(localStorage.getItem('goal') ?? '2500'));
    const [ water, setWater ] = useState<string>(localStorage.getItem('water') ?? '');
    const [ history, setHistory] = useState<Data>(JSON.parse(localStorage.getItem(new Date().toLocaleDateString()) || '[]'));

    useEffect(() => localStorage.setItem('goal', goal.toString()), [ goal ]);
    useEffect(() => localStorage.setItem('water', water), [ water ]);

    useEffect(() => {
        setWait(true);
        setTimeout(() => setWait(false), 1000);
        localStorage.setItem(new Date().toLocaleDateString(), JSON.stringify(history));
    }, [ history ]);

    const current : number = history.reduce((p, c) => p + c.v, 0);

    function changeGoal() {
        const g = parseInt(prompt('Alterar meta de consumo de água', goal.toString())?.replace(/\D/g, '') ?? '');
        if(!isNaN(g)) setGoal(g);
    }

    return <>
    
        <Flex justifyContent="justify-center">
            <ButtonInline
                text='Alterar Meta'
                onClick={ changeGoal }
            />
        </Flex>

        <Flex justifyContent="justify-center" spaceX="space-x-1" alignItems="items-baseline">
            <Metric>{ current.toLocaleString() } ml</Metric>
            <Text>/ { goal.toLocaleString() } ml</Text>
        </Flex>

        <ProgressBar
            percentageValue={ Math.round(current * 100 / goal) }
            color="sky"
            marginTop="mt-6"
        />

        <div className='my-5 p-5 bg-slate-500 rounded'>

            <TextInput
                value={ water ? parseInt(water).toLocaleString().toString() : '' }
                onChange={ i => setWater(i.currentTarget.value.replace(/\D/g, '').substring(0,4) ) }
                placeholder="Digite a quantidade ..."
                maxWidth="max-w-none"
                icon={ CgGlassAlt }
            />

            <Flex justifyContent="justify-center" marginTop='mt-6'>

                <Button
                    size="lg"
                    color='amber'
                    icon={ CgAdd }
                    importance="primary"
                    text="Adicionar"
                    onClick={() => setHistory(history => [ { t: new Date().toLocaleTimeString().substring(0, 5), v: parseInt(water) }, ...history ])}
                    disabled={ !water }
                    loading={ wait }
                />

            </Flex>

        </div>

        { history.length > 0 && <>

            <Flex>
                <Text><Bold>Horário</Bold></Text>
                <Text><Bold>Quantidade</Bold></Text>
            </Flex>

            <BarList
                marginTop='mt-2'
                valueFormatter={ v => `${ v } ml` }
                data={ history.map((data, index) => ({
                    name: data.t,
                    value: data.v,
                    key: index.toString(),
                    icon: CgTime
                })) }
                showAnimation
            />
            
        </> }

    </>;

}