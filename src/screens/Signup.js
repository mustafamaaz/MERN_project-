import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Navbar from '../components/Navbar';
import photo from './photo.jpg';




export default function Signup() {

  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" })

  // let [address, setAddress] = useState("");
  let navigate = useNavigate()




  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/api/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })

    });
    // console.log("body ",JSON.stringify());
    const json = await response.json()
    console.log(json);
    if (json.success) {
      //save the auth toke to local storage and redirect
      // localStorage.setItem('token', json.authToken)
      navigate("/login")

    }
    else {
      alert("Enter Valid Credentials")
    }
  }




  const assignhtmlvalue = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
    // console.log("done ",credentials);
    // html ki value name ko asign krdy ga
  }

  // 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")'

  return (
    <div style={{ backgroundImage: `url(${photo})` , backgroundSize: 'cover', height: '100vh' }}>
      <div>
        <Navbar />
      </div>

      <div className='container' >
        <form className='w-50 m-auto mt-5 border bg-dark border-success rounded' onSubmit={handleSubmit}>
          <div className="m-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" name='name' value={credentials.name} onChange={assignhtmlvalue} aria-describedby="emailHelp" />
          </div>
          <div className="m-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' value={credentials.email} onChange={assignhtmlvalue} aria-describedby="emailHelp" />
          </div>
          <div className="m-3">
            <label htmlFor="address" className="form-label">Address</label>

            <input type="text" className="form-control" name='geolocation' placeholder='"Click below for fetching address"' value={credentials.geolocation} onChange={assignhtmlvalue} aria-describedby="emailHelp" />

          </div>
          <div className="m-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' value={credentials.password} onChange={assignhtmlvalue} />
          </div>
          <button type="submit" className="m-3 btn btn-success">Submit</button>
          <Link to="/login" className="m-3 mx-1 btn btn-danger">Already a user</Link>
        </form>
      </div>
    </div>
  )
}























