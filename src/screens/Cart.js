import React from 'react'
import Delete from '@material-ui/icons/Delete'
import { useCart, useDispatchCart } from '../components/ContextReducer';
import Navbar from '../components/Navbar';
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Footer from '../components/Footer';
import styled from 'styled-components';

const Desktopview = styled.ul`
  display: flex;
  
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
export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (<>
    <div><Navbar/></div>
      <div className='bg-white'>
        <div className='m-5 text-center fs-3'>The Cart is Empty!</div>
      </div>
      <div><Footer/></div>
      </>
    )
  }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    
    // console.log(data,localStorage.getItem("userEmail"),new Date())
    let response = await fetch("https://getyourjewellerybackend.onrender.com/api/auth/gyjorderData", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString()
      })
    });
    console.log("JSON RESPONSE:::::", response.status)
    if (response.status === 200) {
      dispatch({ type: "DROP" })
    }
  }

  const orderReceive = async (e) => {
    let userEmail = localStorage.getItem("userEmail");
    
    // console.log(data,localStorage.getItem("userEmail"),new Date())
    let response = await fetch("https://getyourjewellerybackend.onrender.com/api/auth/orderadmin", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString()
      })
    });
    console.log("JSON RESPONSE:::::", response.status)
    if (response.status === 200) {
      dispatch({ type: "DROP" })
    }
  }
  const orderPlaced = () => {
    orderReceive();
    handleCheckOut();
  }
  let totalPrice = data.reduce((total, food) => total + food.price, 0)
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className='bg-white w-100'>
        <div className="bg-white text-secondary h1 text-center mt-3" >
          <ShoppingCartIcon />
          Cart
        </div>
        <Desktopview>
        <div className='container m-auto mt-2 table-responsive  table-responsive-sm table-responsive-md' >
          <table className='table table-hover '>
            <thead className=' text-secondary fs-4'>
              <tr className='bg-white'>
                <th scope='col' >#</th>
                <th scope='col' >Image</th>
                <th scope='col' >Name</th>
                <th scope='col' >Quantity</th>
                <th scope='col' >Amount</th>
                <th scope='col' >Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((jewel, index) => (
                <tr>
                  <th scope='row' >{index + 1}</th>
                  <td>{<img src={jewel.img} height="35" width="35" alt="" />}</td>
                  <td >{jewel.name}</td>
                  <td>{jewel.qty}</td>
                  <td>{jewel.price}</td>
                  <td ><button type="button" className="btn p-0"><Delete onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button> </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
          <div>
            <button className='btn btn-outline-secondary mt-4 mb-5' onClick={orderPlaced}> Check Out </button>           
          </div>
        </div>
        </Desktopview>
        <Mobileview>
        <table className='table table-hover '>
        <tbody>
              {data.map((jewel, index) => (
                <tr>
                  <td className=''>{<img src={jewel.img} height="50" width="50" alt="" />}
                  </td>
                  <td className='ms-5'><b>{jewel.name}</b><br/>
                  <b>₹ {jewel.price}</b>
                  <b className='ms-3'>Qty: {jewel.qty}</b>
                  
                  <button type="button" className="btn ms-3"><Delete onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button>
                  </td>
                  
                </tr>
                
              ))}
            </tbody>
          </table>
        </Mobileview>
      </div>
      <Footer/>
    </>
  )
}
