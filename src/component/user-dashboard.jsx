import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function UserDashboard() {

    const [videos, setVideos] = useState([{
        id: 0,
        video_id: 0,
        title: null,
        url: null,
        description: null,
        category_id: 0,
        likes: 0,
        views: 0,
        dislikes: 0,
        comments: null
    }]);

    const [categories, setCategories] = useState([
        { category_id: 0, category_name: null }
    ]);

    const navigate = useNavigate();

    function LoadCategories() {
        axios.get(`http://localhost:3000/categories`)
            .then(response => {
                response.data.unshift({
                    category_id: -1,
                    category_name: 'All Categories'
                });
                setCategories(response.data);
            });
    }

    useEffect(() => {
        LoadCategories();
        axios.get(`http://localhost:3000/videos`)
            .then(response => setVideos(response.data));
    }, []);

    function handlSignoutClick() {
        window.sessionStorage.removeItem('user');
        navigate('/');
    }

    function handleCategoryChange(e) {
        axios.get('http://localhost:3000/videos')
            .then(response => {
                if (parseInt(e.target.value) === -1) {
                    setVideos(response.data);
                } else {
                    const filteredVideos = response.data.filter(
                        video => video.category_id === parseInt(e.target.value)
                    );
                    setVideos(filteredVideos);
                }
            });
    }

    return (
        <div className="admin-dashboard">

            {/* 🔹 Top Bar */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h4 className="fw-bold mb-0">
                        Welcome, {window.sessionStorage.getItem('user')}
                    </h4>
                    <small className="text-muted">
                        Enjoy curated video content
                    </small>
                </div>

                <button
                    className="btn btn-outline-danger"
                    onClick={handlSignoutClick}
                >
                    <i className="bi bi-box-arrow-right me-1"></i>
                    Signout
                </button>
            </div>

            {/* 🔹 Filter Bar */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-semibold mb-0">
                    <i className="bi bi-collection-play me-2"></i>
                    Videos
                </h5>

                <select
                    className="form-select w-auto"
                    onChange={handleCategoryChange}
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

            {/* 🔹 Video Grid */}
            <div className="row g-4">

                {videos.map(video => (
                    <div key={video.video_id} className="col-xl-3 col-lg-4 col-md-6">

                        <div className="card h-100 shadow-sm border-0">

                            {/* Video */}
                            <iframe
                                src={video.url}
                                height="170"
                                className="w-100 rounded-top"
                                title={video.title}
                            ></iframe>

                            {/* Content */}
                            <div className="card-body">
                                <h6 className="fw-bold text-truncate">
                                    {video.title}
                                </h6>
                                <p className="small text-muted">
                                    {video.description}
                                </p>
                            </div>

                            {/* Stats */}
                            <div className="card-footer bg-white border-top-0 d-flex justify-content-between small">
                                <span className="bi bi-eye">
                                    {" "}{video.views}
                                </span>
                                <span className="bi bi-hand-thumbs-up">
                                    {" "}{video.likes}
                                </span>
                                <span className="bi bi-hand-thumbs-down">
                                    {" "}{video.dislikes}
                                </span>
                            </div>

                        </div>

                    </div>
                ))}

            </div>

        </div>
    );
}
