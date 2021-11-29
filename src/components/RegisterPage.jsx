import Axios from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { domain, header2 } from '../env'

const RegisterPage = () => {
    const [username, setUsername] = useState(null)
    const [firstname, setFirstName] = useState(null)
    const [lastname, setLastName] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)

    const history = useHistory()

    const registeruser = async () => {

        if (password !== confirmPassword) {
            alert("Password Not Match. Try Again...")
        } else {
            await Axios({
                method: 'post',
                url: `${domain}/api/register/`,
                headers: header2,
                data: {
                    "username": username,
                    "first_name": firstname,
                    "last_name": lastname,
                    "email": email,
                    "password": password,
                }

            }).then(response => {
                console.log('register: ', response.data['message']);
                alert(response.data['message'])
                history.push('/login')
            })
        }
    }


    return (
        <div className="container">
            <h3 className="text-center my-3">Register Page</h3>
            <div className="row">
                <div className="col-sm-6 offset-sm-3">
                    <div class="form-group mb-3">
                        <label>Username</label>
                        <input onChange={(e) => setUsername(e.target.value)} type="text" class="form-control" />
                    </div>
                    <div class="form-group mb-3">
                        <label>First Name</label>
                        <input onChange={(e) => setFirstName(e.target.value)} type="text" class="form-control" />
                    </div>
                    <div class="form-group mb-3">
                        <label>Last Name</label>
                        <input onChange={(e) => setLastName(e.target.value)} type="text" class="form-control" />
                    </div>
                    <div class="form-group mb-3">
                        <label>Email</label>
                        <input onChange={(e) => setEmail(e.target.value)} type="email" class="form-control" />
                    </div>
                    <div class="form-group mb-3">
                        <label>Password</label>
                        <input onChange={(e) => setPassword(e.target.value)} type="password" class="form-control" />
                    </div>
                    <div class="form-group mb-3">
                        <label>Confirm Password</label>
                        <input onChange={(e) => setConfirmPassword(e.target.value)} type="password" class="form-control" />
                    </div>
                    <button onClick={registeruser} className="btn btn-info">Register</button>
                </div>
            </div>

        </div>
    )
}

export default RegisterPage
