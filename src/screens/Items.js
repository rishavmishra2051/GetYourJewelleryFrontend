import React, { useEffect, useState } from 'react'
import AdminCard from '../components/AdminCard'
import { Link } from "react-router-dom";
import Footer from '../components/Footer';
import styled from 'styled-components';

const Desktopview = styled.ul`
  @media (max-width: 767px) {
    display: none;
  }
`;
const Mobileview = styled.ul`
  display: none;
  
  @media (max-width: 767px) {
    display: flex;
  }
`;

export default function Items() {
    const [foodCat, setFoodCat] = useState([])
    const [foodItems, setFoodItems] = useState([])
    const [search, setSearch] = useState('')
    /*const { state } = useLocation();
    const { cate } = state;*/
    const loadFoodItems = async () => {
        let response = await fetch("https://getyourjewellerybackend.onrender.com/api/auth/jewelData", {
            // credentials: 'include',
            // Origin:"http://localhost:3000/login",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }

        });
        response = await response.json();
        //console.log(response[1][0].CategoryName);
        // console.log(response[1][1].CategoryName)
        setFoodItems(response[0])
        setFoodCat(response[1])
        //setCat(cate)
    }


    useEffect(() => {
        loadFoodItems()
    }, [])
    return (
        <>

            <div>
                <nav class="navbar navbar-light bg-light">
                    <div class="container">
                        <Link className="navbar-brand fs-1 text-secondary fst-italic" to="/admin">GetYourjewellery</Link>
                        <form class="d-flex">
                            <input class="form-control me-2 border-secondary" type="search" placeholder="Search  by Product Id" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                            <button class="btn btn-outline-secondary" onClick={() => { setSearch('') }}>Search</button>
                        </form>
                    </div>
                </nav>
            </div>

            <div className='container'> {/* boootstrap is mobile first */}
                {
                    foodCat.length > 1 ? foodCat.map((data) => {
                        return (
                            // justify-content-center
                            <div className='row mb-3'>
                                {foodItems.length > 1 ? foodItems.filter(
                                    (items) => (items.CategoryName === data.CategoryName) && (items._id.toLowerCase().includes(search.toLowerCase())))
                                    .map(filterItems => {
                                        return (
                                            <div key={filterItems.id} className='col-12 col-md-6 col-lg-3'>
                                                <Desktopview>
                                                    <AdminCard foodName={filterItems.name} item={filterItems} price={filterItems.price} ImgSrc={filterItems.img} CategoryName={filterItems.CategoryName} id={filterItems._id} save={filterItems.Save} dealer={filterItems.Dealer} metal={filterItems.Metal} material={filterItems.Material} pricebreakup={filterItems.pricebreakup}></AdminCard>
                                                </Desktopview>
                                                <Mobileview className='text-center me-5'>
                                                    <AdminCard foodName={filterItems.name} item={filterItems} price={filterItems.price} ImgSrc={filterItems.img} CategoryName={filterItems.CategoryName} id={filterItems._id} save={filterItems.Save} dealer={filterItems.Dealer} metal={filterItems.Metal} material={filterItems.Material} pricebreakup={filterItems.pricebreakup}></AdminCard>
                                                </Mobileview>
                                            </div>
                                        )
                                    }) : <div> Wait Data is loading </div>}
                            </div>
                        )
                    })
                        : <div> Wait Data is loading </div>}

            </div>
            <div className='mt-5'>
                <Footer />
            </div>
        </>
    )
}
/*
<div key={data.id} className='fs-3 m-3 text-secondary'>
                                    {data.CategoryName}
                                </div>
                                <hr id="hr-secondary" style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(center,rgb(0, 255, 137),rgb(0, 0, 0))" }} />
*/