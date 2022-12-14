import { Avatar, HStack, Stack, Text, VStack } from '@chakra-ui/react';
import React from 'react';

const Tabs3 = () => {
    return (
        <VStack w='35vw' h='40vh' bgColor='blue.600' justify='center' borderRadius='15px'>
            <Stack w='90%' h='52%'>
                <Text color='white' fontSize='lg'>The greatest enemy of knowledge is not ignorance; it is the illusion of knowledge.</Text>
            </Stack>
            <HStack w='90%' h='33%' >
                <Avatar name='Stephen Hawking' src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Stephen_Hawking.StarChild.jpg/230px-Stephen_Hawking.StarChild.jpg' />
                <Text color='white'>Stephen Hawking</Text>
            </HStack>
        </VStack>
    );
};

export default Tabs3;