import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, NavbarBrand, NavLink, Button } from 'reactstrap';
import axios from 'axios';
function Login() {
    const handleLogin = () => {
        axios.get('http://localhost:3001/log').then((response) => {
            window.open(response.data.url, "_self");
        }).catch((eror) => {
            alert(eror.message);
        })
    }
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
                <Button onClick={() => {
                    handleLogin();
                }}>Log In</Button>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Login