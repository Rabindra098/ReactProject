import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function DeleteVideo() {

    let params = useParams();
    let navigate = useNavigate();

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

    useEffect(() => {
        axios.get(`http://localhost:3000/videos/${params.id}`)
            .then(res => setVideo(res.data));
    }, [params.id]);

    function handleYesClick() {
        axios.delete(`http://localhost:3000/videos/${params.id}`)
            .then(() => {
                alert("Deleted Successfully");
                navigate("/admin-dashboard");
            });
    }

    return (
        <div className="delete-card shadow-lg">

            <div className="text-center mb-3">
                <i className="bi bi-exclamation-triangle-fill text-danger fs-1"></i>
                <h4 className="mt-2 fw-bold">Confirm Delete</h4>
                <p className="text-muted">
                    This action cannot be undone
                </p>
            </div>

            <div className="mb-3">
                <strong>Title:</strong>
                <div className="fw-semibold">{video.title}</div>
            </div>

            <div className="mb-4 text-center">
                <iframe
                    src={video.url}
                    width="220"
                    height="120"
                    title={video.title}
                    className="rounded border"
                ></iframe>
            </div>

            <div className="d-flex justify-content-between">
                <button
                    className="btn btn-danger"
                    onClick={handleYesClick}
                >
                    <i className="bi bi-trash-fill me-1"></i>
                    Yes, Delete
                </button>

                <Link
                    to="/admin-dashboard"
                    className="btn btn-outline-secondary"
                >
                    Cancel
                </Link>
            </div>

        </div>
    );
}
