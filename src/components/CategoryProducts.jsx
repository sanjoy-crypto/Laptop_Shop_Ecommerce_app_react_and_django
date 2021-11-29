import Axios from 'axios'
import React, { useState } from 'react'
import { useParams } from 'react-router'
import { useEffect } from 'react/cjs/react.development'
import { domain } from '../env'
import SingleProductWithDomain from './SingleProductWithDomain'

const CategoryProducts = () => {
    const { id } = useParams()
    const [categoryProducts, setcategoryProducts] = useState(null)
    useEffect(() => {
        const getCategoryProduct = async () => {
            const res = await Axios.get(`${domain}/api/category/${id}/`)
            console.log(res.data[0]);
            setcategoryProducts(res.data[0])

        }
        getCategoryProduct()
    }, [id])
    return (
        <div className="container my-4">
            <h3>{categoryProducts?.title} Products</h3>
            <hr />
            <div className="row my-4">
                {
                    categoryProducts !== null &&
                    categoryProducts?.category_products?.map((item, i) => (
                        <div key={i} className="col-md-3">
                            <SingleProductWithDomain item={item} />
                        </div>
                    ))
                }
            </div>


        </div>
    )
}

export default CategoryProducts
