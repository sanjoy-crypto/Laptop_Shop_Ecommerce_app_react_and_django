import Axios from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { domain, header2 } from '../env'

const LoginPage = () => {
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)

    const history = useHistory()

    const loginRequest = async () => {
        await Axios({
            method: "post",
            url: `${domain}/api/login/`,
            headers: header2,
            data: {
                'username': username,
                'password': password
            }
        }).then(response => {
            localStorage.setItem('token', response.data['token'])
            // console.log(response.data['token'])
            window.location.href = "/"

        })
            .catch(_ => {
                alert("Username or Password invaild")
            })

    }

    return (
        <div className="container my-3">
            <h2 className="text-center">Login Page</h2>
            <hr />
            <div className="row">
                <div className="col-sm-6 offset-sm-3">
                    <div className="px-5 py-4 bg-light my-2">
                        <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input onChange={(e) => setUsername(e.target.value)} type="text" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" />
                        </div>
                        <button onClick={loginRequest} className="btn btn-dark">Submit</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default LoginPage
