import { FormHelperText, Grid, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Heading from '../../components/heading/Heading';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
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
    heading: {
      fontFamily: 'Kanit',
      fontWeight:'bold',
      fontSize:20,
      latterSpacing:1,
      display:'flex',
      flexDirection:'row',
    
      alignItems:'center'
      
    },
    center:{
      display:"flex",
      justifyContent:"center",
      alignItems:"center"
    },
    helpercolor:{
      color:'#eb2f06',
      fontSize:'0.8rem',
      margin:5
    }
  })
  
  

export default  function TableBooking()
{   const classes = useStyles()
    var admin=JSON.parse(localStorage.getItem('ADMIN'))
    const [restaurantId,setRestaurantId]=useState(admin.restaurantid)
    const [tableNo,setTableNo]=useState()
    const [noofChair,setNoOfChair]=useState()
    const [floor,setFloor]=useState()
    const [resError,setResError]=useState({})

    const handleError = (error, input,message)=>{
        setResError(prevState=>({...prevState,[input]:{'error':error,'message':message}}))
      }


    const validation=()=>
    {
        var submitRecord=true
        if(!tableNo)
        {
            handleError(true,'tableNo',"Pls Enter Table Number")
            submitRecord=false
        }
        if(!noofChair)
        {
            handleError(true,'noofChair',"Pls Enter No of Chair ")
            submitRecord=false
        }
        if(!floor)
        {
            handleError(true,'floor',"Pls Select Floor ")
            submitRecord=false            
        }
        return submitRecord
    }

    const handleSubmit=async()=>
    {
        var error=validation()
        if(error)
        {
            var body={'restaurantid':restaurantId,'tableno':tableNo,'noofchair':noofChair,'floor':floor}
            var result=await postData('restaurants/table_booking',body)
            if(result.status)
            {
            Swal.fire({
                icon: 'success',
                title: 'Restaurant Sub Category',
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
        

        const handleReset=()=>{
              setTableNo(' ')
              setNoOfChair(' ')
           
        }
    
    return(<div className={classes.root}>
        <div className={classes.box}>
             <Grid container spacing={2}>
                 <Grid item xs={12}>
                    <Heading title='Table Booking' myroute='/admindashboard/tablebookingdisplay'/>
                 </Grid>
                 <Grid item xs={6}>
                    <TextField label='RestaurantId'  
                    disabled
                    value={restaurantId} fullWidth/>
                 </Grid>
                 <Grid item xs={6}>
                    <TextField label='Table Number' onChange={(event)=>setTableNo(event.target.value)} fullWidth error={resError?.tableNo?.error}  helperText={resError?.tableNo?.message} onFocus={()=>handleError(false,'tableNo',"")} value={tableNo}/>
                 </Grid>
                 <Grid item xs={6} >
                    <TextField label='No Of Chair' onChange={(event)=>setNoOfChair(event.target.value)} fullWidth error={resError?.noofChair?.error}  helperText={resError?.noofChair?.message} onFocus={()=>handleError(false,'noofChair',"")} value={noofChair}/>
                  </Grid>

                  <Grid item xs={6}>
                        <FormControl fullWidth>
                           <InputLabel style={{display:"flex"}}>Select Floor </InputLabel>
                            
                            <Select
                            label="Select Floor"
                            onChange={(event)=>setFloor(event.target.value)}
                            error={resError?.floor?.error}  
                            onFocus={()=>handleError(false,'floor',"")}
                            value={floor}
                           >
                           <MenuItem value={''}>-Select Floor-</MenuItem>
                           <MenuItem value={'Ground Floor'}>Ground Floor</MenuItem>
                           <MenuItem value={'1st Floor'}>1st Floor</MenuItem>
                           <MenuItem value={'2nd Floor'}>2nd Floor</MenuItem>
                           <MenuItem value={'3rd Floor'}> 3rd Floor</MenuItem>
                           <MenuItem value={'4th Floor'}> 4th Floor</MenuItem>
                           <MenuItem value={'5th Floor'}> 5th Floor</MenuItem>
                          </Select>
                          <FormHelperText><div style={{color:'red'}}>{resError?.floor?.message}</div></FormHelperText>
                        </FormControl>
                   
                  </Grid>
                  <Grid item xs={6}>
                     <Button  fullWidth component="label" variant="contained" onClick={handleSubmit}>Submit</Button>
                  </Grid>
                  <Grid item xs={6}>
                     <Button  fullWidth component="label" variant="contained" onClick={handleReset}>reset</Button>
                  </Grid>

             </Grid>
             
        </div>
    </div>)
}