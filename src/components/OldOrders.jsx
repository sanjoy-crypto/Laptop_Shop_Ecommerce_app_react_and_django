import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { domain, header } from '../env'


const OldOrders = () => {
    const [oldOrders, setOldOrders] = useState(null)
    const [reload, setReload] = useState(null)
    // console.log(oldOrders, "### Old Orders ###");

    useEffect(() => {
        const getOrders = async () => {
            await Axios({
                method: "get",
                url: `${domain}/api/oldorders/`,
                headers: header
            }).then(response => {

                setOldOrders(response.data)
            })
        }
        getOrders()
    }, [reload])

    const deleteOrderHistory = async (id) => {
        await Axios({
            method: 'delete',
            url: `${domain}/api/oldordersdelete/${id}/`,
            headers: header,

        }).then(response => {
            setReload(response.data)
        })
    }
    return (
        <div>
            <div className="container">
                <h3 className="my-4 text-center">Order History</h3>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>SN</th>
                            <th>qty</th>
                            <th>Total</th>
                            <th>Orderr Status</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            oldOrders?.length !== 0 ?
                                (
                                    <>
                                        {
                                            oldOrders?.map((oldorder, i) => (
                                                <tr key={i}>
                                                    <th>{i + 1}</th>
                                                    <td>{oldorder.cartproduct.length} Pcs</td>
                                                    <td>{oldorder.total} Tk</td>
                                                    <td>{oldorder.order_status}</td>
                                                    <td><Link to={`/orderdetails/${oldorder?.id}/`} className="btn btn-success">Details</Link></td>
                                                    <td><Link onClick={() => deleteOrderHistory(oldorder?.id)} className="btn btn-danger">Delete</Link></td>
                                                </tr>
                                            ))
                                        }
                                    </>
                                ) : (
                                    <h2 className="p-5">You don't have any Old Orders</h2>
                                )
                        }
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default OldOrders
