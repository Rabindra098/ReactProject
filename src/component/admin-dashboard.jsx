import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AdminDashboard() {

    const [videos, setVideos] = useState([]);

    let navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3000/videos")
            .then(response => setVideos(response.data));
    }, []);

    function handleSignoutClick() {
        window.sessionStorage.removeItem("uname");
        navigate("/");
    }

    return (
        <div className="admin-dashboard">

            {/* 🔷 Header */}
            <div className="dashboard-header d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold">
                    <i className="bi bi-speedometer2 me-2"></i>
                    {window.sessionStorage.getItem("uname")} – Admin Dashboard
                </h4>

                <div>
                    <Link to="/add-video" className="btn btn-primary me-2">
                        <i className="bi bi-camera-video me-1"></i>
                        Add Video
                    </Link>

                    <button onClick={handleSignoutClick} className="btn btn-danger">
                        Signout <i className="bi bi-box-arrow-right ms-1"></i>
                    </button>
                </div>
            </div>

            {/* 🔷 Video Table */}
            <div className="table-container shadow-sm">
                <table className="table table-hover align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>Title</th>
                            <th>Preview</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                </table>

                <div className="table-scroll">
                    <table className="table table-striped align-middle">
                        <tbody>
                            {videos.map(video => (
                                <tr key={video.id}>
                                    <td className="fw-semibold">{video.title}</td>

                                    <td>
                                        <iframe
                                            src={video.url}
                                            width="180"
                                            height="100"
                                            title={video.title}
                                            className="rounded"
                                        ></iframe>
                                    </td>

                                    <td className="text-center">
                                        <Link
                                            to={`/edit-video/${video.id}`}
                                            className="btn btn-sm btn-warning me-2"
                                        >
                                            <i className="bi bi-pencil-fill"></i>
                                        </Link>

                                        <Link
                                            to={`/delete-video/${video.id}`}
                                            className="btn btn-sm btn-danger"
                                        >
                                            <i className="bi bi-trash-fill"></i>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}
