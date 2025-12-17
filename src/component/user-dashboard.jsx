import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export  function UserDashboard(){

     const [videos, setVideos] = useState([{
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
     }])

     let navigate = useNavigate();

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
            axios.get(`http://localhost:3000/videos`)
            .then(response=>{
                setVideos(response.data);
            })

    },[])

    function handlSignoutClick(){
        window.sessionStorage.removeItem('user');
        navigate('/');
    }

    function handleCategoryChange(e){
        axios.get('http://localhost:3000/videos')
        .then(response=>{
            var filteredVideos = response.data.filter(video=> video.category_id===parseInt(e.target.value));
            setVideos(filteredVideos);
        })
    }

    return(
        <div className="bg-light p-3">
            <h3 className="d-flex justify-content-between"> {window.sessionStorage.getItem('user')} - Dashboard  <span><button className="btn btn-link" onClick={handlSignoutClick}>Signout</button></span> </h3>
            <div>
                <label>Filter Videos</label> :
                <select onChange={handleCategoryChange}>
                    {
                        categories.map(category=>
                            <option key={category.category_id} value={category.category_id}> {category.category_name}</option>
                        )
                    }
                </select>
            </div>
            <main className="d-flex flex-wrap">
                {
                    videos.map(video=>
                        <div key={video.video_id} className="card m-2 p-2" style={{width:'250px'}}>
                            <iframe src={video.url} className="w-100" height="200"></iframe>
                            <div className="card-header">
                                {video.title}
                            </div>
                            <div className="card-body">
                                {video.description}
                            </div>
                            <div className="card-footer">
                                <span className="bi bi-eye"> {video.views} </span>
                                <span className="bi mx-3 bi-hand-thumbs-up"> {video.likes} </span>
                                <span className="bi bi-hand-thumbs-down"> {video.dislikes} </span>
                            </div>
                        </div>
                    )
                }
            </main>
        </div>
    )
}