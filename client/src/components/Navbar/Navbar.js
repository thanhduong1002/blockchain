import {
    Button,
    HStack,
    ScaleFade,
    Text,
    useDisclosure,
    VStack,
  } from '@chakra-ui/react';
  import React from 'react';
  import {
    FaCalendarAlt,
    FaCog,
    FaCommentDots,
    FaHome,
    FaKey,
    FaSignOutAlt,
    FaUserCircle,
    FaUserLock,
    FaWallet,
  } from 'react-icons/fa';
  import { NavLink, useNavigate } from 'react-router-dom';
  
  const Navbar = () => {
    const { isOpen, onToggle } = useDisclosure();
    const navigate = useNavigate();
    return (
      <VStack w="20vw" h="100vh" bgGradient="linear(to-b, white, blue.500)">
        <VStack w="100%" h="100%">
          <HStack paddingBottom="5vh">
            <FaWallet size="50" color="#3399FF" />
            <Text
              fontSize="40px"
              fontWeight="extrabold"
              color='blue.400'
            >
              Supplies
            </Text>
          </HStack>
          <HStack w="100%">
            <Button
              colorScheme="teal"
              variant="ghost"
              fontSize="23px"
              fontWeight="400"
              color="black"
              onClick={onToggle}
            >
              Main menu
            </Button>
          </HStack>
          <ScaleFade initialScale={0.9} in={!isOpen}>
            <VStack w="100%" h="20%">
              <HStack w="100%">
                <FaHome size="20px" color="white" />
                <Button
                  colorScheme="teal"
                  variant="ghost"
                  fontSize="20px"
                  color="white"
                >
                  <NavLink to="/home">Home</NavLink>
                </Button>
              </HStack>
              <HStack w="100%">
                <FaCalendarAlt size="20px" color="white" />
                <Button
                  colorScheme="teal"
                  variant="ghost"
                  fontSize="20px"
                  color="white"
                >
                  <NavLink to="/appointment">History</NavLink>
                </Button>
              </HStack>
              <HStack w="100%">
                <FaCommentDots size="20px" color="white" />
                <Button
                  colorScheme="teal"
                  variant="ghost"
                  fontSize="20px"
                  color="white"
                >
                  <NavLink to="/chat">Message</NavLink>
                </Button>
              </HStack>
              <HStack w="100%">
                <FaCog size="20px" color="white" />
                <Button
                  colorScheme="teal"
                  variant="ghost"
                  fontSize="20px"
                  color="white"
                >
                  <NavLink to="/settings">Settings</NavLink>
                </Button>
              </HStack>
            </VStack>
          </ScaleFade>
        </VStack>
        <HStack w="100%" h="10%" justify='center'>
          <Button w="70%" h="50px" fontSize="19px" color="#3399FF" onClick={() => navigate('/')}>
            <FaSignOutAlt/>
            Logout
          </Button>
        </HStack>
      </VStack>
    );
  };
  
  export default Navbar;
  