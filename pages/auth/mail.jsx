import React from 'react'
import { TextInput, Button, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import {signIn} from 'next-auth/react'
import {useRouter} from 'next/router';

function Mail() {
  const router = useRouter();
    const handelMail = (email) =>{
        try {
          signIn('email' , {
            email,
            redirect : false
        })
        } catch (error) {
          console.log(error.message)
        }
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
          <form onSubmit={form.onSubmit((values) => handelMail(values.email))}>
            <TextInput
              required
              label="Email"
              placeholder="your@email.com"
              {...form.getInputProps('email')}
            />
            
              <Button type="submit" size='lg' compact my={20} mx='auto' sx={{
                width : '200px'
              }}>Submit</Button>
          </form>
        </Box>
      );
}

export default Mail