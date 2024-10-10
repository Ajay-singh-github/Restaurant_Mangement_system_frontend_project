import {useEffect,useState,getState} from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Button,Dialog,DialogActions,DialogContent, TextField } from '@mui/material';

import { getData,serverURL,postData } from '../../services/FetchNodeServices';
import { useDispatch, useSelector } from 'react-redux';





export default function FoodComponent(props)
{
    var admin=JSON.parse(localStorage.getItem('ADMIN'))   
    const [listFood,setListFood]=useState([]);
    const [tempListFood,setTempListFood]=useState([]);
    const [order,setOrder]=useState([])
    var dispatch=useDispatch()
    var foodOrder=useSelector(state=>state.orderData)

     useEffect(function()
     {
        fetchAllFood()
       },[props]);

    const fetchAllFood=async()=>{
        var result=await postData('restaurants/fetch_all_sub_category_foodbooking',{restaurantid:admin.restaurantid,categoryid:props.categoryid})
        setListFood(result.result)
        setTempListFood(result.result)
       };

       const searchFood=(e)=>
       {   setListFood(tempListFood)
          var temp=tempListFood.filter((item)=>item.fooditemname.toLowerCase().includes(e.target.value.toLowerCase()))
         
           
          
            setListFood(temp)
          
          
         


       }

      /*-------important------------*/
      const handleOrder=(item)=>{
        
        var key=`#${props.floorNo}${props.tableNo}`
        
         
        
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
        console.log(foodOrder)
        
        
        dispatch({type:'ADD_ORDER',payload:[key,foodOrder[key]]})
          props.setRefresh(!props.refresh)
        }
      /*---------important------------*/



    const  showFoodList=()=>{
        return listFood.map((item)=>{
        return( 
         <div>
         <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
           <ListItemButton onClick={()=>handleOrder(item)} alignItems="flex-start" sx={{alignItems:'center',height:30,display:'flex',padding:3}}>
             <ListItemAvatar>
               <Avatar alt="Remy Sharp" src={`${serverURL}/images/${item.icon}`} sx={{width:30,height:30}} />
             </ListItemAvatar>
             <ListItemText
               primary={item.fooditemname}
               secondary={item.offerprice>0?<span><s>&#8377;{item.price}</s>    <b>&#8377;{item.offerprice}</b></span>:<span>&#8377;{item.price}</span>}
             />
           </ListItemButton>
          
         </List>
      </div>)
        })
     
     }

     const handleDialogClose=()=>{
        props.setOpen(false);
       
       }

    const showFoodDialog=()=>{
        return(
         <Dialog
         maxWidth={'sm'}
           open={props.open}>
             <DialogContent  >
              <TextField onChange={((e)=>searchFood(e))} fullWidth label="Search Food Items..." variant="standard"/>
             {showFoodList()}
             </DialogContent>
            <DialogActions>
            
              <Button onClick={handleDialogClose}>Close</Button>
            </DialogActions>
         </Dialog>
        )}
     
    return(
        <box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {showFoodDialog()}
        </box>
    )
}