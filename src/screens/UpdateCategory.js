import React, { useState } from 'react'
import AdminNavbar from '../components/AdminNavbar'
import Footer from '../components/Footer'

export default function UpdateCategory() {
  const [credentials, setCredentials] = useState({ CategoryName: "" })
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("https://getyourjewellerybackend.onrender.com/api/auth/updatecategory", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ CategoryName: credentials.CategoryName,UpdatedCategoryName:credentials.UpdatedCategoryName })

        });
        const json = await response.json()
        console.log(json);
        if (json.success) {
            //save the auth toke to local storage and redirect
            //localStorage.setItem('token', json.authToken)
            alert("Category Updated Successfully")

        }
        else {
            alert("Not Updated")
        }
    }
  return (
    <>
    <div className='mb-5'>
                <AdminNavbar />
            </div>
            <div className='container'>
                <form className='m-auto mt-5 border text-white border-secondary rounded' style={{ backgroundColor: "#fff" }} onSubmit={handleSubmit}>
                    <div className="m-3">
                        <label htmlFor="exampleInputEmail1" className="form-label text-secondary">Current Category Name</label>
                        <input type="text" className="form-control mb-3" name='CategoryName' value={credentials.CategoryName} onChange={onChange} />
                        <label htmlFor="exampleInputEmail1" className="form-label text-secondary">New Category Name</label>
                        <input type="text" className="form-control" name='UpdatedCategoryName' value={credentials.UpdatedCategoryName} onChange={onChange}/>
                    </div>
                    <div className='text-center'>
                        <button type="submit" className="m-3 btn btn-secondary text-white">Update Category</button>
                    </div>
                </form>
            </div>
            <div className='mt-5'>
                <Footer />
            </div>
    </>
  )
}
