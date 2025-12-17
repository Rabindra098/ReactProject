import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditVideo() {

    const navigate = useNavigate();
    const params = useParams();

    const [video, setVideo] = useState({
        id: 0,
        video_id: 0,
        title: "",
        url: "",
        description: "",
        category_id: 0,
        likes: 0,
        views: 0,
        dislikes: 0,
        comments: ""
    });

    const [categories, setCategories] = useState([]);

    const formik = useFormik({
        initialValues: {
            video_id: video.video_id,
            title: video.title,
            url: video.url,
            description: video.description,
            category_id: video.category_id,
            likes: video.likes,
            views: video.views,
            dislikes: video.dislikes,
            comments: video.comments
        },
        enableReinitialize: true,
        onSubmit: (updatedVideo) => {
            axios.put(`http://localhost:3000/videos/${params.id}`, updatedVideo)
                .then(() => {
                    alert("Video Updated Successfully");
                    navigate("/admin-dashboard");
                });
        }
    });

    function LoadCategories() {
        axios.get("http://localhost:3000/categories")
            .then(response => {
                response.data.unshift({
                    category_id: -1,
                    category_name: "Select Category"
                });
                setCategories(response.data);
            });
    }

    useEffect(() => {
        LoadCategories();
        axios.get(`http://localhost:3000/videos/${params.id}`)
            .then(response => setVideo(response.data));
    }, [params.id]);

    return (
        <div className="add-video-card">

            <h3 className="fw-bold mb-4">
                <i className="bi bi-pencil-square me-2"></i>
                Edit Video
            </h3>

            <form onSubmit={formik.handleSubmit} className="row g-3">

                <div className="col-md-6">
                    <label className="form-label">Video ID</label>
                    <input
                        type="number"
                        className="form-control"
                        name="video_id"
                        value={formik.values.video_id}
                        onChange={formik.handleChange}
                        disabled
                    />
                </div>

                <div className="col-md-6">
                    <label className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        name="title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        required
                    />
                </div>

                <div className="col-md-12">
                    <label className="form-label">YouTube Embed URL</label>
                    <input
                        type="text"
                        className="form-control"
                        name="url"
                        value={formik.values.url}
                        onChange={formik.handleChange}
                        required
                    />
                </div>

                <div className="col-md-12">
                    <label className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        rows="2"
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        required
                    ></textarea>
                </div>

                <div className="col-md-6">
                    <label className="form-label">Category</label>
                    <select
                        className="form-select"
                        name="category_id"
                        value={formik.values.category_id}
                        onChange={formik.handleChange}
                    >
                        {categories.map(category => (
                            <option
                                key={category.category_id}
                                value={category.category_id}
                            >
                                {category.category_name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="col-md-3">
                    <label className="form-label">Likes</label>
                    <input
                        type="number"
                        className="form-control"
                        name="likes"
                        value={formik.values.likes}
                        onChange={formik.handleChange}
                    />
                </div>

                <div className="col-md-3">
                    <label className="form-label">Views</label>
                    <input
                        type="number"
                        className="form-control"
                        name="views"
                        value={formik.values.views}
                        onChange={formik.handleChange}
                    />
                </div>

                <div className="col-md-12">
                    <label className="form-label">Comments</label>
                    <input
                        type="text"
                        className="form-control"
                        name="comments"
                        value={formik.values.comments}
                        onChange={formik.handleChange}
                    />
                </div>

                <div className="col-12 d-flex justify-content-end mt-3">
                    <button type="submit" className="btn btn-success me-2">
                        Save Changes
                    </button>
                    <Link to="/admin-dashboard" className="btn btn-warning">
                        Cancel
                    </Link>
                </div>

            </form>
        </div>
    );
}
