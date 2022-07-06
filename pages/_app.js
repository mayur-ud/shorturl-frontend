import { useState , useEffect } from 'react';
import { MantineProvider, ColorSchemeProvider } from '@mantine/core';
import {SessionProvider } from 'next-auth/react'
import AppBase from '../components/appshells';


function MyApp({ Component, pageProps : {
  session , ...pageProps
}}) {
  
  const [colorScheme, setColorScheme] = useState('dark');

  useEffect(()=>{
    setColorScheme(localStorage.getItem('theme'));
  },[])

  const toggleColorScheme = () => {
    const toggle = (colorScheme === 'dark' ? 'light' : 'dark')
    console.log(toggle);
    localStorage.setItem("theme" , toggle);
    setColorScheme(toggle);
  }
    

  return (
    <SessionProvider session={session}>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
          <AppBase>
            <Component {...pageProps}/>
          </AppBase>
        </MantineProvider>
      </ColorSchemeProvider>
    </SessionProvider>
  )
}

export default MyApp
