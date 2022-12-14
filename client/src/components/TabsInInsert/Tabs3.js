import { Avatar, HStack, Stack, Text, VStack } from '@chakra-ui/react';
import React from 'react';

const Tabs3 = () => {
    return (
        <VStack w='19.6vw' h='20vh' bgColor='blue.600' justify='center' borderRadius='15px'>
            <Stack w='90%' h='52%'>
                <Text color='white' fontSize='lg'>Nothing is more precious than independence and freedom.</Text>
            </Stack>
            <HStack w='90%' h='33%' >
                <Avatar name='Ho Chi Minh' src='https://upload.wikimedia.org/wikipedia/commons/1/1c/Ho_Chi_Minh_1946.jpg' />
                <Text color='white'>Ho Chi Minh</Text>
            </HStack>
        </VStack>
    );
};

export default Tabs3;