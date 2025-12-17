import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddVideo() {
    let navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    function LoadCategories() {
        axios.get("http://localhost:3000/categories")
            .then(response => {
                setCategories([
                    { category_id: -1, category_name: "Select Category" },
                    ...response.data
                ]);
            })
            .catch(err => console.error(err));
    }

    const formik = useFormik({
        initialValues: {
            video_id: 0,
            title: "",
            url: "",
            description: "",
            category_id: -1,
            likes: 0,
            views: 0,
            dislikes: 0,
            comments: ""
        },
        onSubmit: (video) => {
            video.category_id = parseInt(video.category_id);
            axios.post("http://localhost:3000/videos", video)
                .then(() => {
                    alert("Video Added");
                    navigate("/admin-dashboard");
                })
                .catch(() => alert("Error adding video"));
        }
    });

    useEffect(() => {
        LoadCategories();
    }, []);

    return (
        <div className="add-video-card shadow-lg">
            <h3 className="fw-bold mb-3">
                <i className="bi bi-camera-video me-2"></i>
                Add New Video
            </h3>

            <form onSubmit={formik.handleSubmit} className="row g-3">
                <div className="col-md-6">
                    <label className="form-label">Video ID</label>
                    <input
                        type="number"
                        name="video_id"
                        className="form-control"
                        value={formik.values.video_id}
                        onChange={formik.handleChange}
                        required
                    />
                </div>

                <div className="col-md-6">
                    <label className="form-label">Title</label>
                    <input
                        type="text"
                        name="title"
                        className="form-control"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        required
                    />
                </div>

                <div className="col-md-12">
                    <label className="form-label">YouTube Embed URL</label>
                    <input
                        type="text"
                        name="url"
                        className="form-control"
                        placeholder="https://www.youtube.com/embed/..."
                        value={formik.values.url}
                        onChange={formik.handleChange}
                        required
                    />
                </div>

                <div className="col-md-12">
                    <label className="form-label">Description</label>
                    <textarea
                        name="description"
                        className="form-control"
                        rows="2"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        required
                    ></textarea>
                </div>

                <div className="col-md-6">
                    <label className="form-label">Category</label>
                    <select
                        name="category_id"
                        className="form-select"
                        value={formik.values.category_id}
                        onChange={formik.handleChange}
                        required
                    >
                        {categories.map(cat => (
                            <option key={cat.category_id} value={cat.category_id}>
                                {cat.category_name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="col-md-3">
                    <label className="form-label">Likes</label>
                    <input
                        type="number"
                        name="likes"
                        className="form-control"
                        value={formik.values.likes}
                        onChange={formik.handleChange}
                    />
                </div>

                <div className="col-md-3">
                    <label className="form-label">Views</label>
                    <input
                        type="number"
                        name="views"
                        className="form-control"
                        value={formik.values.views}
                        onChange={formik.handleChange}
                    />
                </div>

                <div className="col-md-12">
                    <label className="form-label">Comments</label>
                    <input
                        type="text"
                        name="comments"
                        className="form-control"
                        value={formik.values.comments}
                        onChange={formik.handleChange}
                    />
                </div>

                <div className="col-12 d-flex justify-content-end mt-3">
                    <button type="submit" className="btn btn-success me-2">
                        Save Video
                    </button>
                    <Link to="/admin-dashboard" className="btn btn-outline-danger">
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
}
