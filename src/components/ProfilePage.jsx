import Axios from 'axios'
import React, { useState } from 'react'
import { domain, header } from '../env'
import { useGlobalState } from '../state/provider'

const ProfilePage = () => {
    const [{ profile, pagereload }, dispatch] = useGlobalState()

    const [fname, setFname] = useState(profile?.prouser?.first_name)
    const [lname, setLname] = useState(profile?.prouser?.last_name)
    const [email, setEmail] = useState(profile?.prouser?.email)
    const [image, setImage] = useState(null)
    // console.log(image, "%%% Image %%%");

    const updateprofile = async () => {
        await Axios({
            method: "POST",
            url: `${domain}/api/updateprofile/`,
            headers: header,
            data: {
                'first_name': fname,
                'last_name': lname,
                'email': email
            }
        }).then(response => {
            console.log(response.data);
            dispatch({
                type: 'PAGE_RELOAD',
                pagereload: response.data
            })
        })
    }

    const updateProfileImage = async () => {
        const formdata = new FormData()
        formdata.append('image', image)
        await Axios({
            method: 'POST',
            url: `${domain}/api/updateprofileimage/`,
            headers: header,
            data: formdata
        }).then(response => {
            console.log(response.data);
            dispatch({
                type: 'PAGE_RELOAD',
                pagereload: response.data
            })
        })
    }

    return (
        <div className="container mb-5">
            <h3 className="mt-3 text-center">User Profile</h3>
            <hr />
            <div className="row">

                <div className="media mb-3">
                    <img src={`${domain}${profile?.image}`} alt="" />

                    <div className="media-body">
                        <h4 className="text-capitalize">Username : {profile?.prouser?.username}</h4>
                        <h5 className="text-capitalize">Full Name : {profile?.prouser?.first_name} {profile?.prouser?.last_name}</h5>
                        <h6 className="">Email : {profile?.prouser?.email}</h6>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-6">
                        <div className="mb-3">
                            <label className="form-label">First Name</label>
                            <input onChange={(e) => setFname(e.target.value)} value={fname} type="text" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Last Name</label>
                            <input onChange={(e) => setLname(e.target.value)} value={lname} type="text" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" className="form-control" />
                        </div>


                        <button onClick={updateprofile} className="btn btn-dark">Update Profile</button>


                    </div>
                    <div className="col-sm-6">
                        <div className="mb-3">
                            <label className="form-label">Profile Image</label>
                            <input onChange={(e) => setImage(e.target.files[0])} type="file" className="form-control" />
                        </div>

                        <button onClick={updateProfileImage} className="btn btn-dark">Upload</button>
                    </div>

                </div>


            </div>
        </div>
    )
}

export default ProfilePage
