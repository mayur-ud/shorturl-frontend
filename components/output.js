import React, { useState } from 'react'
import { Grid , Button , Text ,Alert , Affix } from '@mantine/core';
import {FaCopy , FaCheck } from 'react-icons/fa'


function Output({url }) {
    const [copy , setCopy] = useState(false);
    return (
    <Grid justify='center' align='center'>
        <Button mt={20} leftIcon={<FaCopy size={16} color='white'/>} onClick={() => {
                setCopy(true)
                setTimeout(() => {
                    setCopy(false)
                }, 5000);
             navigator.clipboard.writeText(url)
            }}>{url}</Button>
        {copy && <Affix position={{top : 50 , right : 50}}> <Alert icon={<FaCheck size={16} />} title="Success - Must be new For you" color="green">
                Successfully Copied link to Clipboard
                </Alert></Affix>}

    </Grid>
  )
}

export default Output