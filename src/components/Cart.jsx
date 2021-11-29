import Axios from 'axios'
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { domain, header } from '../env'
import { useGlobalState } from '../state/provider'

const Cart = () => {
    const [{ profile, cartuncomplete }, dispatch] = useGlobalState()
    const history = useHistory()


    let cart_product_length = 0
    if (cartuncomplete !== null) {
        cart_product_length = cartuncomplete?.cartproduct?.length
    } else {
        cart_product_length = 0
    }

    // Add Cart Item 

    const updatecart = async (id) => {

        await Axios({
            method: "post",
            url: `${domain}/api/updatecart/`,
            data: { "id": id },
            headers: header
        }).then(response => {
            // console.log("$$ add to cart $$", response.data);
            dispatch({
                type: "PAGE_RELOAD",
                pagereload: response.data
            })
        })

    }

    // Minus Cart  Item

    const editcart = async (id) => {

        await Axios({
            method: "post",
            url: `${domain}/api/editcart/`,
            data: { "id": id },
            headers: header
        }).then(response => {
            // console.log("$$ Edit cart $$", response.data);
            dispatch({
                type: "PAGE_RELOAD",
                pagereload: response.data
            })
        })

    }

    // Delete Cart  Item

    const deletecart = async (id) => {

        await Axios({
            method: "post",
            url: `${domain}/api/deletecart/`,
            data: { "id": id },
            headers: header
        }).then(response => {
            // console.log("$$ delete cart $$", response.data);
            dispatch({
                type: "PAGE_RELOAD",
                pagereload: response.data
            })
        })

    }

    const deleteFullCart = async (id) => {
        await Axios({
            method: 'post',
            url: `${domain}/api/deletefullcart/`,
            data: { "id": id },
            headers: header
        }).then(response => {
            dispatch({
                type: "PAGE_RELOAD",
                pagereload: response.data
            })
            dispatch({
                type: "ADD_CARTUNCOMPLETE",
                cartuncomplete: null
            })
        })
    }

    return (
        <div>
            <div className="container p-4">
                <h3 className="text-center mb-4">Cart Products</h3>

                {
                    cart_product_length !== 0 ? (
                        <>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>SN</th>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Subtotal</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cartuncomplete?.cartproduct.map((data, i) => (
                                            <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td style={{ width: '350px' }}>{data.product[0].title}</td>
                                                <td>{data.price}</td>
                                                <td>{data.quantity}</td>
                                                <td>{data.subtotal}</td>
                                                <td>
                                                    <Link onClick={() => updatecart(data.id)} className="btn btn-success my-1" ><i class="fas fa-plus icons"></i></Link>
                                                    <Link onClick={() => editcart(data.id)} className="btn btn-warning mx-2 my-1" ><i class="fas fa-minus icons"></i></Link>
                                                    <Link onClick={() => deletecart(data.id)} className="btn btn-danger my-1"><i class="far fa-trash-alt icons"></i></Link>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th colSpan="4" className="text-right">Total</th>
                                        <th>{cartuncomplete?.total}</th>
                                        <th><Link to="/order" className="btn btn-info">Order Now</Link></th>
                                    </tr>
                                </tfoot>
                            </table>
                        </>
                    ) : (
                        <>
                            <div>
                                <h1>There is no product in Cart...</h1>
                            </div>
                        </>
                    )

                }
                <div className="row">
                    <div className="col">
                        <Link class="btn btn-dark" to="/oldorders">Old Orders</Link>
                        {
                            cart_product_length !== 0 &&
                            <Link onClick={() => deleteFullCart(cartuncomplete?.id)} className="btn btn-danger mx-2" >Delete Cart</Link>
                        }
                    </div>
                </div>
            </div>

        </div >
    )
}

export default Cart
