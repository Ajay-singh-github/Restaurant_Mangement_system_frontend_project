import { useNavigate } from "react-router-dom"




export default function EmptyCartComponent()
{   const navigate = useNavigate()
    return(
        <div class="container-fluid  mt-100" style={{marginTop:"150px"}}>
        <div class="row">
        
           <div class="col-md-12">
           
                   <div class="card">
               <div class="card-header">
               
               </div>
               <div class="card-body cart">
                       <div class="col-sm-12 empty-cart-cls text-center">
                           <img src="https://i.imgur.com/dCdflKN.png" width="170" height="170" class="img-fluid mb-4 mr-3"/>
                           <h3><strong>Your Cart is Empty</strong></h3>
                           <h4>Add something to make me happy :</h4>
                           <a href="#" class="btn btn-primary cart-btn-transform m-3" data-abc="true" onClick={()=>navigate('/home')}>continue eating</a>
                           
                       
                       </div>
               </div>
       </div>
               
           
           </div>
        
        </div>
       
       </div>
    )
}