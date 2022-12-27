import {
    Card,
    Title,
    Text,
    ColGrid,
} from '@tremor/react';
import History from './History';

import Main from './Main';

export default function Dashboard() {

    return (

        <main className='bg-slate-50 p-6 sm:p-10'>

            <Title>Took Water</Title>
            <Text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</Text>

            <ColGrid numColsMd={ 2 } gapX="gap-x-6" gapY="gap-y-6" marginTop="mt-6">

                <Card maxWidth="max-w-md" shadow>
                    <Main />
                </Card>
                
                <Card maxWidth="max-w-md" shadow>
                    <History />
                </Card>

            </ColGrid>

        </main>

    );

}