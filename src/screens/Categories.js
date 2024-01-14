import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Footer from '../components/Footer';
export default function Categories() {
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
            <div className='mb-3'>
                <nav class="navbar navbar-light bg-light">
                    <div class="container">
                        <Link className="navbar-brand fs-1 fst-italic" to="/admin">GetYourJewellery</Link>
                        <form class="d-flex">
                            <input class="form-control me-2 border-secondary" type="search" placeholder="Search Category" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                            <button class="btn btn-outline-secondary" onClick={() => { setSearch('') }}>Search</button>
                        </form>
                    </div>
                </nav>
            </div>

            <div className='container'> {/* boootstrap is mobile first */}
                {foodCat.length > 1 ? foodCat.filter(
                    (items) => (items.CategoryName.toLowerCase().includes(search.toLowerCase())))
                    .map((data) => {
                        return (
                            <div className="container overflow-hidden mt-2 mb-2">
                                <button type='button' className="btn btn-outline-secondary p-2 col-12 col-md-6 col-lg-3" key={data.id} onClick={() => navigate("/categoryexplore", { state: { category: data.CategoryName } })}>{data.CategoryName}</button>
                            </div>
                        )
                    })
                    : ""}
            </div>
            <div className='mt-2'>
                <Footer />
            </div>
        </>
    )
}
