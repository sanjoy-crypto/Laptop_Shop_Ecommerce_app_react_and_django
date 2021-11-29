import Axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react/cjs/react.development'
import { domain } from '../env'
import { useGlobalState } from '../state/provider'

const Navbar = () => {
    const [{ profile, cartuncomplete }, dispatch] = useGlobalState()

    let cart_product_length = 0
    if (cartuncomplete !== null) {
        cart_product_length = cartuncomplete?.cartproduct?.length
    } else {
        cart_product_length = 0
    }

    const [category, setCategory] = useState(null)
    useEffect(() => {
        const getData = async () => {
            const res = await Axios.get(`${domain}/api/category/`)
            setCategory(res.data)
        }
        getData()
    }, [])

    const logout = () => {
        localStorage.clear()
        dispatch({
            type: "ADD_PROFILE",
            profile: null
        })
        window.location.href = '/login'
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <img src="logo.png" alt="Logo" width="200px" />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle text-white" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                All Categories
                            </Link>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                {
                                    category !== null &&
                                    category?.map((item, i) => (
                                        <li key={i}>
                                            <Link to={`/category/${item.id}`} className="dropdown-item">{item.title}</Link>
                                        </li>
                                    ))
                                }


                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="#">Shop</Link>
                        </li>
                    </ul>

                    <form className="mx-5">
                        <div className="input-group w-400">
                            <input type="text" className="form-control" />
                            <span className="input-group-text">Search</span>
                        </div>
                    </form>
                    <ul className="navbar-nav">

                        {
                            profile !== null ?
                                (
                                    <>

                                        <li className="nav-item dropdown">
                                            <Link className="nav-link dropdown-toggle text-white" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                My Account
                                            </Link>
                                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">

                                                <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                                                <li><Link className="dropdown-item" onClick={logout}>Logout</Link></li>
                                            </ul>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link text-white" to="/cart"><span><i className="fa fa-shopping-cart"></i> Cart({cart_product_length})</span></Link>
                                        </li>

                                    </>
                                ) : (
                                    <>

                                        <li className="nav-item">
                                            <Link className="nav-link text-white" to="/register">Register</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link text-white" to="/login">Login</Link>
                                        </li>
                                    </>
                                )
                        }


                    </ul>

                </div>
            </div>
        </nav>
    )
}

export default Navbar
