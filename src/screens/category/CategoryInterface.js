import {useState} from 'react'
import { makeStyles } from '@mui/styles';
import {Avatar, Button, FormHelperText, Grid, TextField} from "@mui/material"
import Heading from '../../components/heading/Heading';
import { UploadFile } from '@mui/icons-material';
import Swal from 'sweetalert2';

import { getData, postData } from '../../services/FetchNodeServices';
const useStyles=makeStyles({
    root: {
        width:"100%",
        height:"100vh",
        background:"#dfe6e9",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    box:{
        width:"50%",
      height:"auto",
      borderRadius:10,
      background:"#fff",
      padding:10
    },
    helpercolor:{
        color:'#eb2f06',
        fontSize:'0.8rem',
        margin:5
      }
})

export default function RestaurantCategoryInterface(){
     const classes = useStyles()
     var admin=JSON.parse(localStorage.getItem('ADMIN'))
     const [RestaurantId,setRestaurantId]=useState(admin.restaurantid)
     const [CategoryName,setCategoryName]=useState('')
     const [CategoryIcon,setCategoryIcon]=useState({url:'',bytes:''})
     const [resError,setResError]=useState({})
    
     

       const handleError = (error, input,message)=>{
       setResError(prevState=>({...prevState,[input]:{'error':error,'message':message}}))
        }     
  

    

       const validation=()=>{
        var submitRecord=true
         if(!RestaurantId)
         {
            handleError(true,'Restaurantid','Pls Input Restaurantid')
            submitRecord=false
         }
         if(!CategoryName)
         {
            handleError(true,'categoryName','Pls Input Categoryname')
            submitRecord=false
         }
         if(!CategoryIcon.url)
         {
            handleError(true,'icon','Pls Upload Icon')
            submitRecord=false
         }
        return submitRecord
       }


     const handleIcon=(event)=>{
      setCategoryIcon({url:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
      handleError(true,'icon','')

     }

       const handleSubmit=async()=>{

       var error=validation()
       if(error)
       {
       var formData = new FormData()
       formData.append('restaurantid',RestaurantId)  
       formData.append('categoryname',CategoryName)  
       formData.append('icon',CategoryIcon.bytes)   
       var result=await postData('restaurants/restaurant_category_submit',formData)
       if(result.status)
       {
        Swal.fire({
            icon: 'success',
            title: 'Restaurant Category',
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
        setRestaurantId('')
        setCategoryName('')
        setCategoryIcon({url:'',bytes:''})
     }

    return(<div className={classes.root}>
             <div className={classes.box}>
                <Grid container spacing={2}>
                   <Grid item xs={12}>
                       <Heading title='Restaurant Category' myroute='/admindashboard/displayallcategory'/>
                   </Grid>
                   <Grid item xs={12}>
                       <TextField fullWidth label="Restaurantid"
                       disabled
                       value={RestaurantId}
                       />
                   </Grid>
                   <Grid item xs={12}>
                       <TextField fullWidth label="Category Name"
                       onChange={(event)=>setCategoryName(event.target.value)}
                       error={resError?.categoryName?.error}
                       helperText={resError?.categoryName?.message}
                       onFocus={()=>handleError(false,'categoryName','')}
                       value={CategoryName}
                       />
                   </Grid>

                   <Grid item xs={12}>
                       <Button fullWidth component='label' variant="contained" endIcon={<UploadFile/>}>
                        <input type='file'
                        hidden accept="images/*" 
                        multiple
                        onChange={handleIcon}
                        
                        />
                        Upload Icon of Category
                       </Button>
                      <FormHelperText> <div  className={classes.helpercolor}>{resError?.icon?.message}</div></FormHelperText>
                   </Grid>
                   <Grid item xs={3}></Grid>
                    <Grid item xs={9}>
                    <Avatar
                        variant='rounded'
                        alt="Remy Sharp"
                        src={CategoryIcon.url}
                        sx={{ width: 65, height: 65 }}>
                    </Avatar>
                    </Grid>

                   <Grid item xs={6}>
                      <Button fullWidth component='label' variant="contained" onClick={handleSubmit}>Submit</Button>
                   </Grid>
                    <Grid item xs={6}>
                    <Button fullWidth component='label' variant="contained" onClick={handleReset}>Reset</Button>
                    </Grid> 
                </Grid>
               
             </div>
      </div>)
}