import {
    Button,
    HStack,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Text,
    useToast,
  } from '@chakra-ui/react';
  import axios from 'axios';
  import React, { useState } from 'react';
  import { FaEye, FaEyeSlash } from 'react-icons/fa';
  
  const Password = () => {
    const [showold, setShowold] = useState(false);
    const [show, setShow] = useState(false);
    const [showconfirm, setShowconfirm] = useState(false);
    const handleClickOld = () => setShowold(!showold); 
    const handleClick = () => setShow(!show);
    const handleClickConfirm = () => setShowconfirm(!showconfirm);
    const [oldpass, setOldPass] = useState('');
    const [pass, setPass] = useState('');
    const [confirm, setConfirm] = useState('');
    const toast = useToast();
    const handleSave = () => {
      axios({
        baseURL: 'http://localhost:8000/updatePassword',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({
          email: localStorage.getItem('email') + '@gmail.com',
          oldPass : oldpass,
          newPass : pass
        }),
      })
        .then(res => {
          res.status === 200 ? toast({
            title: res.data.message,
            status: 'success',
            isClosable: true,
          }) : toast({
            title: res.data.message,
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
              Change Password
            </Text>
            <Text>Password must minimum length is 7 characters</Text>
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
              Old Password
            </Text>
          </Stack>
          <Stack w="70%">
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={showold ? 'text' : 'password'}
                placeholder="Enter old password"
                value={oldpass}
                onChange={e => {
                  setOldPass(e.target.value);
                }}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClickOld}>
                  {showold ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </Stack>
        </Stack>
        <Stack w="100%" flexDir="row">
          <Stack w="30%">
            <Text fontSize="17" fontWeight="500">
              New Password
            </Text>
          </Stack>
          <Stack w="70%">
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={show ? 'text' : 'password'}
                placeholder="Enter new password"
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
        </Stack>
        <Stack w="100%" flexDir="row">
          <Stack w="30%">
            <Text fontSize="17" fontWeight="500">
              Confirm password
            </Text>
          </Stack>
          <Stack w="70%">
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
        </Stack>
      </Stack>
    );
  };
  
  export default Password;
  