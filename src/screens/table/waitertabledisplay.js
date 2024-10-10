
import FormControl from '@mui/material/FormControl';
import { FormHelperText, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Heading from '../../components/heading/Heading';
import Button from '@mui/material/Button';
import { useEffect, useState } from "react"
import { getData, postData } from '../../services/FetchNodeServices';
import Swal from 'sweetalert2';
import Select  from '@mui/material/Select';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';



import  MaterialTable  from "@material-table/core"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

import { useNavigate } from 'react-router-dom';


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
    center:{
        paddingLeft:'50'
    }
})

export default function WaiterTableDisplay()
{   var classes=useStyles()
    var navigate=useNavigate()
    const [waitertableasign,setWaitersData]=useState()
    const [open,setOpen]=useState()
    const [currentDate,setCurrentDate]=useState()
    const [waiterDataEdit,setWaitersDataEdit]=useState([{}])
    const [waiter,setWaiter]=useState('')
    const [waitersfloor,setWaitersFloor]=useState([{}])
    const [floor,setFloor]=useState()
    const [tabledata,setTableData]=useState([{}])
    const [tableid,setTableId]=useState()
    const [resError,setResError]=useState({})
    const [waitertableid,setWaiterTableId]=useState()

    const handleError = (error, input,message)=>{
      setResError(prevState=>({...prevState,[input]:{'error':error,'message':message}}))
    }

    var admin=JSON.parse(localStorage.getItem('ADMIN'))

    
    const fetchwaiters=async()=>
    {
        const result=await postData('restaurants/fetch_waiter_table_asign',{'restaurantid':admin.restaurantid})
        setWaitersData(result.data)
    }
 
    
    useEffect(function(){
        fetchwaiters()
 
     },[])


     const handleEdit=(rowData)=>
     {   setCurrentDate(rowData.currentdate)
         setWaiter(rowData.waiterid)
         setFloor(rowData.floor)
         setTableId(rowData.tableid)
         setWaiterTableId(rowData.waitertableid)
         setWaiterTableId(rowData.waitertableid)
         setOpen('open')
         RestaurantTabledata(rowData.floor)
     }
     
     const handleDelete=async(rowData)=>
     {

      Swal.fire({
        title: 'Do you want to delete the record?',
        showDenyButton: true,
        confirmButtonText: 'Delete',
        denyButtonText: `Don't Delete`,
        
      }).then(async(result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          var body={restaurantid:admin.restaurantid,waitertableid:rowData.waitertableid}
          var result = await postData('restaurants/waiter_table_delete',body)
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


     const handleClose=()=>
     {
         setOpen('')
     }
 
     const handleDate=(event)=>{
      const m=String(Number(event.$M)+1);
      const d=String(event.$D);
      const y=String(event.$y);
      setCurrentDate(y+"-"+m+"-"+d);   
    }

     const putWaiterEdit=()=>
     {
         return waiterDataEdit.map((item)=>{
            return <MenuItem value={item.waiterid}>{item.waitername}</MenuItem>
         })
     }

     const putTable=()=>
     {
        return  tabledata.map((item)=> {
            return <MenuItem value={item.tableid}>{item.tableno}</MenuItem>
        })
     }
     
     const fetchWaitersEdit=async()=>
     {
         const result=await postData('restaurants/fetch_waiters_data',{"restaurantid":admin.restaurantid})
         setWaitersDataEdit(result.data)
     }

    useEffect(function(){
      fetchWaitersEdit()
      fetchWaiterfloor()
    },[])


    const fetchWaiterfloor=async()=>
    {
        const result=await postData('restaurants/fetch_waiters_floor',{"restaurantid":admin.restaurantid})
        setWaitersFloor(result.data)
    }


    const putFloor=()=>
    {
          return waitersfloor.map((item)=>{
            return <MenuItem value={item.floor}>{item.floor}</MenuItem>
          })
    }

    const RestaurantTabledata=async(floorname)=>{
      var result =await postData('restaurants/fetch_table_data_fill',{'restaurantid':admin.restaurantid,'floor':floorname})
      setTableData(result.data)
    }

    const handleFloor=(event)=>{
      setFloor(event.target.value)
      RestaurantTabledata(event.target.value)
      
   }

   const handleChange=(event)=>
   {
       setTableId(event.target.value)
   }

     const validation=()=>
     {
         var submitRecord=true
         if(!currentDate)
         {
            handleError(true,'date',"Pls Select Date")
            return submitRecord=false
         }
         if(!waiter)
         {
            handleError(true,'waiter',"Pls Select Waiter Name")
            return submitRecord=false
         }
         if(!floor)
         {
           handleError(true,'floor',"Pls Select Floor")
           return submitRecord=false
         }
         if(!tableid)
         {
           handleError(true,'tableid',"Pls Select Table")
           return submitRecord=false
         }
         return submitRecord
     }

     const handleSubmit=async()=>
     {
          var error=validation()
          if(error)
          {
            var body={restaurantid:admin.restaurantid,currentdate:currentDate,waiter:waiter,floor:floor,tablename:tableid,waitertableid:waitertableid}
            var result =await postData('restaurants/waiter_table_edit_data_submit',body)
            if(result.status)
            { 
              
              Swal.fire({
                
                icon: 'success',
                title: 'Table Booking',
                text: result.message,
                position:'top-end',
                timer: 5000,
                showConfirmButton:false,
                toast:true
                
             })
            }else
            {
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
            fetchwaiters()
          
          }
        }

    const ShowDataInDialog=()=>
    {  var classes=useStyles()
      return(<div className={classes.root}>
        <div className={classes.box}>
            <Grid container spacing={3}>
               <Grid item xs={12}>
               <Heading title='Edit Waiter Table'/>
               </Grid>

               <Grid item xs={6}>
               <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker', 'DatePicker']}>        
                      <DatePicker
                        label="Current Date"
                        format="DD-MM-YYYY"
                        onChange={handleDate} 
                       defaultValue={dayjs(currentDate)}    
                      />
                 </DemoContainer>
             </LocalizationProvider>
                </Grid>
                <Grid item xs={6} style={{paddingTop:32}}>
                <FormControl fullWidth>
                 <InputLabel id="demo-simple-select-label">Waiter</InputLabel>
                <Select
                
                label="Waiter"
                onChange={(event)=>setWaiter(event.target.value)}
                error={resError?.waiter?.error}
                onFocus={()=>setResError({error:false,waiter,message:''})}
                value={waiter}
                >
                  
                <MenuItem value=''>-Select Waiter-</MenuItem>    
                {putWaiterEdit()}
                </Select>
                <FormHelperText><div style={{color:'#e74c3c'}}>{resError?.waiter?.message}</div></FormHelperText>
                 </FormControl>
                </Grid>

                <Grid item xs={6}>
                <FormControl fullWidth>
                           <InputLabel style={{display:"flex"}}>Select Floor </InputLabel>
                            
                            <Select
                            label="Select Floor"
                            onChange={handleFloor}
                            error={resError?.floor?.error}  
                            onFocus={()=>setResError({error:false,floor,message:''})}
                            value={floor}
                           >
                           <MenuItem value={''}>-Select Floor-</MenuItem>
                           {putFloor()}
                          </Select>
                          <FormHelperText><div style={{color:'#e74c3c'}}>{resError?.floor?.message}</div></FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                <FormControl fullWidth>
                 <InputLabel >Table</InputLabel>
                <Select
                //onChange={(event)=>setTableDataSecond(event.target.value)}
                error={resError?.tableid?.error}
                onFocus={()=>setResError({error:false,tableid,message:''})}
                label="Table"
                onChange={handleChange}
                value={tableid}
                >
                <MenuItem value=''>-Select Table-</MenuItem>
                {putTable()}
               
                 </Select>
                 <FormHelperText><div style={{color:'#e74c3c'}}>{resError?.tableid?.message}</div></FormHelperText>
                 </FormControl>
                </Grid>
            </Grid>
        </div>
      </div>)
    }
    
     
     const ShowDialogForEdit=()=>{
      return(
        <Dialog
          maxWidth={"sm"}
          open={open}>
            <DialogContent  >
               {ShowDataInDialog()}
           </DialogContent>
          
           <DialogActions>
             <Button onClick={handleSubmit}>Update</Button>
             <Button onClick={handleClose} >Close</Button>
           </DialogActions>
        </Dialog>
       )}

       
    return(<div className={classes.root}> 
        <div className={classes.box}>
        <MaterialTable
      title="Display Waiter Table"
      columns={[
        { title: 'Restaurant ID', render:rowData=><><div>{rowData.restaurantid}</div></> },
        { title: 'Waiter Name', render:rowData=><><div>{rowData.waitername}</div></>},
        { title: 'Table Number', render:rowData=><><div>{rowData.floor}/Table {rowData.tableno}</div></> },
        { title: 'Current Date', render:rowData=><><div>{rowData.currentdate}</div></> },
       
      ]}
      data={waitertableasign}        
      actions={[
        {
          icon: 'edit',
          tooltip: 'Edit Waiter Table',
          onClick: (event, rowData) => handleEdit(rowData)
        },
        {
          icon:'delete',
          tooltip: 'delete Waiter Table',
          onClick: (event, rowData) => handleDelete(rowData)
        },
        {
          icon:'add',
          tooltip: 'Add Waiter Table',
          isFreeAction:true,
          onClick: (event, rowData) => navigate("/admindashboard/waitertable")
        }
        
      ]}
    />
        </div>
        {ShowDialogForEdit()}
      
    </div>)
}