import { useNavigate } from "react-router-dom"
export default function Heading({title,myroute})
{   var navigate=useNavigate()
    return(

       <div style={{fontFamily: 'Kanit',
       fontWeight:'bold',
       fontSize:20,
       latterSpacing:1,
       display:'flex',
       flexDirection:'row',
     
       alignItems:'center'}}>
        <img src="/logo.png" style={{width:60}}/> 
        <div> {title}</div>
        <img src="/list.png" style={{width:40,marginLeft:'auto'}} onClick={()=>navigate(`${myroute}`)} /> 

       </div>
    )
}