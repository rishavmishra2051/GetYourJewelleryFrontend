import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
export default function FetchOrder() {
    const [orderData, setorderData] = useState({})
    const location = useLocation()
    const { userEmail } = location.state
    const fetchOrder = async () => {
        //console.log(userEmail)
        await fetch("https://getyourjewellerybackend.onrender.com/api/auth/mygyjOrderData", {
            // credentials: 'include',
            // Origin:"http://localhost:3000/login",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: userEmail
            })
        }).then(async (res) => {
            let response = await res.json()
            await setorderData(response)
        })

        // await res.map((data)=>{
        //    console.log(data)
        // })


    }

    useEffect(() => {
        fetchOrder()
    }, [])
    return (
        <>
            
            <div className='container'>
            <div>
                <nav class="navbar navbar-light bg-light">
                    <div class="container">
                    <h2 className='text-secondary'>Orders of {userEmail}</h2>
                    </div>
                </nav>
            </div>
                <div className='row'>

                    {orderData !== {} ? Array(orderData).map(data => {
                        return (
                            data.orderData ?
                                data.orderData.order_data.slice(0).reverse().map((item) => {
                                    return (
                                        item.map((arrayData) => {
                                            return (
                                                <div  >
                                                    {arrayData.Order_date ? <div className='m-auto mt-5'>

                                                        {data = arrayData.Order_date}
                                                        <hr />
                                                    </div> :
                                                        <div className='col-12 col-md-6 col-lg-3' >
                                                            <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                                <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                                                                <div className="card-body">
                                                                    <h5 className="card-title">{arrayData.name}</h5>
                                                                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                        <span className='m-1'>{arrayData.qty}</span>
                                                                        <span className='m-1'>{data}</span>
                                                                        <div className=' d-inline ms-2 h-100 w-20 fs-5' >
                                                                            ₹{arrayData.price}/-
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    }
                                                </div>
                                            )
                                        })
                                    )
                                }) : ""
                        )
                    }) : "You have no order"}
                </div>
            </div>
        </>
    )
}
