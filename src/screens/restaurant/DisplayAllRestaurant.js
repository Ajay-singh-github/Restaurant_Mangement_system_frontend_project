import {useState,useEffect} from 'react'
import MaterialTable from "@material-table/core"
import { makeStyles } from '@mui/styles';
import { MenuItem } from '@mui/material';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { Grid,Avatar, TextField,FormControl,InputLabel,Select,FormHelperText } from "@mui/material"

import Heading from "../../components/heading/Heading";
import UploadFile from '@mui/icons-material/UploadFile';



import { serverURL,getData,postData } from '../../services/FetchNodeServices';
 
const useStyles = makeStyles({
    rootdisplay: {
      width:"100%",
      height:"100%",
      background:"#dfe6e9",
      display:"flex",
      justifyContent:"center",
      alignItems:"center"
      
    },
    boxdisplay: {
        width:"auto",
        height:"auto",
        borderRadius:10,
        background:"#fff",
        padding:10
    },
    helpercolor:{
      color:'#eb2f06',
      fontSize:'0.8rem',
      margin:5
    },
    root: {
      background:"#dfe6e9",
      display:"flex",
      justifyContent:"center",
      alignItems:"center"
      
    },
    box: {
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

export default function DisplayAllRestaurant()
{
    const classes = useStyles()
    const [listRestaurant,setListRestaurant]=useState([])
    const [open,setOpen]=useState(false)
    //////////////////Restaurant Data //////////////// 
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
   const [tempFile,setTempFile]=useState({fssai:'',shopAct:'',logo:''})
   const [address,setAddress]=useState('')
   const [cityId,setCityIds]=useState('')
   const [resError,setResError]=useState({})
   const [restaurantId,setRestaurantId]=useState('')
   const [btnStatus,setBtnStaus]=useState({fssai:false,ShopAct:false,logo:false})
   

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
    setBtnStaus((prev)=>({...prev,fssai:true}))
  }

  const handleShopAct=(event)=>{
    setFileShopAct({url:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    setBtnStaus((prev)=>({...prev,ShopAct:true}))
  }

  const handleLogo=(event)=>{
    setFileLogo({url:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    setBtnStaus((prev)=>({...prev,logo:true}))
  }

  
 // fomdata ka use tabhi karna hai jab ham data ke sath images bhej rahe ho otherwise nhi karna hai
  const handleSubmit=async()=>{
    
    var error = validation()
    if(error)
    {
      var d=new Date()
      var cd=d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDay()
    var body={'restaurantname':restaurantName,'ownername':ownerName,'phonenumber':phoneNumber,'emailid':emailid,'mobileno':mobileNumber,'url':url,'address':address,'stateid':stateid,'cityid':cityId,'fassai':fssai, 'gstno':gstNo,'gsttype':gstType,'updatedat':cd,'restaurantid':restaurantId}
    var result=await postData('restaurants/restaurant_edit_data',body)
    
    //Alert ke liye start
    if(result.status)
    {
      
      Swal.fire({
       
        
        icon: 'success',
        title: 'Restaurant Registration',
        text: result.message,
        position:'top-end',
        timer: 5000,
        showConfirmButton:false,
        toast:true
      })
      //setOpen(false)
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
    fetchAllRestaurant()
    //end

   }
  }


    ///////////////////////////////////////////////////

   const handleCancel=(imgStatus)=>{
    if(imgStatus==1)
    {
      setBtnStaus((prev)=>({...prev,fssai:false}))
      setFileFassai({url:tempFile.fssai,bytes:''})
    }
    else if(imgStatus==2)
    {
      setBtnStaus((prev)=>({...prev,ShopAct:false}))
      setFileShopAct({url:tempFile.shopAct,bytes:''})
    }else if(imgStatus==3)
    {
      setBtnStaus((prev)=>({...prev,logo:false}))
      setFileLogo({url:tempFile.logo,bytes:''})
    }
    
   }
  
   const editImage=async(imgStatus)=>{
    if(imgStatus==1)
    {
    var formData=new FormData()
    formData.append('restaurantid',restaurantId)
    formData.append('filefassai',fileFassai.bytes)
    var result=await postData('restaurants/restaurant_edit_fssai',formData)
    
    if(result.status)
    {
      
      Swal.fire({
        icon: 'success',
        title: 'Restaurant Registration',
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
    setBtnStaus((prev)=>({...prev,fssai:false}))
    }
    else if(imgStatus==2)
    {
    var formData=new FormData()
    formData.append('restaurantid',restaurantId)
    formData.append('fileshopact',fileShopAct.bytes)
    var result=await postData('restaurants/restaurant_edit_shopact',formData)
    
    if(result.status)
    {
      
      Swal.fire({
        icon: 'success',
        title: 'Restaurant Registration',
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
    setBtnStaus((prev)=>({...prev,ShopAct:false}))
    }else if(imgStatus==3)
    {
    var formData=new FormData()
    formData.append('restaurantid',restaurantId)
    formData.append('logo',fileLogo.bytes)
    var result=await postData('restaurants/restaurant_edit_logo',formData)
    
    if(result.status)
    {
      
      Swal.fire({
        icon: 'success',
        title: 'Restaurant Registration',
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
    setBtnStaus((prev)=>({...prev,logo:false}))
    }
    fetchAllRestaurant()

   } 











    const editDeleteButton=(imgStatus)=>{
      return(<div>
          <Button onClick={()=>editImage(imgStatus)}>Edit</Button>
          <Button onClick={()=>handleCancel(imgStatus)}>Cancel</Button>
      </div>)
    }



    const fetchAllRestaurant=async()=>{
        var result=await getData('restaurants/fetch_all_restaurant')
        setListRestaurant(result.data)
    }

    const handleEdit=(rowData)=>{
      setRestaurantId(rowData.restaurantid)
      fetchAllCities(rowData.stateid)
      setRestaurantName(rowData.restaurantname)
      setOwnName(rowData.ownername)
      setMobileNumber(rowData.mobileno)
      setPhoneNumber(rowData.phonenumber)
      setEmailId(rowData.emailid)
      setAddress(rowData.address)
      setStateId(rowData.stateid)
      setCityIds(rowData.cityid)
      setUrl(rowData.url)
      setFassai(rowData.fassai)
      setGstNo(rowData.gstno)
      setGstType(rowData.gsttype)
      setFileFassai({url:`${serverURL}/images/${rowData.filefassai}`,bytes:''})
      setFileLogo({url:`${serverURL}/images/${rowData.filelogo}`,bytes:''})
      setFileShopAct({url:`${serverURL}/images/${rowData.fileshopact}`,bytes:''})
      setTempFile({fssai:`${serverURL}/images/${rowData.filefassai}`,shopAct:`${serverURL}/images/${rowData.fileshopact}`,logo:`${serverURL}/images/${rowData.filelogo}`})
      setOpen(true)
    
    }

    const handleDialogClose=()=>{
      setOpen(false)
      fetchAllRestaurant()
    }

     const showData=()=>{
      return(<div>
        <div >
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

             value={restaurantName} 
             /> 
           </Grid>
           
           <Grid item xs={6}>
             <TextField label="owner name" 
              onFocus={()=>handleError(false,'ownerName','')}
              error={resError?.ownerName?.error}
              helperText={resError?.ownerName?.message}
             
             onChange={(event)=>setOwnName(event.target.value)} 
             fullWidth
             value={ownerName}
             /> 
           </Grid>

           <Grid item xs={4}>
               <TextField label="Mobile Number" 
               onFocus={()=>handleError(false,'mobileNumber','')}
               error={resError?.mobileNumber?.error}
               helperText={resError?.mobileNumber?.message}

               onChange={(event)=>setMobileNumber(event.target.value)} 
               fullWidth
               value={mobileNumber}
               />
           </Grid>

           
           <Grid item xs={4}>
               <TextField label="Phone Number" onChange={(event)=>setPhoneNumber(event.target.value)} fullWidth value={phoneNumber}/>
           </Grid>
          
           
           <Grid item xs={4}>
               <TextField label="Email Address" 
                 onFocus={()=>handleError(false,'emailid','')}
                 error={resError?.emailid?.error}
                 helperText={resError?.emailid?.message}

                onChange={(event)=>setEmailId(event.target.value)} 
                fullWidth
                value={emailid}
                />
           </Grid>

           <Grid item xs={12}>
              <TextField label="Address" 
               onFocus={()=>handleError(false,'address','')}
               error={resError?.address?.error}
               helperText={resError?.address?.message}

              onChange={(event)=>setAddress(event.target.value)}
               fullWidth
               value={address}/>
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
              <TextField label="URL" onChange={(event)=>setUrl(event.target.value)} fullWidth value={url}/>
           </Grid>

           <Grid item xs={4}>
              <TextField label="FSSAI Number" onChange={(event)=>setFassai(event.target.value)} fullWidth value={fssai}/>
           </Grid>

           <Grid item xs={4}>
              <TextField label="GST Number" onChange={(event)=>setGstNo(event.target.value)} fullWidth value={gstNo}/>
           </Grid>

           <Grid item xs={4}>
           <FormControl fullWidth>
            <InputLabel >GST Type</InputLabel>
           <Select
              label="GST Type" value={gstType} onChange={(event)=>setGstType(event.target.value)}  >
            <MenuItem >-Select GST Type-</MenuItem>
            <MenuItem value='5 star'>5 Star</MenuItem>
            <MenuItem value='Other'>Other</MenuItem>
           
            </Select>
           </FormControl>
           </Grid>
           
           <Grid item xs={4}>
                <Button fullWidth component="label" variant="contained" endIcon={<UploadFile/>}>
                   <input type="file" 
                   onFocus={()=>handleError(false,'fileFassai','')}
                   onChange={handleFassai} hidden accept="image/*" multiple />
                   Upload FSSAI</Button>
                   <FormHelperText ><div className={classes.helpercolor}>{resError?.fileFassai?.message}</div></FormHelperText>

           </Grid>

           <Grid item xs={4}>
                <Button fullWidth component="label" variant="contained" endIcon={<UploadFile/>}>
                   <input type="file" onChange={handleShopAct} hidden accept="image/*" multiple />
                   Upload Shop Act</Button>

           </Grid>


           <Grid item xs={4}>
                <Button fullWidth component="label" variant="contained" endIcon={<UploadFile/>}>
                   <input type="file"  onChange={handleLogo} hidden accept="image/*" multiple />
                   Upload Logo </Button>
           </Grid>
           


            <Grid item xs={4} className={classes.center}>
             <Avatar              //image ko show karwane ke liye
               variant='rounded'
               alt="Remy Sharp"
               src={fileFassai.url}
               sx={{ width: 56, height: 56 }}
              />
              <div>
                {btnStatus.fssai?editDeleteButton(1):<></> }  
              </div>
            </Grid>

            <Grid item xs={4} className={classes.center}>
            <Avatar
             variant='rounded'
             alt="Remy Sharp"
             src={fileShopAct.url}
             sx={{ width: 56, height: 56 }}
              />
              <div>
                {btnStatus.ShopAct?editDeleteButton(2):<></> }  
              </div>
            </Grid>

            <Grid item xs={4} className={classes.center}>
            <Avatar
             variant='rounded'
             alt="Remy Sharp"
             src={fileLogo.url}
             sx={{ width: 56, height: 56 }}
             />
             <div>
                {btnStatus.logo?editDeleteButton(3):<></> }  
              </div>
            </Grid>

 
          
           </Grid>
        </div>
</div>)

       


     }

   const showDataForEdit=()=>{
    return(
      <Dialog
       maxWidth='lg'
       open={open}>
           <DialogContent>
             {showData()}
           </DialogContent>
           <DialogActions>
              <Button onClick={handleSubmit}>Edit</Button>
              <Button onClick={handleDialogClose}>Close</Button>
           </DialogActions>
      </Dialog>
    )
   }

    useEffect(function(){
       fetchAllRestaurant()

    },[])

   const handleDelete=async(rowData)=>{
   
    Swal.fire({
      title: 'Do you want to delete the record?',
      showDenyButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't Delete`,
      
    }).then(async(result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        var body={'restaurantid':rowData.restaurantid} 
        var result=await postData('restaurants/restaurant_delete',body)
         if(result.status)      
         {      
          Swal.fire('Deleted!', '', result.message)
           fetchAllRestaurant()
         }
         else
         Swal.fire('Fail!', '', result.message)

      } else if (result.isDenied) {
        Swal.fire('Restaurant not Delete', '', 'info')
      }
    })
        
        



       
   }


    function displayAll() {
        return (
          <MaterialTable
            title="Restaurant List"
            columns={[
              { title: 'Restaurant',render:rowData=><><div>{rowData.restaurantname}</div><div>{rowData.ownername}</div></> },
              { title: 'Address',render:rowData=><><div>{rowData.address}</div><div>{rowData.cityname},{rowData.statename}</div></> },
              { title: 'Contact', render:rowData=><><div>{rowData.phonenumber}</div><div>{rowData.mobileno}</div><div>{rowData.emailid}</div></> },
              { title: 'Document',render:rowData=><><div>{rowData.gstno}/{rowData.gsttype}</div><div>Fssai:{rowData.fassai}</div>  </> },
              { title: 'website', render:rowData=><div><a href={rowData.url}>Visit</a></div> },
              { title: 'Logo', render:rowData=><div><img src={`${serverURL}/images/${rowData.filelogo}`}  style={{width:50,height:50,borderRadius:10}}/></div> },

            ]}
            data={listRestaurant}        
            actions={[
              {
                icon: 'edit', 
                tooltip: 'Edit Restaurant',
                onClick: (event, rowData) =>handleEdit(rowData)
              },
              {
                icon: 'delete',
                tooltip: 'Delete Restaurant',
                onClick: (event, rowData) => handleDelete(rowData)
              },
              {
                icon: 'add',
                tooltip: 'Add Restaurant',
                isFreeAction: true,
                onClick: (event, rowData) => alert("You want to delete " + rowData.name)
              }
            ]}
          />
        )
      }
    return(<div>
          <div className={classes.rootdisplay}>
            <div className={classes.boxdisplay}>
               {displayAll()}
            </div>
          </div>
         {showDataForEdit()}
    </div>)
}