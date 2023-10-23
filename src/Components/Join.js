import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, CardBody, Modal, ModalBody, ModalHeader, ModalFooter, Input } from 'reactstrap';
import NavComponent from './NavComponent';
import axios from 'axios';
function Join() {
    const [ open, setOpen ] = useState(false);
    const [ teamId, setTeamId ] = useState("");
    const handleJoin = () => {
        if(teamId === ""){
            alert('Provide the teamId');
        }
        else{
            axios.put('http://localhost:3001/team/join', {
                email: localStorage.getItem('tnkemail'),
                id: teamId
            }).then((response) => {
                if( response.status === 200 && response.data.message === 'Team added'){
                    window.open("http://localhost:3000/home", "_self");
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
        axios.post('http://localhost:3001/team', {
            email: localStorage.getItem('tnkemail')
        }).then((response) => {
            console.log(`The response is ${Object.keys(response)}`);
            if( response.status === 200 && response.data.message === 'Team added'){
                window.open("http://localhost:3000/home", "_self");
            }
        }).catch((eror) => {

        });
    }
  return (
    <div>
        <NavComponent />
        <Modal>
            <ModalHeader>
                <div className='row d-flex justify-content-center'>
                    <div className='col-12 d-flex align-items-center'>
                        <h1>Join Team</h1>
                    </div>
                </div>
            </ModalHeader>
            <ModalBody>
                <div className='row d-flex justify-content-center'>
                    <div className='col-12 col-md-3 d-flex align-items-center'>
                        <h3> Team Id </h3>
                    </div>
                    <div className='col-12 col-md-9 d-flex align-items-center'>
                        <Input placeholder='Team Id to join' onClick={(e) => setTeamId(e.target.value)} />
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <div className='row d-flex justify-content-center'>
                    <div className='col-12 col-md-6 d-flex align-items-center'>
                        <Button onClick={() => {
                            setOpen(!open);
                        }}>Close</Button>
                    </div>
                    <div className='col-12 col-md-6 d-flex align-items-center'>
                        <Button onClick={() => {
                            handleJoin();
                        }}>Join</Button>
                    </div>
                </div>
            </ModalFooter>
        </Modal>
        <div className='container'>
            <div className='row d-flex justify-content-center'>
                <div className='col-12 d-flex align-items-center'>
                    <Card>
                        <CardBody>
                            <div className='row d-flex justify-content-center'>
                                <div className='col-12 col-md-6 d-flex align-items-center'>
                                    <Button onClick={() => {
                                        setOpen(!open);
                                    }}>Join Team</Button>
                                </div>
                                <div className='col-12 col-md-6 d-flex align-items-center'>
                                    <Button onClick={() => {
                                        handleCreate();
                                    }}>Create Team</Button>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Join