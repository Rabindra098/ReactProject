import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { TextField, Button } from '@mui/material';
export default function AdminLogin() {
    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            "admin_id": "",
            "password": ""
        },
        onSubmit: (admin)=>{
             axios.get('http://localhost:3000/admin')
             .then(response=>{
                   var result = response.data.find(user=> user.admin_id===admin.admin_id);
                   if(result){
                        if(admin.password===result.password){
                            window.sessionStorage.setItem('uname', result.admin_id);
                            navigate("/admin-dashboard");
                        }  else {
                            alert('Invalid Password');
                        }
                   } else{
                      alert('Invalid User Id');
                   }
             })
        }
    })

    return (
        <div className="bg-light p-4 w-25 rounded rounded-2">
            <h3>Admin Login</h3>
            <form className="form" onSubmit={formik.handleSubmit}>
                <dl>
                    <TextField type="text" label="Admin Id" variant="standard" name="admin_id" className="form-control my-2" onChange={formik.handleChange} value={formik.values.admin_id} />
                    <TextField label="Password" variant="standard" name="password" className="form-control my-2" type="password" onChange={formik.handleChange} value={formik.values.password} />
                </dl>
                <Button type="submit" variant="contained" color="primary">Login</Button>
                <Button variant="contained" className="mx-2 bg-danger"> <Link to="/" className="text-decoration-none">Cancel</Link></Button>
            </form>
        </div>
    );
}
