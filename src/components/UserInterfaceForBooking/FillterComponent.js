import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import FilterListIcon from '@mui/icons-material/FilterList';
import { Paper } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
export default function FilterComponent(props)
{  
  const theme = useTheme();
  const matches_md = useMediaQuery(theme.breakpoints.down('md'));
  
  
  const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = React.useState(false);
  const [filtervalue,setFilterValue]=React.useState('')
  

  const handleClickOpen = () => {
    setOpen(true);
  };


  const handleClose = () => {
    setOpen(false);
  };

  const setvalue=()=>
  {
    props.setValueFilter(filtervalue)
  }

  React.useEffect(function(){
    if(filtervalue !=='')
    {
      setvalue()
    }
  },[filtervalue])
  

  const dialogShow=()=>
  {
    return( <React.Fragment>
     
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
     
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <div class="filter-container  singh"  style={{margin:10}} >
    <div class="filter-header " onClick={handleClose}>
      <span style={{paddingBottom:8}} onClick={()=>props.setVeg("vegetarian")}  >Pure Veg </span>
    </div>
  </div>

  <div class="filter-container  singh"  style={{margin:10}} >
    <div class="filter-header " onClick={handleClose}>
      <span style={{paddingBottom:8}} onClick={()=>props.setNonVeg("Non vegetarian")}  >Non Veg </span>
    </div>
  </div>

  <div class="filter-container"  style={{margin:10}}>
    <div class="filter-header" onClick={handleClose}>
      <span style={{paddingBottom:8}} onClick={()=>setFilterValue("Offers")}>Offers </span>
    </div>
  </div>
  <div class="filter-container"  style={{margin:10}}>
    <div class="filter-header" onClick={handleClose}>
      <span style={{paddingBottom:8}} onClick={()=>setFilterValue("300-600")}>Rs.300 - Rs.600 </span>
    </div>
  </div>

  <div class="filter-container"  style={{margin:10}}>
    <div class="filter-header" onClick={handleClose}>
      <span style={{paddingBottom:8}} onClick={()=>setFilterValue("1-300")} >Less than Rs.300  </span>
    </div>
  </div>

  <div class="filter-container"  style={{margin:10}}>
    <div class="filter-header" onClick={handleClose}>
      <span style={{paddingBottom:8}} onClick={()=>setFilterValue("Low to High")}>Cost: Low to High  </span>
    </div>
  </div>

  <div class="filter-container"  style={{marginLeft:10}}>
    <div class="filter-header" onClick={handleClose}>
      <span style={{paddingBottom:8}} onClick={()=>setFilterValue(" High to Low")}>Cost: High to Low  </span>
    </div>
  </div>
  
          </DialogContentText>
        </DialogContent>
       
      </Dialog>
    </React.Fragment>)
  }

  const filterShowLast=()=>{
    return(
      <div>
<div style={{fontFamily:'',fontWeight:'bold',fontSize:40,marginLeft:20}}>Filter</div>
    <div style={{display:'flex',flexDirection:'row',marginLeft:20}}>   
        <div class="filter-container">
    <div class="filter-header" onClick={handleClickOpen}>
      <span style={{paddingBottom:8,paddingLeft:20}}   > Filter </span><span style={{alignItems:'center',paddingLeft:7,}}><FilterListIcon/></span>
    </div>

  </div>
  </div> 
      </div>
    )
  }

  const filterShowSecond=()=>
  {
    return(<div>
  <div style={{fontFamily:'',fontWeight:'bold',fontSize:40,margin:20}}>Filter</div>
    <div style={{display:'flex',flexDirection:'row',}}>   
        <div class="filter-container" style={{marginLeft:20}}>
    <div class="filter-header">
      <span style={{paddingBottom:8}}>Filter </span><span style={{alignItems:'center',paddingLeft:7,}}><FilterListIcon/></span>
    </div>
  </div>

  <div class="filter-container"  style={{marginLeft:10}}>
    <div class="filter-header">
      <span style={{paddingBottom:8}} onClick={()=>setFilterValue("vegetarian")} >Pure Veg </span>
    </div>
  </div>

<div class="filter-container"  style={{marginLeft:10}}>
    <div class="filter-header">
      <span style={{paddingBottom:8}} onClick={()=>setFilterValue("Non vegetarian")} >Non Veg </span>
    </div>
  </div>
 

  <div class="filter-container"  style={{marginLeft:10}}>
    <div class="filter-header">
      <span style={{paddingBottom:8}} onClick={()=>setFilterValue("Offers")}>Offers </span>
    </div>
  </div>

  <div class="filter-container"  style={{marginLeft:10}}>
    <div class="filter-header">
      <span style={{paddingBottom:8}} onClick={()=>setFilterValue("300-600")}>Rs.300 - Rs.600 </span>
    </div>
  </div>

  <div class="filter-container"  style={{marginLeft:10}}>
    <div class="filter-header">
      <span style={{paddingBottom:8}} onClick={()=>setFilterValue("1-300")}>Less than Rs.300  </span>
    </div>
  </div>

  <div class="filter-container"  style={{marginLeft:10}}>
    <div class="filter-header">
      <span style={{paddingBottom:8}} onClick={()=>setFilterValue("Low to High")}>Cost: Low to High  </span>
    </div>
  </div>

  <div class="filter-container"  style={{marginLeft:10}}>
    <div class="filter-header">
      <span style={{paddingBottom:8}} onClick={()=>setFilterValue(" High to Low")} >Cost: High to Low  </span>
    </div>
  </div>
  </div>
    </div>)
  }
  
  return(<div>
    {
      matches_md?filterShowLast():filterShowSecond()
    }
  {dialogShow()}
     </div>)
}