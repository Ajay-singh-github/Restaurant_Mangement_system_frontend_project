import { makeStyles } from '@mui/styles';
import  MaterialTable  from "@material-table/core"
import { getData,serverURL } from '../../services/FetchNodeServices';
import { useState } from 'react';
import { useEffect } from "react"
import Heading from '../../components/heading/Heading';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import { Grid, TextField,FormHelperText,Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';


import FormControl from '@mui/material/FormControl';

import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { postData } from '../../services/FetchNodeServices';
import Swal from 'sweetalert2';

const useStyles = makeStyles({
    root: {
      width:"100%",
      height:"auto",
      background:"#dfe6e9",
      display:"flex",
      justifyContent:"center",
      alignItems:"center"
      
    },
    box: {
        width:"95vw",
        height:"auto",
        borderRadius:10,
        background:"#fff",
        padding:10
    },
})

export default function DisplayWaiters()
{   var classes=useStyles()
    var admin=JSON.parse(localStorage.getItem('ADMIN'))

    const [waitersdata,setWaitersData]=useState()
    const [edit,setEdit]=useState()
    
    const [dob, setDOB] = useState()
    const [waitername,setWaiterName]=useState()
    const [gender,setGender]=useState()
    const [mobileno,setMobileNo]=useState()
    const [emailaddress,setEmailAddress]=useState()
    const [address,setAddress]=useState()
    const [picture,setPicture]=useState({url:'',bytes:''})
    const [restaurantid,setRestaurantId]=useState(28)
    const [resError,setResError]=useState({})
    const [waiterid,setWaiterId]=useState()
    const [btn,setBtn]=useState()
    const [fileTem,setFileTem]=useState({url:'',bytes:''})  
    var navigate=useNavigate()
    const handleError = (error, input,message)=>{
        setResError(prevState=>({...prevState,[input]:{'error':error,'message':message}}))
      }


    const handleCancel=()=>{
        setPicture({url:fileTem.url,bytes:picture.bytes})
        setBtn('')
   
    }
    const handlePicture=(event)=>
    {
        setPicture({url:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
        setFileTem({url:picture.url,bytes:picture.bytes})
        setBtn(true)
        handleError(false,'picture','')
    }

    const handleEditAgain=async()=>{
        setBtn('')
        var formData=new FormData()
        formData.append('waiterid',waiterid)
        formData.append('picture',picture.bytes)
        const  result=await postData('restaurants/waiter_picture_edit',formData)
 
         if(result.status)
         {
           fetchwaiters()
           Swal.fire({
             icon: 'success',
             title: 'Waiter Picture',
             text: result.message,
             position:'top-end',
             timer: 5000,
             showConfirmButton:false,
             toast:true
             
           })
         }else{
           Swal.fire({
             icon: 'error',
             title: 'Opps...',
             text: result.message,
             position:'top-end',
             timer: 5000,
             showConfirmButton:false,
             toast:true
             
           })
        }

    } 

    const editDeleteButton=()=>{
        return(<div>
                <Button onClick={handleEditAgain}>Edit</Button>
                <Button onClick={handleCancel}>Cancel</Button>
        </div>)
     } 
   

    const validation=()=>{
        var submitRecord=true
        if(!waitername)
        {
            handleError(true,'waitername',"Pls Enter Waiter Name")
            submitRecord=false
        }
        if(!mobileno)
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
        if(!emailaddress)
        {
            handleError(true,'emailaddress',"Pls input email address ")
            submitRecord=false
        }
        if(!address)
        {
            handleError(true,'address',"Pls input address ")
            submitRecord=false
        }
        
        return submitRecord
    }

    const fetchwaiters=async()=>
    {
        const result=await postData('restaurants/fetch_waiters_data',{"restaurantid":admin.restaurantid})
        setWaitersData(result.data)
    }
 
    
    useEffect(function(){
        fetchwaiters()
 
     },[])
    
     const handleEdit=(rowData)=>
     {
        setWaiterId(rowData.waiterid)
        setWaiterName(rowData.waitername)
        setMobileNo(rowData.mobileno)
        
        setGender(rowData.gender)
        setEmailAddress(rowData.emailid)
        setAddress(rowData.address)
        setPicture({url:`${serverURL}/images/${rowData.picture}`,bytes:''})
        setEdit('open') 
     }

     const handleClose=()=>
     {
        setEdit('')
     }

     const handleSubmit=async()=>
     {
         var error=validation()
         if(error)
         {  
             var body={'restaurantid':restaurantid,'waitername':waitername,'mobileno':mobileno,'dob':dob,'gender':gender,'emailaddress':emailaddress,'address':address,'waiterid':waiterid}
             /*formData.append('restaurantid',restaurantid)
             formData.append('waitername',waitername)
             formData.append('mobileno',mobileno)
             formData.append('dob',dob)
             formData.append('gender',gender)
             formData.append('emailaddress',emailaddress)
             formData.append('address',address)
             formData.append('picture',picture.bytes)*/
 
             const result=await postData('restaurants/edit_waiter_data',body)
             if(result.status)
             {
                fetchwaiters()
               Swal.fire({
                 icon: 'success',
                 title: 'Restaurant Waiter Data',
                 text: result.message,
                 position:'top-end',
                 timer: 5000,
                 showConfirmButton:false,
                 toast:true
                 
               })
             }else{
               Swal.fire({
                 icon: 'error',
                 title: 'Opps...',
                 text: result.message,
                 position:'top-end',
                 timer: 5000,
                 showConfirmButton:false,
                 toast:true
                 
               })
            }   
         }
         
     }

    const  showDatainDialogBox=()=>
    {
        return(<div>
               <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Heading title='Waiters'/>
                </Grid>
                <Grid item xs={6}>
                    <TextField label="Waiter Name" value={waitername} onChange={(event)=>setWaiterName(event.target.value)} error={resError?.waitername?.error} helperText={resError?.waitername?.message} onFocus={()=>handleError(false,'waitername',"")}  fullWidth/>
                </Grid>
                <Grid item xs={6}>
               
                <TextField label='Mobile Number' value={mobileno} onChange={(event)=>setMobileNo(event.target.value)} error={resError?.mobileno?.error} helperText={resError?.mobileno?.message} onFocus={()=>handleError(false,'mobileno',"")} fullWidth/>

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
                           value={gender}
                           >
                           <FormControlLabel value="Male" control={<Radio />} label="Male" onClick={(event)=>setGender(event.target.value)} onFocus={()=>handleError(false,'gender','')}  />
                           <FormControlLabel value="Female" control={<Radio />} label="Female" onClick={(event)=>setGender(event.target.value)} onFocus={()=>handleError(false,'gender','')} />
                           
                        </RadioGroup>
                        
                          </FormControl>
                          <FormHelperText><div style={{color: '#ef5350'}}>{resError?.gender?.message}</div></FormHelperText>


                    </Grid>
                    <Grid item xs={6}>
                         <TextField label='Email Address' value={emailaddress} onChange={(event)=>setEmailAddress(event.target.value)} error={resError?.emailaddress?.error} helperText={resError?.emailaddress?.message}  onFocus={()=>handleError(false,'emailaddress','')} fullWidth/>
                    </Grid>
                    <Grid item xs={6}>
                         <TextField label='Address' value={address} onChange={(event)=>setAddress(event.target.value)} error={resError?.address?.error} helperText={resError?.address?.message}  onFocus={()=>handleError(false,'address','')} fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                         <Button component="label" variant="contained" fullWidth><input type="file" hidden  onChange={handlePicture} />Upload Picture</Button>
                         <FormHelperText><div style={{color:'#e74c3c',paddingLeft:17}}></div></FormHelperText>
                    </Grid>
                    <Grid item xs={12} className={classes.center}>
                    <div style={{paddingLeft:30,display:'flex',paddingTop:10}}><Avatar  
                  variant='rounded'
                  alt="Remy Sharp"
                  src={picture.url}
                  sx={{ width: 70, height: 70 }}
                   />
                   <div style={{padding:8,paddingTop:7}} >
                     {btn?editDeleteButton():<></> }
                   </div>
                  </div>

                 </Grid>
               
             </Grid>  
        </div>)    
    }
      
    const handleDelete=(rowData)=>
    {
      
       Swal.fire({
        title: 'Do you want to delete the record?',
        showDenyButton: true,
        confirmButtonText: 'Delete',
        denyButtonText: `Don't Delete`,
        
      }).then(async(result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            var body={'waiterid':rowData.waiterid}
            const result =await postData('restaurants/delete_waiter',body)
           if(result.status)      
           {      
            Swal.fire('Deleted!', '', result.message)
            fetchwaiters()
           }
           else
           Swal.fire('Fail!', '', result.message)
  
        } else if (result.isDenied) {
          Swal.fire('Category not Delete', '', 'info')
        }
      })

    }

     const DialogBox=()=>{
        return(
          <Dialog
           maxWidth='sm'
           open={edit}>
               <DialogContent>
                 {showDatainDialogBox()}
               </DialogContent>
               <DialogActions>
                  <Button onClick={handleSubmit}>Edit</Button>
                  <Button onClick={handleClose}>Close</Button>
               </DialogActions>
          </Dialog>
        )
       }
    return(<div className={classes.root}>
        <div className={classes.box}>
            
        <MaterialTable
      title="Restaurant's Waiters List"
      columns={[
        { title: 'Waiter Name', render:rowData=><><div>{rowData.waitername}</div></> },
        { title: 'Mobile Number', render:rowData=><><div>{rowData.mobileno}</div></> },
        { title: 'Date Of Birth', render:rowData=><><div>{rowData.dob}</div></> },
        { title: 'Gender', render:rowData=><><div>{rowData.gender}</div></> },
        { title: 'Email Address', render:rowData=><><div>{rowData.emailid}</div></> },
        { title: 'address', render:rowData=><><div>{rowData.address}</div></> },
        { title: 'Picture', render:rowData=><><div><img src={`${serverURL}/images/${rowData.picture}`}  style={{width:50,height:50,borderRadius:10}}/></div></> },
      ]}
      data={waitersdata}        
      actions={[
        {
          icon: 'edit',
          tooltip: 'Edit Waiter Data',
          onClick: (event, rowData) => handleEdit(rowData)
        },
        {
            icon: 'delete',
            tooltip: 'Delete Waiter',
            onClick: (event, rowData) =>handleDelete(rowData)
          }
          ,
        {
            icon: 'add',
            tooltip: 'Add Waiter',
            isFreeAction:true,
            onClick: (event, rowData) =>navigate('/admindashboard/waiterinterface')
          }
      ]}
    />
        </div>
        {DialogBox()}
    </div>)
}