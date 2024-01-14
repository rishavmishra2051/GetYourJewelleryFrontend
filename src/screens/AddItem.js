import React, { useState } from 'react'
import AdminNavbar from '../components/AdminNavbar'
import Footer from '../components/Footer'

export default function AddItem() {
    const [credentials, setCredentials] = useState({ CategoryName: "", name: "",img: "", price: "", Metal: "", Material: "",
    Save: "", Dealer: ""})
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("https://getyourjewellerybackend.onrender.com/api/auth/additem", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                CategoryName: credentials.CategoryName, name: credentials.name, img: credentials.img, 
                price: credentials.price, Metal: credentials.Metal, Material: credentials.Material,
                Save: credentials.Save, Dealer: credentials.Dealer
            })

        });
        const json = await response.json()
        console.log(json);
        if (json.success) {
            //save the auth toke to local storage and redirect
            //localStorage.setItem('token', json.authToken)
            alert("Item Added Successfully")

        }
        else {
            alert("Item Not Added")
        }
    }

    return (
        <>
            <div className='mb-4'>
                <AdminNavbar />
            </div>
            <div className='container' >
                <form className='m-auto border text-white border-secondary rounded' style={{ backgroundColor: "#fff" }} onSubmit={handleSubmit}>
                    <div className="m-3">
                        <input type="text" className="form-control" name='CategoryName' value={credentials.CategoryName} onChange={onChange} placeholder="Enter Category Name" aria-describedby="emailHelp" />
                    </div>
                    <div className="m-3">
                        <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} placeholder="Enter Item Name" />
                    </div>
                    <div className="m-3">
                        <input type="text" className="form-control" name='img' value={credentials.img} onChange={onChange} placeholder="Enter Image Link" />
                    </div>
                    <div className="m-3">
                        <input type="text" className="form-control" name='Metal' value={credentials.Metal} onChange={onChange} placeholder="Enter Item Metal" />
                    </div>
                    <div className="m-3">
                        <input type="text" className="form-control" name='Material' value={credentials.Material} onChange={onChange} placeholder="Enter Item Material" />
                    </div>
                    <div className="m-3">
                        <input type="text" className='form-control' name="price" value={credentials.price} onChange={onChange} placeholder="Enter Price" />
                    </div>
                    <div className="m-3">
                        <input type="text" className='form-control' name="Save" value={credentials.Save} onChange={onChange} placeholder="Enter Discount" />
                    </div>
                    <div className="m-3">
                        <input type="text" className='form-control' name="Dealer" value={credentials.Dealer} onChange={onChange} placeholder="Enter Dealer Name" />
                    </div>
                    
                    <div className='text-center'>
                        <button type="submit" className="m-3 btn btn-secondary text-white">Add Item</button>
                    </div>
                </form>
            </div>
            <div className='mt-5'>
                <Footer />
            </div>
        </>
    )
}
/*
options: [
        {
          half: credentials.half, full: credentials.full, regular: credentials.regular, small: credentials.small, 
          medium: credentials.medium, large: credentials.large
        }
    ],
*/
/*
<input type="text" className='m-2 rounded-3 text-center' id='option' name="half" value={credentials.half} onChange={onChange} placeholder="Half Rate" />
            <input type="text" className='m-2 rounded-3 text-center' id='option' name="full" value={credentials.full} onChange={onChange} placeholder="Full Rate" />
            <input type="text" className='m-2 rounded-3 text-center' id='option' name="regular" value={credentials.regular} onChange={onChange} placeholder="Regular Rate" />
            <input type="text" className='m-2 rounded-3 text-center' id='option' name="small" value={credentials.small} onChange={onChange} placeholder="Small Rate" />
            <input type="text" className='m-2 rounded-3 text-center' id='option' name="medium" value={credentials.medium} onChange={onChange} placeholder="Medium Rate" />
            <input type="text" className='m-2 rounded-3 text-center' id='option' name="large" value={credentials.large} onChange={onChange} placeholder="Large Rate" />
*/