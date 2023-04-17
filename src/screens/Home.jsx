import {useState} from 'react'
import {Link } from "react-router-dom";
import Card from "../components/Card"
import {supabase } from "/client";


function Home() {
    const [event, setEvent] = useState([]);
    const [search, setSearch] = useState("");



    return(
        <div className="Home">
            <div className="header">
                

            </div>





        </div>
    );
}

export default Home;

