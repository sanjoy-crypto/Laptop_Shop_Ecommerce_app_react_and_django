
import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { domain, header } from '../env'
import { useGlobalState } from '../state/provider'
import SingleProductWithDomain from './SingleProductWithDomain'

const ProductDetails = () => {
    const { id } = useParams()
    const history = useHistory()
    const [{ profile, pagereload }, dispatch] = useGlobalState()

    const [product, setProduct] = useState(null)
    const [categoryProducts, setCategoryProducts] = useState(null)

    useEffect(() => {
        const getData = async () => {
            const res = await fetch(`${domain}/api/products/${id}/`)
            const data = await res.json()
            setProduct(data)
            getCategory(data?.category['id'])
            console.log('prod details: ', data);
        }
        getData()
    }, [id])


    const getCategory = async (id) => {
        const res = await fetch(`${domain}/api/category/${id}/`)
        const data = await res.json()
        setCategoryProducts(data)
        console.log('category Product : ', data);
    }


    const addtocart = async (id) => {

        profile !== null ? (

            await Axios({
                method: "post",
                url: `${domain}/api/addtocart/`,
                data: { "id": id },
                headers: header
            }).then(response => {
                console.log("$$ add to cart $$", response.data);
                dispatch({
                    type: "PAGE_RELOAD",
                    pagereload: response.data
                })
            })
        ) :
            (
                history.push('/login')
            )
    }


    return (
        <div className="container">
            {
                product !== null &&
                (
                    <div className="row single-product justify-content-center">
                        <div className="col-md-4 my-3">
                            <img src={product?.image} alt="" />
                        </div>
                        <div className="col-md-6 mb-5 ">
                            <p className="mb-2">Home / {product?.category.title}</p>
                            <h3 className="mb-2">{product?.title}</h3>
                            <h5 className="mb-2"><del className="text-danger">Tk. {product?.old_price}</del> Tk. {product?.price}</h5>
                            <select>
                                <option>SELECT SIZE</option>
                                <option>Duel Core</option>
                                <option>8GB Core I5</option>
                                <option>16GB Core I7</option>
                                <option>16 GB Core I9</option>
                                <option>AMD</option>
                            </select>
                            <input type="number" value="1" min="1" />
                            <Link onClick={() => addtocart(product?.id)} class="btn2 mybtn">Add To Cart</Link>
                            <h3 className="proDetails">Product Details <i class="fa fa-indent"></i></h3>
                            <br />
                            <p>{product?.description}</p>
                        </div>
                    </div>
                )
            }
            <div className="row mt-2 mb-5">
                <h3>Related Products</h3>
                <hr />
                {
                    categoryProducts !== null &&
                    categoryProducts[0]?.category_products?.map((item, i) => (
                        <div className="col-md-3 mt-2 mb-4" key={i}>
                            <SingleProductWithDomain item={item} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ProductDetails
