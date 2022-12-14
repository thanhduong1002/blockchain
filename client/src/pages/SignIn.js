import {
    Avatar,
    Button,
    HStack,
    Input,
    InputGroup,
    InputRightAddon,
    InputRightElement,
    Stack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    useToast,
    VStack,
  } from '@chakra-ui/react';
  import axios from 'axios';
  import React, { useState } from 'react';
  import { Link, useNavigate } from 'react-router-dom';
import Tabs1 from '../components/TabsInSignIn/Tabs1';
import Tabs2 from '../components/TabsInSignIn/Tabs2';
import Tabs3 from '../components/TabsInSignIn/Tabs3';
  
  const SignIn = () => {
    const navigate = useNavigate();
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const toast = useToast();
    const handleLogin = () => {
      email.trim() === '' ? toast({
        title: 'Please enter your email',
        status: 'warning',
        isClosable: true,
      }) : pass.trim() === '' ? toast({
        title: 'Please enter your password',
        status: 'warning',
        isClosable: true,
      }) : axios({
        baseURL: 'http://localhost:8000/login',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({
          email: email + '@gmail.com',
          password: pass
        }),
      })
        .then(res => {
          localStorage.setItem('name',res.data.internal_message);
          res.status === 200 ? navigate('/home') : toast({
            title: res.message,
            status: 'error',
            isClosable: true,
          })
        }).catch(error => {
          console.log(error);
          toast({
              title: error.response.data.message,
              status: 'error',
              isClosable: true,
            })
        });
    };
    return (
      <Stack bgColor="#E7ECF4" w="100vw" h="100vh">
        <HStack w="100%" h="100%" justify="center">
          <Stack
            bgColor="blue.500"
            w="42%"
            h="85%"
            borderTopLeftRadius="30px"
            borderBottomLeftRadius="30px"
            justify="center"
          >
            <Tabs defaultIndex={1}>
              <TabPanels>
                <TabPanel>
                  <Tabs1 />
                </TabPanel>
                <TabPanel>
                  <Tabs2 />
                </TabPanel>
                <TabPanel>
                  <Tabs3 />
                </TabPanel>
              </TabPanels>
              <TabList>
                <Tab color="white">Thomas</Tab>
                <Tab color="white">Nobel</Tab>
                <Tab color="white">Stephen</Tab>
              </TabList>
            </Tabs>
          </Stack>
          <VStack
            bgColor="white"
            w="42%"
            h="85%"
            borderTopRightRadius="30px"
            borderBottomRightRadius="30px"
            justify="center"
          >
            <HStack w="65%" h="5%" justify="center">
              <Avatar
                name="GAM"
                src="https://upload.wikimedia.org/wikipedia/vi/b/b1/GAMesportslogo.png"
                size="md"
              />
            </HStack>
            <HStack w="65%" h="5%" justify="center">
              <Text fontWeight="700" fontSize="4xl">
                Hello Again!
              </Text>
            </HStack>
            <HStack w="65%" h="5%" justify="center">
              <Text>Welcome back! Best wish for you!</Text>
            </HStack>
            <HStack w="65%" h="5%">
              <Text fontWeight="700">Email</Text>
            </HStack>
            <HStack w="65%" h="10%">
              <InputGroup>
                <Input
                  placeholder="Your gmail"
                  value={email}
                  onChange={e => {
                    setEmail(e.target.value);
                  }}
                />
                <InputRightAddon children="@gmail.com" />
              </InputGroup>
            </HStack>
            <HStack w="65%" h="5%">
              <Text fontWeight="700">Password</Text>
            </HStack>
            <HStack w="65%" h="10%">
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={show ? 'text' : 'password'}
                  placeholder="Enter password"
                  value={pass}
                  onChange={e => {
                    setPass(e.target.value);
                  }}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </HStack>
            <Stack w="65%" h="7%" flexDirection="row-reverse">
              <Link to="/reset">Forgot password?</Link>
            </Stack>
            <HStack w="65%" h="7%">
              <Button w="100%" h="100%" colorScheme="blue" onClick={handleLogin}>
                Login
              </Button>
            </HStack>
            <HStack w="65%" h="7%">
            </HStack>
            <HStack w="65%" h="20%" flexDirection="column-reverse">
              <Text>
                Don't have an account yet?<Link to="/signup">Sign Up</Link>
              </Text>
            </HStack>
          </VStack>
        </HStack>
      </Stack>
    );
  };
  
  export default SignIn;
  