import React, { useRef, useState , useEffect } from 'react'
import { TextInput, Button, Box , Affix ,Alert } from '@mantine/core';
import { useForm } from '@mantine/form';
import {signIn} from 'next-auth/react'
import {useRouter} from 'next/router';
import {FaCheck} from 'react-icons/fa'

function Mail() {
  const router = useRouter();
  const mailRef = useRef();
  const [show , setShow] = useState(false);
  const [click , setClick] = useState(false);

  const form = useForm({
    initialValues: {
      email: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+.\S/.test(value) ? null : 'Invalid email'),
    },
  });


    const handelMail = async (e) =>{
      setClick(true);
      e.preventDefault();
      const email = mailRef.current.value;  
    
         try {
          await signIn('email' , {
            email,
            redirect : false
          }).then((res)=>{
            if(res.error){
              setShow(2);
            }
            else{
              setShow(1);
              form.reset();
            }
            setClick(false);
            
          })}
          catch(err){
            console.log('THIS ERROR ' , err.message)
            setClick(false);
            setShow(2);
            setTimeout(() => {
              setShow(0)
            }, 4000);
            
          }
    }
    return (
        <Box sx={{ maxWidth: 300 }} mx="auto">
          <form onSubmit={(e) =>handelMail(e)} >
            <TextInput
              required
              label="Email"
              placeholder="your@email.com"
              ref={mailRef}
              {...form.getInputProps('email')}
            />
            
              <Button type="submit" size='lg' compact my={20} mx='auto' sx={{
                width : '200px'
              }} disabled={click}>{click ? 'Sending Email':'Submit'}</Button>
          </form>
          {show === 1 && <Affix position={{top : 50 , right : 50}}>
                        <Alert icon={<FaCheck size={16} />} title="Successfully Sent " color="green">
                          Magic Authorisation ink sent successfully . Please check your email. Check Spam if link not found.
                        </Alert>
                      </Affix> 
          }

          {show === 2 && <Affix position={{top : 50 , right : 50}}>
                        <Alert icon={<FaCheck size={16} />} title="Some Error Occured" color="red">
                          Please check if the mail you entered is correct
                        </Alert>
                      </Affix> }
            
        </Box>
      );
}

export default Mail