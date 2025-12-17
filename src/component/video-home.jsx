import { Link } from "react-router-dom";
import { Button } from "@mui/material";

export default function VideoHome() {
    return (
        <div className="d-flex justify-content-center align-items-center min-vh-75">
            <div className="home-card text-center">

                {/* Hero Title */}
                <h1 className="fw-bold mb-3">
                    🎥 Video Podcast Platform
                </h1>

                <p className="lead text-muted mb-4">
                    Learn <strong>Java</strong>, <strong>.NET</strong>, and <strong>React</strong>
                    <br />
                    with high-quality curated video content
                </p>

                {/* Tech Badges */}
                <div className="mb-4">
                    <span className="badge bg-primary mx-1 px-3 py-2">Java</span>
                    <span className="badge bg-secondary mx-1 px-3 py-2">.NET</span>
                    <span className="badge bg-warning text-dark mx-1 px-3 py-2">React</span>
                </div>

                {/* Action Buttons */}
                <div className="d-flex justify-content-center gap-4 mt-4">
                    <Button
                        variant="contained"
                        color="success"
                        component={Link}
                        to="/admin-login"
                        size="large"
                        sx={{ px: 5 }}
                    >
                        Admin Portal
                    </Button>

                    <Button
                        variant="contained"
                        color="warning"
                        component={Link}
                        to="/user-login"
                        size="large"
                        sx={{ px: 5 }}
                    >
                        User Portal
                    </Button>
                </div>

                {/* Footer Text */}
                <p className="mt-4 text-muted small">
                    Trusted learning platform for developers 🚀
                </p>

            </div>
        </div>
    );
}
