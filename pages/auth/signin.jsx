import { Button, Stack , Text } from '@mantine/core'
import React from 'react'
import {FaGithub, FaGoogle} from 'react-icons/fa'
import {signIn , useSession} from 'next-auth/react'
import {useRouter} from 'next/router'
import Mail from './mail'

function Signin() {
    
    const router = useRouter();
    const {data : session , status } =  useSession();

    if(session){
        console.log('session exists')
        setTimeout(()=>{
            router.push('/');
        },500)
        return<Text>Already signed in...
            redirecting to Home page
        </Text>
        
    }
    const handelSignin = (provider) => () => {try
    {signIn(provider)} catch(err){
        console.log(err.message);
    }}
        

    const data = [
        {label : 'github' , icons : <FaGithub/>},
        {label : 'google' , icons : <FaGoogle/>},
    ]
    const list = data.map((item)=>{
        return (<Button leftIcon={item.icons} key={item.label} size='lg' onClick={handelSignin(item.label)} sx={{
            width:'200px'
        }}>
            {item.label.toUpperCase()}
        </Button>)
    })
    console.log('page rerendered' , session)
    return (
    <Stack justify='center' align='center' >
        <Mail/>
        {list}
    </Stack>
  )
}

export default Signin