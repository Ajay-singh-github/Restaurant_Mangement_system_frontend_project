
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { FormHelperText, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Heading from '../../components/heading/Heading';
import Button from '@mui/material/Button';
import { useEffect, useState } from "react"
import { getData, postData } from '../../services/FetchNodeServices';
import Swal from 'sweetalert2';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Select  from '@mui/material/Select';
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
        width:"40%",
        height:"auto",
        borderRadius:10,
        background:"#fff",
        padding:10
    },
    center:{
        paddingLeft:'50'
    }
})


export default function WaiterTable()
{   var classes=useStyles()
    var admin=JSON.parse(localStorage.getItem('ADMIN'))

    const [waitersdata,setWaitersData]=useState([{}])
    const [tabledata,setTableData]=useState([{}])
    const [waiterdatasecond,setWaiterDataSecond]=useState()
    const [tabledatasecond,setTableDataSecond]=useState()
    const [resError,setResError]=useState({error:'',message:''})
    const [resErrorsecond,setResErrorSecond]=useState({error:'',message:''})
    const [resErrorThird,setResErrorThird]=useState({error:'',message:''})

    const [restaurantid,setRestaurantid]=useState(admin.restaurantid)
    const [value, setValue] = useState()
    const [floor,setFloor]=useState()
    const [waitersfloor,setWaitersFloor]=useState([{}])
    const handleDate=(event)=>{
        const m=String(Number(event.$M)+1);
        const d=String(event.$D);
        const y=String(event.$y);
        setValue(y+"-"+m+"-"+d);   
      }

    const fetchwaiters=async()=>
    {
        const result=await postData('restaurants/fetch_waiters_data',{"restaurantid":admin.restaurantid})
        setWaitersData(result.data)
    }

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

    /*const RestaurantTabledata=async()=>{
        var result =await getData('restaurants/fetch_table_data')
        setTableData(result.data)
    }*/

    const RestaurantTabledata=async(floorname)=>{
        var result =await postData('restaurants/fetch_table_data_fill',{'restaurantid':admin.restaurantid,'floor':floorname})
        setTableData(result.data)
    }

    const handleFloor=(event)=>{
        setFloor(event.target.value)
        RestaurantTabledata(event.target.value)
        
     }

    useEffect(function(){
        fetchwaiters()
        fetchWaiterfloor()
       // RestaurantTabledata()
 
     },[])

     const putwaiters=()=>
     {
        return waitersdata.map((item)=>{
            return <MenuItem value={item.waiterid}>{item.waitername}</MenuItem>
        })
     }
     
     const putTable=()=>
     {
        return  tabledata.map((item)=> {
            return <MenuItem value={item.tableid}>{item.tableno}</MenuItem>
        })
     }

     
     const validation=()=>
     {
        var submitRecord=true
        if(!waiterdatasecond)
        {
           setResError({error:true,message:'Pls Select Waiter'})
           submitRecord=false
        }
        if(!tabledatasecond)
        {
            setResErrorSecond({error:true,message:'Pls Select Table'})
            submitRecord=false
        }if(!floor)
        {
            setResErrorThird({error:true,message:'Pls Select Floor'})
            submitRecord=false
        }
        return submitRecord
     }

     const handleSubmit=async()=>
     {
        var error=validation()
        if(error)
        {
            
            var body={'restaurantid':restaurantid,'waiterid':waiterdatasecond,'tableid':tabledatasecond,'currentdate':value}
            const result=await postData('restaurants/waitertable_data_submit',body)
            if(result.status)
            {
                Swal.fire({
                    icon: 'success',
                    title: 'Restaurant Waiters',
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
            
        }else
        {
            alert("wrong")
        }
     }

     

    return(<div className={classes.root}>
        <div className={classes.box}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Heading title="Waiter Table" myroute='/admindashboard/waitertabledisplay'/>
                </Grid>
                <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker', 'DatePicker']}>        
                      <DatePicker
                        label="Current Date"
                        format="DD-MM-YYYY"
                        onChange={handleDate}     
                      />
                 </DemoContainer>
             </LocalizationProvider>
                </Grid>
                <Grid item xs={6} style={{paddingTop:23}}>
                <FormControl fullWidth>
                 <InputLabel id="demo-simple-select-label">Waiter</InputLabel>
                <Select
                
                label="Waiter"
                onChange={(event)=>setWaiterDataSecond(event.target.value)}
                error={resError?.error}
                onFocus={()=>setResError({error:false,message:''})}
                >
                <MenuItem value=''>-Select Waiter-</MenuItem>    
                {putwaiters()}
                </Select>
                <FormHelperText><div style={{color:'#e74c3c'}}>{resError?.message}</div></FormHelperText>
                 </FormControl>
                </Grid>
                <Grid item xs={6}>
                <FormControl fullWidth>
                           <InputLabel style={{display:"flex"}}>Select Floor </InputLabel>
                            
                            <Select
                            label="Select Floor"
                            onChange={handleFloor}
                            error={resErrorThird?.error}  
                            onFocus={()=>setResErrorThird({error:false,message:''})}
                            value={floor}
                           >
                           <MenuItem value={''}>-Select Floor-</MenuItem>
                           {putFloor()}
                          </Select>
                          <FormHelperText><div style={{color:'#e74c3c'}}>{resErrorThird?.message}</div></FormHelperText>
                        </FormControl>
                   
                </Grid>
                <Grid item xs={6}>
                <FormControl fullWidth>
                 <InputLabel >Table</InputLabel>
                <Select
                onChange={(event)=>setTableDataSecond(event.target.value)}
                error={resErrorsecond?.error}
                onFocus={()=>setResErrorSecond({error:false,message:''})}
                label="Table"
               // onChange={handleChange}
                >
                <MenuItem value=''>-Select Table-</MenuItem>
                {putTable()}
               
        </Select>
        <FormHelperText><div style={{color:'#e74c3c'}}>{resErrorsecond?.message}</div></FormHelperText>
      </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Button component="label" variant="contained" fullWidth onClick={handleSubmit}>Submit</Button>
                </Grid>
            </Grid>
        </div>
        
    
    </div>)
}