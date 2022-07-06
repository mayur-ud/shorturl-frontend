import { FaDoorOpen , FaHandsHelping, FaHome  } from 'react-icons/fa'
import { ThemeIcon, UnstyledButton, Group, Text } from '@mantine/core';
import { useRouter} from 'next/router'
import { useSession , signOut } from 'next-auth/react';
function Navbar({ icon, color, label , redirect , status}) {
  const router = useRouter()

  const handelSignout = async ()=>{
    const data = await signOut({redirect : false , callbackUrl : '/'})
    router.push(data.url);
  }

   if((status === 'authenticated' &&  label === 'Login') ){
    label = 'Logout'
   }
    return  (
      <UnstyledButton
        sx={(theme) => ({
          display: 'block',
          width: '100%',
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
          backgroundColor : theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[3],
  
          '&:hover': {
            backgroundColor:
              theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.blue[0],
          },
        })
        }
        onClick={()=>{
          if(label === 'Login'){
            router.push(`${redirect}`)
          } 
          else if(label === 'Logout'){
            handelSignout();
          }
          else
            router.push(redirect);
        }}
      >
        <Group>
          <ThemeIcon color={color} variant="light" size={20}>
            {icon}
          </ThemeIcon>
  
          <Text size="lg">{label}</Text>
        </Group>
      </UnstyledButton>
    );
  }

  const data = [
    { icon: <FaHome size={16} />, color: 'orange', label: 'Home' , redirect : '/'  },
    { icon: <FaDoorOpen size={16} />, color: 'teal', label: 'Login' , redirect:'/auth/signin'},
    { icon: <FaHandsHelping size={16} />, color: 'violet', label: 'Contact' , redirect : '/contact-me' },
  ];
  
  export function MyNavbar() {
    const {data:session , status} = useSession();
    const links = data.map((link) => <Navbar {...link} key={link.label} status={status} />);
    
    return <div>{links}</div>;
  }