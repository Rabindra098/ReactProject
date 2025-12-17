import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { TextField, Button } from "@mui/material";

export default function AdminLogin() {
    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            admin_id: "",
            password: ""
        },
        onSubmit: (admin) => {
            axios.get("http://localhost:3000/admin")
                .then(response => {
                    const result = response.data.find(
                        user => user.admin_id === admin.admin_id
                    );

                    if (result) {
                        if (admin.password === result.password) {
                            window.sessionStorage.setItem("uname", result.admin_id);
                            navigate("/admin-dashboard");
                        } else {
                            alert("Invalid Password");
                        }
                    } else {
                        alert("Invalid User Id");
                    }
                });
        }
    });

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="login-card shadow-lg">

                <div className="text-center mb-4">
                    <i className="bi bi-shield-lock-fill fs-1 text-primary"></i>
                    <h3 className="mt-2 fw-bold">Admin Login</h3>
                    <p className="text-muted">Access the admin dashboard</p>
                </div>

                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        label="Admin ID"
                        variant="outlined"
                        name="admin_id"
                        className="mb-3"
                        onChange={formik.handleChange}
                        value={formik.values.admin_id}
                    />

                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        variant="outlined"
                        name="password"
                        className="mb-4"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />

                    <div className="d-flex justify-content-between">
                        <Button type="submit" variant="contained">
                            Login
                        </Button>

                        <Button
                            component={Link}
                            to="/"
                            variant="outlined"
                            color="error"
                        >
                            Cancel
                        </Button>
                    </div>
                </form>

            </div>
        </div>
    );
}
