import { makeStyles } from '@mui/styles';
import Heading from '../../components/heading/Heading';
import { Avatar, Grid, TextField ,FormHelperText} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState,useEffect } from 'react';
import { getData, postData } from '../../services/FetchNodeServices';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';

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
  



export default function Subcategoryinterface()
{
    const classes = useStyles()
    var admin=JSON.parse(localStorage.getItem('ADMIN'))
     const [restaurantId,setRestaurantId]=useState(admin.restaurantid)
     const [allcategory,setAllCategory]=useState([])
     const [categoryId,SetCategoryId]=useState()
     const [foodItem,setFoodItem]=useState()
     const [foodType,setFoodType]=useState('')
     const [Ingredients,setIngredients]=useState()
     const [price,setPrice]=useState()
     const [offerPrice,setOfferPrice]=useState()
     const [fileIcon,setFileIcon]=useState({})
     const [resError,setResError]=useState({})
     const [secondPrice,setSecondPrice]=useState()

     const AllCategory=()=>
     {
           return allcategory.map((item)=>{
                 return  <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
           })
     }

     const handleError = (error, input,message)=>{
        setResError(prevState=>({...prevState,[input]:{'error':error,'message':message}}))
      }

    

     const  fetchAllCategory=async()=>{
      
        
      const result=await postData('restaurants/fetch_all_category',{'restaurantid':admin.restaurantid})
      setAllCategory(result.result)
      
    }
    
    useEffect(function(){
      fetchAllCategory()

   },[])

    const handleFile=(event)=>
    {
        setFileIcon({url:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
        handleError(false,'fileicon','')
    }
    
    const validation=()=>
    {
        var submitRecord=true
        if(!categoryId)
        {
            handleError(true,'Category',"Pls Select Category")
            submitRecord=false
        }
        if(!foodItem)
        {
            handleError(true,'fooditem',"Pls Enter Food Item")
            submitRecord=false
        }
        if(!foodType)
        {
            handleError(true,'foodtype',"Pls Select Food Type")
            submitRecord=false
        }
        if(!Ingredients)
        {
            handleError(true,'ingredients',"Pls Enter Ingredients")
            submitRecord=false
        }
        if(!price)
        {
            handleError(true,'price',"Pls Enter Price")
            submitRecord=false
        }
        // if(!offerPrice)
        // {
        //     handleError(true,'offerprice',"Pls Enter Offer Price")
        //     submitRecord=false
        // }
        if(!fileIcon.url)
        {
            handleError(true,'fileicon',"Pls Upload Icon")
            submitRecord=false
        }
        return submitRecord
    }
     
    const SubmitBtn=async()=>
    {
        setSecondPrice(price-offerPrice)
        var error=validation()
        if(error)
        {
        var formData= new FormData()
        formData.append('restaurantid',restaurantId)
        formData.append('categoryid',categoryId)
        formData.append('fooditem',foodItem)
        formData.append('foodtype',foodType)
        formData.append('ingredients',Ingredients)
        formData.append('price',price)
        formData.append('offerprice',secondPrice)
        formData.append('icon',fileIcon.bytes)
        const result=await postData('restaurants/subcategory_submit',formData)
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

    const handleCategory=(event)=>{
        SetCategoryId(event.target.value)
    }

    const handleFoodType=(event)=>
    {
       setFoodType(event.target.value)
    }
    return(<div className={classes.root}>
              <div className={classes.box}>
                  <Grid container spacing={2}>
                      <Grid item xs={12}>
                         <Heading title='Subcategory Registration' myroute='/admindashboard/displayallsubcategory'/>
                      </Grid>
                      <Grid item xs={6}>
                          <TextField label='Restaurantid' fullWidth 
                          disabled
                          value={restaurantId}/>
                      </Grid>
                      <Grid item xs={6}>
                      
                           <FormControl fullWidth>
                            <InputLabel style={{display:"flex"}}>Select Category </InputLabel>
                            
                            <Select
                            label="Select Category"
                            onChange={handleCategory}
                            error={resError?.Category?.error}
                            onFocus={()=>handleError(false,'Category','')}
                            value={categoryId}
                           >
                           <MenuItem value={''}>-Select Category-</MenuItem>
                      
                           {AllCategory()}
                          </Select>
                          <FormHelperText><div style={{color: '#ef5350'}}>{resError?.Category?.message}</div></FormHelperText>
                        </FormControl>
                   
                      </Grid>
                      <Grid item xs={6}>
                          <TextField label="Enter Food Item" fullWidth
                          onChange={(event)=>setFoodItem(event.target.value)}
                          error={resError?.fooditem?.error}
                          helperText={resError?.fooditem?.message}
                          onFocus={()=>handleError(false,'fooditem','')}
                          />
                      </Grid>
                      <Grid item xs={6}>
                      <FormControl>
                           <FormLabel style={{display:'flex'}}>Food Type </FormLabel>
                           <RadioGroup row 
                           error={resError?.foodtype?.error}
                           >
                           <FormControlLabel value="vegetarian" control={<Radio />} label="Vegetarian" onClick={handleFoodType}   onFocus={()=>handleError(false,'foodtype','')}/>
                           <FormControlLabel value="Non vegetarian" control={<Radio />} label="Non vegetarian"  onClick={handleFoodType}   onFocus={()=>handleError(false,'foodtype','')} />
                           
                        </RadioGroup>
                        
                          </FormControl>
                          <FormHelperText><div style={{color: '#ef5350'}}>{resError?.foodtype?.message}</div></FormHelperText>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField label="Ingredients" fullWidth
                         onChange={(event)=>setIngredients(event.target.value)}
                         error={resError?.ingredients?.error}
                         helperText={resError?.ingredients?.message}
                         onFocus={()=>handleError(false,'ingredients','')}
                        />
                      </Grid>

                      <Grid item xs={6}>
                         <TextField label="Price" fullWidth
                          onChange={(event)=>setPrice(event.target.value)}
                          error={resError?.price?.error}
                          helperText={resError?.price?.message}
                          onFocus={()=>handleError(false,'price','')}
                         />
                      </Grid>
                      <Grid item xs={6}>
                         <TextField label="Offer Price" fullWidth
                           onChange={(event)=>setOfferPrice(event.target.value)}
                          //  error={resError?.offerprice?.error}
                          //  helperText={resError?.offerprice?.message}
                          //  onFocus={()=>handleError(false,'offerprice','')}                           
                         />
                      </Grid>

                      <Grid item xs={12} >
                        <Button fullWidth component="label" variant="contained"> <input type="file" hidden accept="images/*" 
                        multiple onChange={handleFile}/> Upload Icon</Button> 
                         <FormHelperText><div style={{color: '#ef5350',paddingLeft:15}}>{resError?.fileicon?.message}</div></FormHelperText>
                      </Grid>
                      <Grid item xs={12} style={{paddingLeft:180}}>
                         <Avatar 
                           variant='rounded'
                           alt="Remy Sharp"
                           src={fileIcon.url}
                           sx={{ width: 56, height: 56 }}
                        />
                       
                      </Grid>

                      <Grid item xs={12}>
                         <Button fullWidth component="label" variant="contained" onClick={SubmitBtn}> Submit</Button>
                      </Grid>

                      
                   
                  </Grid>
                 
              </div>
    </div>)
}