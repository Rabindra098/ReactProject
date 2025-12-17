import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";


export default function UserLogin(){


    let navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            user_id : '',
            password: ''
        },
        onSubmit: (user)=> {
             axios.get('http://localhost:3000/users')
             .then(response=>{
                 var result = response.data.find(item=> item.user_id===user.user_id);
                 if(result){
                      if(result.password===user.password){

                         window.sessionStorage.setItem('user', user.user_id);

                         navigate('/user-dashboard');

                      } else {
                         alert('Invalid Password');
                      }
                 } else {
                      alert('User Not Found');
                 }
             })
        }
    })

    return(
        <div className="bg-light p-3 w-25 rounded rounded-1">
            <form onSubmit={formik.handleSubmit}>
                <h2>user Login</h2>
                <dl>
                    <dt>User Id</dt>
                    <dd><input type="text" onChange={formik.handleChange} name="user_id" /></dd>
                    <dt>Password</dt>
                    <dd><input type="password" onChange={formik.handleChange} name="password" /></dd>
                </dl>
                <button type="submit" className="btn btn-warning"> Login </button>
                <Link className="btn btn-danger mx-2" to="/">Cancel</Link>
            </form>
            <div className="mt-3">
                <Link to="/user-register"> New User? </Link>
            </div>
        </div>
    )
}