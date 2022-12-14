import { Avatar, HStack, Stack, Text, VStack } from '@chakra-ui/react';
import React from 'react';

const Tabs2 = () => {
    return (
        <VStack  w='35vw' h='40vh' bgColor='blue.600' justify='center' borderRadius='15px'>
            <Stack w='90%' h='52%'>
                <Text color='white' fontSize='lg'>War is the greatest of all crimes.</Text>
            </Stack>
            <HStack w='90%' h='33%' >
                <Avatar name='Alfred Nobel' src='https://image.bnews.vn/MediaUpload/Org/2016/09/29/150300_alfred-nobel.jpg' />
                <Text color='white'>Alfred Nobel</Text>
            </HStack>
        </VStack>
    );
};

export default Tabs2;