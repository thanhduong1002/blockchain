import {Button, Image, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
const NotFoundPage = () => {
    const navigate = useNavigate();
    return (
        <VStack w='100vw' h='100vh' justify='center'>
            <Text fontSize='5xl'>404 Not Found Page</Text>
            <Image h='60vh' src='https://cdn.svgator.com/images/2022/01/funny-404-error-page-design.gif' />
            <Button colorScheme='blue' onClick={()=>navigate('/')}>Back to Login</Button>
        </VStack>
    );
};

export default NotFoundPage;