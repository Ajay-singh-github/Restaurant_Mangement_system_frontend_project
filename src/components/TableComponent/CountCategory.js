import React,{useState,useEffect} from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title'; 
import { postData } from '../../services/FetchNodeServices';
function preventDefault(event) {
  event.preventDefault();
}

export default function CountCategory() {
    const [totalAmount,setTotalAmount]=useState(0);
    
    const getCurrentDate=()=>{
        const date=new Date();
        const cd=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
        return cd; 
      }
      const getCurrentDateString=()=>{
        const date=new Date();
        const m=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
        const d=['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
        const cd=d[date.getDay()]+","+m[date.getMonth()]+" "+date.getDate()+" "+date.getFullYear()
        return cd; 
      }
    const fetchTotalAmount=async()=>{
        const result=await postData('billing/fetch_todays_total',{todaysdate:getCurrentDate()})
        
        
        if(result.data.totalbill==undefined)
        {
         
          setTotalAmount({totalbill:0})
        }
        else{
          setTotalAmount(result.data)
        }
   
        
        
      }  
      useEffect(function(){ fetchTotalAmount()},[])
      
     

  return (
    <React.Fragment>
       <Title>Todays Sales</Title>
      <Typography component="p" variant="h4">
        &#8377; {parseFloat(totalAmount.totalbill).toFixed(2)}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
       on {getCurrentDateString()}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}