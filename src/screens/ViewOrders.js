import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function ViewOrders() {
    const [orders, setOrders] = useState([])
    const [search, setSearch] = useState('')

    const [status, setStatus] = React.useState({});
    const handleChange = (event, orderId, itemId) => {
        const newStatus = { ...status };
        newStatus[`${orderId}_${itemId}`] = event.target.value;
        setStatus(newStatus);
        changeStatus(orderId, event.target.value);
    };
    const changeStatus = async (id, state) => {
        const response = await fetch("https://getyourjewellerybackend.onrender.com/api/auth/orderstate", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id, state: state })
        });
        const json = await response.json()
        console.log(json);
        if (json.success) {
            alert(state)

        }
        else {
            alert("Status can not be changed")
        }
    }

    const loadOrders = async () => {
        let response = await fetch("https://getyourjewellerybackend.onrender.com/api/auth/fetchgyjorderData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async (res) => {
            let response = await res.json()
            await setOrders(response);

        })
    }

    useEffect(() => {
        loadOrders()
    }, [])
    return (
        <>
            <div>
                <nav class="navbar navbar-light bg-light">
                    <div class="container">
                        <Link className="navbar-brand fs-1 fst-italic" to="/admin">GetYourJewellery</Link>
                        <form class="d-flex">
                            <input class="form-control me-2 border-secondary" type="search" placeholder="Search Order" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                            <button class="btn btn-outline-secondary" onClick={() => { setSearch('') }}>Search</button>
                        </form>
                    </div>
                </nav>
            </div>
            <div className='mt-3'>
                <div className='m-auto mt-2 table-responsive  table-responsive-sm table-responsive-md' >
                    <table className='table table-hover '>
                        <thead className=' text-secondary fs-4'>
                            <tr className='bg-white'>
                                <th scope='col' >Date</th>
                                <th scope='col' >Customer Email</th>
                                <th scope='col' >Product Id</th>
                                <th scope='col' >Product Name</th>
                                <th scope='col' >Qty</th>
                                <th scope='col' >Amount</th>
                                <th scope='col' >Status</th>

                            </tr>
                        </thead>

                        <tbody>
                            {orders.length >= 1 ? orders.filter(
                                (data) => (data.email.toLowerCase().includes(search.toLowerCase()))).reverse()
                                .map((order) => {

                                    return (
                                        <>
                                            {order.order_data.length >= 1 ? order.order_data
                                                .map(item => {
                                                    return (
                                                        <>
                                                            {Array.from(Array(item.length - 1), (e, i) => {
                                                                return (
                                                                    <tr key={i + 1} value={i + 1}>
                                                                        <td>{Object.values(item[0])}</td>
                                                                        <td>{order.email}</td>
                                                                        <td >{Object.values(item[i + 1].id)}</td>
                                                                        <td>{Object.values(item[i + 1].name)}</td>
                                                                        <td>{Object.values(item[i + 1])[2]}</td>
                                                                        <td>{Object.values(item[i + 1])[3] * Object.values(item[i + 1])[2]}</td>
                                                                        <td>{order.order_state}</td>
                                                                        <td>
                                                                            <FormControl sx={{ minWidth: 5 }}>
                                                                                <InputLabel id="demo-simple-select-helper-label"></InputLabel>
                                                                                <Select
                                                                                    
                                                                                    labelId={`status-label-${order._id}_${i}`}
                                                                                    id={`status-select-${order._id}_${i}`}
                                                                                    value={status[`${order._id}_${i}`] || ''}
                                                                                    label="Status"
                                                                                    onChange={(event) => handleChange(event, order._id, i)}
                                                                                >
                                                                                    <MenuItem value={"Dispatched"}>Dispatched</MenuItem>
                                                                                    <MenuItem value={"ReadyToShip"}>Ready To Ship</MenuItem>
                                                                                    <MenuItem value={"Shipped"}>Shipped</MenuItem>
                                                                                    <MenuItem value={"OutForDelivery"}>Out For Delivery</MenuItem>
                                                                                    <MenuItem value={"Delivered"}>Delivered</MenuItem>
                                                                                    <MenuItem value={"ReturnAccepted"}>Return Accepted</MenuItem>
                                                                                    <MenuItem value={"PickedUp"}>Picked UP</MenuItem>
                                                                                    <MenuItem value={"Replaced"}>Replaced</MenuItem>

                                                                                </Select>
                                                                            </FormControl>

                                                                        </td>

                                                                    </tr>
                                                                )
                                                            })}

                                                        </>
                                                    )
                                                }) : ""}
                                        </>
                                    )
                                })
                                : "No Order Found"}
                        </tbody>
                    </table>


                </div>
            </div >
            <div className='mt-5'>
                <Footer />
            </div>
        </>
    )
}
/*
<th scope='col' >Img</th>
<th scope='col' >Category</th>
<th scope='col' >Dealer</th>
<td>{<img src={item[i + 1].img} height="35" width="35" alt="" />}</td>
<td>{Object.values(item[i + 1])[5]}</td>
<td>{Object.values(item[i + 1].dealer)}</td>
*/