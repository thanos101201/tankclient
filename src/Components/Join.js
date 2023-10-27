import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, CardBody, Modal, ModalBody, ModalHeader, ModalFooter, Input } from 'reactstrap';
import NavComponent from './NavComponent';
import axios from 'axios';
function Join() {
    const [ open, setOpen ] = useState(false);
    const [ teamId, setTeamId ] = useState("");

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        borderRadius: '10px', // Neumorphism border radius
        boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.3)', // Neumorphism shadow
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Glassmorphism background color
      };

    const handleJoin = () => {
        if(teamId === ""){
            alert('Provide the teamId');
        }
        else{
            axios.put('https://tankserver.vercel.app/team/join', {
                email: localStorage.getItem('tnkemail'),
                id: teamId
            }).then((response) => {
                if( response.status === 200 && response.data.message === 'Joined team'){
                    window.open("https://tankclient.vercel.app/home", "_self");
                }
                else if(response.status === 403){
                    alert(response.data.message);
                }
            }).catch((eror) => {
                alert(eror.message);
            });
        }
    }

    const handleCreate = () => {
        axios.post('https://tankserver.vercel.app/team', {
            email: localStorage.getItem('tnkemail')
        }).then((response) => {
            console.log(`The response is ${Object.keys(response)}`);
            if( response.status === 200 && response.data.message === 'Team added'){
                window.open("https://tankclient.vercel.app/home", "_self");
            }
        }).catch((eror) => {

        });
    }
  return (
    <div style={containerStyle}>
        <NavComponent />
        <Modal isOpen={open}>
            <ModalHeader>
                <div className='row d-flex justify-content-center'>
                    <div className='col-12 d-flex align-items-center'>
                        <h1>Join Team</h1>
                    </div>
                </div>
            </ModalHeader>
            <ModalBody>
                <div className='row d-flex justify-content-center'>
                    <div className='col-12 m-3 col-md-3 d-flex align-items-center'>
                        <h5> Team Id </h5>
                    </div>
                    <div className='col-12 col-md-9 d-flex align-items-center'>
                        <Input placeholder='Team Id to join' onClick={(e) => setTeamId(e.target.value)} />
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <div className='row d-flex justify-content-center'>
                    <div className='col-12 col-md-6 d-flex align-items-center'>
                        <Button  style={{width:'7em', height:'5em'}} className='btn btn-success m-1' onClick={() => {
                            handleJoin();
                        }}>Join   </Button>
                    </div>
                    <div className='col-12 col-md-6 d-flex align-items-center'>
                        <Button  style={{width:'7em', height:'5em'}} className='btn btn-danger m-1' onClick={() => {
                            setOpen(!open);
                        }}>Close</Button>
                    </div>
                </div>
            </ModalFooter>
        </Modal>
        <br></br>
        <div className='container'>
            <div className='row d-flex justify-content-center'>
                <div className='col-8 d-flex align-items-center pr-5 mr-5'>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <Card className='p-5' style={containerStyle}>
                        <CardBody>
                            <div className='row d-flex justify-content-center'>
                                <div className='col-12 col-md-5 d-flex align-items-center'>
                                    <Button className='btn btn-success m-3' onClick={() => {
                                        setOpen(!open);
                                    }}><strong>Join Team</strong></Button>
                                </div>
                                <div className='col-12 col-md-5 d-flex align-items-center'>
                                    <Button className='btn btn-danger m-3' onClick={() => {
                                        handleCreate();
                                    }}> <strong>Create Team</strong></Button>
                                </div>
                            </div>
                        </CardBody>
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

export default Join