import { makeStyles } from "@mui/styles"
import { useState,useEffect } from "react"
import  MaterialTable  from "@material-table/core"
import { serverURL,getData,postData } from "../../services/FetchNodeServices"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';




import Heading from "../../components/heading/Heading";
import { Grid,TextField,FormHelperText,Avatar } from "@mui/material";
import { UploadFile } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
    rootcategorydisplay: {
        width:"100%",
        height:"auto",
        background:"#dfe6e9",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
        
      },
      boxcategorydisplay: {
          width:"auto",
          height:"auto",
          borderRadius:10,
          background:"#fff",
          padding:10
      }
})



export default function DisplayAllCategory()
{
    const classes=useStyles()
    var navigate=useNavigate()
    const [allCategory,setAllCategory]=useState()
    const [edit,setEdit]=useState()
    const [CategoryName,setCategoryName]=useState()
    const [icon,setIcon]=useState({url:'',bytes:''})
    const [fileTem,setFileTem]=useState({url:'',bytes:''})
    const [CategoryId,setCategoryId]=useState()
    const [resErrorName,setResErrorName]=useState()
    const [btn,setBtn]=useState()
    const [displaycategory,setDisplayCategory]=useState()
    const [foodItemId,setFoodItemId]=useState()
    
     var admin=JSON.parse(localStorage.getItem('ADMIN'))
     const [restaurantId,setRestaurantId]=useState(admin.restaurantid)
     const [allcategory,setAllCategoryA]=useState([])
     const [categoryId,SetCategoryId]=useState()
     const [foodItem,setFoodItem]=useState()
     const [foodType,setFoodType]=useState('')
     const [Ingredients,setIngredients]=useState()
     const [price,setPrice]=useState()
     const [offerPrice,setOfferPrice]=useState()
     const [fileIcon,setFileIcon]=useState({})
     const [resError,setResError]=useState({})


    const  fetchAllCategory=async()=>{
        
        const result=await postData('restaurants/fetch_all_sub_category',{'restaurantid':admin.restaurantid})
        setAllCategory(result.result)
        
      }
      
      useEffect(function(){
        fetchAllCategory()
 
     },[])

    
     const handleEdit=(rowData)=>{
        setFoodItemId(rowData.fooditemid)
        setPrice(rowData.price)
        setOfferPrice(rowData.offerprice)
        setIngredients(rowData.ingredients)
        setFoodType(rowData.foodtype)
        setFoodItem(rowData.fooditemname)
        setDisplayCategory(rowData.categoryid)
        setCategoryId(rowData.categoryid)
        setCategoryName(rowData.categoryname)
        setRestaurantId(rowData.restaurantid)
        setIcon({url:`${serverURL}/images/${rowData.icon}`,bytes:''})

        setEdit('open')
     }

     const handleIcon=(event)=>{
        
        setIcon({url:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
        setFileTem({url:icon.url,bytes:icon.bytes})
        setBtn(true)
     }
      
     const handleCancel=()=>{
         setIcon({url:fileTem.url,bytes:icon.bytes})
         setBtn('')
    
     }
 
     const handleEditAgain=async()=>{
         setBtn('')
         var formData=new FormData()
         formData.append('categoryid',displaycategory)
         formData.append('fooditemid',foodItemId)
         formData.append('icon',icon.bytes)
         const  result=await postData('restaurants/Sub_category_icon_edit',formData)
  
          if(result.status)
          {
            
            Swal.fire({
              icon: 'success',
              title: 'Category Add',
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

     
     const handleDelete=async(rowData)=>{
   
      Swal.fire({
        title: 'Do you want to delete the record?',
        showDenyButton: true,
        confirmButtonText: 'Delete',
        denyButtonText: `Don't Delete`,
        
      }).then(async(result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          var body={'categoryid':rowData.categoryid,'fooditemid':rowData.fooditemid} 
          var result=await postData('restaurants/sub_category_delete',body)
           if(result.status)      
           {      
            Swal.fire('Deleted!', '', result.message)
            {fetchAllCategory()}
           }
           else
           Swal.fire('Fail!', '', result.message)
  
        } else if (result.isDenied) {
          Swal.fire('Category not Delete', '', 'info')
        }
      })
          
          
  
  
  
         
     }
  
  
     

     function ShowCategoryDialogBox(){

      const fetchcategory=async()=>
      {   var body={restaurantId:restaurantId}
          var result=await getData('restaurants/fetch_category',body);
          setAllCategoryA(result.data)
         
      }    


      const AllCategoryDisplay=()=>
      {
            return allcategory.map((item)=>{
                  return  <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
            })
      }
           
      
      useEffect(function(){
        fetchcategory()
 
     },[])
  
     const handleCategory=(event)=>{
       setDisplayCategory(event.target.value)
     }

        return(<div>
            <Heading title='Restaurant Category' />
            <Grid container spacing={2}>
                    <Grid item xs={6} fullWidth>
                          <TextField label='Restaurantid' fullWidth value={restaurantId} />
                      </Grid>
                      <Grid item xs={6}>
                      
                      <FormControl fullWidth>
                       <InputLabel style={{display:"flex"}}><div>Select Category </div><div style={{color:'red'}}>*</div></InputLabel>
                       
                       <Select
                       label="Select Category"
                       onChange={handleCategory}
                       value={displaycategory}
                       error={resError?.displaycategory?.error}
                       onFocus={()=>handleError(false,'displaycategory','')}
                      >
                      <MenuItem value={''}>-Select Category-</MenuItem>
                      {AllCategoryDisplay()}
                      
                     
                     </Select>
                     <FormHelperText><div style={{color:'red'}}>{resError?.displaycategory?.message}</div></FormHelperText>
                   </FormControl>
              
                 </Grid>
                 <Grid item xs={6}>
                    <TextField   label='Enter Food Item' fullWidth value={foodItem} onChange={(event)=>setFoodItem(event.target.value)}
                     error={resError?.foodItem?.error}
                     helperText={resError?.foodItem?.message}
                     onFocus={()=>handleError(false,'foodItem','')}
                    />
                 </Grid>

                 <Grid item xs={6}>
                      <FormControl>
                           <FormLabel style={{display:'flex'}}> <div>Food Type</div><div style={{color:'red'}}>*</div></FormLabel>
                           <RadioGroup row value={foodType} >
                           <FormControlLabel value="vegetarian" control={<Radio />} label="Vegetarian"  onClick={(event)=>setFoodType(event.target.value)}  />
                           <FormControlLabel value="Non vegetarian" control={<Radio />} label="Non vegetarian"   onClick={(event)=>setFoodType(event.target.value)}  />
                           
                        </RadioGroup>
                        
                          </FormControl>
                        
                      </Grid>
                       <Grid item xs={12}>
                          <TextField value={Ingredients} label='Enter Ingredients' fullWidth  onChange={(event)=>setIngredients(event.target.value)}
                          error={resError?.Ingredients?.error}
                          helperText={resError?.Ingredients?.message}
                          onFocus={()=>handleError(false,'Ingredients','')}
                          />
                       </Grid>

                       <Grid item xs={6}>
                          <TextField value={price} label='Price' fullWidth  onChange={(event)=>setPrice(event.target.value)}
                           error={resError?.price?.error}
                           helperText={resError?.price?.message}
                           onFocus={()=>handleError(false,'price','')}
                           />
                            
                       </Grid>

                       <Grid item xs={6}>
                          <TextField value={offerPrice} label='Offer Price' fullWidth onChange={(event)=>setOfferPrice(event.target.value)} 
                          error={resError?.offerPrice?.error}
                          helperText={resError?.offerPrice?.message}
                          onFocus={()=>handleError(false,'offerPrice','')}
                          />
                       </Grid>

                       <Grid item xs={12}>
                       <Button fullWidth component='label' variant="contained" endIcon={<UploadFile/>}>
                        <input type='file'
                        hidden accept="images/*" 
                        multiple
                        onChange={handleIcon}
                        />
                        Upload Icon of Sub Category
                       </Button>
                       
                   </Grid>
                   <Grid item xs={12}>
                    <div style={{display:"flex"}}>
                   <Avatar
                        variant='rounded'
                        alt="Remy Sharp"
                        src={icon.url}
                        sx={{ width: 65, height: 65 }}/>
                   
                    <div style={{padding:8,paddingTop:7}} >
                     {btn?editDeleteButton():<></> }
                   </div>
                   </div>
                    </Grid>
                </Grid>
            
                
        </div>)
     }
      

     


     const handleError = (error, input,message)=>{
      setResError(prevState=>({...prevState,[input]:{'error':error,'message':message}}))
    }

     const validation=()=>{
      var submit=true
      if(!displaycategory)
      {
        handleError(true,'displaycategory','Pls Select Category ')
        return submit=false
     
      }
      if(!foodItem)
      {
        handleError(true,'foodItem','Pls Enter Food Item Name ')
        return submit=false
     
      }
     
      if(!Ingredients)
      {
        handleError(true,'Ingredients','Pls Enter Ingredients ')
        return submit=false
     
      }
      if(!price)
      {
        handleError(true,'price','Pls Enter Price ')
        return submit=false
     
      }
      if(!offerPrice)
      {
        handleError(true,'offerPrice','Pls Enter Offer Price')
        return submit=false
     
      }
      return submit
     }


     const handleClose=()=>{

          setEdit('')
          fetchAllCategory()
     }

     const handleSubmit=async()=>{
        var error=validation()
        if(error)
        {
           var body={'restaurantid':restaurantId,'categoryid':displaycategory,'fooditemname':foodItem,'foodtype':foodType,'ingredients':Ingredients,'price':price,'offerprice':offerPrice,'fooditemid':foodItemId}
           var result=await postData('restaurants/edit_sub_category',body)
          if(result.status)
          {
            Swal.fire({
       
              icon: 'success',
              title: 'Category',
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
              
            }) 
          }
       }
       
       else
       {
        alert("Wrong ")
       }
     }
    
     const DialogBoxCategory=()=>{
         return(
            <Dialog
            maxWidth='md'
            open={edit}
            >
                <DialogContent>
                  {ShowCategoryDialogBox()}
                </DialogContent>
                <DialogActions>
                   <Button onClick={handleSubmit}>Edit</Button>
                   <Button onClick={handleClose}>Close</Button>
                </DialogActions>
           </Dialog>
         )
     }

     

     


      function DisplayAll()
      {   
        return(
            <MaterialTable
            title="Sub Category Display"
            columns={[
              { title: 'Category Name', render:rowData=><><div>{rowData.categoryname}</div></> },
              { title: 'Fooditem Name', render:rowData=><><div>{rowData.fooditemname}</div></> },
              { title: 'Food Type', render:rowData=><><div>{rowData.foodtype}</div></> },
              { title: 'Ingredients', render:rowData=><><div>{rowData.ingredients}</div></> },
              { title: 'Price/Offer Price', render:rowData=><><div><s>{rowData.price}</s>{rowData.offerprice} </div></> },    
              { title: 'Offer Price', render:rowData=><><div>{rowData.offerprice}</div></> },                       
              { title: 'Category Icon', render:rowData=><><div><img src={`${serverURL}/images/${rowData.icon}`}   style={{width:50,height:50,borderRadius:10}}/></div></> }
            
                
            ]}
            data={allCategory}        
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Category',
                onClick: (event, rowData) => handleEdit(rowData)
              },
              {
                icon: 'delete',
                tooltip: 'Delete Category',
                onClick: (event, rowData) => handleDelete(rowData) 
              },
              {
                icon: 'add',
                tooltip: 'Add Sub Category',
                isFreeAction:true,
                onClick: (event, rowData) =>navigate('/admindashboard/subcategoryinterface')
              },
            ]}
          />
        )
      }


    return(<div className={classes.rootcategorydisplay}>
              <div className={classes.boxcategorydisplay}>
                    {DisplayAll()}
              </div>
              {DialogBoxCategory()}
            
           </div>)
}