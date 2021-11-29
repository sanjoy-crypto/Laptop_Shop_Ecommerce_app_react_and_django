import Axios from 'axios'
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { domain, header } from '../env'
import { useGlobalState } from '../state/provider'

const Order = () => {
    const [{ cartuncomplete }, dispatch] = useGlobalState()

    const history = useHistory()

    const [email, setEmail] = useState(null)
    const [address, setAddress] = useState(null)
    const [phone, setPhone] = useState(null)

    const ordernow = async () => {
        await Axios({
            method: 'post',
            url: `${domain}/api/oldorderscreate/`,
            headers: header,
            data: {
                "cartid": cartuncomplete?.id,
                "address": address,
                "email": email,
                "phone": phone,
            }
        }).then(response => {
            dispatch({
                type: "PAGE_RELOAD",
                pagereload: response.data
            })
            dispatch({
                type: "ADD_CARTUNCOMPLETE",
                cartuncomplete: null
            })
            history.push('/oldorders')
        })
    }

    return (
        <div className="container">
            <h3 className="text-center py-3">Checkout</h3>
            <div className="row">
                <div className="col-md-6">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>SN</th>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cartuncomplete?.cartproduct?.map((item, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{item.product[0].title}</td>
                                        <td>{item.price}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.subtotal}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="2"><Link to="/cart" className="btn btn-success">Edit Cart</Link></td>
                                <td colSpan="2">Total</td>
                                <td>{cartuncomplete?.total}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div className="col-md-6">
                    <div className="form">
                        <div class="form-group mb-3">
                            <label>Address</label>
                            <input onChange={(e) => setAddress(e.target.value)} type="text" class="form-control" placeholder="Address" />
                        </div>
                        <div class="form-group mb-3">
                            <label>Phone</label>
                            <input onChange={(e) => setPhone(e.target.value)} type="text" class="form-control" placeholder="Phone" />
                        </div>
                        <div class="form-group mb-3">
                            <label>Email</label>
                            <input onChange={(e) => setEmail(e.target.value)} type="text" class="form-control" placeholder="Email" />
                        </div>
                        <button onClick={ordernow} className="btn btn-danger">Order Now</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Order
