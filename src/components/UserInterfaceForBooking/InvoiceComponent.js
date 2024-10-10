import { useStyles } from "./invoiceComponentCss";
import {useState,useEffect} from 'react'
import MaterialTable from "@material-table/core"
import { serverURL,postData, getData } from "../../services/FetchNodeServices";
import { useNavigate } from "react-router-dom";
import { Button, Grid, IconButton } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function InvoiceComponent()
{ 
    const classes = useStyles();
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
  const [open, setOpen] = React.useState(false);
  const [sepratedata,setSeprateData]=useState('')
  const [billingdetails,setBillingDetails]=useState('')

  //    if(sepratedata.length>0)
  //     {
  //     setBillingDetails( JSON.parse(sepratedata.billingdetails))
  // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:",billingdetails)
 
  //     }
        

    const handleClickOpen = (data) => {
      setSeprateData(data)
      
      setOpen(true);
      console.log("ALL DATA IS COMING FROM DATABASE FOR INVOICE",sepratedata)
      var keys = Object.keys(sepratedata)
      var values =Object.values(sepratedata)
      console.log("All Keys here come and check :",keys)
      console.log("All values here come and check:",values)
      var insidevalue = Object.values(values[8])
      console.log("Check Inside Value in this console :",insidevalue)
    };
    const handleClose = () => {
      setOpen(false);
    };

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


  const  CustomizedDialogs=()=> {
    
  
    return (
      <React.Fragment>
        {/* <Button variant="outlined" onClick={handleClickOpen} >
          Open dialog
        </Button> */}
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Invoice 
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloudDownloadIcon style={{marginRight:'7px'}}/> Dawnload
          </IconButton>
          <DialogContent dividers>
            <Typography gutterBottom>
              <div style={{display:'flex',justifyContent:'space-between'}}>
             <div style={{fontWeight:"bold",fontSize:'20px' ,display:"inline-block"}}>Name :<div style={{display:'inline-block'}}> { sepratedata.customername}</div></div><div style={{display:'inline-block',fontWeight:"bold",fontSize:'20px',}}>Bill No : <div style={{display:'inline-block'}}>{sepratedata.billno}</div></div>
             </div>

             <div style={{display:'flex',justifyContent:'space-between'}}>
             <div style={{fontWeight:"bold",fontSize:'20px' ,display:"inline-block"}}>Phone No :<div style={{display:'inline-block'}}> { sepratedata.mobileno}</div></div><div style={{display:'inline-block',fontWeight:"bold",fontSize:'20px',}}>Date : <div style={{display:'inline-block'}}>{sepratedata.billdate}</div></div>
             </div>

             <div style={{display:'flex',justifyContent:'space-between'}}>
             <div style={{fontWeight:"bold",fontSize:'20px' ,display:"inline-block"}}>Time <div style={{display:'inline-block'}}> { sepratedata.billtime}</div></div>
             </div>
            
            </Typography>
            <Typography gutterBottom>
              <div style={{width:'100%',height:"1px",backgroundColor:'black',marginTop:'10px'}}></div>
              <div style={{fontWeight:"bold",fontSize:'20px',marginTop:'10px'}}>Ordered Item </div>
              <div>
               
                  {/* {valuesinthis.map((item)=>{
                    return(<div>{item.fooditemname}</div>)
                    
                  })} */}
              </div>
            </Typography>
            <Typography gutterBottom>
              Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
              magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
              ullamcorper nulla non metus auctor fringilla.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Cancel
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </React.Fragment>
    );
  }
  

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
          { title: 'Invoice Download', render:rowData=><><div style={{cursor:'pointer'}}  onClick={()=>handleClickOpen(rowData)}>Invoice Slip</div>{rowData.mobileno}</>},     
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
        <Grid item xs={3} style={{display:'flex',alignItems:'center',flexDirection:'column', fontFamily:'kanit',fontSize:24,fontWeight:'bold'}} >
          <div className={classes.fontstylea}>
            All Invoice
          {/* </div>
          <div style={{fontSize:24}}>
          &#8377; {parseInt(totalAmount.totalbill)?parseInt(totalAmount.totalbill):<>0</>}
         
          */}
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
              Search Invoice By Date
            </Button>
          </Grid>

        </Grid>
      </div>

      <div className={classes.boxDisplay}>
        {displayAll()}
        {CustomizedDialogs()}
      </div>
    </div>
   )
}   