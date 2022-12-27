import { Card, Text, Metric, Flex, ProgressBar } from "@tremor/react";

export default function App() {

    return (
        <Card maxWidth="max-w-sm" marginTop="mt-5">
            <Text>Sales</Text>
            <Metric>$ 71,465</Metric>
            <Flex marginTop='mt-4'>
                <Text>32% of annual target</Text>
                <Text>$ 225,000</Text>
            </Flex>
            <ProgressBar percentageValue={ 32 } marginTop="mt-2" />
        </Card>
    );

};
