import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function UserRegister() {

    const [status, setStatus] = useState('');
    const [errorClass, setErrorClass] = useState('');

    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            user_id: '',
            user_name: '',
            password: '',
            email: ''
        },
        onSubmit: (user) => {
            axios.post(`http://localhost:3000/users`, user)
                .then(() => {
                    console.log('registered');
                });
            alert('User Registered..');
            navigate('/user-login');
        }
    });

    function VerifyUserId(e) {
        axios.get(`http://localhost:3000/users`)
            .then(response => {
                for (var user of response.data) {
                    if (user.user_id === e.target.value) {
                        setStatus('User Id Taken - Try Another');
                        setErrorClass('text-danger');
                        break;
                    } else {
                        setStatus('User Id Available');
                        setErrorClass('text-success');
                    }
                }
            });
    }

    return (
        <div className="login-card shadow-lg">

            {/* Header */}
            <div className="text-center mb-4">
                <i className="bi bi-person-plus-fill fs-1 text-success"></i>
                <h3 className="fw-bold mt-2">User Registration</h3>
                <p className="text-muted">Create your account</p>
            </div>

            <form onSubmit={formik.handleSubmit}>

                <div className="mb-2">
                    <label className="form-label">User ID</label>
                    <input
                        type="text"
                        className="form-control"
                        name="user_id"
                        onKeyUp={VerifyUserId}
                        onChange={formik.handleChange}
                        required
                    />
                    <small className={errorClass}>{status}</small>
                </div>

                <div className="mb-2">
                    <label className="form-label">User Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="user_name"
                        onChange={formik.handleChange}
                        required
                    />
                </div>

                <div className="mb-2">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        onChange={formik.handleChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        onChange={formik.handleChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-success w-100">
                    Register
                </button>
            </form>

            <div className="text-center mt-3">
                <Link to="/user-login" className="text-decoration-none fw-semibold">
                    Existing User? Login here
                </Link>
            </div>

        </div>
    );
}
