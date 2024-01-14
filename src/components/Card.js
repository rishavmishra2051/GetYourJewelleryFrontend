import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatchCart, useCart } from './ContextReducer'
// import { Dropdown, DropdownButton } from 'react-bootstrap';

export default function Card(props) {
  let data = useCart();

  let navigate = useNavigate()
  const [qty, setQty] = useState(1)
  const priceRef = useRef();

  let foodItem = props.item;
  const dispatch = useDispatchCart();

  const handleQty = (e) => {
    setQty(e.target.value);
  }

  const handleAddToCart = async () => {
    if (!localStorage.getItem("token")) {
      navigate("/login")
    }
    let food = []
    for (const item of data) {
      if (item.id === foodItem._id) {
        food = item;

        break;
      }
    }
    console.log(food)
    console.log(new Date())
    await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, img: props.ImgSrc, price: finalPrice, qty: qty, category: props.CategoryName, save: props.save, dealer: props.dealer })
  }

  const saving = parseInt((props.save / 100) * props.price);
  const finalPrice = qty * parseInt(props.price - (saving));  //This is where Price is changing
  const product = {
    id: props.id, name: props.foodName, price: props.price, img: props.ImgSrc, category: props.CategoryName,
    save: props.save, dealer: props.dealer, metal: props.metal, material: props.material, pricebreakup: props.pricebreakup
  };

  return (
    <div>

      <div className="card mt-3" style={{ width: "17rem", maxHeight: "400px" }}>
        <img src={props.ImgSrc} className="card-img-top" alt="..." style={{ maxHeight: "180px", objectFit: "fill" }} />
        <div className="card-body">
          <h5 className="card-title text-secondary h6">{props.foodName}</h5>
          <h5 className=' d-inline text-secondary h-100 w-20 fs-6 ms-2 me-1'><b>₹{finalPrice}/-</b></h5>
          <s className='text-secondary me-1'>₹{props.price * qty}/-</s>
          <select className="m-2 h-100 w-30 bg-outline-secondary text-secondary rounded" style={{ select: "#FF0000" }} onChange={handleQty}>
            {Array.from(Array(5), (e, i) => {
              return (
                <option key={i + 1} value={i + 1}>{i + 1}</option>)
            })}
          </select>
          <br />
          <small className='text-secondary me-1'>You Save: {saving * qty}</small><small className='text-warning me-1'>[{props.save}% OFF]</small>
          <hr></hr>

          <div className='btn-group'>
          <button className={`btn btn-outline-secondary m-1 rounded`} onClick={handleAddToCart}>Add to Cart</button>
            <button className={`btn btn-outline-secondary m-1 rounded`} onClick={() => navigate("/productdetails", { state: product })}>View Details</button>

          </div>

          {/* <button className={`btn btn-danger justify-center ms-2 ${btnEnable ? "" : "disabled"}`} onClick={handleRemoveCart}>Remove</button> */}
        </div>
      </div>
    </div>
  )
}
//