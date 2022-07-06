import { Button, Grid, Input , Alert, Affix } from '@mantine/core'
import { React , useRef , useState , useEffect} from 'react'
import {TbAlertCircle} from 'react-icons/tb'
import Output from './output'
function Main() {
    
    const [show , setShow] = useState(false)
    const [url , setUrl] = useState('');
    const baseurl = process.env.BASE_URL
    function isValidHttpUrl(string) {
        let url;
        
        try {
          url = new URL(string);
        } catch (_) {
          return false;  
        }
      
        return url.protocol === "http:" || url.protocol === "https:";
      }

  const link = useRef();

  useEffect(()=>{
    setUrl(localStorage.getItem('URL'))
    link.current.value = localStorage.getItem('LongUrl')
  },[])

    const handelShorten = async ()=>{
        if(!isValidHttpUrl( link.current.value)){
            setShow(true);

            setTimeout(() => {
                setShow(false)
            }, 5000);
        }
        else{
            setUrl('loading');
            localStorage.setItem('LongUrl' , link.current.value);
            // setTimeout(() => {
            //     setUrl('')
            // }, 5000);
            console.log(process.env.BASE_URL)
            const data = await fetch('https://fierce-sea-77894.herokuapp.com/api/url/shorten', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "longUrl" : link.current.value
                })
              })
              const res = await data.json().then((res)=>{
                setUrl(res.shortUrl)
                localStorage.setItem('ShortURL' , res.shortUrl);
              })
              }
        }

    console.log(url);

    return (
        <>
    <Grid pt={50} justify='center' align='center'>
        <Grid.Col span={6} offset={2}>
          <Input  placeholder='Enter Your Link'  ref={link}/>
        </Grid.Col>
        <Grid.Col span={3}>
          <Button size='md' variant='filled' onClick={handelShorten} loading={url === 'loading'} >{url === 'loading'? 'Shortening - Like your career' : 'Shorten'}</Button>
        </Grid.Col>
        <Grid.Col>
          {isValidHttpUrl(url) && <Output url={url}/>}
        </Grid.Col>
      </Grid>
    
    {show && <Affix position={{top :40 , right:50}}><Alert icon={<TbAlertCircle size={24} />} title="ERROR - Just like you" color="red">
    Please Enter a valid URL!
  </Alert></Affix>}
  </>
  )
}

export default Main