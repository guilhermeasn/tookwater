import type {
    ActionData
} from './support/types';

import {
    Card,
    Title,
    Text,
    ColGrid,
    Flex,
    Divider
} from '@tremor/react';

import {
    Main,
    Data,
    Chart
} from './cards';

import { useState } from 'react';
import { GoLogoGithub } from 'react-icons/go';

import Modals from './modals';
import DevIcon from './support/gndevbr';

export default function Dashboard() {

    const classSection = 'bg-slate-50 m-0 px-6 sm:px-12 md:px-18 lg:px-24';

    const [ update, setUpdate ] = useState<number>(0);
    const [ action, setAction ] = useState<ActionData>();

    return <>

        <header className={ classSection }>

            <Flex justifyContent='justify-start' alignItems='items-center'>

                <img
                    className='m-4'
                    src='./logo192.png'
                    title='tookwater'
                    alt='tookwater'
                    width={ 64 }
                    height={ 64 }
                />

                <div>
                    <Title>Took Water</Title>
                    <Text>Gestão diária de ingestão de água</Text>
                </div>
                
            </Flex>

        </header>

        <main className={ classSection }>

            <ColGrid numColsMd={ 2 } gapX="gap-x-8" gapY="gap-y-8" marginTop="mt-8">

                <Card shadow>
                    <Main
                        update={ update }
                        onUpdate={ () => setUpdate(update => update + 1)}
                        onAction={ (type, payload) => setAction({ type, payload }) }
                    />
                </Card>
                
                <Card shadow>
                    <Data
                        update={ update }
                        onUpdate={ () => setUpdate(update => update + 1)}
                        onAction={ (type, payload) => setAction({ type, payload }) }
                    />
                </Card>

            </ColGrid>

            <Card marginTop='mt-8' shadow>
                <Chart
                    update={ update }
                    onUpdate={ () => setUpdate(update => update + 1)}
                    onAction={ (type, payload) => setAction({ type, payload }) }
                />
            </Card>

        </main>

        <footer className={ classSection + ' text-slate-500' }>

            <Divider />

            <Flex marginTop='-mt-8'>
                <span>
                    <a href='https://github.com/guilhermeasn/tookwater' title='github' className='text-white-50' target='_blank' rel='noreferrer noopener'>
                        <GoLogoGithub fill='#24292f' size={ 40 } />
                    </a>
                </span>
                <small>
                    <a href='http://gn.dev.br/' title='gn.dev.br' className='small text-white-50' target='_blank' rel='noreferrer noopener'>
                        <DevIcon fill='#041820' width={ 80 } />
                    </a>
                </small>
            </Flex>

        </footer>

        <Modals action={ action } />

    </>;

}