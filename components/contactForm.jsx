import  { React , useRef , useState} from 'react'
import { TextInput, Button, Box , Textarea , Affix , Alert } from '@mantine/core';
import { useForm } from '@mantine/form';
import axios from 'axios';
import {FaCheck} from 'react-icons/fa'
import {TbAlertCircle} from 'react-icons/tb'

function ContactForm() {
  
  const nameRef = useRef();
  const feedbackRef = useRef();

  const [show , setShow] = useState(0);

  const form = useForm({
    initialValues: {
      email: '',
      feedback: '',
      
    },
  });

  const handelFeedback = async (e)=>{
    e.preventDefault();  
    const name = nameRef.current.value;
    const feedback = feedbackRef.current.value;


    console.log(name);
    
    try {
      let req = await axios
      .post("/api/contact" , {
       name : name,
       feedback : feedback
      } ).then((res)=>{
        
        res.status === 200 ? setShow(1) : setShow(2);
        nameRef.current.value = ''
        feedbackRef.current.value = ''
        setTimeout(() => {
          setShow(0)
         }, 3000);
      })

      return req.status === 200 ? true : false;
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <Box mx="auto">
      <form onSubmit={(e)=>handelFeedback(e)}>
      <TextInput
          required
          label="Name"
          placeholder="Anonymous"
          m={0}
          ref={nameRef}

          sx={{
            maxWidth : 300
          }}

        /> 
        <Textarea  placeholder="Enter your feedback"
        label="Feedback"
        autosize
        minRows={4}
        maxRows={13}
        required
        ref={feedbackRef}
        sx={{
          maxWidth : 600
        }}>

        </Textarea >
          <Button mt='md' type="submit" uppercase>Send</Button>
      </form>

      {show === 1 && <Affix position={{top : 50 , right : 50}}>
                        <Alert icon={<FaCheck size={16} />} title="Success " color="green">
                          Feedback sent successfully . We appreciate your valuable feedback.
                        </Alert>
                      </Affix> }
      
      {show === 2 && <Affix position={{top : 50 , right : 50}}> <Alert icon={<TbAlertCircle size={16} />} title="Failed - Server Error" color="red">
                Could not send feedback. Please try again after some time.
                </Alert></Affix>}
    </Box>

    
  );
}

export default ContactForm;