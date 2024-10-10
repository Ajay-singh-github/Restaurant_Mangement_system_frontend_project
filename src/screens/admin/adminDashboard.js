
import {Avatar,Paper,Grid,AppBar,Toolbar,Box,Typography} from '@mui/material';
import { makeStyles } from "@mui/styles";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import DraftsIcon from '@mui/icons-material/Drafts';
import MenuBookSharpIcon from '@mui/icons-material/MenuBookSharp';
import Subcategoryinterface from '../category/Subcategoryinterface';
import DisplayAllCategory from '../category/DisplayAllCategorys';
import RestaurantCategoryInterface from '../category/CategoryInterface';
import DisplayAllSubCategory from '../category/DisplayAllSubCategory';
import TableBooking from '../table/tablebookinginterface';
import TableDisplay from '../table/tablebookingdisplay';
import WaiterInterface from '../table/waitersinterface';
import DisplayWaiters from '../table/displaywaiters';
import WaiterTable from '../table/waitertable';
import WaiterTableDisplay from '../table/waitertabledisplay';
import { Navigate, Route,Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { serverURL } from '../../services/FetchNodeServices';
import FoodBooking from '../FoodBooking/FoodBooking';
import AllSales from '../../components/allsales/AllSales';
import DashboardIcon from '@mui/icons-material/Dashboard';


import LogoutIcon from '@mui/icons-material/Logout';
import Summary from './Summary';
import InvoiceComponent from '../../components/UserInterfaceForBooking/InvoiceComponent';

const useStyles = makeStyles({
  root: {
    width: "100vw",
    height: "auto",
    background: "#dfe4ea",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: "60%",
    height: "auto",
    borderRadius: 10,
    background: "#fff",
    padding: 15,
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    
  },
  leftBarStyle:{
    padding:5,
    display: "flex",
    flexDirection:'column',
    justifyContent: "center",
    alignItems: "center",
    margin:10,


  },
  nameStyle:{
   fontFamily:'Kanit',
   fontSize:16,
   fontWeight:'bold',
   marginTop:5,
   marginBottom:2

  },
  phoneStyle:{
    fontFamily:'Kanit',
    fontSize:12,
    fontWeight:'bold',
   
    color:'#636e72'
 
   },
   emailStyle:{
    fontFamily:'Kanit',
    fontSize:12,
    fontWeight:'bold',
    
    color:'#636e72'
   },
   menuStyle:{
    fontFamily:'Kanit',
    fontSize:18,
    fontWeight:'bold',
    display:'flex',
    justifyContent:'left',
    width:250,
     


   },
   menuItemStyle:{
    fontFamily:'Kanit',
    fontSize:16,
    fontWeight:'bold',
    
   }

});
export default function Admindashboard(props){
   var classes=useStyles()
   var navigate=useNavigate()   // iska use ek page se dusre page pr jaane ke liye kiya jaata hai ye ek hook hai 
   
   var admin=JSON.parse(localStorage.getItem('ADMIN')) // yaha hamne us json ko fetch kar liya hai
   const handleLogout = () => {
    localStorage.clear();
    navigate("/admin_login");
  };

   return(
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static" style={{position:'static',top:0}}>
      <Toolbar variant="dense">
        
        <Typography variant="h6" color="inherit" component="div">
           {admin.restaurantname}
        </Typography>
      </Toolbar>
    </AppBar>
    <Grid container spaces={3} >
      <Grid item xs={2}>
        <Paper className={classes.leftBarStyle}>
          <img src={`${serverURL}/images/${admin.filelogo}`} variant="rounded"  style={{width:80,height:80}} />
          <div className={classes.nameStyle}>{admin.ownername}</div>
          <div className={classes.emailStyle}>{admin.emailid}</div>
          <div className={classes.phoneStyle}>+91{admin.mobileno}</div>

      <div className={classes.menuStyle}>
        <List>
        <ListItem disablePadding>
                    <ListItemButton onClick={()=>navigate('/admindashboard/summary')}>
                      <ListItemIcon>
                        <DashboardIcon />
                      </ListItemIcon>
                      <ListItemText primary={<span className={classes.menuItemStyle}>Dashboard</span>} />
                    </ListItemButton>
                  </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={()=>navigate('/admindashboard/displayallcategory')}>
              <ListItemIcon>
                <MenuBookSharpIcon />
              </ListItemIcon>
              <ListItemText primary={<span className={classes.menuItemStyle}>Category List</span>} />
            </ListItemButton>
          </ListItem>

          
         

          <ListItem disablePadding>
            <ListItemButton onClick={()=>navigate('/admindashboard/displayallsubcategory')}>
              <ListItemIcon>
                <MenuBookSharpIcon />
              </ListItemIcon>
              <ListItemText primary={<span className={classes.menuItemStyle}>Food Item List</span>} />
            </ListItemButton>
          </ListItem>

          
          

          <ListItem disablePadding>
            <ListItemButton onClick={()=>navigate('/admindashboard/tablebookinginterface')}>
              <ListItemIcon>
                <MenuBookSharpIcon />
              </ListItemIcon>
              <ListItemText primary={<span className={classes.menuItemStyle}>Table List</span>} />
            </ListItemButton>
          </ListItem>

         



          <ListItem disablePadding>
            <ListItemButton onClick={()=>navigate('/admindashboard/displaywaiters')}>
              <ListItemIcon>
                <MenuBookSharpIcon />
              </ListItemIcon>
              <ListItemText primary={<span className={classes.menuItemStyle}>Waiter List</span>} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={()=>navigate('/admindashboard/waitertabledisplay')}>
              <ListItemIcon>
                <MenuBookSharpIcon />
              </ListItemIcon>
              <ListItemText primary={<span className={classes.menuItemStyle}>Waiter Table List</span>} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={()=>navigate('/admindashboard/foodbooking')}>
              <ListItemIcon>
                <MenuBookSharpIcon />
              </ListItemIcon>
              <ListItemText primary={<span className={classes.menuItemStyle}>Billing</span>} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={()=>navigate('/admindashboard/allsales')}>
              <ListItemIcon>
                <MenuBookSharpIcon />
              </ListItemIcon>
              <ListItemText primary={<span className={classes.menuItemStyle}>All Sales</span>} />
            </ListItemButton>
          </ListItem>



          <ListItem disablePadding>
            <ListItemButton onClick={()=>navigate('/admindashboard/InvoiceDetails')}>
              <ListItemIcon>
                <MenuBookSharpIcon />
              </ListItemIcon>
              <ListItemText primary={<span className={classes.menuItemStyle}>Invoice Dawnload</span>} />
            </ListItemButton>
          </ListItem>

           <Divider variant='inset'  />
          
            
  
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={<span className={classes.menuItemStyle}>Logout</span>} />
            </ListItemButton>
          </ListItem>



       
        </List>
       
     
      </div>
    
      </Paper> 
      


      </Grid>
      <Grid item xs={10} style={{padding:25,background: "#dfe4ea"}}>
      
      <Routes>
      <Route path="/" element={<Navigate to="/admindashboard/Summary" replace={true} />}/>
     
      <Route  element={<RestaurantCategoryInterface/>}  path='/restaurantcategoryinterface'/>
         <Route  element={<DisplayAllCategory/>}  path='/displayallcategory'/>
         <Route  element={<Subcategoryinterface/>}  path='/subcategoryinterface' />
         <Route  element={<DisplayAllSubCategory/>}  path='/displayallsubcategory' />
         <Route  element={<TableBooking/>}  path='/tablebookinginterface/'/>
         <Route  element={<TableDisplay/>}  path='/tablebookingdisplay/'/>     
         <Route  element={<WaiterInterface/>}  path='/waiterinterface/'/>
         <Route  element={<DisplayWaiters/>}  path='/displaywaiters/'/>
         <Route  element={<WaiterTable/>}  path='/waitertable/'/>
         <Route  element={<WaiterTableDisplay/>}  path='/waitertabledisplay/'/>
         <Route  element={<FoodBooking/>}  path='/foodbooking/'/>
         <Route  element={<AllSales/>}  path='/allsales/'/>  
         <Route  element={<InvoiceComponent/>}  path='/InvoiceDetails/'/>  
         {/* foodbooking */}
         {/* allsales */}
         <Route  element={<Summary/>}  path='/summary/'/>


       </Routes>  
      </Grid>

    </Grid>
  </Box>
  )

}