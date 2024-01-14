import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import AdminNavbar from '../components/AdminNavbar';
import Footer from '../components/Footer';

export default function Admin() {
    let navigate = useNavigate();
    return (
        <>
            <div className='mb-5'>
                <AdminNavbar />
            </div>
            <div className="grid text-center">
                <div className="bg-info bg-opacity-10 border border-info rounded-end text-secondary p-3 container"><b>Admin Section</b></div>
            </div>
            <div className="container overflow-hidden mt-5 mb-5">
                <div className="row gy-5 text-center">
                    <div className="col-6">
                        <button className='btn btn-outline-secondary p-2 col-12 col-md-6 col-lg-3' onClick={() => { navigate("/vieworders") }}>View Orders</button>
                    </div>
                    <div className="col-6">
                        <button className='btn btn-outline-secondary p-2 col-12 col-md-6 col-lg-3' onClick={() => { navigate("/viewusers") }}>View Users</button>
                    </div>
                    <div className="col-6">
                        <button className='btn btn-outline-secondary p-2 col-12 col-md-6 col-lg-3' onClick={() => { navigate("/addcategory") }}>Add Category</button>
                    </div>
                    <div className="col-6">
                        <button className='btn btn-outline-secondary p-2 col-12 col-md-6 col-lg-3' onClick={() => { navigate("/viewcategories") }}>View Categories</button>
                    </div>
                    <div className="col-6">
                        <button className='btn btn-outline-secondary p-2 col-12 col-md-6 col-lg-3' onClick={() => { navigate("/additem") }}>Add Item</button>
                    </div>
                    <div className="col-6">
                        <button className='btn btn-outline-secondary p-2 col-12 col-md-6 col-lg-3' onClick={() => { navigate("/items") }}>View Items</button>
                    </div>
                    <div className="col-6">
                        <button className='btn btn-outline-secondary p-2 col-12 col-md-6 col-lg-3' onClick={() => { navigate("/updatecategory") }}>Update Category</button>
                    </div>
                    <div className="col-6">
                        <button className='btn btn-outline-secondary p-2 col-12 col-md-6 col-lg-3' onClick={() => { navigate("/items") }}>Update Item</button>
                    </div>
                </div>
            </div>
            <div className='mt-5'>
                <Footer />
            </div>
        </>
    )
}
