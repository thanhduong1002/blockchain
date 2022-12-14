import {
    HStack,
    Stack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
  } from '@chakra-ui/react';
  import React from 'react';
import Navbar from '../components/Navbar/Navbar';

import Password from '../components/TabsInSettings/Password';
import Profile from '../components/TabsInSettings/Profile';

  
  const Settings = () => {
    return (
      <HStack>
        <Navbar />
        <Stack w="80vw" h="100vh">
          <Stack w="95%" h="5%" margin={'20px'}>
            <Text color="black" fontSize="32" fontWeight="700">
              Settings
            </Text>
          </Stack>
          <Stack
            w="100%"
            h="10%"
          >
            <Tabs defaultIndex={1}>
              <TabList>
                <Tab color="black">Profile</Tab>
                <Tab color="black">Password</Tab>
                <Tab color="black">Bonus</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Profile />
                </TabPanel>
                <TabPanel>
                  <Password />
                </TabPanel>
                <TabPanel>
                  <Text>Tabs3</Text>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Stack>
        </Stack>
      </HStack>
    );
  };
  
  export default Settings;
  