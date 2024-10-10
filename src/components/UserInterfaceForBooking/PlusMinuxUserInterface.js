import { Button } from "@mui/material";
import { useState } from "react";




export default function PlusMinuxUserInterface(props)
{
    const [count, setCount] = useState(0);
    
    const handleIncrement = () => {
        setCount(count + 1);
      };
    
      const handleDecrement = () => {
        if (count > 0) {
          setCount(count - 1);
        }
      };
      
    return(<div style={{display:'flex',marginTop:20}}>
            <div style={{margin:5}}><Button variant="outlined" onClick={handleDecrement}>-</Button>      </div><div style={{margin:5}}>{count}</div >  <div style={{margin:5}}>   <Button variant="outlined" onClick={handleIncrement}>+</Button>               </div>
    </div>)
}