import React, { useState, useRef, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import { Link, useLocation } from "react-router-dom"
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom'
import { useDispatchCart, useCart } from '../components/ContextReducer'
export default function ProductDetails() {
  const dispatch = useDispatchCart();
  const [foodCat, setFoodCat] = useState([])
  const [foodItems, setFoodItems] = useState([])
  const [qty, setQty] = useState(1)
  let data = useCart();
  const location = useLocation();
  const product = location.state;
  let navigate = useNavigate()
  const handleQty = (e) => {
    setQty(e.target.value);
  }
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
  }
  useEffect(() => {
    loadFoodItems()
  }, [])

  const handleAddToCart = async () => {
    if (!localStorage.getItem("token")) {
      navigate("/login")
    }
    let food = []
    for (const item of data) {
      if (item.id === product.id) {
        food = item;

        break;
      }
    }
    console.log(food)
    console.log(new Date())
    //food !== []
    await dispatch({ type: "ADD", id: product.id,img:product.img, name: product.name, price: finalPrice, qty: qty, category: product.category, save: product.save, dealer: product.dealer })
  }

  let content;
  if (Object.keys(product.pricebreakup[0]).length===4) {
    content = <div className='m-2'>
    <p>View Price Breakup</p>
    <p><small className='border border-secondary text-secondary p-1'>Gold: {Object.values(product.pricebreakup[0])[0]}</small> + <small className='border border-secondary text-secondary p-1'>Diamond/Stone: {Object.values(product.pricebreakup[0])[1]}</small> + <small className='border border-secondary text-secondary p-1'>Making Charges: {Object.values(product.pricebreakup[0])[2]}</small> + <small className='border border-secondary text-secondary p-1'>GST (3%): {Object.values(product.pricebreakup[0])[3]}</small></p>
  </div>;
  } else {
    content = <p></p>;
  }
  
  const saving = parseInt((product.save / 100) * product.price);
  const finalPrice = qty * parseInt(product.price - (saving));

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className='container mt-5'>
        <div className="row m-4">
          <div className="col-sm-4 justify-center">
            <figure className="figure border border-opacity-100">
              <img src={product.img} className="figure-img img-fluid rounded" alt="..." style={{ maxHeight: "380px", objectFit: "fill" }} />
            </figure>
          </div>
          <div className="col-sm-8 text-secondary">
            <h2>{product.name}</h2>
            <p className='ms-2'><small>By</small> {product.dealer}<small> | Product Code: {product.id}</small></p>
            <hr />
            <small>Material used: {product.material} & {product.metal}</small>
            <h4 className='mt-4'>M.R.P : <small><s>₹ {product.price * qty}</s></small> <b className='ms-3 fs-2'>₹{finalPrice}</b>
              <select className="ms-4 h-100 w-30 bg-outline-secondary text-secondary rounded" style={{ select: "#FF0000" }} onChange={handleQty}>
                {Array.from(Array(5), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>)
                })}
              </select>
            </h4>
            <div className='m-3'>

              <small>You Save <b className='text-warning'>₹ {saving * qty}</b></small>
              <small className='border border-warning text-warning p-1 ms-2'>{product.save}% OFF</small>
            </div>
            {content}
            <hr />
            <div className='btn-group'>
            <button className={`btn btn-outline-secondary m-1 rounded`} onClick={handleAddToCart}>Add to Cart</button>
            </div>
          </div>

          
        </div>
      </div>
      <div className='mt-2 text-secondary container'>
            <h4>Related Products</h4>
            <hr id="hr-warning" style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(center,rgb(0, 255, 137),rgb(0, 0, 0))" }} />

            <div className='container'> {/* boootstrap is mobile first */}
              <div className='row mb-3'>
                {/*foodItems.length !== []*/}
                {foodItems.length > 1 ? foodItems.filter(
                  (items) => (items.CategoryName === product.category) && (items._id !== product.id))
                  .map(filterItems => {
                    return (
                      <div key={filterItems.id} className='col-12 col-md-6 col-lg-3'>
                        <Card foodName={filterItems.name} item={filterItems} price={filterItems.price} ImgSrc={filterItems.img} CategoryName={filterItems.CategoryName} id={filterItems._id} save={filterItems.Save} dealer={filterItems.Dealer} metal={filterItems.Metal} material={filterItems.Material} pricebreakup={filterItems.pricebreakup}></Card>

                      </div>
                    )
                  }) : <div> Waiting for data... </div>}
              </div>
            </div>
          </div>
      <div>

        <Footer />
      </div>

    </>
  )
}
/*
{product.id}
{product.name}
{product.price}
{product.metal}
{Object.values(product.pricebreakup[0])[0]}
*/