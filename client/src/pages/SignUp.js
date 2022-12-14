import {
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
  import React, { useState } from 'react';
  import { FaEye, FaEyeSlash } from 'react-icons/fa';
  import { Link } from 'react-router-dom';

  import axios from 'axios';
import Tabs3 from '../components/TabsInInsert/Tabs3';
import Tabs1 from '../components/TabsInInsert/Tabs1';
import Tabs2 from '../components/TabsInInsert/Tabs2';
  const SignUp = () => {
    const [show, setShow] = useState(false);
    const [showconfirm, setShowconfirm] = useState(false);
    const handleClick = () => setShow(!show);
    const handleClickConfirm = () => setShowconfirm(!showconfirm);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [confirm, setConfirm] = useState('');
    const toast = useToast();
    const handleCreate = () => {
      name.trim() === '' ? toast({
        title: 'Invalid Name',
        status: 'warning',
        isClosable: true,
      }) :
      /^[a-zA-Z]{2,}(?: [a-zA-Z]{2,}){1,}$/.test(name) === false ? toast({
        title: 'Invalid Name',
        status: 'warning',
        isClosable: true,
      }) :
      email.trim().length < 6 ? toast({
        title: 'Email must be at least 6 characters',
        status: 'warning',
        isClosable: true,
      }) :
      email.trim().length > 30 ? toast({
        title: 'Email must be 30 characters maximum',
        status: 'warning',
        isClosable: true,
      }) :
      pass.trim().length < 6 ? toast({
        title: 'Password must be at least 6 characters',
        status: 'warning',
        isClosable: true,
      }) :
      pass.trim().length > 30 ? toast({
        title: 'Password must be 30 characters maximum',
        status: 'warning',
        isClosable: true,
      }) :
      confirm.trim() !== pass.trim() ? toast({
        title: 'Password mismatch',
        status: 'warning',
        isClosable: true,
      }) :
      axios({
        baseURL: 'http://localhost:8000/signup',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({
          name: name,
          email: email + '@gmail.com',
          password: pass
        }),
      })
        .then(res => {
          console.log(res.data);
          localStorage.setItem('name', name);
          toast({
            title: 'Sign Up Success',
            status: 'success',
            isClosable: true,
          })
        }).catch(error => {
          console.log(error);
          toast({
            title: 'Please check again!!!',
            status: 'error',
            isClosable: true,
          });
        })
    }
    
    return (
      <HStack w="100vw" h="100vh" bgColor="#A4ADC5" justify="center">
        <HStack w="80%" h="85%" bgColor="white" borderRadius="15px">
          <VStack
            w="35%"
            h="100%"
            bgColor="blue.500"
            borderTopLeftRadius="15px"
            borderBottomLeftRadius="15px"
            justifyContent="space-around"
          >
            <Stack w="70%" h="10%">
              <Text fontWeight="500" color="white" fontSize="xl">
                NTD
              </Text>
            </Stack>
            <Stack w="70%" h="20%">
              <Text fontWeight="700" color="white" fontSize="3xl">
                Start your journey with us.
              </Text>
            </Stack>
            <Stack w="70%" h="40%">
              <Tabs defaultIndex={1}>
                <TabPanels>
                  <TabPanel>
                    <Tabs3 />
                  </TabPanel>
                  <TabPanel>
                    <Tabs1 />
                  </TabPanel>
                  <TabPanel>
                    <Tabs2 />
                  </TabPanel>
                </TabPanels>
                <TabList>
                  <Tab color="white">Uncle Ho</Tab>
                  <Tab color="white">Leonardo</Tab>
                  <Tab color="white">Einstein</Tab>
                </TabList>
              </Tabs>
            </Stack>
          </VStack>
          <VStack w="65%" h="100%" justifyContent="space-around">
            <Stack w="80%" h="10%">
              <Text color="black" fontWeight="700" fontSize="2xl">
                Sign up
              </Text>
              <Text color="black" fontWeight="400" fontSize="md">
                Have an account? <Link to="/">Login</Link>
              </Text>
            </Stack>
            <VStack w="80%" h="50%">
              <Stack w="100%" h="25%">
                <Text color="black" fontSize="md">
                  Name
                </Text>
                <Input
                  placeholder="Enter your name"
                  value={name}
                  onChange={e => {
                    setName(e.target.value);
                  }}
                />
              </Stack>
              <Stack w="100%" h="25%">
                <Text color="black" fontSize="md">
                  Email
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
              </Stack>
              <Stack w="100%" h="25%">
                <Text color="black" fontSize="md">
                  Password
                </Text>
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
                      {show ? <FaEyeSlash /> : <FaEye />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Stack>
              <Stack w="100%" h="25%">
                <Text color="black" fontSize="md">
                  Confirm password
                </Text>
                <InputGroup size="md">
                  <Input
                    pr="4.5rem"
                    type={showconfirm ? 'text' : 'password'}
                    placeholder="Enter confirm password"
                    value={confirm}
                    onChange={e => {
                      setConfirm(e.target.value);
                    }}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClickConfirm}>
                      {showconfirm ? <FaEyeSlash /> : <FaEye />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Stack>
            </VStack>
            <Stack w="80%" h="10%">
              <Button colorScheme="blue" onClick={handleCreate}>Create</Button>
            </Stack>
          </VStack>
        </HStack>
      </HStack>
    );
  };
  
  export default SignUp;
  