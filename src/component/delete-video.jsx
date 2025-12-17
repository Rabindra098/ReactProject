import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function DeleteVideo() {

    let params = useParams();
    let navigate = useNavigate();

    const [video, setVideo] = useState(
        {
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
        }
    )

    useEffect(()=>{
        axios.get(`http://localhost:3000/videos/${params.id}`)
        .then(res=>{
            setVideo(res.data);
        })
    },[])

   function handleYesClick(){
        axios.delete(`http://localhost:3000/videos/${params.id}`)
        .then(()=>{
            console.log('delete');
        })
        alert('Deleted Successfully..');
        navigate('/admin-dashboard');
    }


    return (
        <div className="bg-light p-4 w-25 rounded rounded-2">
            <h3>Delete Video</h3>
            <p>Are you sure you want to delete this video?</p>
            <dl>
                <dt>Title</dt>
                <dd>{video.title}</dd>
                <dt>Preview</dt>
                <dd>
                    <iframe src={video.url} width="200" height="100" frameborder="0"></iframe>
                </dd>
            </dl>
            <button className="btn btn-danger" onClick={handleYesClick}>Yes</button>
            <Link to="/admin-dashboard" className="btn btn-secondary ms-2">No</Link>
        </div>
    );
}
