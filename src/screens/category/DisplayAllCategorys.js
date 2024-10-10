import { makeStyles } from "@mui/styles"
import { useState,useEffect } from "react"
import  MaterialTable  from "@material-table/core"

import { serverURL,getData,postData } from "../../services/FetchNodeServices"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';


import Heading from "../../components/heading/Heading";
import { Grid,TextField,FormHelperText,Avatar } from "@mui/material";
import { UploadFile } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { Navigate, useNavigate } from "react-router-dom";
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
          width:"95vw",
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
    var admin=JSON.parse(localStorage.getItem('ADMIN'))
    const [restaurantId,setRestaurantId]=useState()

    const  fetchAllCategory=async()=>{
      
        
        const result=await postData('restaurants/fetch_all_category',{'restaurantid':admin.restaurantid})
        setAllCategory(result.result)
        
      }
      
      useEffect(function(){
        fetchAllCategory()
 
     },[])

    
     const handleEdit=(rowData)=>{
        setCategoryId(rowData.categoryid)
        setCategoryName(rowData.categoryname)
        setRestaurantId(rowData.restaurantid)
        setIcon({url:`${serverURL}/images/${rowData.icon}`,bytes:''})

        setEdit('open')
     }

     const handleIcon=(event)=>{
        
        setIcon({url:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
        setFileTem({url:icon.url,bytes:''})
        setBtn(true)
     }
      
     const handleCancel=()=>{
         setIcon({url:fileTem.url,bytes:''})
         setBtn('')
    
     }
 
     const handleEditAgain=async()=>{
         setBtn('')
         var formData=new FormData()
         formData.append('categoryid',CategoryId)
         formData.append('icon',icon.bytes)
         const result=await postData('restaurants/category_icon_edit',formData)
  
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
          var body={'categoryid':rowData.categoryid} 
          var result=await postData('restaurants/category_delete',body)
           if(result.status)      
           {      
            Swal.fire('Deleted!', '', result.message)
            fetchAllCategory()
           }
           else
           Swal.fire('Fail!', '', result.message)
  
        } else if (result.isDenied) {
          Swal.fire('Category not Delete', '', 'info')
        }
      })
          
          
  
  
  
         
     }
  
  
     

     function ShowCategoryDialogBox(){
           
        return(<div>
            <Heading title='Restaurant Category'/> 
            <Grid container spacing={2}>

            <Grid item xs={12}>
                       <TextField fullWidth label="Restaurantid"
                       
                       value={restaurantId}
                       />
                   </Grid>
            <Grid item xs={12}>
                      <TextField fullWidth label="Category Name"
                       onChange={(event)=>setCategoryName(event.target.value)}
                       value={CategoryName}
                       error={resErrorName?.error}
                       helperText={resErrorName?.message}

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
      
     
     const validation=()=>{
      var submit=true
      if(CategoryName.trim().length==0)
      {
        setResErrorName({error:true,message:'Pls Input Category Name'})
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
        var  body={'categoryname':CategoryName,'categoryid':CategoryId}
        var result=await postData('restaurants/category_edit_submit',body)
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
        }
      }
     }
    
     const DialogBoxCategory=()=>{
         return(
            <Dialog
            maxWidth='lg'
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
            title="Category Display "
            columns={[
              {title:""},
              { title: 'Category Name', render:rowData=><><div>{rowData.categoryname}</div></> },
              {title:""},
              {title:""},
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
                tooltip: 'Add Category',
                isFreeAction:true,
                onClick: (event, rowData) =>navigate('/admindashboard/restaurantcategoryinterface') 
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