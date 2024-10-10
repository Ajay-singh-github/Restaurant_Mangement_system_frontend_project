import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  rootDisplay: {
    width:"auto",
    height:"100vh",
    background:"#dfe4ea",
    display:"flex",
    flexDirection:'column',
    
    
  },
  boxDisplay:{
    width:"97%",
    height:"auto",
    borderRadius:10,
    background:"#fff",
    padding:15,
    marginBlock:'20px',
    boxShadow:"0 0 15px #222",
  },
  center:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  }
  ,
  fontstylea:{
    WebkitTextStrokeWidth:"1px",
  }
});