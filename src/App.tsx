import {
    Action,
    ModalProps
} from './support/types';

import {
    Card,
    Title,
    Text,
    ColGrid,
    Flex,
    Divider
} from '@tremor/react';

import Main from './cards/Main';
import Data from './cards/Data';
import Chart from './cards/Chart';

import { useState } from 'react';
import { GoLogoGithub } from 'react-icons/go';

import DevIcon from './support/gndevbr';

import Confirm from './modals/Confirm';
import Prompt from './modals/Prompt';

export default function Dashboard() {

    const classSection = 'bg-slate-50 m-0 px-6 sm:px-12 md:px-18 lg:px-24';

    const [ update, setUpdate ] = useState<number>(0);

    const [ confirm, setConfirm ] = useState<ModalProps>({
        show: false,
        title: 'Confirmar',
        content: '',
        onHide: () => setConfirm(confirm => ({ ...confirm, show: false })),
        onConfirm: () => {}
    });

    const [ prompt, setPrompt ] = useState<ModalProps>({
        show: false,
        title: 'Informar',
        content: '',
        onHide: () => setPrompt(confirm => ({ ...confirm, show: false })),
        onConfirm: () => {}
    })

    const action : Action = (type, payload) => {
        switch(type) {
            case 'confirm': setConfirm(confirm => ({ ...confirm, ...payload, show: true })); break;
            case 'prompt':  setPrompt(prompt => ({ ...prompt, ...payload, show: true }));    break;
        }
    }

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
                        onAction={ action }
                    />
                </Card>
                
                <Card shadow>
                    <Data
                        update={ update }
                        onUpdate={ () => setUpdate(update => update + 1)}
                        onAction={ action }
                    />
                </Card>

            </ColGrid>

            <Card marginTop='mt-8' shadow>
                <Chart
                    update={ update }
                    onUpdate={ () => setUpdate(update => update + 1)}
                    onAction={ action }
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

        <Confirm { ...confirm } />
        <Prompt { ...prompt } />

    </>;

}