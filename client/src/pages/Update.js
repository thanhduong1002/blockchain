import {
    Button,
    HStack,
    Input,
    InputGroup,
    InputRightAddon,
    InputRightElement,
    Radio,
    RadioGroup,
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
  const Update = () => {

    const [name, setName] = useState(localStorage.getItem('nameSup'));
    const [email, setEmail] = useState(localStorage.getItem('typeSup'));
    const [pass, setPass] = useState(localStorage.getItem('countSup'));
    const [confirm, setConfirm] = useState(localStorage.getItem('unitSup'));
    const toast = useToast();
    const handleCreate = () => {
      name.trim() === '' ? toast({
        title: 'Invalid Name',
        status: 'warning',
        isClosable: true,
      }) :
      email.trim().length < 6 ? toast({
        title: 'Type must be at least 6 characters',
        status: 'warning',
        isClosable: true,
      }) :
      email.trim().length > 30 ? toast({
        title: 'Type must be 30 characters maximum',
        status: 'warning',
        isClosable: true,
      }) :
      pass.trim().length === 0 ? toast({
        title: 'Please enter the count',
        status: 'warning',
        isClosable: true,
      }) :
      confirm.trim().length === 0 ? toast({
        title: 'Please enter the unit',
        status: 'warning',
        isClosable: true,
      }) :
      axios({
        baseURL: 'http://localhost:8000/update',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({
            name:name,
          type: email,
          count: Number(pass),
          unit : confirm
        }),
      })
        .then(res => {
          console.log(res.data.status);
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
                Supplies
              </Text>
            </Stack>
            <Stack w="70%" h="20%">
              <Text fontWeight="700" color="white" fontSize="3xl">
                Start update your supplies.
              </Text>
            </Stack>
            <Stack w="70%" h="40%">
              <Tabs defaultIndex={0}>
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
                UPDATE
              </Text>
              <Text color="black" fontWeight="400" fontSize="md">
                You don't want update? <Link to="/home">Back</Link>
              </Text>
            </Stack>
            <VStack w="80%" h="50%">
              <Stack w="100%" h="25%">
                <Text color="black" fontSize="md">
                  Name
                </Text>
                <Input
                  placeholder="Enter your supplies name"
                  value={name}
                  onChange={e => {
                    setName(e.target.value);
                  }}
                  disabled={true}
                />
              </Stack>
              <Stack w="100%" h="25%">
                <Text color="black" fontSize="md">
                  Type
                </Text>
                  <Input
                    placeholder="Enter your supplies type"
                    value={email}
                    onChange={e => {
                      setEmail(e.target.value);
                    }}
                  />
              </Stack>
              <Stack w="100%" h="25%">
                <Text color="black" fontSize="md">
                  Count
                </Text>
                  <Input
                    pr="4.5rem"
                    placeholder="Enter count"
                    value={pass}
                    onChange={e => {
                      setPass(e.target.value);
                    }}
                  />
              </Stack>
              <Stack w="100%" h="25%">
                <Text color="black" fontSize="md">
                  Unit
                </Text>
                  <Input
                    pr="4.5rem"
                    placeholder="Enter unit"
                    value={confirm}
                    onChange={e => {
                      setConfirm(e.target.value);
                    }}
                  />
              </Stack>
              <RadioGroup defaultValue="2">
              <Stack spacing={5} direction="row">
                <Radio colorScheme="red" value="1">
                  Import
                </Radio>
                <Radio colorScheme="green" value="2">
                  Export
                </Radio>
              </Stack>
            </RadioGroup>
            </VStack>
            <Stack w="80%" h="10%">
              <Button colorScheme="blue" onClick={handleCreate}>Update</Button>
            </Stack>
          </VStack>
        </HStack>
      </HStack>
    );
  };
  
  export default Update;
  