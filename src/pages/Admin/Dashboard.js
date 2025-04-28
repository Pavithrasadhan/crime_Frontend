import React, { useEffect, useState } from 'react';
import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Dashboard = () => {
  const [report, setReports] = useState([]);
  const [users, setUsers] = useState([]);
  
    useEffect(() => {
    fetchReports();
  }, []);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/user`);
      console.log(response.data);
      setUsers(response.data.users || []);
    } catch (error) {
      console.log("Error fetching Users");
    }
  }; 
  
  const fetchReports = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/report`);
      console.log(response.data);
      setReports(response.data.report || []);
    } catch (error) {
      console.log("Error fetching Reports:", error);
    }
  };


  return (
    <div className='content-wrapper' style={{marginTop: '60px', background: 'none'}}>
      <div className='content-header'>

    <div className="row">
      <div className='col-md-12'>
      <h3 className='fw-bold'> Dashboard </h3>
      </div>
    </div>
  
  </div>

<div className='card-body'>
      <div className="row">
        <div className="col-lg-3 col-6">
          <div className='small-box bg-info'>
            <div className='inner'>
           <h3>Reports</h3>
          <p>{report.length}</p>
          </div>
          <div className='icon'>
            <i className='fas fa-file-alt' />
          </div>
        </div>
      </div>

    <div className="col-lg-3 col-6">
      <div className="small-box bg-success">
        <div className="inner">
          <h3>Users </h3>
          <p>{users.length}</p>
        </div>
        <div className='icon'>
          <i className='fas fa-users' />
          </div>
              </div>
            </div>
          </div>
      </div>
    </div>

  );
};

export default Dashboard;
