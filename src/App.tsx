import {
    Card,
    Title,
    Text,
    ColGrid,
} from '@tremor/react';

import Main from './Main';
import Data from './Data';
import Chart from './Chart';

import { useState } from 'react';

export default function Dashboard() {

    const [ update, setUpdate ] = useState<number>(0);

    return (

        <main className='bg-slate-50 p-6 sm:px-12 md:px-18 lg:px-24'>

            <Title>Took Water</Title>
            <Text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</Text>

            <ColGrid numColsMd={ 2 } gapX="gap-x-6" gapY="gap-y-6" marginTop="mt-8">

                <Card shadow>
                    <Main onUpdated={ () => setUpdate(update => update + 1)} />
                </Card>
                
                <Card shadow>
                    <Data update={ update } />
                </Card>

            </ColGrid>

            <Card marginTop='mt-8' shadow>
                <Chart update={ update } />
            </Card>

        </main>

    );

}