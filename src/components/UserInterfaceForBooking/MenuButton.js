import Swal from "sweetalert2";
import 'animate.css';
import { useState } from "react";
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Divider } from "@mui/material";
import { postData } from "../../services/FetchNodeServices";


export default function MenuButton()
{
  var admin=JSON.parse(localStorage.getItem('ADMIN'))
  const [hello,setHello]=useState("hello")
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');
  const [categorydataandcount,setCategoryDataAndCount]=useState([])
  const [change,setChange]=useState(false)

  //select c.categoryname,f.categoryid,count(f.categoryid) from category c,fooditems f where f.categoryid=c.categoryid and f.restaurantid=28 group by f.categoryid
  const handleFetchAllCategoryAndCount=async()=>
  {
    
    
    console.log(admin.restaurantid)
    const result=await postData('restaurants/handle_Fetch_All_Category_And_Count',{restaurantid:admin.restaurantid})
    setCategoryDataAndCount(result.result)
 

  }

  console.log("count data:",categorydataandcount)
  React.useEffect(function(){
    
   handleFetchAllCategoryAndCount()
  },[change])
  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
    setChange(true)
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const descriptionElementRef = React.useRef(null);



  const ShowData=()=>
  {
    return categorydataandcount.map((item)=>{
      return(<div><div style={{display:'flex',justifyContent:'space-between'}}>
        
  <div style={{marginRight:20}}>{item.categoryname}</div><div>{item.count}</div>
  
      </div><Divider/></div>)
    })
  }


    const handleMenu=()=>
    { 
      
      return(<React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title"><div style={{display:'flex'}}> <div style={{marginRight:5,marginTop:4.5}}><MenuBookIcon/></div> <div>Restaurant Menu </div></div><Divider/></DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            
            <div style={{display:'flex',justifyContent:'space-between'}}>
              <div style={{marginRight:20,fontWeight:'bold'}}>Category All Here</div> <div style={{marginRight:20,height:'15px',width:'1px',background:'grey',marginTop:5}}></div><div style={{fontWeight:'bold'}}>Items In Category</div>
            </div>
            <Divider/>
          
            {/* {   
              categorydataandcount.map((item)=>{
                <div style={{display:'flex',justifyContent:'space-between'}}>
               
              <div style={{marginRight:20}}>{item.categoryname}</div> <div style={{marginRight:20,height:'15px',width:'1px',background:'grey',marginTop:5}}></div><div>{item.count}</div>
              <Divider/>
            </div>
            })
            } */}
            {ShowData()}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>)
     }

    return(<div class="container">
   
    <div class="fab">
      <button id="fab-button" onClick={handleClickOpen('body')}  > Menu</button>
      
    </div>
    {handleMenu()}
  </div>
  )
}
