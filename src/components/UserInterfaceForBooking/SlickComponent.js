import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { postData, serverURL } from "../../services/FetchNodeServices";
import { Button } from "@mui/material";
import './styles.css'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from "react";


export default function SimpleSlider(props) {
  var admin=JSON.parse(localStorage.getItem('ADMIN'))

  const theme = useTheme();

  const matches_md = useMediaQuery(theme.breakpoints.down('md'));
  const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));
  const [allcategory,setAllCategory]=useState([])
// alert(matches_sm)
const  fetchAllCategory=async()=>{
      
        
  const result=await postData('restaurants/fetch_all_category',{'restaurantid':admin.restaurantid})
  setAllCategory(result.result)
  
}
console.log(allcategory)

useEffect(function(){
  fetchAllCategory()

},[])
    const CustomPrevArrow = (props) => (
      <div style={{display:'flex',justifyContent:'end'}} >
        {/* <Button  variant="contained" size="small" {...props} className={"slick-arrow custom-arrow custom-prev-arrow " }  style={{backgroundColor:'#8e44ad'}}>
          Prev
        </Button> */}
        </div>
      );
    
      const CustomNextArrow = (props) => (
        <div style={{display:'flex',justifyContent:'end'}}>
        {/* <Button variant="contained" size="small" {...props}  className="slick-arrow custom-arrow custom-next-arrow" style={{backgroundColor:'#e67e22'}}>
        next
</Button> */}
      </div>

      );
      
    var settings = {
                    
        infinite: true,
        // speed: 500,
        slidesToShow: matches_md?4:6,
        slidesToScroll: 2,
        prevArrow: matches_md?"": <CustomPrevArrow />,
        nextArrow: matches_md?"":<CustomNextArrow />,
        speed: 3000,
        autoplay: true,
        infinite: true,
        autoplaySpeed: 3000,
       };
    //   var data=[{id:1,icon:'h1.webp',name:'pizza'},
    //   {id:2,icon:'h2.webp',name:'pizza'},
    //   {id:3,icon:'h3.webp',name:'pizza'},
    //   {id:4,icon:'h4.webp',name:'pizza'},
    //   {id:5,icon:'h5.webp',name:'pizza'},
    //   {id:6,icon:'h6.webp',name:'pizza'},
    //   {id:7,icon:'h7.webp',name:'pizza'},
    //   {id:8,icon:'h4.webp',name:'pizza'},
    //   {id:9,icon:'h5.webp',name:'pizza'},
    //   {id:10,icon:'h6.webp',name:'pizza'},
    //   {id:11,icon:'h7.webp',name:'pizza'},
    //  ]

    // query    SELECT * FROM restaurantbooking.fooditems  where categoryid =36 and restaurantid=28
   
   

      const AddSlider=()=>{
        return allcategory.map((item)=>{
        return(<div style={{width:'100%'}}>
           <div style={{ width:'100%',display:'flex',flexDirection:'column', alignItems:'center',justifyContent:'center'}}>
            <div style={{width:'80%',height:'80%',borderRadius:'40%', boxShadow:'10px'}}>
            <img  src={`${serverURL}/images/${item.icon}`} title={item.categoryname} style={{borderRadius:10,margin:10,marginTop:10}}  className={"imga"} onClick={()=>props.setCategoryid(item.categoryid)}/>   
           </div>
           <div>
            
             {item.categoryname}
            </div> 
          {/* width:'100%';border-radius:20;margin:10;
    margin-top:50; */}
           </div>
        </div>)
        })
      }
    
  return (
    <div>
    <div style={{paddingLeft:30,paddingTop:20, fontFamily:'Kanit ,Bold 700',fontWeight:'bold',fontSize:20,letterSpacing:1}}>What's on your mind?</div>
    <Slider {...settings} >
      {AddSlider()}
    </Slider>
    </div>
  );
}