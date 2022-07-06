import React from 'react'
import { Container , Text ,Button } from '@mantine/core';
import Service from './service';
import {useRouter} from 'next/router'

function Unauthuser() {
  const router = useRouter();
  const handleClick = ()=>{
    router.push('/auth/signin')
  }
  return (
    <Container>
    <Container px='auto' color='dimmed'>
      <Text size='xl' weight={700}>Tired of sharing long bulky URL that makes your content unattractive ?</Text>
      <Text size='md' mx={25}>Here`&apos;`s the solution , Get any URL shortened instantly and its easily shareable</Text>
    </Container>
    <Service/>
    <Text size='lg' weight={700}>Please Login , to try our URL shortener...</Text>
    <Button onClick={handleClick} color='teal'>Login</Button>
    </Container>
  )
}

export default Unauthuser