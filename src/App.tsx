import {
    Card,
    Title,
    Text,
    ColGrid,
    Flex,
    Divider
} from '@tremor/react';

import Main from './Main';
import Data from './Data';
import Chart from './Chart';

import { useState } from 'react';

export default function Dashboard() {

    const classSection = 'bg-slate-50 m-0 px-6 sm:px-12 md:px-18 lg:px-24';
    const [ update, setUpdate ] = useState<number>(0);

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
                    />
                </Card>
                
                <Card shadow>
                    <Data
                        update={ update }
                        onUpdate={ () => setUpdate(update => update + 1)}
                    />
                </Card>

            </ColGrid>

            <Card marginTop='mt-8' shadow>
                <Chart
                    update={ update }
                    onUpdate={ () => setUpdate(update => update + 1)}
                />
            </Card>

        </main>

        <footer className={ classSection + ' text-slate-500' }>

            <Divider />

            <Flex marginTop='-mt-5'>
                <small>MIT License</small>
                <small>
                    <a href='http://gn.dev.br/' className='small text-white-50' target='_blank' rel='noreferrer noopener'>
                        &lt;gn.dev.br/&gt;
                    </a>
                </small>
            </Flex>

        </footer>

    </>;

}