import React, {useEffect, useState} from "react";
import {Link} from 'react-router-dom'
import axios from "axios";

const formatDate = (dateString) => dateString.split('T')[0];


const Applications = () => {
  const API_GATEWAY_BASE_URL = import.meta.env.VITE_API_GATEWAY_URL;
  const [applications, setApplications] = useState([]);
  
  const accessToken = localStorage.getItem("accessToken");

//   get applications from api
  useEffect(() => {
        // use axios to get applications
        axios.get(`${API_GATEWAY_BASE_URL}/adoptions`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
        })
            .then((response) => {
                console.log('successfully got applications from table', response.data);
                setApplications(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);



  return <div className="table-container">
    <h3>Applications</h3>
    
    {/* table that loops through all the applications. Each application has properties: appliant_name, email, phone, pet_id, pet_name, species, submitted_at */}
    <table>
        <thead>
            <tr>
                <th>Applicant Name</th>
                <th>Number of Pets</th>
                <th>Application Submitted on</th>
                <th>View application details</th>
            </tr>
        </thead>
        <tbody>
            {/* if applications is empty list, show one row that says "No applications to show" */}
            {applications.length === 0 && (
                <tr>
                    <td colSpan="7">No applications to show</td>
                </tr>
            )}
            {applications.map((application) => (
                <tr key={application.id}>
                    <td>{application.applicant_name}</td>
                    <td>{application.pets.length}</td>
                    <td>{formatDate(application.submitted_at)}</td>
                    <td><Link to={`/applications/${application.id}`}>View Details</Link></td>
                </tr>
            ))}
        </tbody>
    </table>
  </div>;
};

export default Applications;