import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavComponent from '../Components/NavComponent';
import axios from 'axios';
import { Card, CardBody, CardHeader } from 'reactstrap';
function Home() {
  const [email, setEmail] = useState("");
  const [ team, setTeam ] = useState([]);
  const [ teamName, setTeamName ] = useState("");
  const [ teamId, setTeamId ] = useState("");
  useEffect(() => {
    if(localStorage.getItem('tnkemail') !== undefined){
      console.log(`${localStorage.getItem('tnkemail')}`);
      setEmail(localStorage.getItem('tnkemail'));
    }
    else{
      window.open('https://tankclient.vercel.app/login', "_self");
    }
    const config = {
      headers: {
        email: localStorage.getItem('tnkemail')
      }
    }
    console.log(`Email is : ${email}`);
    axios.get('https://tankserver.vercel.app/player', config).then((response) => {
      // console.log(response);
      if( response.status === 200 && response.data.message === 'Player data is here'){
        let teamId = response.data.data[0].teamId;
        if(teamId === undefined || teamId === ""){
          window.open("https://tankclient.vercel.app/join", "_self");
        }
        let confg = {
          headers: {
            id: teamId
          }
        }
        axios.get('https://tankserver.vercel.app/team', confg).then( async (response2) => {
          if(response2.status === 200 && response2.data.message === 'Team data is here'){
            setTeam(response2.data.data);
            setTeamName(response2.data.name);
            setTeamId(response2.data.id);
          }
          else if(response2.status === 204){
            alert('Team not found');
          }
        }).catch((eror2) => {
          alert(eror2.message);
        })
      }
      else if(response.status === 204){
        alert(`${email} not registered`);
      }
    }).catch((eror) => {
      alert(eror.message);
    })
  }, []);

  const calculateData = (data) => {
    let sum = 0;
    Object.keys(data).forEach(element => {
      sum = sum + data[element]
    });
    return sum;
  }


  const calculateRank = (email) => {
    let steps = {}, minutes = {}, calories = {};
    team.data.map((e) => {
      steps[e.email] = calculateData(e.steps);
      minutes[e.email] = calculateData(e.minutes);
      calories[e.email] = calculateData(e.calorie)
    });

  }

  const renderPlayer = (detail) => {
    console.log(`Details are :- ${detail}`);
    if(detail === undefined){
      return(
        <div></div>
      );
    }
    else{
      return(
        <Card style={containerStyle}>
          <CardHeader>
            <div className='row d-flex justify-content-center'>
              <div className='col-12 d-flex align-items-center'>
                <h3 style={{color: 'white'}}>{detail.name}</h3>
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <div className='row d-flex justify-content-left'>
              <div className='col-12 col-md-3 d-flex align-items-center'>
                <h5 style={{color: 'white'}}>Steps: </h5>
              </div>
              <div className='col-12 col-md-3 d-flex align-items-center'>
                <h5 style={{color: 'white'}}> {calculateData(detail.steps)} </h5>
              </div>
            </div>
            <div className='row d-flex justify-content-left'>
              <div className='col-12 col-md-3 d-flex align-items-center'>
                <h5 style={{color: 'white'}}>Calorie: </h5>
              </div>
              <div className='col-12 col-md-3 d-flex align-items-center'>
                <h5 style={{color: 'white'}}> {calculateData(detail.calorie)} </h5>
              </div>
            </div>
            <div className='row d-flex justify-content-left'>
              <div className='col-12 col-md-3 d-flex align-items-center'>
                <h5 style={{color: 'white'}}>Heart Minute: </h5>
              </div>
              <div className='col-12 col-md-3 d-flex align-items-center'>
                <h5 style={{color: 'white'}}> {calculateData(detail.minutes)} </h5>
              </div>
            </div>
          </CardBody>
        </Card>
      );
    }
  }

  const renderName = () => {
    if(team.length === 0){
      return(
        <div></div>
      );
    }
    else{
      return(
        <h2>{teamName === "" ? "No Team Name" : teamName}</h2>
      );
    }
  }

  const renderId = () => {
    if(team.length === 0){
      return(
        <div></div>
      );
    }
    else{
      return(
        `${team[0].teamId}`
      );
    }
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
      <NavComponent style={containerStyle} />
      <div className='container'>
        <br></br>
        <div className='row d-flex justify-content-center'>
          <div className='col-12 col-md-6 align-items-center' style={containerStyle}>
              <h3 style={{color:'white'}}>{renderName()}</h3>
            </div>
        </div>
        <br></br>
        <div className='row d-flex justify-content-center'>
          <div className='col-12 col-md-6 align-items-center' style={containerStyle}>
              <h5 style={{color:'white'}}>{renderId()}</h5>
            </div>
        </div>
        <br></br>
        <div className='row d-flex justify-content-center'>
          <div className='col-12 col-md-5 m-1 align-items-center'>
            {renderPlayer(( team.length > 0 ) ? team[0] : undefined)}
          </div>
          <div className='col-12 col-md-5 m-1 align-items-center'>
            {renderPlayer(( team.length > 1 ) ? team[1] : undefined)}
          </div>
        </div>
        <div className='row d-flex justify-content-center'>
          <div className='col-12 align-items-center'>
            {renderPlayer((team.length > 2 ) ? team[2] : undefined)}
          </div>
        </div>
        <div className='row d-flex justify-content-center'>
          <div className='col-12 col-md-6 align-items-center'>
            {renderPlayer((team.length > 3 ) ? team[3] : undefined)}
          </div>
          <div className='col-12 col-md-6 align-items-center'>
            {renderPlayer((team.length > 4 ) ? team[4] : undefined)}
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

export default Home