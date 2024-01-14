import React, { useState } from 'react'
import Navbar from '../components/Navbar';
import { useNavigate, Link } from 'react-router-dom'
import Footer from '../components/Footer';
export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://getyourjewellerybackend.onrender.com/api/auth/login", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })

    });
    const json = await response.json()
    console.log(json);
    if (json.success===100) {
      //save the auth toke to local storage and redirect
      localStorage.setItem('userEmail', credentials.email)
      localStorage.setItem('token', json.authToken)
      navigate("/admin");
      alert("Admin Logged in Successfully!")
      

    }
    else if (json.success) {
      //save the auth toke to local storage and redirect
      localStorage.setItem('userEmail', credentials.email)
      localStorage.setItem('token', json.authToken)
      navigate("/");
      alert("Logged in Successfully!")
      

    }    
    else {
      alert("Enter Valid Credentials")
    }
  }

  const alertPopUp = () => {

  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1589674781759-c21c37956a44?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fGRpYW1vbmQlMjByaW5nfGVufDB8fDB8fHwy")', height: '100vh', backgroundSize: 'cover' }}>
      <div>
        <Navbar />
      </div>
      <div className='container'>
        <form className='m-auto mt-5 border text-white border-secondary rounded' onSubmit={handleSubmit}>
          <div className="m-3">
            <label htmlFor="exampleInputEmail1" className="form-label text-secondary">Email address</label>
            <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} placeholder="Enter your Email Id" aria-describedby="emailHelp" />

          </div>
          <div className="m-3">
            <label htmlFor="exampleInputPassword1" className="form-label text-secondary">Password</label>
            <input type="password" className="form-control" value={credentials.password} onChange={onChange} name='password' placeholder="Enter your password" />
          </div>
          <button type="submit" className="m-3 btn btn-secondary text-white" onClick={alertPopUp}>Login</button>
          <Link to="/signup" className="m-3 mx-1 btn btn-secondary text-white">New User</Link>
        </form>
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  )
}


// , 'Accept': 'application/json',
//         'Access-Control-Allow-Origin': 'http://localhost:3000/login', 'Access-Control-Allow-Credentials': 'true',
//         "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, OPTIONS'