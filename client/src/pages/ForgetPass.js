import {
    Avatar,
    Button,
    HStack,
    Input,
    InputGroup,
    InputRightAddon,
    Stack,
    Text,
    useToast,
    VStack,
  } from '@chakra-ui/react';
  import React, { useState } from 'react';
  import { Link } from 'react-router-dom';
  import axios from 'axios';
  
  const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const toast = useToast();
    const handleReset = () => {
      email.trim() !== '' ? 
      axios({
        baseURL: 'http://localhost:8000/sendMail',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({
          email: email + '@gmail.com'
        }),
      })
        .then(res => {
          console.log(res.data);
          res.data.status === 200 ? toast({
            title: 'Email sent successfully',
            status: 'success',
            isClosable: true,
          }) : toast({
            title: 'Error!!! Please check again',
            status: 'error',
            isClosable: true,
          })
        }).catch(error => {
          console.log(error);
        }) : toast({
          title: 'Please fill in your email',
          status: 'warning',
          isClosable: true,
        })
      } 
    return (
      <VStack w="100vw" h="100vh" justify="center">
        <Avatar
          name="Key"
          src="https://iheartcraftythings.com/wp-content/uploads/2021/07/6-62.jpg"
          size="xl"
        />
        <Text fontSize="3xl" fontWeight="700">
          Forgot password?
        </Text>
        <Text>No worries. We 'll send you new password.</Text>
        <Stack w="30%" h="20%" borderRadius="30px" marginTop="10px">
          <Text fontWeight="600" fontSize="xl">
            Your email
          </Text>
          <InputGroup>
            <Input
              placeholder="Enter your email"
              value={email}
              onChange={e => {
                setEmail(e.target.value);
              }}
            />
            <InputRightAddon children="@gmail.com" />
          </InputGroup>
          <Stack w="100%" h="25%">
            <Button w="100%" h="100%" colorScheme="blue" onClick={handleReset}>
              <Text>Reset password</Text>
            </Button>
          </Stack>
        </Stack>
        <Link to="/">Back to login</Link>
      </VStack>
    );
  };
  
  export default ResetPassword;
  