import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
export default function AdminCard(props) {
    
  let navigate = useNavigate()
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState("")
  const priceRef = useRef();
  // const [btnEnable, setBtnEnable] = useState(false);
  // let totval = 0
  // let price = Object.values(options).map((value) => {
  //   return parseInt(value, 10);
  // });
  
  
  const product = { id: props.id, name: props.foodName, price: props.price, img: props.ImgSrc, category:props.CategoryName,
    save:props.save, dealer:props.dealer, metal:props.metal, material:props.material, pricebreakup:props.pricebreakup };

  
  

    const saving = parseInt((props.save / 100) * props.price);
    const finalPrice = qty*parseInt(props.price - (saving));   //This is where Price is changing
  // totval += finalPrice;
  // console.log(totval)
  return (
    <>
    <div className="card mt-3" style={{ width: "17rem", maxHeight: "400px" }}>
        <img src={props.ImgSrc} className="card-img-top" alt="..." style={{ maxHeight: "180px", objectFit: "fill" }} />
        <div className="card-body">
          <h5 className="card-title text-secondary h6">{props.foodName}</h5>
          {/* <p className="card-text">This is some random text. This is description.</p> */}
          <div className='container w-100 p-0' style={{ height: "38px" }}>            
            <div className=' d-inline text-secondary text-center h-100 w-20 fs-5'>
              MRP: ₹{finalPrice}/-
            </div>
            
            <br />
            <small className='text-secondary text-center'>ID: {props.id}</small>
          </div>
          <hr></hr>
          <button className={`btn btn-outline-secondary m-2 `} onClick={() => navigate("/productdetailsadmin",{ state: product })}>View Details</button>
        </div>
      </div>
    </>
  )
}
