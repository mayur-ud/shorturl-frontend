import React from 'react'
import {Container , Text} from '@mantine/core'
import ContactForm from '../components/contactForm'


function Contact() {
  return (
    <Container>
        <Text weight={800}>
           <h1>Mayur Sonkusare</h1>
           <h4>Striving to improve my development skills.</h4>
        </Text>

        <h2>Contact me : </h2>
        <ContactForm />
    </Container>

  )
}

export default Contact;