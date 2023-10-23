import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavComponent from '../Components/NavComponent';
import axios from 'axios';
import { Card, CardBody, CardHeader } from 'reactstrap';
function Home() {
  const [email, setEmail] = useState("");
  const [ team, setTeam ] = useState({});
  useEffect(() => {
    if(localStorage.getItem('tnkemail') !== undefined){
      console.log(`${localStorage.getItem('tnkemail')}`);
      setEmail(localStorage.getItem('tnkemail'));
    }
    else{
      window.open('http://localhost:3000/login', "_self");
    }
    const config = {
      headers: {
        email: localStorage.getItem('tnkemail')
      }
    }
    console.log(`Email is : ${email}`);
    axios.get('http://localhost:3001/player', config).then((response) => {
      console.log(response);
      if( response.status === 200 && response.data.message === 'Player data is here'){
        let teamId = response.data.data[0].teamId;
        if(teamId === undefined || teamId === ""){
          window.open("http://localhost:3000/join", "_self");
        }
        let confg = {
          headers: {
            id: teamId
          }
        }
        axios.get('http://localhost:3001/team', confg).then((response2) => {
          if(response2.status === 200 && response2.data.message === 'Team data is here'){
            setTeam(response2.data.data[0]);
            alert(team);
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

  const renderPlayer = (detail) => {
    if(detail === undefined){
      return(
        <div></div>
      );
    }
    else{
      return(
        <Card>
          <CardHeader>
            <div className='row d-flex justify-content-center'>
              <div className='col-12 d-flex align-items-center'>
                <h3>{detail.name}</h3>
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <div className='row d-flex justify-content-center'>
              <div className='col-12 col-md-3 d-flex align-items-center'>
                <h5>Rank : </h5>
              </div>
              <div className='col-12 col-md-3 d-flex align-items-center'>
                <h5>  </h5>
              </div>
            </div>
            <div className='row d-flex justify-content-center'>
              <div className='col-12 col-md-3 d-flex align-items-center'>
                <h5>Steps : </h5>
              </div>
              <div className='col-12 col-md-3 d-flex align-items-center'>
                <h5> {calculateData(detail.steps)} </h5>
              </div>
            </div>
            <div className='row d-flex justify-content-center'>
              <div className='col-12 col-md-3 d-flex align-items-center'>
                <h5>Calories : </h5>
              </div>
              <div className='col-12 col-md-3 d-flex align-items-center'>
                <h5> {calculateData(detail.calorie)} </h5>
              </div>
            </div>
            <div className='row d-flex justify-content-center'>
              <div className='col-12 col-md-3 d-flex align-items-center'>
                <h5>Heart Minutes : </h5>
              </div>
              <div className='col-12 col-md-3 d-flex align-items-center'>
                <h5> {calculateData(detail.minutes)} </h5>
              </div>
            </div>
          </CardBody>
        </Card>
      );
    }
  }

  return (
    <div>
      <NavComponent />
      <div className='container'>
        <div className='row d-flex justify-content-center'>
          <div className='col-12 col-md-6 align-items-center'>
            {renderPlayer((team.players !== undefined && team.players.length > 0 ) ? team.players[0] : undefined)}
          </div>
          <div className='col-12 col-md-6 align-items-center'>
            {renderPlayer((team.players !== undefined && team.players.length > 1 ) ? team.players[1] : undefined)}
          </div>
        </div>
        <div className='row d-flex justify-content-center'>
          <div className='col-12 align-items-center'>
            {renderPlayer((team.players !== undefined && team.players.length > 2 ) ? team.players[2] : undefined)}
          </div>
        </div>
        <div className='row d-flex justify-content-center'>
          <div className='col-12 col-md-6 align-items-center'>
            {renderPlayer((team.players !== undefined && team.players.length > 3 ) ? team.players[3] : undefined)}
          </div>
          <div className='col-12 col-md-6 align-items-center'>
            {renderPlayer((team.players !== undefined && team.players.length > 4 ) ? team.players[4] : undefined)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home