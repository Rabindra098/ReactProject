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
                <nav className="navbar navbar-dark px-4 shadow-lg">
                    <Link to="/" className="navbar-brand fw-bold fs-4 text-white">
                        <span className="bi bi-camera-video-fill me-2"></span>
                        Video Podcast
                    </Link>

                    <span className="navbar-text text-light ms-auto fw-semibold">
                        Java • .NET • React
                    </span>
                </nav>

                {/* 🔷 PAGE CONTENT */}
                <section className="flex-fill d-flex justify-content-center align-items-center">
                    <div className="content-box shadow-lg">
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
                    </div>
                </section>

                {/* 🔷 FOOTER */}
                <footer className="footer text-center text-light py-2">
                    <small>
                        © 2025 Video Podcast App • React • Bootstrap • JSON Server
                    </small>
                </footer>

            </BrowserRouter>
        </div>
    );
}
