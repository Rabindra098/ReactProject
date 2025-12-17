import './video-index.css';
import VideoHome from './video-home';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import AdminLogin from './admin-login';
import UserLogin from './user-login';
import AdminDashboard from './admin-dashboard';
import AddVideo from './add-video';
import DeleteVideo from './delete-video';
import EditVideo from './edit-video';
import { UserRegister } from './user-reister';
import { UserDashboard } from './user-dashboard';

export default function VideoLibraryIndex() {
    return (
        <div className="bg-banner d-flex flex-column min-vh-100">
            <BrowserRouter>

                {/* 🔷 NAVBAR */}
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-1">
    <Link to="/" className="navbar-brand fw-bold">
        <span className="bi bi-house-door-fill me-2"></span>
        Video Podcast
    </Link>

    {/* Right side content */}
    <span className="navbar-text text-white ms-auto">
        Java | .NET | React
    </span>
    </nav>

                {/* 🔷 HEADER (Your existing header – unchanged)
                <header className="text-center p-2 text-white">
                    <div className="fs-1 fw-bold">
                        <Link to="/" className="btn btn-light me-2">
                            <span className="bi bi-house-door"></span>
                        </Link>
                        Video Podcast
                    </div>
                    <div>[Java, .NET, React]</div>
                </header> */}

                {/* 🔷 PAGE CONTENT */}
                <section className="p-5 flex-fill">
                    <Routes>
                        <Route path="/" element={<VideoHome />} />
                        <Route path="admin-login" element={<AdminLogin />} />
                        <Route path="user-login" element={<UserLogin />} />
                        <Route path="admin-dashboard" element={<AdminDashboard />} />
                        <Route path="add-video" element={<AddVideo />} />
                        <Route path="delete-video/:id" element={<DeleteVideo />} />
                        <Route path="edit-video/:id" element={<EditVideo />} />
                        <Route path="user-register" element={<UserRegister />} />
                        <Route path="user-dashboard" element={<UserDashboard />} />
                    </Routes>
                </section>

                {/* 🔷 FOOTER */}
                <footer className="bg-dark text-white text-center py-2">
                    <small>
                        © 2025 Video Podcast App | React • Bootstrap • JSON Server
                    </small>
                </footer>

            </BrowserRouter>
        </div>
    );
}
