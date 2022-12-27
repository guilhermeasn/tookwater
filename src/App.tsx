import {
    Card,
    Title,
    Text,
    ColGrid
} from '@tremor/react';

export default function Dashboard() {

    return (

        <main className='bg-slate-50 p-6 sm:p-10'>

            <Title>TookWater</Title>
            <Text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</Text>

            <ColGrid numColsLg={ 2 } gapX="gap-x-6" gapY="gap-y-6" marginTop="mt-6">

                <Card>
                    { /* Placeholder to set height */ }
                    <div className="h-28" />
                </Card>
                
                <Card>
                    { /* Placeholder to set height */ }
                    <div className="h-28" />
                </Card>

            </ColGrid>

        </main>

    );

}