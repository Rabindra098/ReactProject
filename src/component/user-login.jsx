import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";

export default function UserLogin() {

    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            user_id: '',
            password: ''
        },
        onSubmit: (user) => {
            axios.get('http://localhost:3000/users')
                .then(response => {
                    var result = response.data.find(
                        item => item.user_id === user.user_id
                    );

                    if (result) {
                        if (result.password === user.password) {
                            window.sessionStorage.setItem('user', user.user_id);
                            navigate('/user-dashboard');
                        } else {
                            alert('Invalid Password');
                        }
                    } else {
                        alert('User Not Found');
                    }
                });
        }
    });

    return (
        <div className="login-card shadow-lg">

            {/* Header */}
            <div className="text-center mb-4">
                <i className="bi bi-person-circle fs-1 text-warning"></i>
                <h3 className="fw-bold mt-2">User Login</h3>
                <p className="text-muted">Access your video dashboard</p>
            </div>

            {/* Form */}
            <form onSubmit={formik.handleSubmit}>

                <div className="mb-3">
                    <label className="form-label">User ID</label>
                    <input
                        type="text"
                        className="form-control"
                        name="user_id"
                        placeholder="Enter user id"
                        onChange={formik.handleChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder="Enter password"
                        onChange={formik.handleChange}
                        required
                    />
                </div>

                {/* Buttons */}
                <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-warning px-4">
                        Login
                    </button>

                    <Link to="/" className="btn btn-outline-danger px-4">
                        Cancel
                    </Link>
                </div>
            </form>

            {/* Register Link */}
            <div className="text-center mt-4">
                <span className="text-muted">New user?</span>
                <br />
                <Link to="/user-register" className="fw-semibold text-decoration-none">
                    Create an account
                </Link>
            </div>

        </div>
    );
}
