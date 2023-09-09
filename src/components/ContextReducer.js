// context use hota hy add to card button me is ssy ham apna same cheex dosry mtlb child file bhej sakty hen jis trha ider add to cart pr click sy my cart me cheexy chali jaey gi

import React, { createContext, useContext, useReducer } from 'react'

const CartStateContext = createContext();
const CartdispatchContext = createContext();

const reducer = (state,action) =>{   // state means wo value jis pr addcard click huwa or action means type add remove like
 
  switch(action.type){
    case "ADD":
      return [...state,{id:action.id ,name:action.name ,qty:action.qty ,size:action.size  ,img:action.img,price:action.price }]  // ye action.name waghera state me dal rha hy data jo front end sy select data kiya hoga
      
      case "REMOVE":
      let newArr = [...state]
      newArr.splice(action.index,1)
      return newArr

      case "UPDATE":
        let arr = [...state]
        arr.find((food, index) =>{
          if(food.id === action.id){
            arr[index] = {...food,qty:parseInt(action.qty) + parseInt(food.qty) , price: action.price + food.price}
          }
         
        })
        return arr

        case "DROP":
          let empArray =[]
          return empArray
          
      default:
        console.log("Error in reducer");
  }

}

// app.js me ham sab ko cartprovider me wrap kr den gy jis sy ham kisi bh route pr data use kr sakty hen

export const CartProvider = ({children}) =>{  // isme export likha huwa to assai export hojaey gi or ham app.js me direct import kry gy

  const[state,dispatch] = useReducer(reducer,[]);       // like a useState value and setvalue is me state wo value hogi jo current hy dispatch means send kro value

  return (
    <CartdispatchContext.Provider value={dispatch}>
    <CartStateContext.Provider value={state}>
      {children}
    </CartStateContext.Provider>

    </CartdispatchContext.Provider>

  )
}

export const useCart = ()=> useContext(CartStateContext);
export const useDispatchCart = ()=> useContext(CartdispatchContext);
