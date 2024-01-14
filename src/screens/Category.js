import React from 'react'
import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'

export default function Category() {
    const [foodCat, setFoodCat] = useState([])
    const [search, setSearch] = useState('')
    let navigate = useNavigate()

    const loadFoodItems = async () => {
        let response = await fetch("https://getyourjewellerybackend.onrender.com/api/auth/jewelData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }

        });
        response = await response.json();
        setFoodCat(response[1])
    }

    useEffect(() => {
        loadFoodItems()
    }, [])


    return (
        <>
            <div className='mb-5'>
                <Navbar />
            </div>

            <div className=" d-flex justify-content-center mb-3">  {/* justify-content-center, copy this <form> from navbar for search box */}
                <input className="form-control me-2 w-50 border-secondary bg-dark text-secondary" type="search" placeholder="Search for Jewellery category..." aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                <button className="btn text-white bg-secondary" onClick={() => { setSearch('') }}>Search</button>
            </div>

            <div className='container'> {/* boootstrap is mobile first */}


                {foodCat.length > 1 ? foodCat.filter(
                    (items) => (items.CategoryName.toLowerCase().includes(search.toLowerCase())))
                    .map((data) => {

                        return (
                            <div className="container overflow-hidden mt-2 mb-2">
                                <button type='button' className="btn btn-outline-secondary p-2 col-12 col-md-6 col-lg-3" key={data.id} onClick={() => navigate("/categoryexploreclient", { state: { category: data.CategoryName } })}>{data.CategoryName}</button>
                            </div>
                        )
                    })
                    : "Wait Data is loading..."}
            </div>
            <div>
                <Footer />
            </div>
        </>
    )
}
