import axios from 'axios';
import React, { useState } from 'react'
import { Nav, NavItem, NavLink, Navbar, NavbarBrand, Button, ButtonGroup, Modal, ModalHeader, ModalBody, Input, ModalFooter } from 'reactstrap';
function NavComponent() {
  const [ open, setOpen ] = useState(false);
  const [ teamName, setTeamName ] = useState("");
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    borderRadius: '10px', // Neumorphism border radius
    boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.3)', // Neumorphism shadow
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Glassmorphism background color
  };
  const handleUpdate = () => {
    axios.put('http://localhost:3001/team/name', {
      name: teamName,
      email: localStorage.getItem('tnkemail')
    }).then((response) => {
      if(response.status === 200 && response.data.message === 'Team Name updated'){
        alert("Team Name updated");
      }
    }).catch((eror) => {
      alert(eror.message);
    })
  }
  return (
    <Navbar style={containerStyle}>
      <Modal isOpen={open}>
            <ModalHeader>
                <div className='row d-flex justify-content-center'>
                    <div className='col-12 d-flex align-items-center'>
                        <h1>Update Name</h1>
                    </div>
                </div>
            </ModalHeader>
            <ModalBody>
                <div className='row d-flex justify-content-center'>
                    <div className='col-12 m-3 col-md-3 d-flex align-items-center'>
                        <h5> Team Name </h5>
                    </div>
                    <div className='col-12 col-md-9 d-flex align-items-center'>
                        <Input placeholder='New name of the team' onClick={(e) => setTeamName(e.target.value)} />
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <div className='row d-flex justify-content-center'>
                    <div className='col-12 col-md-6 d-flex align-items-center'>
                        <Button  style={{width:'7em', height:'5em'}} className='btn btn-success m-1' onClick={() => {
                            handleUpdate();
                        }}>Update</Button>
                    </div>
                    <div className='col-12 col-md-6 d-flex align-items-center'>
                        <Button  style={{width:'7em', height:'5em'}} className='btn btn-danger m-1' onClick={() => {
                            setOpen(!open);
                        }}>Close</Button>
                    </div>
                </div>
            </ModalFooter>
        </Modal>
        <NavbarBrand>
            <NavLink style={{color: 'white'}}>
                <h1>Fish Tank</h1>
            </NavLink>
        </NavbarBrand>
        <NavItem>
        <ButtonGroup>
            <Button className='btn btn-info m-1' onClick={() => setOpen(!open)}>Update Team</Button>
            <Button className='btn btn-danger m-1' onClick={() => {
              localStorage.removeItem('username', undefined);
              localStorage.removeItem('password', undefined);
              window.open("https://lunchserver-two.vercel.app", "_self");
            }}>Log Out</Button>
          </ButtonGroup>
        </NavItem>
    </Navbar>
  )
}

export default NavComponent