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
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        borderRadius: '10px', // Neumorphism border radius
        boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.3)', // Neumorphism shadow
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Glassmorphism background color
      };
  return (
    <div style={containerStyle}>
        <Navbar style={containerStyle}>
            <NavbarBrand>
                <NavLink style={{color:'white'}}>
                    Fish Tank
                </NavLink>
            </NavbarBrand>
        </Navbar>
        <br></br>
        <div className='container'>
            <div className='row d-flex justify-content-center'>
                
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
                <div className='col-6 d-flex align-items-center' style={containerStyle}>
                    <br></br>
                    <br></br>
                    <br></br>
                    
                    <Button className='btn btn-success' style={{width:'7em', height:'5em'}} onClick={() => {
                        handleLogin();
                    }}>Log In</Button>
                </div>
            </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
    </div>
  )
}

export default Login