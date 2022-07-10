import React, { useState } from 'react'
import { TextInput, Button, Box , Affix ,Alert } from '@mantine/core';
import { useForm } from '@mantine/form';
import {signIn} from 'next-auth/react'
import {useRouter , useRef} from 'next/router';
import {FaCheck} from 'react-icons/fa'

function Mail() {
  const router = useRouter();
  const mailRef = useRef();
  const [show , setShow] = useState(false);
    const handelMail = () =>{
      const email = mailRef.current.value;  
      try {
          signIn('email' , {
            email,
            redirect : false
        }.then(()=> setShow(1)))
        } catch (error) {
          console.log(error.message)
        }

        mailRef.current.value = '';
        setTimeout(() => {
          setShow(0);
        }, 5000);
    }

    const form = useForm({
        initialValues: {
          email: '',
        },
    
        validate: {
          email: (value) => (/^\S+@\S+.\S/.test(value) ? null : 'Invalid email'),
        },
      });
    
    return (
        <Box sx={{ maxWidth: 300 }} mx="auto">
          <form onSubmit={handelMail}>
            <TextInput
              required
              label="Email"
              placeholder="your@email.com"
              ref={mailRef}
              {...form.getInputProps('email')}
            />
            
              <Button type="submit" size='lg' compact my={20} mx='auto' sx={{
                width : '200px'
              }}>Submit</Button>
          </form>

          {show && <Affix position={{top : 50 , right : 50}}>
                        <Alert icon={<FaCheck size={16} />} title="Successfully Sent " color="green">
                          Magic Authorisation ink sent successfully . Please check your email. Check Spam if link not found.
                        </Alert>
                      </Affix> }
        </Box>
      );
}

export default Mail