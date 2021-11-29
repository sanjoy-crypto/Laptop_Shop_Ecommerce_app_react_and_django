import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/Navbar'
import './App.css'
import ProductDetails from './components/ProductDetails'
import Slider from './components/Slider'
import CategoryProducts from './components/CategoryProducts'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import ProfilePage from './components/ProfilePage'
import { useEffect } from 'react/cjs/react.development'
import Axios from 'axios'
import { domain, userToken, header } from './env'
import { useGlobalState } from './state/provider'
import Cart from './components/Cart'
import OldOrders from './components/OldOrders'
import Order from './components/Order'
import OrderDetails from './components/OrderDetails'

const App = () => {

  const [{ profile, pagereload, cartuncomplete, cartcomplete }, dispatch] = useGlobalState()
  // console.log("$$$$$ USER PROFILE $$$$$", profile);
  // console.log("### Cart Uncomplete ###", cartuncomplete);
  // console.log("### Cart Complete ###", cartcomplete);

  useEffect(() => {
    if (userToken !== null) {
      const getdata = async () => {
        await Axios({
          method: "get",
          url: `${domain}/api/profile/`,
          headers: header
        }).then(response => {
          // console.log(response.data, '$$$$$$$');
          dispatch({
            type: "ADD_PROFILE",
            profile: response.data['data']
          })
        })
      }
      getdata()
    }
  }, [pagereload])

  useEffect(() => {
    const getCart = async () => {
      await Axios({
        method: "get",
        url: `${domain}/api/cart/`,
        headers: header
      }).then(response => {
        // console.log('cartdata', response.data);
        {
          const all_data = []
          response?.data.map((data) => {
            if (data.complete) {
              all_data.push(data)
              dispatch({
                type: "ADD_CARTCOMPLETE",
                cartcomplete: all_data
              })
            } else {
              dispatch({
                type: "ADD_CARTUNCOMPLETE",
                cartuncomplete: data
              })
            }
          })
        }
      })
    }
    getCart()
  }, [pagereload])

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact >
          <Slider />
          <Home />
        </Route>

        <Route path="/product/:id" component={ProductDetails} exact />
        <Route path="/category/:id" component={CategoryProducts} exact />

        {
          profile !== null ?
            (
              <>
                <Route path="/profile" component={ProfilePage} exact />
                <Route path="/cart" component={Cart} exact />
                <Route path="/oldorders" component={OldOrders} exact />
                <Route path="/order" component={Order} exact />
                <Route path="/orderdetails/:id" component={OrderDetails} exact />
              </>
            ) : (
              <>
                <Route path="/login" component={LoginPage} exact />
                <Route path="/register" component={RegisterPage} exact />
              </>
            )
        }
        <Route exact component={Home} />
      </Switch>
    </Router>
  )
}

export default App
