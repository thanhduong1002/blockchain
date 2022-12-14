import { Avatar, HStack, Stack, Text, VStack } from '@chakra-ui/react';
import React from 'react';

const Tabs1 = () => {
    return (
        <VStack w='19.6vw' h='20vh' bgColor='blue.600' justify='center' borderRadius='15px'>
            <Stack w='90%' h='52%'>
                <Text color='white' fontSize='lg'>Simplicity is the ultimate sophistication.</Text>
            </Stack>
            <HStack w='90%' h='33%' >
                <Avatar name='Leonardo da Vinci' src='http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcR8gQcD5ewEV7b-FcPzhJ2u6OGX_lChJROgta0c6zyRPPLSe2ES6yKJQvxiQOoyjdhp' />
                <Text color='white'>Leonardo da Vinci</Text>
            </HStack>
        </VStack>
    );
};

export default Tabs1;