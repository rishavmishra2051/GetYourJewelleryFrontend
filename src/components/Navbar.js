/* eslint-disable react/jsx-no-undef */
import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useCart } from './ContextReducer';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import styled from 'styled-components';

const NavItem = styled.li`
  list-style: none;
  margin: 0 1rem;

  a {
    color: #fff;
    text-decoration: none;
    transition: all 0.3s ease;

    &:hover {
      color: #b9bab5;
    }
  }
`;

const MobileNav = styled.ul`
  display: none;
  flex-direction: column;
  margin: 0;
  padding: 0;

  @media (max-width: 767px) {
    display: flex;
  }
`;

export default function Navbar(props) {

  const [isMobileNavOpen, setIsMobileNavOpen] = React.useState(false);
  const [cartView, setCartView] = useState(false)
  localStorage.setItem('temp', "first")
  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token')

    navigate("/login")
  }

  const loadCart = () => {
    setCartView(true)
  }

  const items = useCart();
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-secondary position-sticky"
        style={{ boxShadow: "0px 10px 20px black", filter: 'blur(20)', position: "fixed", zIndex: "10", width: "100%" }}>
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">GetYourJewellery</Link>
          <button className="navbar-toggler" type="button" onClick={() => setIsMobileNavOpen(!isMobileNavOpen)} data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/">Home</Link>  {/* index.css - nav-link color white */}
              </li>
              <li className="nav-item">
                <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/category">Categories</Link>  {/* index.css - nav-link color white */}
              </li>

              {(localStorage.getItem("token")) ?
                <li className="nav-item">
                  <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/myorder" >My Orders</Link>  {/* index.css - nav-link color white */}
                </li> : ""}
            </ul>
            {(!localStorage.getItem("token")) ?
              <form className="d-flex">
                <Link className="btn bg-white text-secondary mx-1 " to="/login">Login</Link>
                <Link className="btn bg-white text-secondary mx-1" to="/signup">Signup</Link>
              </form> :
              <div>

                <div className="btn bg-white text-secondary mx-2 " onClick={() => navigate("/cart")}>
                  <Badge color="secondary" badgeContent={items.length} >
                    <ShoppingCartIcon />
                  </Badge>
                  Cart
                </div>

                {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : ""}

                <button onClick={handleLogout} className="btn bg-white text-secondary" >Logout</button></div>}
          </div>

          <MobileNav style={{ display: isMobileNavOpen ? 'flex' : 'none' }}>
            <NavItem><Link to="/">Home</Link></NavItem>
            
            <NavItem><Link to="/category">Categories</Link></NavItem>
            {(localStorage.getItem("token")) ?
              <NavItem>
                <Link to="/myorder" >My Orders</Link>  {/* index.css - nav-link color white */}
              </NavItem> : ""}
              {(!localStorage.getItem("token")) ?
              <>
                <NavItem><Link to="/login">Login</Link></NavItem>
                <NavItem><Link to="/signup">Signup</Link></NavItem>
              </> :
              <>

                <NavItem className='text-white' onClick={() => navigate("/cart")}>
                  <Badge badgeContent={items.length} >
                    <ShoppingCartIcon />
                  </Badge>
                  Cart
                </NavItem>

                {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : ""}

                <NavItem><Link onClick={handleLogout}>Logout</Link></NavItem>
                </>}
          </MobileNav>
        </div>
      </nav>
    </div>
  )
}
