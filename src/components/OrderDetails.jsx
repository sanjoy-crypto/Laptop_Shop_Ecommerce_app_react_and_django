import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { domain, header } from '../env'

const OrderDetails = () => {
    const { id } = useParams()

    const [orderDetails, setOrderDetails] = useState(null)

    useEffect(() => {
        const getOrderDetails = async () => {
            await Axios({
                method: "get",
                url: `${domain}/api/orderdetails/${id}/`,
                headers: header
            }).then(response => {
                // console.log(response.data[0], "## order details %%");
                setOrderDetails(response.data[0])
            })
        }
        getOrderDetails()
    }, [])
    const product = orderDetails?.cartproduct
    console.log(product, '%%%%%');
    return (
        <div className="container py-4">
            <h3 className="pb-3 text-center">Order Details</h3>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Discount</th>
                        <th>Product</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {
                            orderDetails !== null &&
                            <>
                                <td>{orderDetails?.date}</td>
                                <td>{orderDetails?.total}</td>
                                <td>{orderDetails?.email}</td>
                                <td>{orderDetails?.mobile}</td>
                                <td>{orderDetails?.discount}%</td>
                                <td>{orderDetails?.cartproduct.length}</td>
                            </>
                        }
                    </tr>
                </tbody>
            </table>
            <h3 className="py-3 text-center">Product Details</h3>
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
                        product?.map((item, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td style={{ width: '350px' }}>{item.product[0].title}</td>
                                <td>{item.price}</td>
                                <td>{item.quantity}</td>
                                <td>{item.subtotal}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

        </div>
    )
}

export default OrderDetails
