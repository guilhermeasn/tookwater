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

export default function Main({ update = 0, onUpdate = () => {}, onAction = () => {} } : CardProps) {

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
        onAction('prompt', {

            title: 'Alterar meta de consumo de água',
            content: 'Dica: para a maioria das pessoas o consumo ideal de água é 35 ml por kg de peso corporal',
            placeholder: 'Digite a quantidade ...',
            value: settings.goal.toString(),

            onChange: value => value.replace(/\D/g, ''),

            onConfirm: value => {

                const goal = parseInt(value);

                if(!isNaN(goal)) {
                    setSettings({ ...settings, goal });
                    onUpdate();
                }

            }
            
        });        
    }

    function pause() {
        setWait(true);
        setTimeout(() => setWait(false), 1000);
    }

    function addWater(event : React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        insert(settings.water);
        onUpdate();
        pause();
    };

    function delWater(index : number, water : number) {
        onAction('confirm', {
            content: `Excluir ${ water } ml de água?`,
            onConfirm: () => {
                remove(day.date, index);
                onUpdate();
                pause();
            }
        });
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
            color={ porcent < 50 ? 'red' : porcent < 100 ? 'yellow' : 'green' }
            marginTop="mt-8"
        />

        <form onSubmit={ addWater } className='my-5 p-5 bg-slate-500 rounded'>

            <TextInput
                name='water'
                value={ settings.water !== 0 ? settings.water.toString() : '' }
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
                    type='submit'
                    disabled={ settings.water === 0 }
                    loading={ wait }
                />

            </Flex>

        </form>

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
                                onClick={ () => delWater(index, data.v) }
                                disabled={ wait }
                            />
                        </Flex>
                    </ListItem>
                )) }
            </List>
            
        </> }

    </>;

}