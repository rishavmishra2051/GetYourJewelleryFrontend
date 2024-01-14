import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
export default function ViewUsers() {
    const [users, setUsers] = useState([])
    const [search, setSearch] = useState('')
    const navigate = useNavigate()
    const loadUsers = async () => {
        let response = await fetch("https://getyourjewellerybackend.onrender.com/api/auth/userData", {
            // credentials: 'include',
            // Origin:"http://localhost:3000/login",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }

        });
        response = await response.json();
        setUsers(response);
    }
    useEffect(() => {
        loadUsers()
    }, [])
    return (
        <>
            <div>
                <nav class="navbar navbar-light bg-light">
                    <div class="container">
                        <Link className="navbar-brand fs-1 fst-italic" to="/admin">GetYourJewellery</Link>
                        <form class="d-flex">
                            <input class="form-control me-2 border-secondary" type="search" placeholder="Search User" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                            <button class="btn btn-outline-secondary" onClick={() => { setSearch('') }}>Search</button>
                        </form>
                    </div>
                </nav>
            </div>

            <div className='container-fluid m-auto mt-2 table-responsive  table-responsive-sm table-responsive-md' >
                <table className='table table-hover '>
                    <thead className=' text-secondary fs-4'>
                        <tr className='bg-white'>
                            <th scope='col' >ID</th>
                            <th scope='col' >Name</th>
                            <th scope='col' >Email</th>
                            <th scope='col' >Date</th>
                            <th scope='col' >Location</th>
                            <th scope='col' >Password</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 1 ? users.filter(
                            (data) => (data.email.toLowerCase().includes(search.toLowerCase())))
                            .map((user) => {

                                return (
                                    <tr>
                                        <Link className='text-secondary' to="/fetchorders" state={{ userEmail: user.email }}><th scope='row' >{user._id}</th></Link>
                                        <td >{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.date}</td>
                                        <td >{user.location}</td>
                                        <td>{user.password}</td>
                                    </tr>
                                )
                            })
                            : "No User Found"}
                    </tbody>
                </table>
            </div>
            <div className='mt-5'>
                <Footer />
            </div>
        </>
    )
}
//table-hover