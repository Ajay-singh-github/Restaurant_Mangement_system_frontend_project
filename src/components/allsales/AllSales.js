import { useStyles } from "./AllSalesCss";
import {useState,useEffect} from 'react'
import MaterialTable from "@material-table/core"
import { serverURL,postData, getData } from "../../services/FetchNodeServices";
import { useNavigate } from "react-router-dom";
import { Button, Grid } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function AllSales()
{ const classes = useStyles();
  const admin=JSON.parse(localStorage.getItem('ADMIN'));
  const navigate = useNavigate();
  const getCurrentDate=()=>{
    const date=new Date();
    const cd=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
    return cd; 
  }
  const [listBill,setListBill]=useState([]);
  const [totalAmount,setTotalAmount]=useState(0);
  const [fromDate,setFromDate]=useState(getCurrentDate());
  const [tillDate,setTillDate]=useState(getCurrentDate());

  const fetchTotalAmount=async()=>{
    const result=await postData('billing/fetch_total',{fromdate:fromDate,tilldate:(tillDate || getCurrentDate())})
   
     setTotalAmount(result.data)
  };

  const handleSearch=()=>{
    fetchTotalAmount()
    fetchFilteredbill()

  } 

  const fetchFilteredbill=async()=>{
    const result=await postData('billing/fetch_filtered_bill',{fromdate:fromDate,tilldate:(tillDate || getCurrentDate())})
    console.log('ajaysinghajaysingh',result.data)
    setListBill(result.data);
  };

  

  const handleTillDate=(event)=>{
    console.log("date...",event);
    const m=String(Number(event.$M)+1);
    const d=String(event.$D);
    const y=String(event.$y);
    setTillDate(y+"-"+m+"-"+d); 
  }

  const handleFromDate=(event)=>{
    console.log("date...",event);
    const m=String(Number(event.$M)+1);
    const d=String(event.$D);
    const y=String(event.$y);
    setFromDate(y+"-"+m+"-"+d);
  }
 
  useEffect(function(){
    fetchTotalAmount()
    fetchFilteredbill()
  },[]);

  function displayAll() {
    return (
      <MaterialTable
        title="All Sales"
        columns={[
          { title: 'Bill No', field: 'billno' },
          { title: 'Bill Date', render:rowData=><><div>{rowData.billdate}</div>{rowData.billtime}</>},
          { title: 'Customer Name', render:rowData=><><div>{rowData.customername}</div>{rowData.mobileno}</>},
          { title: 'Table No', field: 'tableno' },
          { title: 'Server', field: 'server' },
          { title: 'Amount', field: 'totalamount' },    
        ]}
        data={listBill}  
        options={{
          paging:true,
          pageSize:3,       // make initial page size
          emptyRowsWhenPaging: false,   // To avoid of having empty rows
          pageSizeOptions:[3,5,7],    // rows selection options
        }}      
        
      />
    )
  }

   return(
    <div className={classes.rootDisplay}>
      <div className={classes.boxDisplay}>
        <Grid container spacing={3} style={{display:'flex',alignItems:'center'}}>
        <Grid item xs={3} style={{display:'flex',alignItems:'center',flexDirection:'column', fontFamily:'kanit',fontSize:18,fontWeight:'bold'}} >
          <div>
            Total Sales
          </div>
          <div style={{fontSize:24}}>
          &#8377; {parseInt(totalAmount.totalbill)?parseInt(totalAmount.totalbill):<>0</>}
          </div>
          

        </Grid>  
          <Grid item xs={3} >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker', 'DatePicker']}>  
                    <DatePicker
                      label="From Date"
                      format="DD-MM-YYYY"
                      defaultValue={dayjs(getCurrentDate())}
                      onChange={handleFromDate}
                    />
                  </DemoContainer>
                </LocalizationProvider>
          </Grid>
          
          <Grid item xs={3}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker', 'DatePicker']}>  
                    <DatePicker
                      label="Till Date"
                      format="DD-MM-YYYY"
                      defaultValue={dayjs(getCurrentDate())}
                      onChange={handleTillDate}
                    />
                  </DemoContainer>
                </LocalizationProvider>
          </Grid>

          <Grid item xs={3}>
            <Button variant="contained" fullWidth onClick={handleSearch}>
              Search Bill 
            </Button>
          </Grid>

        </Grid>
      </div>

      <div className={classes.boxDisplay}>
        {displayAll()}
      </div>
    </div>
   )
}   