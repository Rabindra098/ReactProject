import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function AdminDashboard() {

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
    }])

    let navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/videos`)
            .then(response => {
                setVideos(response.data);
            })
    }, [])

    function handlSignoutClick() {
        window.sessionStorage.removeItem('uname');
        navigate('/');
    }

    return (
        <div className="p-4 bg-light rounded rounded-2 overflow-auto">
            <h3 className="d-flex justify-content-between align-items-center">
                {window.sessionStorage.getItem('uname')} - Dashboard
                <Link to="/add-video" className="btn btn-primary bi bi-camera-video"> Add Video</Link>
                <button onClick={handlSignoutClick} className="btn text-bg-danger">
                    Signout <i className="bi bi-box-arrow-right mx-1"></i>
                </button>
            </h3>

            <div className="table-responsive">
                <table className="table table-striped table-hover rounded rounded-2">
                    <thead className="table-light">
                        <tr>
                            <th>Video Title</th>
                            <th>Preview</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                </table>

                {/* Scrollable tbody */}
                <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                    <table className="table table-bordered table-striped table-hover rounded rounded-2">
                        <tbody>
                            {videos.map(video => (
                                <tr key={video.id}>
                                    <td>{video.title}</td>
                                    <td>
                                        <iframe src={video.url} width="200" height="100"></iframe>
                                    </td>
                                    <td>
                                        <Link to={`/edit-video/${video.id}`} className="bi btn btn-warning bi-pen-fill"></Link>
                                        <Link to={`/delete-video/${video.id}`} className="bi bi-trash-fill btn btn-danger mx-2"></Link>
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
