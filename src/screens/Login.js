import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function Login() {

    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate()
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await fetch("http://localhost:4000/api/login", {
      
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: credentials.email, password: credentials.password })
  
      });
      const json = await response.json()
      console.log(json);
      if (json.success) {
        //save the auth toke to local storage and redirect
        localStorage.setItem('userEmail', credentials.email)
        localStorage.setItem('authToken', json.authToken)
        console.log(localStorage.getItem("authToken"));
        navigate("/");
  
      }
      else if (!json.success) {
        alert("Enter Valid Credentials")
      }
    }
  
    const onChange = (e) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

  return (
   
    <div style={{backgroundImage: 'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', height: '100vh', backgroundSize: 'cover' }}>
    
        <div>
           <Navbar />
       </div>
       
    
    <div className='container' >
        
        <form className='w-50 m-auto mt-5 border bg-dark border-success rounded'  onSubmit={handleSubmit} >  
        
        <div className="m-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" name='email' aria-describedby="emailHelp" value={credentials.email} onChange={onChange} />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone.</div>
            </div>

            <div className="m-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control"  name='password' value={credentials.password} onChange={onChange} />
              
            </div>

            <button type="submit" className="m-3 btn btn-success">Submit</button>
            <Link to="/createuser" className="m-3 mx-1 btn btn-danger">New User</Link>
      
        </form>
    </div>


</div>
    

  )
}








// export default function Login() {
//     const [credentials, setCredentials] = useState({ email: "", password: "" });
//     let navigate = useNavigate();
  

//     //  is me ye horha ky sab sy phly apny sab field filll ki tbh apnt submit button kiya then handle submit call hoga or ismy sy
//     //  all front end information body hogi or fetch function ky though ye sab server side mtlb backend ky pass jaey ga  http://................. url ky through sab information jaey gi


//     const handleSubmit = async (e) => {
//       e.preventDefault();
  
//       if (!credentials.email || !credentials.password) {
//         alert("Please enter both email and password.");
//         return;
//       }
  
//       try {
//         const response = await fetch("http://localhost:5000/api/Login", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             email: credentials.email,
//             password: credentials.password,
//           }),
//         });
  
//         const json = await response.json();
  
//         if (json.success) {
//           localStorage.setItem("userEmail", credentials.email);
//           localStorage.setItem("token", json.authToken);
//           navigate("/");
//         } else {
//           alert("Enter Valid Credentials");
//         }
//       } catch (error) {
//         console.error("An error occurred:", error);
//         alert("An error occurred while processing your request.");
//       }
//     };
  
//     const onChange = (e) => {
//       setCredentials({ ...credentials, [e.target.name]: e.target.value });
//     };
  
//     return (
//       <div
//         style={{
//           backgroundImage: 'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
//           height: "100vh",
//           backgroundSize: "cover",
//         }}
//       >
//         <div>
//           <Navbar />
//         </div>
  
//         <div className="container">
//           <form
//             className="w-50 m-auto mt-5 border bg-dark border-success rounded"
//             onSubmit={handleSubmit}
//           >
//             <div className="m-3">
//               <label htmlFor="exampleInputEmail1" className="form-label">
//                 Email address
//               </label>
//               <input
//                 type="email"
//                 className="form-control"
//                 name="email"
//                 value={credentials.email}
//                 onChange={onChange}
//                 aria-describedby="emailHelp"
//               />
//               <div id="emailHelp" className="form-text">
//                 We'll never share your email with anyone.
//               </div>
//             </div>
  
//             <div className="m-3">
//               <label htmlFor="exampleInputPassword1" className="form-label">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 className="form-control"
//                 value={credentials.password}
//                 onChange={onChange}
//                 name="password"
//               />
//             </div>
  
//             <button type="submit" className="m-3 btn btn-success">
//               Submit
//             </button>
//             <Link to="/createuser" className="m-3 mx-1 btn btn-danger">
//               New User
//             </Link>
//           </form>
//         </div>
//       </div>
//     );
//   }