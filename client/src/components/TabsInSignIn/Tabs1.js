import { Avatar, HStack, Stack, Text, VStack } from '@chakra-ui/react';
import React from 'react';

const Tabs1 = () => {
    return (
        <VStack w='35vw' h='40vh' bgColor='blue.600' justify='center' borderRadius='15px'>
            <Stack w='90%' h='52%'>
                <Text color='white' fontSize='lg'>Genius is one percent inspiration and ninety-nine percent perspiration.</Text>
            </Stack>
            <HStack w='90%' h='33%' >
                <Avatar name='Thomas Edison' src='http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcRsWLVF3JTFBj1_hnGNWFngZUmte1C0--rCCaw2jQ9_hvquZWtBMcEvZ2oQU2iqzFNi' />
                <Text color='white'>Thomas Edison</Text>
            </HStack>
        </VStack>
    );
};

export default Tabs1;