
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Heading from '../../components/heading/Heading';
import { Grid, TextField,FormHelperText,Avatar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';
import { postData } from '../../services/FetchNodeServices';
import Swal from 'sweetalert2';

const useStyles = makeStyles({
    root: {
      width:"100%",
      height:"100vh",
      background:"#dfe6e9",
      display:"flex",
      justifyContent:"center",
      alignItems:"center"
      
    },
    box: {
        width:"50%",
        height:"auto",
        borderRadius:10,
        background:"#fff",
        padding:10
    },
    center:{
        paddingLeft:'50'
    }
})


export default function WaiterInterface()
{   var classes=useStyles()
    var admin=JSON.parse(localStorage.getItem('ADMIN'))

    const [dob, setDOB] = useState()
    const [waitername,setWaiterName]=useState()
    const [gender,setGender]=useState()
    const [mobileno,setMobileNo]=useState()
    const [emailaddress,setEmailAddress]=useState()
    const [address,setAddress]=useState()
    const [picture,setPicture]=useState({url:'',bytes:''})
    const [restaurantid,setRestaurantId]=useState(admin.restaurantid)
    const [resError,setResError]=useState({})

    const handleError = (error, input,message)=>{
        setResError(prevState=>({...prevState,[input]:{'error':error,'message':message}}))
      }

    const handlePicture=(event)=>
    {
        setPicture({url:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
        handleError(false,'picture','')
    }
   
    const validation=()=>{
        var submitRecord=true
        if(!waitername)
        {
            handleError(true,'waitername',"Pls Enter Waiter Name")
            submitRecord=false
        }
        if(!mobileno  || !(/^[0-9]{10}$/).test(mobileno))
        {
            handleError(true,'mobileno',"Pls Enter Mobile Number")
            submitRecord=false
        }
        if(!dob)
        {
            handleError(true,'dob',"Pls Select Gender")
            submitRecord=false
        }
        if(!gender)
        {
            handleError(true,'gender',"Pls Select Gender ")
            submitRecord=false
        }
        if(!emailaddress  || !(/^\w([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailaddress)))
        {
            handleError(true,'emailaddress',"Pls input email address ")
            submitRecord=false
        }
        if(!address)
        {
            handleError(true,'address',"Pls input address ")
            submitRecord=false
        }
        if(!picture.url)
        {
            handleError(true,'picture',"Pls Upload Picture ")
            submitRecord=false
        }
        return submitRecord
    }
    const handleSubmit=async()=>
    {
        var error=validation()
        if(error)
        {
            var formData=new FormData()
            formData.append('restaurantid',restaurantid)
            formData.append('waitername',waitername)
            formData.append('mobileno',mobileno)
            formData.append('dob',dob)
            formData.append('gender',gender)
            formData.append('emailaddress',emailaddress)
            formData.append('address',address)
            formData.append('picture',picture.bytes)

            const result=await postData('restaurants/waiters_data_submit',formData)
            if(result.status)
            {
            Swal.fire({
                icon: 'success',
                title: 'Restaurant Waiters',
                text: result.message,
                 })
                }else
                {
                 Swal.fire({
                     icon: 'error',
                     title: 'Opps...',
                     text: result.message,
                     
                   })
                }      
        }
        
    }
    return(<div className={classes.root}>
        <div className={classes.box}>
             <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Heading title='Waiters' myroute='/admindashboard/displaywaiters'/>
                </Grid>
                <Grid item xs={6}>
                    <TextField label="Waiter Name" onChange={(event)=>setWaiterName(event.target.value)} error={resError?.waitername?.error} helperText={resError?.waitername?.message} onFocus={()=>handleError(false,'waitername',"")} fullWidth/>
                </Grid>
                <Grid item xs={6}>
               
                <TextField label='Mobile Number' onChange={(event)=>setMobileNo(event.target.value)} error={resError?.mobileno?.error} helperText={resError?.mobileno?.message} onFocus={()=>handleError(false,'mobileno',"")} fullWidth/>

                </Grid>
                    <Grid item xs={6} fullWidth >
                    <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth>
                    <DemoContainer components={['DatePicker']} error={resError?.dob?.error}fullWidth>
                   <DatePicker value={dob} onChange={(newValue) => setDOB(newValue)}  fullWidth />
                    </DemoContainer>
                  </LocalizationProvider>
                  
                    </Grid>

                    <Grid item xs={6}>
                        
                    <FormControl>
                           <FormLabel style={{display:'flex'}}>Gender</FormLabel>
                           <RadioGroup row 
                           error={resError?.gender?.error}
                           >
                           <FormControlLabel value="Male" control={<Radio />} label="Male" onClick={(event)=>setGender(event.target.value)} onFocus={()=>handleError(false,'gender','')} />
                           <FormControlLabel value="Female" control={<Radio />} label="Female" onClick={(event)=>setGender(event.target.value)} onFocus={()=>handleError(false,'gender','')} />
                           
                        </RadioGroup>
                        
                          </FormControl>
                          <FormHelperText><div style={{color: '#ef5350'}}>{resError?.gender?.message}</div></FormHelperText>


                    </Grid>
                    <Grid item xs={6}>
                         <TextField label='Email Address' onChange={(event)=>setEmailAddress(event.target.value)} error={resError?.emailaddress?.error} helperText={resError?.emailaddress?.message}  onFocus={()=>handleError(false,'emailaddress','')} fullWidth/>
                    </Grid>
                    <Grid item xs={6}>
                         <TextField label='Address' onChange={(event)=>setAddress(event.target.value)} error={resError?.address?.error} helperText={resError?.address?.message}  onFocus={()=>handleError(false,'address','')} fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                         <Button component="label" variant="contained" fullWidth><input type="file" hidden onChange={handlePicture}  />Upload Picture</Button>
                         <FormHelperText><div style={{color:'#e74c3c',paddingLeft:17}}>{resError?.picture?.message}</div></FormHelperText>
                    </Grid>
                    <Grid item xs={12} className={classes.center}>
                    <Avatar  
                  variant='rounded'
                  alt="Remy Sharp"
                  src={picture.url}
                  sx={{ width: 56, height: 56 }}
                   />
                  
                 </Grid>
                <Grid item xs={6}>
                    <Button component="label" variant="contained" fullWidth onClick={handleSubmit}>Submit</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button component="label" variant="contained" fullWidth> reset</Button>
                </Grid>
             </Grid>
             
        </div> 
    </div>)
}