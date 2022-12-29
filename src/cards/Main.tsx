import type {
    CardProps,
    Day,
    Settings
} from '../support/types';

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

import {
    dayWeek,
    sum
} from '../support/helpers';

import {
    getDay,
    getSettings,
    insert,
    remove,
    saveSettings
} from '../support/data';

export default function Main({ update = 0, onUpdate = () => {} } : CardProps) {

    const [ day, setDay ] = useState<Day>(getDay());
    const [ wait, setWait ] = useState<boolean>(false);
    const [ settings, setSettings ] = useState<Settings>(getSettings());

    const sumDay  : number = sum(day);
    const porcent : number = Math.round(sumDay * 100 / settings.goal);

    useEffect(() => setDay(getDay()), [ update ]);
    useEffect(() => saveSettings(settings), [ settings ]);

    function changeWater(value : string) {
        const water : number = parseInt(value.replace(/\D/g, '').substring(0,3))
        setSettings({ ...settings, water : isNaN(water) ? 0 : water });
    }

    function changeGoal() {

        const goal = parseInt(prompt('Alterar meta de consumo de água', settings.goal.toString())?.replace(/\D/g, '') ?? '');

        if(!isNaN(goal)) {
            setSettings({ ...settings, goal });
            onUpdate();
        }
        
    }

    function pause() {
        setWait(true);
        setTimeout(() => setWait(false), 1000);
    }

    function addWater() {
        insert(settings.water);
        onUpdate();
        pause();
    };

    function delWater(index : number) {
        remove(day.date, index);
        onUpdate();
        pause();
    }

    return <>

        <Text textAlignment='text-center'>
            { dayWeek(day.date) }
        </Text>

        <Flex justifyContent="justify-center" spaceX="space-x-1" alignItems="items-baseline">
            <Metric>{ sumDay.toLocaleString() } ml</Metric>
            <Text>/</Text>
            <ButtonInline
                text={ settings.goal.toLocaleString() + ' ml' }
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
                value={ settings.water !== 0 ? settings.water.toLocaleString().toString() : '' }
                onChange={ i => changeWater(i.currentTarget.value) }
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
                    onClick={ addWater }
                    disabled={ settings.water === 0 }
                    loading={ wait }
                />

            </Flex>

        </div>

        { day.data.length > 0 && <>

            <Flex>
                <Text><Bold>Horário</Bold></Text>
                <Text><Bold>Quantidade</Bold></Text>
            </Flex>

            <List>
                { day.data.map((data, index) => (
                    <ListItem key={ index }>
                        <Flex justifyContent='justify-start'>
                            <CgTime className='mr-1' />
                            { data.t }
                        </Flex>
                        <Flex justifyContent='justify-end'>
                            <span className='mr-1'>{ data.v }&nbsp;ml</span>
                            <ButtonInline
                                color='red'
                                text='X'
                                onClick={ () => delWater(index) }
                                disabled={ wait }
                            />
                        </Flex>
                    </ListItem>
                )) }
            </List>
            
        </> }

    </>;

}