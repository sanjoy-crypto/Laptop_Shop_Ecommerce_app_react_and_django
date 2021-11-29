import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { domain } from '../env'
import SingleProduct from './SingleProduct'

const Home = () => {
    const [products, setProducts] = useState(null)
    useEffect(() => {
        const getData = async () => {
            Axios({
                method: 'get',
                url: `${domain}/api/products/`
            }).then(response => {
                setProducts(response.data)
            })
        }
        getData()
    }, [])


    const nextProducts = async () => {
        await Axios({
            method: 'get',
            url: products?.next
        }).then(response => {
            // console.log('Next Products', response.data);
            setProducts(response.data)
        })
    }

    const previousProducts = async () => {
        await Axios({
            method: 'get',
            url: products?.previous
        }).then(response => {
            setProducts(response.data)
        })
    }


    return (
        <div className="container my-5">
            <div className="row">

                {
                    products !== null &&
                    products?.results.map((item, i) => (
                        <div className="col-md-3 col-sm-6 mb-4" key={i}>
                            <SingleProduct item={item} />
                        </div>
                    ))
                }

            </div>
            <div className="pagination">
                {
                    products?.previous !== null ? (
                        <button onClick={previousProducts} className="btn btn-outline-dark">1</button>
                    ) : (
                        <button className="btn btn-outline-dark disabled">1</button>
                    )
                }
                {
                    products?.next !== null ? (
                        <button onClick={nextProducts} className="btn btn-outline-dark mx-2">2</button>
                    ) : (
                        <button className="btn btn-outline-dark disabled mx-2">2</button>
                    )
                }



            </div>

        </div>
    )
}

export default Home
