import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function UserRegister(){

    const [status, setStatus] = useState('');
    const [errorClass, setErrorClass] = useState('');

    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            user_id: '',
            user_name:'',
            password:'',
            email:''
        },
        onSubmit: (user)=> {
            axios.post(`http://localhost:3000/users`,user)
            .then(()=>{
                console.log('registered');
            })
            alert('User Registered..');
            navigate('/user-login');
        }
    })

    function VerifyUserId(e){
        axios.get(`http://localhost:3000/users`)
        .then(response=>{
             for(var user of response.data){
                  if(user.user_id===e.target.value){
                       setStatus('User Id Taken - Try Another');
                       setErrorClass('text-danger');
                       break;
                  } else {
                       setStatus('User Id Available');
                       setErrorClass('text-success');
                  }
             }
        })
    }

    return(
        <div className="bg-light p-3 w-25 rounded rounded-1">
            <h2>Register User</h2>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>User Id</dt>
                    <dd><input type="text" onKeyUp={VerifyUserId} onChange={formik.handleChange} name="user_id" /></dd>
                    <dd className={errorClass}>{status}</dd>
                    <dt>User Name</dt>
                    <dd><input type="text"  onChange={formik.handleChange}  name="user_name" /></dd>
                    <dt>Password</dt>
                    <dd><input type="password"  onChange={formik.handleChange}  name="password" /></dd>
                    <dt>Email</dt>
                    <dd>
                        <input type="text"  onChange={formik.handleChange}  name="email" />
                    </dd>
                </dl>
                <button type="submit" className="btn btn-warning"> Register </button>
            </form>
            <div className="mt-3">
                <Link to="/user-login"> Existing User? </Link>
            </div>
        </div>
    )
}