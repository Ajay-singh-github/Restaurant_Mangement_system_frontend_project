import { makeStyles } from "@mui/styles";
import { hover } from "@testing-library/user-event/dist/hover";

export const useStyles = makeStyles({
  root: {
    width:"auto",
    height:"auto",
    background:"#dfe4ea",
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    flexDirection:'column',
    padding:10
    
  },
  box:{
    width:"99%",
    height:"auto",
    borderRadius:10,
    background:"#fff",
    padding:15,
    marginBottom:10
  },
  tablebox:{
    width:"80%",
    height:"auto",
    borderRadius:10,
    background:"#fff",
    padding:15,
   
  },
  center:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  }
 
});