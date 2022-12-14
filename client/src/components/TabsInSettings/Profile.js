import {
    Avatar,
    Button,
    HStack,
    Input,
    InputGroup,
    InputLeftAddon,
    InputRightAddon,
    Stack,
    Text,
    useToast,
  } from '@chakra-ui/react';
  import axios from 'axios';
  import React, { useState } from 'react';
  import { FaEnvelope, FaSignature } from 'react-icons/fa';
  
  const Profile = () => {
    const toast = useToast();
    const [linkImg, setLinkImg] = useState(
      'https://i.pinimg.com/564x/89/4f/4b/894f4b2f803a5618a3c02795b361baa6.jpg'
    );
    const [name, setName] = useState(localStorage.getItem('name'));
    const [email, setEmail] = useState(localStorage.getItem('email'));
    const handleSave = () => {
      axios({
        baseURL: 'http://localhost:8000/updateProfile',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({
          email: email + '@gmail.com',
          name : name,
          linkAvt : linkImg
        }),
      })
        .then(res => {
          localStorage.setItem('name',res.data.message);
          localStorage.setItem('linkAvt',res.data.internal_message);
          res.status === 200 ? toast({
            title: 'Updated successful',
            status: 'success',
            isClosable: true,
          }) : toast({
            title: 'Updated fail',
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
    }
    return (
      <Stack w="73vw">
        <HStack w="100%">
          <Stack w="50%">
            <Text fontSize="23" fontWeight="600">
              Personal Info
            </Text>
            <Text>Update your photo and personal details here.</Text>
          </Stack>
          <HStack w="50%" flexDirection="row-reverse">
            <Button colorScheme="blue" marginLeft="1vw" onClick={handleSave}>
              Save
            </Button>
            <Button>Cancel</Button>
          </HStack>
        </HStack>
  
        <hr />
        <Stack w="100%" flexDir="row">
          <Stack w="30%">
            <Text fontSize="17" fontWeight="500">
              Avatar
            </Text>
          </Stack>
  
          <HStack w="70%">
            <Avatar
              name="Duong Nguyen"
              src={linkImg}
              margin="5px"
              padding="1px"
              size="2xl"
            />
            <Input
              value={linkImg}
              onChange={e => setLinkImg(e.target.value)}
            ></Input>
          </HStack>
        </Stack>
  
        <hr />
        <Stack w="100%" flexDir="row">
          <Stack w="30%">
            <Text fontSize="17" fontWeight="500">
              Name
            </Text>
          </Stack>
  
          <HStack w="70%">
          <InputGroup>
              <InputLeftAddon children={<FaSignature />} />
              <Input
                placeholder="Enter your email"
                value={name}
                onChange={(e)=>setName(e.target.value)}
              />
            </InputGroup>
          </HStack>
        </Stack>
        <hr />
        <Stack w="100%" flexDir="row">
          <Stack w="30%">
            <Text fontSize="17" fontWeight="500">
              Email
            </Text>
          </Stack>
  
          <HStack w="70%">
            <InputGroup>
              <InputLeftAddon children={<FaEnvelope />} />
              <Input
                placeholder="Enter your email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
              <InputRightAddon children="@gmail.com" />
            </InputGroup>
          </HStack>
        </Stack>
      </Stack>
    );
  };
  
  export default Profile;
  