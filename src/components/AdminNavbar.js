import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
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

export default function AdminNavbar() {
    let navigate = useNavigate();
    const [isMobileNavOpen, setIsMobileNavOpen] = React.useState(false);
    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate("/login")
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-secondary position-sticky"
                style={{ boxShadow: "0px 10px 20px black", filter: 'blur(20)', position: "fixed", zIndex: "10", width: "100%" }}>
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1 fst-italic" to="/admin">GetYourJewellery</Link>
                    <button className="navbar-toggler" type="button" onClick={() => setIsMobileNavOpen(!isMobileNavOpen)} data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/admin">Admin</Link>  {/* index.css - nav-link color white */}
                            </li>
                        </ul>
                        {(!localStorage.getItem("token")) ?
                            <form className="d-flex">
                                <Link className="btn bg-white text-secondary mx-1 " to="/login">Login</Link>
                                <Link className="btn bg-white text-secondary mx-1" to="/signup">Signup</Link>
                            </form> :
                            <div>
                                <button onClick={handleLogout} className="btn bg-white text-secondary" >Logout</button></div>}
                    </div>
                    <MobileNav style={{ display: isMobileNavOpen ? 'flex' : 'none' }}>
                        
                        {(!localStorage.getItem("token")) ?
                            <>
                                <NavItem><Link to="/login">Login</Link></NavItem>
                                <NavItem><Link to="/signup">Signup</Link></NavItem>
                            </> :
                                <NavItem><Link onClick={handleLogout}>Logout</Link></NavItem>
                            }
                    </MobileNav>
                </div>
            </nav>
        </div>
    )
}
