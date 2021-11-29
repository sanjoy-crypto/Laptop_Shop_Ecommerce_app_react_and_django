import Axios from 'axios'
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { domain, header } from '../env'
import { useGlobalState } from '../state/provider'

const SingleProduct = ({ item }) => {
    const history = useHistory()

    const [{ profile, pagereload }, dispatch] = useGlobalState()

    const addtocart = async (id) => {

        profile !== null ? (

            await Axios({
                method: "post",
                url: `${domain}/api/addtocart/`,
                data: { "id": id },
                headers: header
            }).then(response => {
                // console.log("$$ add to cart $$", response.data);
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
        <div className="card">
            <Link to={`/product/${item.id}`}>
                <img src={item.image} alt="" className="card-img-top" />
            </Link>

            <div className="card-body text-center">
                <Link to={`/product/${item.id}`}>
                    <h5 className="card-title singleTitle">{item.title}</h5>
                </Link>

                {/* <p className="card-text">{(item.description).substring(0, 50)}...<Link>More</Link></p> */}

                <p className="card-text">Tk. {item.price}</p>

                <button onClick={() => addtocart(item.id)} className="btn btn-dark">Add to Cart</button>
            </div>
        </div>
    )
}

export default SingleProduct
