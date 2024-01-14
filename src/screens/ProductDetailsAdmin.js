import React, { useState } from 'react'
import { Link, useLocation } from "react-router-dom";
import Footer from '../components/Footer';
export default function ProductDetailsAdmin() {
  const location = useLocation();
  const product = location.state;
  const saving = parseInt((product.save / 100) * product.price);
  const finalPrice = parseInt(product.price - (saving));
  let content;
  if (Object.keys(product.pricebreakup[0]).length === 4) {
    content = <div className='m-2'>
      <p>View Price Breakup</p>
      <p><small className='border border-secondary text-secondary p-1'>Gold: {Object.values(product.pricebreakup[0])[0]}</small> + <small className='border border-secondary text-secondary p-1'>Diamond/Stone: {Object.values(product.pricebreakup[0])[1]}</small> + <small className='border border-secondary text-secondary p-1'>Making Charges: {Object.values(product.pricebreakup[0])[2]}</small> + <small className='border border-secondary text-secondary p-1'>GST (3%): {Object.values(product.pricebreakup[0])[3]}</small></p>
    </div>;
  } else {
    content = <p></p>;
  }

  const [credentials, setCredentials] = useState({ CategoryName: "" })
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  const updatePrice = async (e) => {
    e.preventDefault();
    const response = await fetch("https://getyourjewellerybackend.onrender.com/api/auth/updateitemprice", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ _id:product.id,updatedprice:credentials.updatedprice })

    });
    const json = await response.json()
    if (json.success) {
      alert("Price Updated Successfully")

    }
    else {
      alert("Not Updated")
    }
  }

  return (
    <>
      <div>
        <nav class="navbar navbar-light bg-light">
          <div class="container">
            <Link className="navbar-brand text-secondary fs-1 fst-italic" to="/admin">GetYourJewellery</Link>
            <Link className="navbar-brand fs-5 text-secondary fst-italic" to="/items">Back to Items</Link>
          </div>
        </nav>
      </div>

      <div>
        <div className="row m-4">
          <div className="col-sm-5">
            <figure className="figure border border-opacity-100">
              <img src={product.img} className="figure-img img-fluid rounded" alt="..." />
            </figure>
          </div>
          <div className="col-sm-7 mt-4 text-secondary">

            <h2>{product.name}</h2>
            <p className='ms-2'><small>By</small> {product.dealer}<small> | Product Code: {product.id}</small></p>
            <hr />
            <small>Material used: {product.material} & {product.metal}</small>
            <h4 className='mt-4'>M.R.P : <small><s>₹ {product.price}</s></small> <b className='ms-3 fs-2'>₹{finalPrice}</b></h4>
            <div className='m-3'>

              <small>Discount: <b className='text-warning'>₹ {saving}</b></small>
              <small className='border border-warning text-warning p-1 ms-2'>{product.save}% OFF</small>
            </div>
            {content}
            <hr />
            <div className='row m-4'>
              <div className='col-sm-6 mb-1'>
                <form className='w-100 m-auto border text-white border-secondary rounded' style={{ backgroundColor: "#fff" }} onSubmit={updatePrice}>
                  <div className="m-3">
                    <input type="text" className="form-control" name='updatedprice' value={credentials.updatedprice} onChange={onChange} placeholder="Enter New Price" />
                  </div>
                  <div className='text-center'>
                    <button type="submit" className="m-2 btn btn-secondary text-white">Update Price</button>
                  </div>
                </form>
              </div>
              <div className='col-sm-6 mb-1'>
                
              </div>
            </div>

          </div>
        </div>

      </div>
      <div>
        <Footer />
      </div>

    </>
  )
}
