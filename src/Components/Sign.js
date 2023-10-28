import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, NavbarBrand, NavLink, Button, NavItem, Card, CardHeader } from 'reactstrap';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
function Sign() {
    const location = useLocation();
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        borderRadius: '10px', // Neumorphism border radius
        boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.3)', // Neumorphism shadow
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Glassmorphism background color
      };
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const code = searchParams.get("code");
        let config = {
            headers: {
                code: code
            }
        }
        console.log(`Code is here ${code}`);
        axios.get('https://tankserver.vercel.app/player/ply',config).then((response) => {
            if(response.data.message === "User added"){
                localStorage.setItem('tnkemail', response.data.email);
                window.open("https://tankclient.vercel.app/join", "_self");
            }
            else if(response.data.message === "Data updated"){
                localStorage.setItem('tnkemail', response.data.email);
                window.open("https://tankclient.vercel.app/home", "_self");
            }
            else{
                alert(response.data.data);
            }
        }).catch((eror) => {
            if(eror.message === 'Install google fit application'){
                alert('Install google fit application and link your app with the email id');
            }
        });
    }, []);
  return (
    <div style={containerStyle}>
        <Navbar style={containerStyle}>
            <NavItem>
                <NavLink>
                    <h1 style={{color:'white'}}>Fish Tank</h1>
                </NavLink>
            </NavItem>
        </Navbar>
        <div className='container'>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div className='row d-flex justify-content-center'>
                <div className='col-8 d-flex align-items-center'>
                    <Card style={containerStyle}>
                        <CardHeader>
                            <h2 style={{color:'white'}}>
                                <strong>Signing In please wait for a moment</strong>
                            </h2>
                        </CardHeader>
                    </Card>
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
        <br></br>
    </div>
  )
}

export default Sign