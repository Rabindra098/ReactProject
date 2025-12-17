
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditVideo(){

    const [video, setVideo] = useState(
        {
        id: 0,
        video_id: 0,
        title: null,
        url: null,
        description: null,
        category_id: 0, 
        likes: 0,
        views:0,
        dislikes: 0,
        comments: null
     }
    )

    const formik = useFormik({
        initialValues: {
            video_id: video.video_id,
            title: video.title,
            url: video.url,
            description: video.description,
            category_id: video.category_id, 
            likes: video.likes,
            views:video.views,
            dislikes: video.dislikes,
            comments: video.comments
        },
        onSubmit: (video)=> {
            axios.put(`http://localhost:3000/videos/${params.id}`,video)
            .then(()=>{
                console.log('Updated');
            })
            alert('Video Updated Successfully');
            navigate('/admin-dashboard');
        },
        enableReinitialize: true
    })

    let navigate = useNavigate();
    let params = useParams();

    const [categories, setCategories] = useState([{category_id:0, category_name:null}])

    function LoadCategories(){
        axios.get(`http://localhost:3000/categories`)
        .then(response=>{
            response.data.unshift({category_id:-1, category_name:'Select Category'});
            setCategories(response.data);
        })
    }

    useEffect(()=>{
        LoadCategories();
        axios.get(`http://localhost:3000/videos/${params.id}`)
        .then(response=>{
             setVideo(response.data);
        })
    },[])

    return(
        <div className="bg-light p-3 w-50 rounded rounded-1">
            <h3>Edit Video</h3>
            <form onSubmit={formik.handleSubmit}>
                <dl className="row">
                    <dt className="col-3">Video Id</dt>
                    <dd className="col-9"><input onChange={formik.handleChange} value={formik.values.video_id} type="number" name="video_id" /></dd>
                    <dt className="col-3">Title</dt>
                    <dd className="col-9"><input onChange={formik.handleChange} value={formik.values.title} type="text" name="title" /></dd>
                    <dt className="col-3">Url</dt>
                    <dd className="col-9"><input onChange={formik.handleChange} value={formik.values.url} type="text" name="url" /></dd>
                    <dt className="col-3">Description</dt>
                    <dd className="col-9"><input onChange={formik.handleChange} value={formik.values.description} type="text" name="description" /></dd>
                    <dt className="col-3">Likes</dt>
                    <dd className="col-9"><input onChange={formik.handleChange} value={formik.values.likes} type="number" name="likes" /></dd>
                    <dt className="col-3">Dislikes</dt>
                    <dd className="col-9"><input onChange={formik.handleChange} value={formik.values.dislikes} type="number" name="dislikes" /></dd>
                    <dt className="col-3">Views</dt>
                    <dd className="col-9"><input onChange={formik.handleChange} value={formik.values.views} type="number" name="views" /></dd>
                    <dt className="col-3">Category</dt>
                    <dd className="col-9">
                        <select name="category_id" value={formik.values.category_id} onChange={formik.handleChange}>
                            {
                                categories.map(category=>
                                    <option value={category.category_id}>
                                        {category.category_name}
                                    </option>
                                )
                            }
                        </select>
                    </dd>
                    <dt className="col-3">Comments</dt>
                    <dd className="col-9"><input value={formik.values.comments} onChange={formik.handleChange} type="text" name="comments" /></dd>
                </dl>
                <button className="btn btn-success mx-2">Save Video</button>
                <Link to="/admin-dashboard" className="btn btn-danger"> Cancel </Link>
            </form>
        </div>
    )
}
