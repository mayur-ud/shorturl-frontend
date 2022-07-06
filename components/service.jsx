import { Card, Image, Text, Badge, Button, Group, useMantineTheme ,Grid , Container } from '@mantine/core';
import React from 'react'
import { useMediaQuery } from '@mantine/hooks';

const Feature = (props) => {
  const theme = useMantineTheme();  
  const horizontal = useMediaQuery('(min-width: 1200px)' , true);
  return (
        
    <div style={{ maxWidth: 250 , margin: 'auto' }}>
          <Card shadow="lg" height={300} >
            <Card.Section p='md'>
              <Image src={props.item.img} alt={props.item.label} height={horizontal ? 180 : 120} width={horizontal ? 180 : 100}  radius='md' px='auto'/>
            </Card.Section>
          <Container>
            <Text size="lg">
              {props.item.label}
            </Text>
          </Container>
            <Text size="sm" >
              {props.item.text}
            </Text>
    
          </Card>
        </div>
      );
}

function Service() {
  
  const data = [
    {
        img : '/images/reliable.png' , label : 'Reliable' , text : 'Rely on our services to work fast and efficient'
    } ,
    {
        img : '/images/secure.png' , label : 'Secure' , text : 'Our services are Secured from all ends'
    } ,
    {
        img : '/images/responsive.png' , label : 'Responsive' , text : 'Customised to work on all types of devices'
    } ,
    {
      img : '/images/statistics.png' , label : 'Statistics' , text : 'Statistics for Links you Create [Currently working]'
  } ,
]

    const features = data.map((item)=> <Grid.Col key={item.label} lg={3} md={6} xs={6}> <Feature item = {item} key={item.label}/> </Grid.Col> )
    return (
      <Grid gutter='md' my='md' mx='auto'> 
      {features}
      </Grid>
  )
}

export default Service