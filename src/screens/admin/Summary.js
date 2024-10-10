import Chart from "../../components/DashboardComponent/Chart"
import AjayDeposits from "../../components/TableComponent/Deposits"
import { Grid,Paper } from "@mui/material"
import { useEffect, useState } from "react"
import { postData } from "../../services/FetchNodeServices"
export default function Summary(props)
{

  //select count(*) from category where restaurantid=28
  var admin=JSON.parse(localStorage.getItem('ADMIN'))
    const [restaurantId,setRestaurantId]=useState()
    const [categorycount,setCategoryCount]=useState([])
    // const [againcount,setAgainCount]=useState(categorycount[0].count)
    
    const  fetchAllCategorycount=async()=>{
      
        
        const result=await postData('restaurants/fetch_all_category_after_count',{'restaurantid':admin.restaurantid})
        setCategoryCount(result.result)
        
      }
      
      useEffect(function(){
        fetchAllCategorycount()
 
     },[])
  return(<div>
    {/* Chart */}
    <Grid container spacing={3}>
    <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                
                  <Chart />
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <AjayDeposits/>

                </Paper>
              </Grid>

              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <div>
                    
                   </div>
                  {/* <CountCategory  setCategoryCount={setCategoryCount} categorycount={categorycount}/> */}
                  

                </Paper>
              </Grid>
              

              <Grid item xs={12} md={6} lg={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <div>
                    
                   </div>
                  {/* <CountCategory  setCategoryCount={setCategoryCount} categorycount={categorycount}/> */}
                  

                </Paper>
              </Grid>

              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <div>
                    
                   </div>
                  {/* <CountCategory  setCategoryCount={setCategoryCount} categorycount={categorycount}/> */}
                  

                </Paper>
              </Grid>
          </Grid>    

  </div>)

}