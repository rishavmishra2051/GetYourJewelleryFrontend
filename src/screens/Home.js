import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import img from '../Assets/bg.jpg'
//import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
//import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
// import Carousel from '../components/Carousel'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
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

export default function Home() {
  const [foodCat, setFoodCat] = useState([])
  const [foodItems, setFoodItems] = useState([])
  const [search, setSearch] = useState('')
  const loadFoodItems = async () => {
    let response = await fetch("https://getyourjewellerybackend.onrender.com/api/auth/jewelData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    response = await response.json();
    setFoodItems(response[0])
    setFoodCat(response[1])
  }

  useEffect(() => {
    loadFoodItems()
  }, [])

  return (
    <div >
      <div>
        <Navbar />
      </div>
      {/*Carousel*/}
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade container" data-bs-ride="carousel">

          <div className="carousel-inner " id='carousel'>
            <div className=" carousel-caption  " style={{ zIndex: "9" }}>
              <div className=" d-flex justify-content-center">  {/* justify-content-center, copy this <form> from navbar for search box */}
                <input className="form-control me-2 w-75 border-secondary bg-dark text-secondary" type="search" placeholder="Search in Jewellery..." aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                <button className="btn text-white bg-secondary" onClick={() => { setSearch('') }}>Search</button>
              </div>
            </div>
            <div className="carousel-item active" >
              <img src={img} className="d-block w-100" style={{ filter: "brightness(100%)" }} alt="..." />
            </div>
          </div>
        </div>
      </div>


      {/*Food items*/}
      <div className='container'> {/* boootstrap is mobile first */}
        {
          foodCat.length > 1 ? foodCat.map((data) => {
            return (
              // justify-content-center
              <div className='row mb-3'>
                <div key={data.id} className='fs-3 m-3 ms-4 text-secondary fst-italic fw-bold'>
                  {data.CategoryName}
                </div>
                <hr id="hr-warning" style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(center,rgb(0, 255, 137),rgb(0, 0, 0))" }} />

                {foodItems.length > 1 ? foodItems.filter(
                  (items) => (items.CategoryName === data.CategoryName) && (items.name.toLowerCase().includes(search.toLowerCase())))
                  .map(filterItems => {
                    return (
                      <div key={filterItems.id} className='col-12 col-md-6 col-lg-3'>
                        {console.log(filterItems.url)}
                        <Desktopview>
                          <Card foodName={filterItems.name} item={filterItems} price={filterItems.price} ImgSrc={filterItems.img} CategoryName={filterItems.CategoryName} id={filterItems._id} save={filterItems.Save} dealer={filterItems.Dealer} metal={filterItems.Metal} material={filterItems.Material} pricebreakup={filterItems.pricebreakup}></Card>
                        </Desktopview>
                        <Mobileview className='text-center me-5'>
                          <Card foodName={filterItems.name} item={filterItems} price={filterItems.price} ImgSrc={filterItems.img} CategoryName={filterItems.CategoryName} id={filterItems._id} save={filterItems.Save} dealer={filterItems.Dealer} metal={filterItems.Metal} material={filterItems.Material} pricebreakup={filterItems.pricebreakup}></Card>
                        </Mobileview>
                      </div>

                    )
                  }) : <div> Wait Data is loading... </div>}
              </div>
            )
          })
            : <div> Wait Data is loading... </div>}

      </div>
      <Footer />
    </div>
  )
}

//https://media.istockphoto.com/id/1060352206/photo/donate-food-to-hungry-people-concept-of-poverty-and-hunger.webp?b=1&s=170667a&w=0&k=20&c=IKmOkQWDIge3LugiqDcN6PCoy3QiB8wO1lNMCsf6RyI=