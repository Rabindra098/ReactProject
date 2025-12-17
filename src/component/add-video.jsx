import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddVideo() {
    let navigate = useNavigate();

    const [categories, setCategories] = useState([]);

    function LoadCategories() {
        axios.get(`http://localhost:3000/categories`)
            .then(response => {
                setCategories([
                    { category_id: -1, category_name: 'Select Category' },
                    ...response.data
                ]);
            })
            .catch(err => {
                console.error("Error loading categories:", err);
            });
    }

    const formik = useFormik({
        initialValues: {
            video_id: 0,
            title: '',
            url: '',
            description: '',
            category_id: -1,   // default matches "Select Category"
            likes: 0,
            views: 0,
            dislikes: 0,
            comments: ''
        },
        onSubmit: (video) => {
            video.category_id = parseInt(video.category_id);

            axios.post(`http://localhost:3000/videos`, video)
                .then(() => {
                    alert('Video Added');
                    navigate('/admin-dashboard');
                })
                .catch(err => {
                    console.error("Error adding video:", err);
                    alert("Error adding video. Please try again.");
                });
        }
    });

    useEffect(() => {
        LoadCategories();
    }, []);

    return (
        <div className="bg-light p-4 w-50 rounded rounded-2 d-flex overflow-auto flex-column">
            <h2>Add Video</h2>
            <form onSubmit={formik.handleSubmit}>
                <dl className="row">
                    <dt className="col-2">Video Id</dt>
                    <dd className="col-10">
                        <input
                            type="number"
                            name="video_id"
                            value={formik.values.video_id}
                            onChange={formik.handleChange}
                            required
                        />
                    </dd>

                    <dt className="col-2">Title</dt>
                    <dd className="col-10">
                        <input
                            className="text-nowrap"
                            type="text"
                            name="title"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            required
                        />
                    </dd>

                    <dt className="col-2">Description</dt>
                    <dd className="col-10">
                        <input
                            type="text"
                            name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            required
                        />
                    </dd>

                    <dt className="col-2">Comments</dt>
                    <dd className="col-10">
                        <input
                            type="text"
                            name="comments"
                            value={formik.values.comments}
                            onChange={formik.handleChange}
                            required
                        />
                    </dd>

                    <dt className="col-2">Url</dt>
                    <dd className="col-10">
                        <input
                            type="text"
                            name="url"
                            value={formik.values.url}
                            onChange={formik.handleChange}
                            required
                        />
                    </dd>

                    <dt className="col-2">Likes</dt>
                    <dd className="col-10">
                        <input
                            type="number"
                            name="likes"
                            value={formik.values.likes}
                            onChange={formik.handleChange}
                            required
                        />
                    </dd>

                    <dt className="col-2">Views</dt>
                    <dd className="col-10">
                        <input
                            type="number"
                            name="views"
                            value={formik.values.views}
                            onChange={formik.handleChange}
                            required
                        />
                    </dd>

                    <dt className="col-2">Category</dt>
                    <dd className="col-10">
                        <select
                            name="category_id"
                            value={formik.values.category_id}
                            onChange={formik.handleChange}
                            required
                        >
                            {categories.map(category =>
                                <option key={category.category_id} value={category.category_id}>
                                    {category.category_name}
                                </option>
                            )}
                        </select>
                    </dd>
                </dl>

                <button className="btn mx-2 btn-primary" type="submit">Add Video</button>
                <Link to="/admin-dashboard" className="btn btn-warning">Cancel</Link>
            </form>
        </div>
    );
}
