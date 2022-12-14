import { Avatar, HStack, Stack, Text, VStack } from '@chakra-ui/react';
import React from 'react';

const Tabs2 = () => {
    return (
        <VStack w='19.6vw' h='20vh' bgColor='blue.600' justify='center' borderRadius='15px'>
            <Stack w='90%' h='52%'>
                <Text color='white' fontSize='lg'>Anyone who has never made a mistake has never tried anything new.</Text>
            </Stack>
            <HStack w='90%' h='33%' >
                <Avatar name='AlbertEinstein' src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Albert_Einstein_Head.jpg/1536px-Albert_Einstein_Head.jpg' />
                <Text color='white'>Albert Einstein</Text>
            </HStack>
        </VStack>
    );
};

export default Tabs2;