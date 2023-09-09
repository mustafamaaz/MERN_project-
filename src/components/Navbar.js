// rfc is snappit for creating below this model


import React,{ useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge';

import Modal from '../Model';
import Cart from '../screens/Cart';
import {  useCart } from './ContextReducer';

export default function Navbar() {

  let data = useCart();

  const [cartView,setCartView] = useState(false);
  const navigate = useNavigate();
 const handleLogout = ()=>{
  localStorage.removeItem("authToken");
  navigate("/login")

 }


  return (
    <div> 

      <nav  className="navbar navbar-expand-lg navbar-light bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fst-italic  fw-bold fs-1"  to="/">ChaskaFOOD</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auti mb-2">
              <li className="nav-item">
                <Link className="nav-link active fs-5 fw-bold" aria-current="page" to="/">Home</Link>
               
              </li>

           
              {(localStorage.getItem("authToken"))?
               <li className="nav-item">
               <Link className="nav-link active fs-5 fw-bold" aria-current="page" to="/myorderData">My Orders</Link>
             </li>
             :""}
             
            </ul>  

            {(!localStorage.getItem("authToken"))?
               <div  className='d-flex' style={{position:"absolute" , right:"50px"}}>

            <Link className="btn bg-white text-success mx-1" to="/Login">Login</Link>
            <Link className="btn bg-white text-success mx-1" to="/createuser">Signup</Link>
                     </div>
             :
             <div style={{position:"absolute" , right:"50px"}} >
            <div className="btn bg-white text-success mx-2" onClick={()=>{setCartView(true)}}>My Cart{"   "}   
            <Badge pill bg='danger'>     {data.length}  </Badge>
         
            
             </div>
             { cartView? <Modal onClose={()=> setCartView(false)}> <Cart/> </Modal>:null }
            <div className="btn bg-white text-danger mx-2" onClick={handleLogout} >Logout </div>
            
             </div>
             
             }
          </div>
        </div>
      </nav>


    </div>
  )
}
