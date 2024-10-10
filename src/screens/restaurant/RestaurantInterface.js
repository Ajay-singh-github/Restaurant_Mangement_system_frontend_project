import {useState, useEffect} from 'react'
import { Grid,Avatar, TextField,FormControl,InputLabel,Select,MenuItem,Button,FormHelperText } from "@mui/material"
import { makeStyles } from '@mui/styles';
import Heading from "../../components/heading/Heading";
import UploadFile from '@mui/icons-material/UploadFile';
 

import Swal from 'sweetalert2';

import { serverURL,getData,postData } from '../../services/FetchNodeServices';
 
const useStyles = makeStyles({
  root: {
    width:"100%",
    height:"100%",
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



export default function RestaurantInterface()
{
   const classes = useStyles()
   const [states,setStates]=useState([]) 
   const [cities,setCities]=useState([])
   const [stateid,setStateId]=useState('')
   const [restaurantName,setRestaurantName]=useState('')
   const [ownerName,setOwnName]=useState('')
   const [phoneNumber,setPhoneNumber]=useState('')
   const [emailid,setEmailId]=useState('')
   const [mobileNumber,setMobileNumber]=useState('')
   const [url,setUrl]=useState('')
   const [fssai,setFassai]=useState('')
   const [gstNo,setGstNo]=useState('')
   const [gstType,setGstType]=useState('')
   const [fileFassai,setFileFassai]=useState({url:'',bytes:''})
   const [fileShopAct,setFileShopAct]=useState({url:'',bytes:''})
   const [fileLogo,setFileLogo]=useState({url:'',bytes:''})
   const [address,setAddress]=useState('')
   const [cityId,setCityIds]=useState('')
   const [resError,setResError]=useState({})
   const [password,setPassword]=useState()



   const generatePassword=()=>
   {
     var pwd=parseInt((Math.random()*8999)+1000)
     return pwd
   }

   /*
        1)  setResError({resError...,x:{c:c,y:d}}) :- resError... ye json hai jo ki 
         
         khaali hai ismai hamne ye add  x:{c:c,y:d}} kar diya,lekin ye method slow hai 
         kyunki jab esmai value ko set kar dete hai aur jab value get karna hai to click karke value get ki jaa sakti hai 
         magar ek aur method hai jimai agar value abhi set ki hai to haal hi value ko get kar sakte hai without click kiye
                                            
        2)  setError(return (prevError=>({prevError...,x:{c:c,y:d}}))) :- es method mai return laga bhi sakte hai aur nhi bhi like setError(prevError=>({prevError...,x:{c:c,y:d}})))

   */
    const handleError = (error, input,message)=>{
      setResError(prevState=>({...prevState,[input]:{'error':error,'message':message}}))
    }

   const validation=()=>
   {
      var submitRecord=true
      if(restaurantName.trim().length==0)
      {
        handleError(true,'restaurantName',"Pls Input Restaurant Name")
        submitRecord=false
      }
      if(ownerName.trim().length==0)
      {
        handleError(true,'ownerName',"Pls Input Owner Name")
        submitRecord=false
      }
      if(!mobileNumber || !(/^[0-9]{10}$/).test(mobileNumber))  // !mobileNumber  ya ye likh do ya restaurantName.trim().length==0 do ka matlab ek hai
      {
        handleError(true,'mobileNumber',"Pls Input Mobile Number")
        submitRecord=false
      }
     if(!emailid || !(/^\w([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailid)))
     {
        handleError(true,'emailid',"Pls Input Correct Email")
        submitRecord=false
     }
     if(!address)
     {
      handleError(true,'address',"Pls Input Address")
      submitRecord=false
     }
     if(!stateid)
     {
      handleError(true,'stateid',"Pls Select State")
      submitRecord=false
     }
     if(!cityId)
     {
      handleError(true,'cityId',"Pls Select City")
      submitRecord=false
     }
     if(!fileFassai.url)
     {
      handleError(true,'fileFassai',"Pls Upload Fssai")
      submitRecord=false
     }
     if(!fileShopAct.url)
     {
      handleError(true,'fileShopAct',"Pls Upload ShopAct")
      submitRecord=false
     }
     if(!fileLogo.url)
     {
      handleError(true,'fileLogo',"Pls Upload Logo")
      submitRecord=false
     }
      return submitRecord
       
   }

    const fetchAllStates=async()=>{
      var result=await getData('statecity/fetch_all_states')
      
      setStates(result.data)
    }



    useEffect(function(){
       fetchAllStates()
       fetchAllCities()
     
    },[])
    


    const fillState=()=>{
       
      return states.map((item)=>{
        
        return  <MenuItem value={item.stateid}>{item.statename}</MenuItem>
      })

    }

   const fillCities=()=>{
    return cities.map((item)=>{
      return <MenuItem value={item.cityid}>{item.cityname}</MenuItem>
    })
   }
    
    
    const handleStateChange=(event)=>{
       setStateId(event.target.value)
       fetchAllCities(event.target.value)
    }

    const fetchAllCities=async(stateid)=>{
      var body={stateid:stateid}
      var result=await postData('statecity/fetch_all_cities',body)
      setCities(result.data)
    }

    const handleFassai=(event)=>{
      setFileFassai({url:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    }

    const handleShopAct=(event)=>{
      setFileShopAct({url:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    }

    const handleLogo=(event)=>{
      setFileLogo({url:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    }

    

    const handleSubmit=async()=>{
      var error = validation()
      if(error)
      {
      var formData = new FormData()
      formData.append('restaurantname',restaurantName)
      formData.append('ownername',ownerName)
      formData.append('phonenumber',phoneNumber)
      formData.append('emailid',emailid)
      formData.append('mobileno',mobileNumber)
      formData.append('url',url)
      formData.append('address',address)
      formData.append('stateid',stateid)
      formData.append('cityid',cityId)
      formData.append('fassai',fssai)
      formData.append('gstno',gstNo)
      formData.append('gsttype',gstType)
      formData.append('filelogo',fileLogo.bytes)
      formData.append('fileshopact',fileShopAct.bytes)
      formData.append('filefassai',fileFassai.bytes)
      formData.append('password',generatePassword())
      var d=new Date()

      var cd=d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDay()

      formData.append('createdat',cd)
      formData.append('updatedat',cd)
      var result=await postData('restaurants/restaurant_submit',formData)
      
      //Alert ke liye start
      if(result.status)
      {
        
        Swal.fire({
          icon: 'success',
          title: 'Restaurant Registration',
          text: result.message,
          
        })
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Opps...',
          text: result.message,
          
        })
      }
      //end

     }
    }

    return(<div className={classes.root}>
             <div className={classes.box}>
                <Grid container spacing={2}>
                 
                <Grid xs={12}>
                 <Heading title={'Restaurant Registration'}/>
                 
                </Grid>

                <Grid item xs={6}>
                  <TextField label="Restaurant Name" 
                  onFocus={()=>handleError(false,'restaurantName','')}
                  error={resError?.restaurantName?.error}                /* :-  error={resError?.restaurantName?.error} eske ander question mark sign na lagaye to kiya hoga aur question mark ka kiya matlab hai 
                                                                                 error={resError.restaurantName.error}  na lagaye aur hamne apna project ko run kiya to saare component run hoge fir compiler dekhega ki ek json mai kuch nhi hai aur ye banda essmai error ko show karwa raha hai
                                                                                 to error show kar dega
                                                                                 lekin ? mark sign kiya karta hai ki ye jo key hamne define ki hai uski value tab tak null hogi jab tak ham us json mai vo key na daal dete hai
                                                                         */
                  helperText={resError?.restaurantName?.message}
                 
                  onChange={(event)=>setRestaurantName(event.target.value)}
                  fullWidth
                  /> 
                </Grid>
                
                <Grid item xs={6}>
                  <TextField label="owner name" 
                   onFocus={()=>handleError(false,'ownerName','')}
                   error={resError?.ownerName?.error}
                   helperText={resError?.ownerName?.message}
                  
                  onChange={(event)=>setOwnName(event.target.value)} 
                  fullWidth/> 
                </Grid>

                <Grid item xs={4}>
                    <TextField label="Mobile Number" 
                    onFocus={()=>handleError(false,'mobileNumber','')}
                    error={resError?.mobileNumber?.error}
                    helperText={resError?.mobileNumber?.message}

                    onChange={(event)=>setMobileNumber(event.target.value)} 
                    fullWidth/>
                </Grid>

                
                <Grid item xs={4}>
                    <TextField label="Phone Number" onChange={(event)=>setPhoneNumber(event.target.value)} fullWidth/>
                </Grid>
               
                
                <Grid item xs={4}>
                    <TextField label="Email Address" 
                      onFocus={()=>handleError(false,'emailid','')}
                      error={resError?.emailid?.error}
                      helperText={resError?.emailid?.message}

                     onChange={(event)=>setEmailId(event.target.value)} 
                     fullWidth/>
                </Grid>

                <Grid item xs={12}>
                   <TextField label="Address" 
                    onFocus={()=>handleError(false,'address','')}
                    error={resError?.address?.error}
                    helperText={resError?.address?.message}

                   onChange={(event)=>setAddress(event.target.value)}
                    fullWidth/>
                </Grid>

                <Grid item xs={4}>
                <FormControl fullWidth>
                 <InputLabel >State</InputLabel>
                <Select 
                 onFocus={()=>handleError(false,'stateid','')}
                 error={resError?.stateid?.error}
                 helperText={resError?.stateid?.message}

                label="State" value={stateid} 
                onChange={handleStateChange}
                >
                 <MenuItem value={''}>-Select State-</MenuItem>
                  {fillState()}
                 </Select>
                 <FormHelperText ><div className={classes.helpercolor}>{resError?.stateid?.message}</div></FormHelperText>
                </FormControl>
                {
                //:- es tareeke se ham helper text bna sakte hai--> resError?.stateid?.error?<div>{resError?.stateid?.message}</div>:<></>
                  }
                </Grid>

                <Grid item xs={4}>
                <FormControl fullWidth>
                 <InputLabel >City</InputLabel>
                <Select
                   onFocus={()=>handleError(false,'cityId','')}
                   error={resError?.cityId?.error}
                   helperText={resError?.cityId?.message} 

                   label="City" 
                   value={cityId}
                   onChange={(event)=>setCityIds(event.target.value)} 
               >
                 <MenuItem value={''}>-Select City-</MenuItem>
                {fillCities()}
                 </Select>
                 <FormHelperText ><div className={classes.helpercolor}>{resError?.cityId?.message}</div></FormHelperText>
             
                </FormControl>
                </Grid>

                <Grid item xs={4}>
                   <TextField label="URL" onChange={(event)=>setUrl(event.target.value)} fullWidth/>
                </Grid>

                <Grid item xs={4}>
                   <TextField label="Fassai Number" onChange={(event)=>setFassai(event.target.value)} fullWidth/>
                </Grid>

                <Grid item xs={4}>
                   <TextField label="GST Number" onChange={(event)=>setGstNo(event.target.value)} fullWidth/>
                </Grid>

                <Grid item xs={4}>
                <FormControl fullWidth>
                 <InputLabel >GST Type</InputLabel>
                <Select
                   label="GST Type" value={gstType} onChange={(event)=>setGstType(event.target.value)} >
                 <MenuItem >-Select GST Type-</MenuItem>
                 <MenuItem value='5 star'>5 Star</MenuItem>
                 <MenuItem value='Other'>Other</MenuItem>
                
                 </Select>
                </FormControl>
                </Grid>
                
                <Grid item xs={4}>
                     <Button fullWidth component="label" variant="contained" endIcon={<UploadFile/>}>
                        <input type="file" 
                        onClick={()=>handleError(false,'fileFassai','')}
                        onChange={handleFassai}
                        hidden accept="image/*" 
                        multiple 
                        />
                        Upload Fassai</Button>
                        <FormHelperText ><div className={classes.helpercolor}>{resError?.fileFassai?.message}</div></FormHelperText>

                </Grid>

                <Grid item xs={4}>
                     <Button fullWidth component="label" variant="contained" endIcon={<UploadFile/>}>
                        <input type="file" onChange={handleShopAct} hidden accept="image/*" multiple onClick={()=>handleError(false,'fileShopAct','')} />
                        Upload Shop Act</Button>
                        <FormHelperText ><div className={classes.helpercolor}>{resError?.fileShopAct?.message}</div></FormHelperText>
                </Grid>


                <Grid item xs={4}>
                     <Button fullWidth component="label" variant="contained" endIcon={<UploadFile/>}>
                        <input type="file"  onChange={handleLogo} hidden accept="image/*" multiple onClick={()=>handleError(false,'fileLogo','')}  />
                        Upload Logo </Button>
                        <FormHelperText ><div className={classes.helpercolor}>{resError?.fileLogo?.message}</div></FormHelperText>
                </Grid>
                


                 <Grid item xs={4} className={classes.center}>
                  <Avatar              //image ko show karwane ke liye
                    variant='rounded'
                    alt="Remy Sharp"
                    src={fileFassai.url}
                    sx={{ width: 56, height: 56 }}
                   />
                 </Grid>

                 <Grid item xs={4} className={classes.center}>
                 <Avatar
                  variant='rounded'
                  alt="Remy Sharp"
                  src={fileShopAct.url}
                  sx={{ width: 56, height: 56 }}
                   />
                 </Grid>

                 <Grid item xs={4} className={classes.center}>
                 <Avatar
                  variant='rounded'
                  alt="Remy Sharp"
                  src={fileLogo.url}
                  sx={{ width: 56, height: 56 }}
                  />
                 </Grid>



                <Grid item xs={6}>
                    <Button variant="contained" onClick={handleSubmit} fullWidth>Submit</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained" fullWidth>Reset</Button>
                </Grid>
                </Grid>
             </div>
    </div>)
}