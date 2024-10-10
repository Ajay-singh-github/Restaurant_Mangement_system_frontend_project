import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useStyles } from "./FoodBookingCss"; 
import { useEffect, useState } from "react";
import { postData, serverURL } from "../../services/FetchNodeServices";
import TableComponent from "../../components/TableComponent/TableComponent";
import CategoryComponent from "../../components/CategoryComponent/CategoryComponent";
import TableCart from "../../components/TableCart/TableCart";
import { Widgets } from "@mui/icons-material";
var admin=JSON.parse(localStorage.getItem('ADMIN'))



export default function FoodBooking({props})
{  const classes=useStyles();
   const [currentDate,setCurrentDate]=useState('')
   const [waiter,setWaiter]=useState([]);  
   const [waiterId,setWaiterId]=useState("");
   const [floorNo,setFloorNo]=useState("")
   const [tableNo,setTableNo]=useState("")
   const [refresh,setRefresh]=useState(false)
   const [waiterName,setWaiterName]=useState('')
   const getCurrentDate=()=>
   {
    var date=new Date()
    var cd=date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate()
    return cd
    }
  const getCurrentTime=()=>{
      var time=new Date()
      var ct=time.getHours()+":"+time.getMinutes()
      return ct
         
  }

  useEffect(function(){
    setCurrentDate(getCurrentDate()+" "+getCurrentTime())
    fetchAllWaiter()
  },[])

  const fetchAllWaiter=async()=>{
    const result=await postData('restaurants/fetch_waiters_data',{restaurantid:admin.restaurantid});
    setWaiter(result.data);
  }

  const fillWaiter=()=>{
    return waiter.map((item)=>{
      return <MenuItem value={item.waiterid}>{item.waitername}</MenuItem>
    });
  }

  const handleWaiter=(event,value)=>{
       //console.log("valuwssssss",value.props.children)
        setWaiterName(value.props.children)
       setWaiterId(event.target.value)
  }

   return(<div className={classes.root}>
    <div className={classes.box}>
       <Grid container spacing={3}>
        
           <Grid item xs={4}>
               <TextField label="Current Date"  value={currentDate}/>
           </Grid>

           <Grid item xs={4}>
           <FormControl fullWidth>
            <InputLabel>Waiter Name</InputLabel>
            <Select label={"Category Name"} 
              
               onChange={handleWaiter} 
              
              >
              <MenuItem>-Select Waiter-</MenuItem>
              {fillWaiter()}
            </Select>
               
           </FormControl>
        </Grid>
        <Grid item xs={4} style={{color:'#273c75', textAlign:'right',fontFamily:'kanit',fontWeight:'bold',fontSize:36}}>
         {floorNo} {tableNo.length!=0?<>Table {tableNo}</>:<></>}
        </Grid>
        
       </Grid>
    </div>
      

       
    <div className={classes.box}>
        <Grid container space={1}>
        <Grid item xs={4}>
         <CategoryComponent tableNo={tableNo}  floorNo={floorNo}  refresh={refresh} setRefresh={setRefresh}/>   
        </Grid>    
        <Grid item xs={4}>
        <TableComponent floorNo={floorNo} setFloorNo={setFloorNo} tableNo={tableNo} setTableNo={ setTableNo}/>
        </Grid>
        <Grid item xs={4}>
           <TableCart waiterName={waiterName} tableNo={`#${floorNo}${tableNo}`}  refresh={refresh} setRefresh={setRefresh}/>  
         </Grid>
        </Grid>
        </div>

        <div style={{width:"70px" , height:"70px" ,background:'black',color:'white',borderRadius:'50%',alignItems:'center',display:'flex',justifyContent:'center',flexDirection:"column",position:'sticky',top:"-600px",cursor:'pointer',left:'1400px',zIndex:5}}>Orders<div> Here</div></div>
        
  </div>
  )
}