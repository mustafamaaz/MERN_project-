
// npm i react-router-dom  for link ot to = "/"

import './App.css';
import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';
import MyOrder from './screens/MyOrder';

import { CartProvider } from './components/ContextReducer';


import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';

import {
  BrowserRouter as Router,
  Routes,
  Route   
} from "react-router-dom";




function App() {
  return (
    <CartProvider>

    <Router>
      <div>
        <Routes>

          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/createuser" element={<Signup />} />
          <Route exact path="/myorderData" element={<MyOrder />} />
         
          

        </Routes>
      </div>
    </Router>
    </CartProvider>

  );
}

export default App;
