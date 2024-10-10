import { Button, Grid, Paper, TextField } from "@mui/material";

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";



export default function UserInterface()
{   const [name,setName]= useState()
    const [errorname,setErrorName]=useState({error:'',message:''})
    var navigate=useNavigate()
    const validation=()=>
    {
        var error = true
        if( !name)
        { 
            setErrorName({error:'true',message:'Pls Enter Ur Name'})
            error=false
            
        }
        return  error
    }




    const submit=()=>
    {
        var error = validation()
        if(error)
        {
            navigate('/hello')
        }
    }
    return(<div style={{display:'flex',justifyContent:'center',height:'700px'}}>
        <div style={{display:'flex',alignItems:'center'}}>
            <Paper elevation={3} style={{height:'350px',width:'470px'}}>
           <Grid container >
              <Grid item xs={12}><img src="bannerforrestaurant.png" height={'70px'} width={'470px'}/></Grid>
             <Grid item xs={12} style={{marginTop:10}}>
            <TextField fullWidth 
          disabled
          id="filled-disabled"
          label="Seat No"
          defaultValue="1"
          variant="filled"
        />
        <Grid item xs={12} style={{marginTop:20}}>
        <TextField id="filled-basic" label="Your Name Enter Here" variant="filled" fullWidth onChange={(e)=>setName(e.target.value)} 
        
        error={errorname.error}
        helperText={errorname.message}
        onFocus={()=>setErrorName({error:false,message:''})}/>
        
        </Grid>

        <Grid item xs={10} style={{marginTop:40}}>
        <Button variant="contained" endIcon={<ArrowForwardIcon />} fullWidth style={{marginLeft:20,marginRight:20}} onClick={submit}>
  Go For Food Order
</Button>
        </Grid>
        </Grid>
        </Grid>
            </Paper>
        </div>
    </div>)
}