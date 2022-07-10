import React, { useState } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  useMantineColorScheme,
  ActionIcon,
  Affix,
  Grid,
  Box
} from '@mantine/core';
import {useSession } from 'next-auth/react'
import {FaMoon , FaSun , FaLink , FaCopyright , FaGithub, FaLinkedin} from 'react-icons/fa'
import {MyNavbar } from './navbar';
import { useRouter } from 'next/router';
import Main from './main';
import {SiCodeforces} from 'react-icons/si'
import Unauthuser from './unauth.user';

export default function AppBase(props) { 

  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const {colorScheme , toggleColorScheme} = useMantineColorScheme();
  
  const {data:session , status } = useSession();
  const router = useRouter();
  
  if(session)
  console.log(session.user)

  const newTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[3],
        }
      }}
      navbarOffsetBreakpoint="md"
      fixed
      navbar={
        <Navbar p="md" hiddenBreakpoint="md" hidden={!opened} width={{ sm: 200, lg: 300 }} style={{
          background: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[5]
        }}>
          <MyNavbar/>
        </Navbar>
      }
      footer={
        <Footer height={60} p="md">
          <Grid align='flex-start'>
            {/* <Grid.Col span='auto'> */}
            <ActionIcon pt={10}>
              <FaCopyright size={24} color={theme.colorScheme === 'dark' ? 'white' : theme.colors.dark[3]}/> 
            </ActionIcon>
            {/* </Grid.Col> */}
            <Grid.Col span={6} ml={0}>
            <Text size='lg' color={theme.colorScheme === 'dark' ? 'cyan' : theme.colors.indigo[7]}>All Copyrights Reserved</Text>
            </Grid.Col>
            <ActionIcon pt={10} mr={5}>
              <FaGithub size={36} onClick={()=>newTab("https://github.com/re-great")} color={theme.colorScheme === 'dark' ? 'white' : theme.colors.dark[8]}/> 
            </ActionIcon>

            <ActionIcon pt={10} mx={5}>
              <FaLinkedin size={36} color={theme.colorScheme === 'dark' ? 'white' : theme.colors.dark[8]}/> 
            </ActionIcon>

            <ActionIcon  pt={10} ml={5}>
              <SiCodeforces size={36} onClick={()=>newTab("https://codeforces.com/profile/re-Great")} color={theme.colorScheme === 'dark' ? 'white' : theme.colors.dark[8]}/> 
            </ActionIcon>
            
          </Grid>
        </Footer>
      }
      header={
        <Header height={70} >
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' , background: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[4],}}>
            <MediaQuery largerThan="md" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[8]}
                mr="xl"
              />
            </MediaQuery>
            <ActionIcon pl='10px'>
            <FaLink  size={28} color={colorScheme==='dark'?'white':'#0e142e'}/>
            </ActionIcon>
            <Text pl={8}color={colorScheme==='dark'?'cyan':'indigo'} size='xl'>Link Shortener</Text>
            <Affix position={{top:20 , right:20}}>
            <ActionIcon onClick={()=>{toggleColorScheme()}} color={colorScheme==='dark'?'yellow':'blue'} variant='light'>
                {colorScheme==='dark'?<FaMoon size={20}/>:<FaSun size={20}/>}
            </ActionIcon>
            </Affix>
          </div>
        </Header>
      }
    >

    {/* session exist and on HOMEPAGE */}
    {(session && router.asPath === '/') && <><Main/></>}
    {(!session && router.asPath === '/') && <Unauthuser/>}
    {props.children}

      
    </AppShell>
  );
}

