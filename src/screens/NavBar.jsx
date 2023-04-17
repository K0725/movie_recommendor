import {useState} from 'react';
import {Link} from "react-router-dom";
import './NavBar.css'

function NavBar() {
    return(
        <div className="NavBar">
            <nav>
                <Link to="/">Home</Link>
                <Link to="/Create">Create New Post</Link>
            </nav>
        </div>
    );
}

export default NavBar;