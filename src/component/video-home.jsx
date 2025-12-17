import { Link } from "react-router-dom";
import { TextField, Button } from '@mui/material';

export default function VideoHome() {
    return (
        <div className="text-center">
            <h3 className="text-center text-white">Video Home</h3>
            <div className="mt-4">
                <Button variant="contained" className="text-bg-success text-bold"> <Link to="/admin-login" className="text-decoration-none"> Admin </Link></Button>
                <Button variant="contained" className="text-bg-warning mx-2"> <Link to="/user-login" className="text-decoration-none"> User </Link></Button>
            </div>
        </div>
    );
}
