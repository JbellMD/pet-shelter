import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const formatDate = (dateString) => dateString.split('T')[0];

const ApplicationDetail = () => {
    const API_GATEWAY_BASE_URL = import.meta.env.VITE_API_GATEWAY_URL;
    const S3_BUCKET_URL = import.meta.env.VITE_PET_IMAGES_BUCKET_URL;

    const { id } = useParams(); // Extracting the "id" from the URL
    const [application, setApplication] = useState(null); // State to hold the application data
    const [loading, setLoading] = useState(true); // State to handle loading
    const [error, setError] = useState(null); // State to handle errors
    const navigate = useNavigate(); // Hook to navigate programmatically
    
    const accessToken = localStorage.getItem("accessToken");
   useEffect(() => {
        // Function to fetch application data
        const fetchApplication = async () => {
            try {
                const response = await axios.get(`${API_GATEWAY_BASE_URL}/adoptions/${id}`, {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                  "Content-Type": "application/json",
                },
            });
 	     setApplication(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchApplication();
    }, [id]); // Dependency array to re-run the effect when "id" changes

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!application) {
        return <div>No application found</div>;
    }

    return (
        <div style={{ padding: "30px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <p>
                <button
                    style={{
                        padding: "10px",
                        backgroundColor: "blue",
                        color: "white",
                        fontSize: "1.5rem"
                    }}
                    onClick={() => navigate(-1)}>
                    Back
                </button> {/* Back button */}
            </p>
            <p><b>Applicant Name:</b> {application.applicant_name}</p>
            <p><b>Email:</b> {application.email}</p>
            <p><b>Phone:</b> {application.phone}</p>
            <p><b>Submitted At:</b> {formatDate(application.submitted_at)}</p>
            <div style={{ padding: "30px", display: "flex", gap: "10px" }}>
                {
                    application.pets.map(pet => {
                        return (
                            <div style={{ 
                                border: "1px solid black", 
                                display: "flex", 
                                flexDirection: "column", 
                                gap: "10px", 
                                padding: "15px", 
                                alignItems: "center" }}>
                                <h3 style={{ textDecoration: "underline" }}>{pet.name}</h3>
                                <img src={`${S3_BUCKET_URL}/${pet.image}`} alt={pet.name} width={"400px"} />
                                <p><b>Species:</b> {pet.species}</p>
                                <p><b>Age:</b> {pet.age}</p>
                                <p><b>Date Entered:</b> {pet.date_entered}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default ApplicationDetail;