const initialState={orderData:{},}

console.log("again:",initialState)
export default function RootReducer(state=initialState,action)
{  
 switch(action.type)
 {
     case "ADD_ORDER":
        
             state.orderData[action.payload[0]]=action.payload[1]
             console.log(state.orderData)
             return {orderData:state.orderData}
             break
     
    case "DEL_ORDER":
            delete state.orderData[action.payload[0]] 
            return {orderData:state.orderData}
             break

    case "EDIT_EMPLOYEE":
        state.orderData[action.payload[0]]=action.payload[1]
        console.log(state.orderData)
        return {orderData:state.orderData}
        break         
    default:
        return {orderData:state.orderData}
 }

}