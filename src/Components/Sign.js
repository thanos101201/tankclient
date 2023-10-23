import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, NavbarBrand, NavLink, Button } from 'reactstrap';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
function Sign() {
    const location = useLocation();
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const code = searchParams.get("code");
        let config = {
            headers: {
                code: code
            }
        }
        console.log(`Code is here ${code}`);
        axios.get('http://localhost:3001/player/ply',config).then((response) => {
            if(response.data.message === "User added"){
                localStorage.setItem('tnkemail', response.data.email);
                window.open("http://localhost:3000/join", "_self");
            }
            else if(response.data.message === "Data updated"){
                localStorage.setItem('tnkemail', response.data.email);
                window.open("http://localhost:3000/home", "_self");
            }
            else{
                alert(response.data.data);
            }
        }).catch((eror) => {
            alert(eror.message);
        });
    }, []);
  return (
    <div>
    <Navbar>
        <NavbarBrand>
            <NavLink>
                Fish Tank
            </NavLink>
        </NavbarBrand>
    </Navbar>
    <div className='container'>
        <div className='row d-flex justify-content-center'>
            <div className='col-12 d-flex align-items-center'>
                Loading
            </div>
        </div>
    </div>
    </div>
  )
}

export default Sign