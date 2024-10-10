import {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import {postData} from "../../services/FetchNodeServices"
 
 
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
     
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function AdminPage() {
  
const [emailid,setEmailId]=useState('')
const [password,setPassword]=useState('')
var navigate=useNavigate()
  const handleClick=async()=>{
    var body={emailid:emailid,password:password}
    var result=await postData('admin/admin_login',body)
    
    if(result.status)
    { 
      localStorage.setItem('ADMIN',JSON.stringify(result.data))   //result.data mai database se jo data aaya hai us data ko localStorage mai admin name ki key mai store kar diya hai json ke fom mai ab es data ko ham kahi bhi use kar sakte hai
      localStorage.setItem("TOKEN", result.token);
      navigate('/admindashboard')  // navigate ka use ye ek hook hai hamne ab tak three hook pad liye hai useState,useEffect,useNavigate navigate ka use  ek page se dusre page pr jaane ke liye kiya jaata hai
    }
    else
    {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: result.message,
     
        timer: 5000,
        showConfirmButton: false,
        toast:true
   
      })
    }


   }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <body></body>
          <Typography component="h1" variant="h5">
            Restaurant Sign in
          </Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(event)=>setEmailId(event.target.value)} 

            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(event)=>setPassword(event.target.value)}
            />
          
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleClick}
            >
              Sign In
            </Button>
                      </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}