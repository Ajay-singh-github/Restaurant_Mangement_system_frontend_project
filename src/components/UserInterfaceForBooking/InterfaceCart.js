// import { Box, Button } from "@mui/material";
// import * as React from 'react';
// import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
// import CssBaseline from '@mui/material/CssBaseline';
// import Divider from '@mui/material/Divider';
// import Drawer from '@mui/material/Drawer';
// import IconButton from '@mui/material/IconButton';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemText from '@mui/material/ListItemText';
// import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import SearchIcon from '@mui/icons-material/Search';
// import { styled, alpha } from '@mui/material/styles';
// import InputBase from '@mui/material/InputBase';
// import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
// import { Grid } from '@mui/material';
// import { makeStyles } from "@mui/styles"
// import { hover } from '@testing-library/user-event/dist/hover';
// import './styles.css'
// import SimpleSlider from './SlickComponent';
// import FilterComponent from './FillterComponent';
// import ImgMediaCard from './ImgMediaCardComponent';
// import { Style } from '@mui/icons-material';
// import Footer from './Footer';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Button, Divider, Grid, Paper, TextField } from '@mui/material';
// import { useState } from 'react';
// import { postData } from '../../services/FetchNodeServices';
// import Practice from './practice';
// import MenuButton from './MenuButton';
// import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
// import { useEffect } from "react";




// export default function InterfaceCart()
// {
    // const theme = useTheme();

    // const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    // const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));
//     const [mobileOpen, setMobileOpen] = React.useState(false);
//     const [windowWidth, setWindowWidth] = useState(window.innerWidth);

//     const [data,setData]=useState([{fooditemname:'Blazing Onion & Paprika',categoryname:' Pizza',foodtype:'vegetarian',price:150,offerprice:100,picture:'logo.png'},{fooditemname:'Blazing Onion & Paprika',categoryname:' Pizza',foodtype:'vegetarian',price:150,offerprice:100,picture:'logo.png'},{fooditemname:'Blazing Onion & Paprika',categoryname:' Pizza',foodtype:'vegetarian',price:150,offerprice:100,picture:'logo.png'},{fooditemname:'Blazing Onion & Paprika',categoryname:' Pizza',foodtype:'vegetarian',price:150,offerprice:100,picture:'logo.png'},{fooditemname:'Blazing Onion & Paprika',categoryname:' Pizza',foodtype:'vegetarian',price:150,offerprice:100,picture:'logo.png'},{fooditemname:'Blazing Onion & Paprika',categoryname:' Pizza',foodtype:'vegetarian',price:150,offerprice:100,picture:'logo.png'},{fooditemname:'Blazing Onion & Paprika',categoryname:' Pizza',foodtype:'vegetarian',price:150,offerprice:100,picture:'logo.png'},{fooditemname:'Blazing Onion & Paprika',categoryname:' Pizza',foodtype:'vegetarian',price:150,offerprice:100,picture:'logo.png'}])
     
   
    

//     useEffect(() => {
//         const handleResize = () => {
//             setWindowWidth(window.innerWidth);
//         };

//         window.addEventListener('resize', handleResize);

//         // Cleanup event listener on unmount
//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, []);
//       console.log(windowWidth)
  
//     return(<div>
      //  <AppBar  style={{background:'white',color:'black'}} >
      //   <Toolbar>
         
         
      //       <Grid container>
      //         <Grid item xs={1} style={{alignItems:'flex-end',display:'flex'}}>
      //         <img src="restaurant logo for userinterface.png"  className={"hero"}/>
      //         </Grid>
      //         <Grid item xs={matches_md?9:8} style={{display:'flex',alignItems:'center',paddingLeft:matches_md?42:'',marginLeft:matches_md?10:'',fontWeight:'bold',letterSpacing:2,fontSize:18}}>
      //          {matches_md?
      //            <div> Welcome </div>:<div> Welcome To The Restaurant </div>
      //          }
              

      //         </Grid>
           
        
      //     <Grid item xs={matches_md?1:3}>
      //     {/* <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
           
      //         <Button sx={{ color: 'black' ,}} >
      //           <ProductionQuantityLimitsIcon /> Cart
      //         </Button>
            
      //     </Box> */}
      //      <div style={{display:'flex',justifyContent:'center'}}>
      //      <div style={{cursor:"pointer",alignItems:'center',marginTop:10,marginLeft:matches_md?"":20}}> <HomeIcon/></div><div style={{cursor:"pointer",marginTop:10,fontWeight:"bolder"}}>Home</div>
      //     </div>
      //     </Grid>
      //     </Grid>
      //   </Toolbar>
      // </AppBar>

//       {/* <div style={{marginTop:60}}>
//         <div style={{display:'flex',justifyContent:'space-between',marginTop:150,marginLeft:200,marginRight:200,marginBottom:15,background:"#ff7675"}}>
//           <div style={{}}>Products </div> <div>Quantity</div><div>Price</div>
        
//         </div>
        

//         <div style={{display:'flex',justifyContent:'space-between',marginLeft:200,marginRight:200,marginBottom:100}}>
          
//           <div style={{display:'flex'}}><div><img src="https://img.freepik.com/free-photo/photo-delicious-hamburger-isolated-white-background_125540-3378.jpg" width={'100px'} height={"100px"} /> </div> <div style={{marginLeft:10,marginTop:10}}>{data[0].fooditemname}</div> </div> <div>Quantity</div><div>Price</div>
        
//         </div>
//      </div> */}

//     <div style={{marginTop:'100px',display:'flex',justifyContent:'center'}}>
//        <table>
//         <tr>
//          <th style={{background:'red',display:matches_md?'':'flex',paddingLeft:matches_md?"":"50px"}}>Products</th><th>Quantity</th><th style={{paddingLeft:matches_md?'40px':'140px'}}>Price</th>
//          </tr>

//          <tr>
//          <td style={{paddingRight:matches_md?'50px':'240px'}}><div style={{display:'flex'}}><div>

//           <img src="https://img.freepik.com/free-photo/photo-delicious-hamburger-isolated-white-background_125540-3378.jpg" width={'50px'} height={"50px"}/> </div><div><div ><div>Abhisek category/pizz /vegetarian</div><div>Price</div></div></div></div>
//          </td>
//           <td ><div class="container">
//     <button id="minus">-</button>
//     <span id="counter">0</span>
//     <button id="plus">+</button>
//   </div></td>

//   <td style={{paddingLeft:matches_md?'50px':'150px'}}>&#8377; 500</td>
//          </tr>



//          <tr>
//          <td style={{paddingRight:'80px'}}><div style={{display:'flex'}}><div><img src="https://img.freepik.com/free-photo/photo-delicious-hamburger-isolated-white-background_125540-3378.jpg" width={'50px'} height={"50px"}/> </div><div><div ><div>Abhisek category/pizz /vegetarian</div><div>Price</div></div></div></div></td>
//           <td ><div class="container">
//     <button id="minus">-</button>
//     <span id="counter">0</span>
//     <button id="plus">+</button>
//   </div></td>

//   <td style={{paddingLeft:matches_md?'50px':'150px'}}>&#8377; 500</td>
//          </tr>




//          <tr>
//          <td style={{paddingRight:'80px'}}><div style={{display:'flex'}}><div><img src="https://img.freepik.com/free-photo/photo-delicious-hamburger-isolated-white-background_125540-3378.jpg" width={'50px'} height={"50px"}/> </div><div><div ><div>Abhisek category/pizz /vegetarian</div><div>Price</div></div></div></div></td>
//           <td ><div class="container">
//     <button id="minus">-</button>
//     <span id="counter">0</span>
//     <button id="plus">+</button>
//   </div></td>

//   <td style={{paddingLeft:matches_md?'40px':'150px'}}>&#8377; 500</td>
//          </tr>



//          <tr>
//          <td style={{paddingRight:'80px'}}><div style={{display:'flex'}}><div><img src="https://img.freepik.com/free-photo/photo-delicious-hamburger-isolated-white-background_125540-3378.jpg" width={'50px'} height={"50px"}/> </div><div><div ><div>Abhisek category/pizz /vegetarian</div><div>Price</div></div></div></div></td>
//           <td ><div class="container">
//     <button id="minus">-</button>
//     <span id="counter">0</span>
//     <button id="plus">+</button>
//   </div></td>

//   <td style={{paddingLeft:matches_md?'40px':'150px'}}>&#8377; 500</td>
//          </tr>
//          <tr>
//          <td style={{paddingRight:'80px'}}><div style={{display:'flex'}}><div><img src="https://img.freepik.com/free-photo/photo-delicious-hamburger-isolated-white-background_125540-3378.jpg" width={'50px'} height={"50px"}/> </div><div><div ><div>Abhisek category/pizz /vegetarian</div><div>Price</div></div></div></div></td>
//           <td ><div class="container">
//     <button id="minus">-</button>
//     <span id="counter">0</span>
//     <button id="plus">+</button>
//   </div></td>

//   <td style={{paddingLeft:matches_md?'40px':'150px'}}>&#8377; 500</td>
//          </tr>
//          <tr>
//          <td style={{paddingRight:'80px'}}><div style={{display:'flex'}}><div><img src="https://img.freepik.com/free-photo/photo-delicious-hamburger-isolated-white-background_125540-3378.jpg" width={'50px'} height={"50px"}/> </div><div><div ><div>Abhisek category/pizz /vegetarian</div><div>Price</div></div></div></div></td>
//           <td ><div class="container">
//     <button id="minus">-</button>
//     <span id="counter">0</span>
//     <button id="plus">+</button>
//   </div></td>

//   <td style={{paddingLeft:matches_md?'40px':'150px'}}>&#8377; 500</td>
//          </tr>
//          <tr>
//          <td style={{paddingRight:'80px'}}><div style={{display:'flex'}}><div><img src="https://img.freepik.com/free-photo/photo-delicious-hamburger-isolated-white-background_125540-3378.jpg" width={'50px'} height={"50px"}/> </div><div><div ><div>Abhisek category/pizz /vegetarian</div><div>Price</div></div></div></div></td>
//           <td ><div class="container">
//     <button id="minus">-</button>
//     <span id="counter">0</span>
//     <button id="plus">+</button>
//   </div></td>

//   <td style={{paddingLeft:matches_md?'40px':'150px'}}>&#8377; 500</td>
//          </tr>

         
//        </table>
//     </div>
//       {/* <div style={{display:'flex',paddingLeft:'850px'}}><div style={{width:'400px',height:'1.5px',background:'orange'}}></div></div> */}

//       <div style={{display:'flex',marginLeft:matches_md?'30px':'',marginRight:matches_md?'30px':'',paddingLeft:matches_md?'':windowWidth<="1356" && windowWidth>="1156" ?'750px':windowWidth<='1156' && windowWidth>='1018' ?'650px':windowWidth<='1018' && windowWidth>='910' ? "550px":'850px'}}><div style={{width:matches_md?windowWidth:'400px',height:'1.5px',background:'orange'}}></div></div>
    
    
    
//      {/* <div style={{display:'flex',justifyContent:"space-evenly"}}>
      
//        <div style={{marginLeft:'600px'}}>hello</div> <div>5852</div>
//          </div> */}


//          <div>
//           <Grid container style={{display:'grid',gridTemplateColumns:'auto auto auto',marginTop:'20px'}}>
//             <Grid item xs={6} style={{justifySelf:'end',marginLeft:"575px"}}>
              
//               SubTotal
//             </Grid>
//             <Grid item xs={6} style={{justifySelf:'end'}}>
//               400
//             </Grid>
            
//           </Grid>
//           <Grid container style={{display:'grid',gridTemplateColumns:'auto auto auto',marginTop:'30px'}}>
//             <Grid item xs={6} style={{justifySelf:'end',marginLeft:"575px"}}>
              
//               Tax
//             </Grid>
//             <Grid item xs={6} style={{justifySelf:'end'}}>
//               400
//             </Grid>
            
//           </Grid>

//           <Grid container style={{display:'grid',gridTemplateColumns:'auto auto auto',marginTop:'20px'}}>
//             <Grid item xs={6} style={{justifySelf:'end',marginLeft:"575px"}}>
              
//               Total
//             </Grid>
//             <Grid item xs={6} style={{justifySelf:'end'}}>
//               400
//             </Grid>
            
//           </Grid>
//          </div>
//     </div>)
// }

import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Plusminus from '../../Plusminus/Plusminus';
import { serverURL } from '../../services/FetchNodeServices';
import EmptyCartComponent from './EmptyCartComponent';
import useRazorpay from 'react-razorpay';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import * as React from 'react';
import Invoice from './Invoice';

import DownloadIcon from '@mui/icons-material/Download';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});





export default function InterfaceCart()
{ const [refreshbyajay,setRefreshByAjay]=useState()
  const dispatch = useDispatch()
  const foodOrder = useSelector((state)=>state.orderData)
  const navigate = useNavigate()
  const theme = useTheme();

  const matches_md = useMediaQuery(theme.breakpoints.down('md'));
  const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));
  const [data,setData] = useState([])
  const [forodertiming,setForOrderTiming]=useState('')
  const [customername,setCustomerName]=useState('')
  const [mobile,setMobile]=useState('')
  const [Razorpay] = useRazorpay();
  const [open, setOpen] = React.useState(false);
  const [customernameerror,setCustomerNameError] = useState({status:'',message:''})
  const [mobilenoerror,setMobileNoError] = useState({status:'',message:''})

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  var price=0
  var tax=0
  

useEffect(function(){
  var foodList=[]
  var cart=foodOrder["#Ground Floor1"]
   
   if(cart!=undefined)
   foodList=Object.values(cart)
setData(foodList)
},[])  
 
const handleQtyChange=(v,item)=>{
  setRefreshByAjay(true)
  var foodlist=foodOrder["#Ground Floor1"]
  if(v==0)
  {
    delete foodlist[item.fooditemid]
    foodOrder["#Ground Floor1"]=foodlist


    var foodList=[]
  var cart=foodOrder["#Ground Floor1"]
   
   if(cart!=undefined)
   foodList=Object.values(cart)
setData(foodList)
    tablerowdata()
    
  }
  else
  {
  foodlist[item.fooditemid].qty=v
  foodOrder["#Ground Floor1"]=foodlist
  
  }
  console.log("CART",foodOrder)
  dispatch({type:'ADD_ORDER',payload:["#Ground Floor1",foodOrder["#Ground Floor1"]]})
  setRefreshByAjay()
  
  }

  useEffect(function(){
   tablerowdata()
   setRefreshByAjay(false)
  },[refreshbyajay])
    
  // var data=[{picture:'',fooditemname:'Blazing Onion & Paprika',categoryname:' Pizza ',categorytype:'vegetarian',offerprice:'500',quantity:'5'},{picture:'',fooditemname:'Blazing Onion & Paprika',categoryname:' Pizza ',categorytype:'vegetarian',offerprice:'500'},{picture:'',fooditemname:'Blazing Onion & Paprika',categoryname:' Pizza ',categorytype:'vegetarian',offerprice:'500'},{picture:'',fooditemname:'Blazing Onion & Paprika',categoryname:' Pizza ',categorytype:'vegetarian',offerprice:'500'},{picture:'',fooditemname:'Blazing Onion & Paprika',categoryname:' Pizza ',categorytype:'vegetarian',offerprice:'500'},{picture:'',fooditemname:'Blazing Onion & Paprika',categoryname:' Pizza ',categorytype:'vegetarian',offerprice:'500'},{picture:'',fooditemname:'Blazing Onion & Paprika',categoryname:' Pizza ',categorytype:'vegetarian',offerprice:'500'},{picture:'',fooditemname:'Blazing Onion & Paprika',categoryname:' Pizza ',categorytype:'vegetarian',offerprice:'500'},]
  const senddataforwaiter=()=>
  {
     setForOrderTiming("order") 
  }
  
  const canceldataforwaiter=()=>
  {
     setForOrderTiming("cancel") 
  }



  const [seconds, setSeconds] = useState(300); // 2 minutes ka samay
 

  let interval; // Define interval in the outer scope


  useEffect(() => {
    interval = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds - 1);
    }, 1000); // 1 second ka antar

    // Timer khatam hone par clearInterval kar dena
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (minutes == 0) {
      clearInterval(interval); // Timer ko band kar dena
    }
  }, [seconds, interval]);
  // Samay ko minute aur second mein bhaag kar lena
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;


 

  const tablerowdata=()=>
  {
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:",data)
    
    return data.map((item)=>{
      price+=parseInt(item.offerprice)*parseInt(item?.qty)
      tax = price*5/100
      return(
          <tr>
	       <td>
	         <div class="cart-info">
             
	           <img src={`${serverURL}/images/${item.icon}`} alt="" />
	           <div>

	             <p>{item.fooditemname}/{item.categoryname}</p>
	             <small>Price ₹{item.offerprice}</small>
	             <br />
	             <a href="#">Remove</a>
	           </div>
	         </div>
	       </td>
	       {/* <td><Button variant="outlined" size='small'>-</Button> 1 <Button variant="outlined" size='small'>+</Button></td> */}
         <td><Plusminus onChange={(v)=>handleQtyChange(v,item)} qty={item?.qty} /></td>

         <td>₹{item.offerprice*item.qty}</td>
	     </tr>
	     
       
      )
    })
   
  }



  ////////////////////Payment API/////////////////////
  
  const handlePayment = useCallback(async(na) => {
     
      
    const options = {
      key: "rzp_test_GQ6XaPC6gMPNwH",     //es key ko lene ke liye hame ek website pr jaana hota hai jismai hame registration karna hota hai aur us registration mai apna account aur sabhi documentation lagaye jaate hai fir hame key milte hai us key ke duhara payment direct apne account mai pahuch jaata hai.
      amount: 100*100,
      currency: "INR",
      name: "Aar Restuarant",
      description: "Online Payments",
      image: `${serverURL}/images/${""}`,
     
      handler: (res) => {
        console.log("Payment Details",res);
      },
      prefill: {
        name: customername,
        email: "youremail@example.com",
        contact: mobile,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzpay = new Razorpay(options);
    rzpay.open();
  }, [useRazorpay]);





  ////////////////////////////////////////////////////////
  
  const handleError=()=>
  {
    var respon = true
    if(!customername)
    {
      setCustomerNameError({status:true,message:'Plz Fill Name'})
      return respon = false
    }

    if(!mobile)
    {
      
      setMobileNoError({status:true,message:'Plz Fill Mobile No.'})
      return respon = false
    }
    return respon
  }

  const handleSubmitPaymentAfterName =()=>
  {  
    var status = handleError()
    if(status)
    {
      handleClose(false)
      handlePayment()
      
    }
  }
  const dialogbox=()=>
  {  
    return(
      <React.Fragment>
     
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Some Information Regarding Bill"} <Divider style={{width:295 ,height:10,fontWeight:'bold',}}/></DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
         
            <Grid container spacing={1} style={{marginTop:"20px"}} >
              <Grid item xs={6} >
              <TextField fullWidth id="outlined-basic" label="Customer Name" variant="outlined"  onChange={(e)=>setCustomerName(e.target.value)}/>
              </Grid>
              <Grid item xs={6}>
              <TextField fullWidth id="outlined-basic" label="Mobile No." variant="outlined"  onChange={(e)=>setMobile(e.target.value)}/>
              </Grid>
              <Grid item xs={12}>

              </Grid>
              <Grid item xs={12} style={{marginTop:20}}>
                <Button fullWidth variant="outlined"  onClick={handleSubmitPaymentAfterName}>Go For Payment</Button>
              </Grid>
            </Grid>
            
               </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose}>Agree</Button> */}
        </DialogActions>
      </Dialog>
    </React.Fragment>
 
    )
  }
  
  return (<div>
    
    <AppBar  style={{background:'white',color:'black'}} >
        <Toolbar>
         
         
            <Grid container>
              <Grid item xs={1} style={{alignItems:'flex-end',display:'flex'}}>
              <img src="restaurant logo for userinterface.png"  className={"hero"} onClick={()=>navigate("/home")}/>
              </Grid>
              <Grid item xs={matches_md?9:8} style={{display:'flex',alignItems:'center',paddingLeft:matches_md?42:'',marginLeft:matches_md?10:'',fontWeight:'bold',letterSpacing:2,fontSize:18}}>
               {matches_md?
                 <div> Welcome </div>:<div> Welcome To The Hungry Hub Restaurant </div>
               }
              

              </Grid>
           
        
          <Grid item xs={matches_md?1:3}>
          {/* <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
           
              <Button sx={{ color: 'black' ,}} >
                <ProductionQuantityLimitsIcon /> Cart
              </Button>
            
          </Box> */}
           <div style={{display:'flex',justifyContent:'center'}}>
           <div style={{cursor:"pointer",alignItems:'center',marginTop:10,marginLeft:matches_md?"":20}}> <HomeIcon /></div><div style={{cursor:"pointer",marginTop:10,fontWeight:"bolder"}} onClick={()=>navigate("/home")}>Home</div>
          </div>
          </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      {data.length==0?<EmptyCartComponent/>:
<div class="small-container cart-page">
  <table>
    <tr>
      <th>Product</th>
      <th>Quantity</th>
      <th>Subtotal</th>
    </tr>


{tablerowdata()}
    </table>
 
  <div class="total-price">
    <table>
      <tr>
        <td>Subtotal</td>
        <td>₹{price}</td>
      </tr>
      <tr>
        <td>Tax</td>
        <td>₹{tax}</td>
      </tr>
      <tr>
        <td>Total</td>
        <td>₹{price+tax}</td>
      </tr>
     
    </table>
  </div>




  <div class="total-price">
    <table>
     
      <tr >
        <td></td>
        <td>{forodertiming=='order'?<p style={{fontSize:12,fontFamily:'cursive',fontWeight:'bold'}} >Your Order is preparing and will be recieved in just a moment
            {minutes<=0?"0":''}:{remainingSeconds < 10 ? "00" : remainingSeconds}
</p>:<Button variant="outlined" onClick={senddataforwaiter}>Place Your Order</Button>}</td>
      </tr>

      <tr >
        
      </tr>
      <tr >
        <td>{forodertiming=="order"?<Button variant="outlined" onClick={handleClickOpen}>Go To Payment</Button>:''}</td>
        <td>{forodertiming=="order"?<Button variant="outlined" onClick={canceldataforwaiter}>Cancel Order</Button>:""}</td>
      </tr>

    </table>
  </div>





  {/* <div class="total-price">
    <table>
     
      <tr >
        <td><Button variant="outlined" startIcon={<DownloadIcon />}>
  Dawnload Invoice 
</Button></td>
       </tr>

      
      

    </table>
  </div> */}
</div>}

{dialogbox()}


{/* <Invoice/> */}
   
  </div>)
}