import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, Paper } from '@mui/material';
import { postData, serverURL } from '../../services/FetchNodeServices';

import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import Plusminus from '../../Plusminus/Plusminus';
import PlusMinuxUserInterface from './PlusMinuxUserInterface';
import { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Refresh } from '@mui/icons-material';


export default function ImgMediaCard(props) {
  var admin=JSON.parse(localStorage.getItem('ADMIN'))
  var dispatch = useDispatch()
  var orderProduct = useSelector((state)=>state.orderData)
  var ordervalue = Object.values(orderProduct)
  var orderlength = ordervalue.length
  const [data,setData]=React.useState([])  //{itemid:'100',name:'hello ajay',photo:'hhhhhhhhhhhhh',fooditemname:'Margherita Pizza',categoryname:'Pizza',foodtype:'Veg',Ingredients:'it is very tasty as has been made with spices',price:50,offerPrice:40},{itemid:'200',name:'hello ajay',photo:'hhhhhhhhhhhhh',fooditemname:'Margherita Pizza',categoryname:'Pizza',foodtype:'Veg',Ingredients:'it is very tasty as has been made with spices',price:50,offerPrice:40},{itemid:'300',nname:'hello ajay',photo:'hhhhhhhhhhhhh',fooditemname:'Margherita Pizza',categoryname:'Pizza',foodtype:'Veg',Ingredients:'it is very tasty as has been made with spices',price:50,offerPrice:40},{itemid:'400',name:'hello ajay',photo:'hhhhhhhhhhhhh',fooditemname:'Margherita Pizza',categoryname:'Pizza',foodtype:'Veg',Ingredients:'it is very tasty as has been made with spices',price:50,offerPrice:40},{itemid:'500',name:'hello ajay',photo:'hhhhhhhhhhhhh',fooditemname:'Margherita Pizza',categoryname:'Pizza',foodtype:'Veg',Ingredients:'it is very tasty as has been made with spices',price:50,offerPrice:40},{itemid:'600',name:'hello ajay',photo:'hhhhhhhhhhhhh',fooditemname:'Margherita Pizza',categoryname:'Pizza',foodtype:'Veg',Ingredients:'it is very tasty as has been made with spices',price:50,offerPrice:40},{itemid:'700',name:'hello ajay',photo:'hhhhhhhhhhhhh',fooditemname:'Margherita Pizza',categoryname:'Pizza',foodtype:'Veg',Ingredients:'it is very tasty as has been made with spices',price:50,offerPrice:40},{itemid:'800',name:'hello ajay',photo:'hhhhhhhhhhhhh',fooditemname:'Margherita Pizza',categoryname:'Pizza',foodtype:'Veg',Ingredients:'it is very tasty as has been made with spices',price:50,offerPrice:40},{itemid:'900',name:'hello ajay',photo:'hhhhhhhhhhhhh',fooditemname:'Margherita Pizza',categoryname:'Pizza',foodtype:'Veg',Ingredients:'it is very tasty as has been made with spices',price:50,offerPrice:40},{itemid:'1000',name:'hello ajay',photo:'hhhhhhhhhhhhh',fooditemname:'Margherita Pizza',categoryname:'Pizza',foodtype:'Veg',Ingredients:'it is very tasty as has been made with spices',price:50,offerPrice:40}
  const [countitem,setCountItem]=React.useState({foodid:{foodname:'',count:''}})
  const [count, setCount] = useState(0);
  const [countforcart,setCountForCart]=useState(0)
  const [fooditemid,setFoodItemId]=useState() 
  const [itemStates, setItemStates] = useState(Array(data.length).fill(false));
  const [addforhideaddbutton,setAddForHideAddButton]=useState(0)
  const [open, setOpen] = useState(false);
  const [reloadfortotalcount,setReloadForTotalCount] = useState(false)

  // alert(props.valuefilter)
  // useEffect(function(){
  //  // totalitemcount()
  //  alert("hello")
  // },[reloadfortotalcount])
  // const totalitemcount=()=>
  // {   var countin=0
      
  //     data.map((item)=>
  //     {
  //       alert(item.qty)
  //         countin+=item.qty
  //     })
  //    // setCountForCart(countin)
  //     alert(countin)
  // }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  var dispatch=useDispatch()
    var foodOrder=useSelector(state=>state.orderData)
 


  const handleAddClick = (index) => {
    // Vartaman sthiti array ka klon banao
    const newItemStates = [...itemStates];
    // Click ki gayi item ke liye sthiti ko badlo
    newItemStates[index] = !newItemStates[index];
    // Naye sthiti ko set karo
    setItemStates(newItemStates);
  };
   const handleFetchAllProduct=async()=>
   {
    const result=await postData('restaurants/fetch_all_product',{'restaurantid':admin.restaurantid})
    setData(result.result)
   }

   React.useEffect(function(){
    if(props.veg=="Non Vegetarian")
    {
       alert("it is veg and non veg")
    }

    
  },[props.veg || props.noveg])


   const handleFetchAllProducta=async()=>
    {
     const result=await postData('restaurants/fetch_all_product_by_fillter',{'restaurantid':admin.restaurantid,"filter":props.valuefilter})
     setData(result.result)
    }

   React.useEffect(function(){
     if(props.categorydata.length !== 0)
     {
          setData([])
          setData(props.categorydata)
     }

    
   },[props.categorydata])
  //  dispatch({type:'ADD_ORDER',payload:[5,{name:'ajay',sirname:"baghel",mobilenumber:'6261448735',address:'sikhata',district:'bhind',state:'Madhya Pradesh'}]})
  //  const select = useSelector((state)=>state.orderData)
  //   console.log("i want to look what items are in redux:",select)
  //  useEffect(function(){

    // if(!props.backresult)
    //   {
    //        setData(props.backresult)
    //   }
    //   else
    //   {
    //     setData(props.categorydata)
    //   }
  //  },[props.backresult])
  

  React.useEffect(function(){
      handleFetchAllProduct()
     // alert(props.categorydata)
  },[])

//   React.useEffect(function(){
//     handleFetchAllProducta()
//    // alert(props.categorydata)
// },[props.valuefilter])
  const handleAddItem=(item)=>{


    setAddForHideAddButton(1)
  //   setFoodItemId(item.fooditemid)
  // console.log('i am ajay and i want to see all data in console:',item)
   
  //  dispatch({type:'ADD_ORDER',payload:[item.fooditemid,item]})
    
  }

  useEffect(function(){
    callrefress()
  },[])
  const callrefress=()=>
  {
   
      var foodList=[]
    var cart=foodOrder["#Ground Floor1"]
     
     if(cart!=undefined)
     foodList=Object.values(cart)
  
     if(foodList.length=="0")
     {
      console.log('')
     }
     else{
      console.log("i i i i  :",foodList)
      var add=0
      foodList.map((item)=>{
        add+=item.qty
        
      })
      console.log("add by ajay:",add)
      props.setTotalAdd(add)
     }
    
  }

  /*-------important------------*/
  const handleOrder=(item)=>{
    props.setRefresh(!props.Refresh)
    setAddForHideAddButton(1)
    var key="#Ground Floor1"
    
     
    
    try{
      
    var foodlist=foodOrder[key]
    
    
    try{
      
      foodlist[item.fooditemid].qty=parseInt(foodlist[item.fooditemid].qty)+1
    
    }
    catch(e){
    item.qty=1
    foodlist[item.fooditemid]=item
    foodOrder[key]=foodlist
    }
    
    }
    catch(e)
    { 
      var foodlist={}
      item.qty=1
      foodlist[item.fooditemid]=item
      foodOrder[key]={...foodlist}    
       
    }
    props.setRefresh(!props.Refresh)
    console.log(foodOrder)
    
    setOpen(true)
   
    dispatch({type:'ADD_ORDER',payload:[key,foodOrder[key]]},callrefress(), props.setRefresh(!props.Refresh))
      // props.setRefresh(!props.refresh)
      
    
    }

     
    
    
    
  /*---------important------------*/



  const snackbar=()=>{
    return( 

<div>
      
      <Snackbar
        open={open}
        autoHideDuration={1800}
        onClose={handleClose}
        message="Food Selected Go to Cart and oder"
        // action={action}
      />
    </div>
    )
  }


  
  
  const imgmedia=()=>
   {
      
      
    return data.map((item)=>{
     
      return(
         <div >
          <div >
            
            <Paper style={{margin:20,borderRadius:10}} className="imgmediacard">
            <div style={{display:'flex',justifyContent:'space-between'}}>
             <div>
              <img  src={`${serverURL}/images/${item.icon}`} width={'120px'} height={'90px'} style={{paddingLeft:4,borderRadius:10,}}/>
            
              </div>
              
             <div style={{marginTop:10,marginRight: 'auto',paddingLeft:10,paddingRight:10}}>
              <span style={{fontWeight:'bolder'}}>{item.fooditemname}</span> / { item.categoryname} / {item.foodtype} <img src={`${serverURL}/images/${item.foodtype+".png"}`} width={'20px'} height={'20px'} style={{paddingTop:6}}/>
              <div>
                {item.ingredients}
              </div>
              <div>
              &#8377; {item.offerprice=="NaN"?item.price:<s> { item.price}</s>} {item.offerprice=='NaN'?"":item.offerprice}
              </div>
              </div>
              <div >
                 {/* {orderlength}
                {orderlength>0 && ordervalue.fooditemid===item.fooditemid ? <PlusMinuxUserInterface  count={count} setCount={setCount} style={{color:'Purple',marginRight:20,marginTop:20}}/>:
               <Button variant="contained" href="#contained-buttons"  style={{marginRight:20,marginTop:10}} onClick={()=>handleAddItem(item)}>
              Add
       
             </Button>
                } */}

               

                {item.fooditemid==foodOrder.fooditemid?<PlusMinuxUserInterface/>:<Button variant="contained" href="#contained-buttons"  style={{marginRight:20,marginTop:10}} onClick={()=>handleOrder(item)}>Add</Button>}
              </div>
              </div>
              
            </Paper>
         </div>
         {snackbar()}
         </div>
        )
    })
    
    
   }




  return (
   <div >
    {imgmedia()}
   </div>
  );
}