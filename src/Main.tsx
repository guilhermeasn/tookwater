import {
    Text,
    Flex,
    Metric,
    ProgressBar,
    TextInput,
    Button,
    ButtonInline,
    Bold,
    List,
    ListItem
} from '@tremor/react';

import {
    CgGlassAlt,
    CgTime
} from 'react-icons/cg';

import {
    useState,
    useEffect
} from 'react';

import { UpdateProps } from './App';

export type Data = {
    t: string;  // time
    v: number;  // value
};

export type History = {
    dayweek: number;
    dataset: Data[]
}

export default function Main({ update = 0, onUpdate = () => {} } : UpdateProps) {

    const [ wait, setWait ] = useState<boolean>(false);
    const [ goal, setGoal ] = useState<number>(parseInt(localStorage.getItem('goal') ?? '2500'));
    const [ water, setWater ] = useState<string>(localStorage.getItem('water') ?? '');

    const [ history, setHistory] = useState<History>({
        dayweek: new Date().getDay(),
        dataset: []
    });

    useEffect(() => {

        setHistory({
            dayweek: new Date().getDay(),
            dataset: JSON.parse(localStorage.getItem(new Date().getDay().toString().toString()) || '[]')
        });

    }, [ update ]);

    useEffect(() => localStorage.setItem('goal', goal.toString()), [ goal ]);
    useEffect(() => localStorage.setItem('water', water), [ water ]);

    function add(data : Data) {

        setWait(true);
        setTimeout(() => setWait(false), 1000);

        const dayweek : number = new Date().getDay();

        if(parseInt(localStorage.getItem('next') ?? '') === dayweek) localStorage.setItem(dayweek.toString(), '[]');
        localStorage.setItem('next', (dayweek === 6 ? 0 : dayweek + 1).toString());

        const dataset : Data[] = [ data, ...(JSON.parse(localStorage.getItem(dayweek.toString()) ?? '[]')) ];

        setHistory({ dayweek, dataset });
        localStorage.setItem(dayweek.toString(), JSON.stringify(dataset));

        onUpdate();

    };

    function del(index : number, dayweek: number) {

        setWait(true);
        setTimeout(() => setWait(false), 1000);

        let dataset : Data[] = JSON.parse(localStorage.getItem(dayweek.toString()) ?? '[]');
        dataset.splice(index, 1);

        localStorage.setItem(dayweek.toString(), JSON.stringify(dataset));

        dayweek = new Date().getDay();
        dataset = JSON.parse(localStorage.getItem(dayweek.toString()) ?? '[]');

        setHistory({ dayweek, dataset });

        onUpdate();

    }

    const current : number = history.dataset.reduce((p, c) => p + c.v, 0);
    const porcent : number = Math.round(current * 100 / goal);

    function changeGoal() {

        const g = parseInt(prompt('Alterar meta de consumo de água', goal.toString())?.replace(/\D/g, '') ?? '');

        if(!isNaN(g)) {
            setGoal(g);
            onUpdate();
        }
        
    }

    return <>

        <Text textAlignment='text-center'>
        </Text>

        <Flex justifyContent="justify-center" spaceX="space-x-1" alignItems="items-baseline">
            <Metric>{ current.toLocaleString() } ml</Metric>
            <Text>/</Text>
            <ButtonInline
                text={ goal.toLocaleString() + ' ml' }
                onClick={ changeGoal }
                disabled={ wait }
            />
        </Flex>

        <ProgressBar
            percentageValue={ porcent }
            color={ porcent < 40 ? 'red' : porcent < 80 ? 'yellow' : 'green' }
            marginTop="mt-8"
        />

        <div className='my-5 p-5 bg-slate-500 rounded'>

            <TextInput
                name='water'
                value={ water ? parseInt(water).toLocaleString().toString() : '' }
                onChange={ i => setWater(i.currentTarget.value.replace(/\D/g, '').substring(0,3) ) }
                placeholder="Digite a quantidade ..."
                maxWidth="max-w-none"
                disabled={ wait }
            />

            <Flex justifyContent="justify-center" marginTop='mt-8'>

                <Button
                    size="lg"
                    color='amber'
                    icon={ CgGlassAlt }
                    importance="primary"
                    text="Adicionar"
                    onClick={() => add({ t: new Date().toLocaleTimeString(), v: parseInt(water) })}
                    disabled={ !water }
                    loading={ wait }
                />

            </Flex>

        </div>

        { history.dataset.length > 0 && <>

            <Flex>
                <Text><Bold>Horário</Bold></Text>
                <Text><Bold>Quantidade</Bold></Text>
            </Flex>

            <List>
                { history.dataset.map((data, index) => (
                    <ListItem key={ index }>
                        <Flex justifyContent='justify-start'>
                            <CgTime className='mr-1' />
                            { data.t }
                        </Flex>
                        <Flex justifyContent='justify-end'>
                            <span className='mr-1'>{ data.v }&nbsp;ml</span>
                            <ButtonInline color='red' text='X' onClick={ () => del(index, history.dayweek) } disabled={ wait } />
                        </Flex>
                    </ListItem>
                )) }
            </List>
            
        </> }

    </>;

}