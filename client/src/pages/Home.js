import {
  Avatar,
  Box,
  Button,
  HStack,
  Input,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import {
  FaSearch,
  FaWallet,
  FaWindowMaximize,
  FaWindowRestore,
} from 'react-icons/fa';
import Navbar from '../components/Navbar/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [supplies, setSupplies] = useState([]);
  useEffect(() => {
    axios({
      baseURL: 'http://localhost:8000/getall',
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        iduser: 1,
      }),
    })
      .then(res => {
        console.log(res.data.message);
        setSupplies(res.data.message);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  return (
    <HStack>
      <Navbar />
      <VStack w="80vw" h="100vh">
        <HStack w="100%" h="7%" flexDirection="row-reverse">
          <Avatar
            name="Duong Nguyen"
            src={
              localStorage.getItem('linkAvt')
                ? localStorage.getItem('linkAvt')
                : 'https://i.pinimg.com/564x/89/4f/4b/894f4b2f803a5618a3c02795b361baa6.jpg'
            }
            margin="3px"
            padding="1px"
          />
          <HStack w="12%" h="100%">
            <Text fontSize="16px" fontWeight="600">
              {localStorage.getItem('name')
                ? localStorage.getItem('name')
                : 'Duong Nguyen'}
            </Text>
          </HStack>

          <Input placeholder="Search..."></Input>
          <Button>
            <FaSearch />
          </Button>
        </HStack>
        <HStack
          w="95%"
          h="10%"
          bgColor="#F5F5F5"
          borderRadius="11px"
          justifyContent="space-around"
        >
          <HStack w="30%" h="100%">
            <HStack
              w="20%"
              h="62%"
              bgColor="red.300"
              justify="center"
              borderRadius="90px"
            >
              <FaWallet size="25" color="white" />
            </HStack>
            <Box>
              <Text fontSize="20px" fontWeight="400">
                Total Supplies
              </Text>
              <Text fontSize="20px" fontWeight="600">
                {supplies.length}
              </Text>
            </Box>
          </HStack>
          <HStack w="30%" h="100%">
            <HStack
              w="20%"
              h="62%"
              bgColor="#6AE0D9"
              justify="center"
              borderRadius="90px"
            >
              <FaWindowRestore size="25" color="white" />
            </HStack>
            <Box>
              <Text fontSize="20px" fontWeight="400">
                Raw materials
              </Text>
              <Text fontSize="20px" fontWeight="600">
                5
              </Text>
            </Box>
          </HStack>
          <HStack w="30%" h="100%">
            <HStack
              w="20%"
              h="62%"
              bgColor="#6AE0D9"
              justify="center"
              borderRadius="90px"
            >
              <FaWindowMaximize size="25" color="white" />
            </HStack>
            <Box>
              <Text fontSize="20px" fontWeight="400">
                Instrument
              </Text>
              <Text fontSize="20px" fontWeight="600">
                {localStorage.getItem('CountInstrument')}
              </Text>
            </Box>
          </HStack>
        </HStack>
        <HStack
          w="95%"
          h="8%"
          borderColor="#6AE0D9"
          borderTopWidth="2px"
          borderBottomWidth="2px"
        >
          <HStack w="25%" h="100%">
            <Text fontSize="18px" fontWeight="600">
              Name
            </Text>
          </HStack>
          <HStack w="15%" h="100%">
            <Text fontSize="18px" fontWeight="600">
              Type
            </Text>
          </HStack>
          <HStack w="10%" h="100%">
            <Text fontSize="18px" fontWeight="600">
              Count
            </Text>
          </HStack>
          <HStack w="10%" h="100%">
            <Text fontSize="18px" fontWeight="600">
              Unit
            </Text>
          </HStack>
          <HStack w="10%" h="100%">
            <Text fontSize="18px" fontWeight="600">
              Import/Export
            </Text>
          </HStack>
          <HStack w="30%" h="100%">
            <Text fontSize="18px" fontWeight="600">
              Choose
            </Text>
            <Button colorScheme="green" onClick={() => navigate('/insert')}>
              Insert
            </Button>
          </HStack>
        </HStack>
        {supplies
          ? supplies.map((element, index) => {
              return (
                <HStack w="95%" h="8%" key={index}>
                  <HStack w="25%" h="100%">
                    <Text fontSize="18px" fontWeight="600">
                      {element?.name}
                    </Text>
                  </HStack>
                  <HStack w="15%" h="100%">
                    <Text fontSize="18px" fontWeight="600">
                      {element?.type}
                    </Text>
                  </HStack>
                  <HStack w="10%" h="100%">
                    <Text fontSize="18px" fontWeight="600">
                      {element?.count}
                    </Text>
                  </HStack>
                  <HStack w="10%" h="100%">
                    <Text fontSize="18px" fontWeight="600">
                      {element?.unit}
                    </Text>
                  </HStack>
                  <HStack w="10%" h="100%">
                    <Text fontSize="18px" fontWeight="600">
                      {element?.import}
                    </Text>
                  </HStack>
                  <HStack w="30%" h="100%">
                    <Button
                      colorScheme="blue"
                      onClick={() => {
                        localStorage.setItem('nameSup', element?.name);
                        localStorage.setItem('typeSup', element?.type);
                        localStorage.setItem('countSup', element?.count);
                        localStorage.setItem('unitSup', element?.unit);
                        navigate('/update');
                      }}
                    >
                      Update
                    </Button>
                    <Button
                      colorScheme="red"
                      onClick={() =>
                        axios({
                          baseURL: 'http://localhost:8000/delete',
                          method: 'post',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          data: JSON.stringify({
                            name: element?.name,
                          }),
                        })
                          .then(res => {
                            navigate('/home');
                          })
                          .catch(error => {
                            console.log(error);
                          })
                      }
                    >
                      <a href="http://localhost:3000/home">Delete</a> 
                    </Button>
                  </HStack>
                </HStack>
              );
            })
          : null}
      </VStack>
    </HStack>
  );
};

export default Home;
