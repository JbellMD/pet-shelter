import { useEffect, useState } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./styles.css";
import {Routes, Route, Link} from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import Pets from "./components/Pets";
import AdoptionForm from "./components/AdoptionForm";
import Footer from "./components/Footer";
import Applications from "./components/Applications";
import ApplicationDetail from "./components/ApplicationDetail";
import axios from "axios"

 
// Import the .env variables containing Cognito configuration information
const COGNITO_AUTH_URL = import.meta.env.VITE_COGNITO_AUTH_URL;
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID; 
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

function App() {
  const API_GATEWAY_BASE_URL = import.meta.env.VITE_API_GATEWAY_URL;
  const S3_BUCKET_URL = import.meta.env.VITE_PET_IMAGES_BUCKET_URL;

  // -------------------- BEGIN COGNITO CODE -------------------------//
  
  
  
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  const [error, setError] = useState("")

  // console.log(localStorage.getItem("accessToken"));
  if (
    localStorage.getItem("accessToken") == null ||
    localStorage.getItem("accessToken") == ""
  ) {
    if (window.location.hash != null && window.location.hash != "") {
      const str = window.location.hash;
      const regex = /#id_token=([^&]+)/;
      const match = str.match(regex);

      if (match) {
        const idTokenValue = match[1];
        console.log(idTokenValue); // Output: 'xxx'
        localStorage.setItem("accessToken", idTokenValue);
      } else {
        console.log("No match found");
      }
    }
  }

  useEffect(() => {
    // Check if accessToken is available in localStorage
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      // If accessToken is available, set isUserSignedIn to true
      setIsUserSignedIn(true);
    } else {
      // If accessToken is not available, set isUserSignedIn to false
      setIsUserSignedIn(false);
    }
  }, []);
  
  const handleSignOut = () => {
    // Clear the ID token from localStorage
    localStorage.removeItem("accessToken");

    // Clear the entire localStorage
    localStorage.clear();

    // Wait
    setTimeout(() => {  
      window.location.href = `${COGNITO_AUTH_URL}/logout?client_id=${CLIENT_ID}&response_type=token&scope=email+openid&logout_uri=${REDIRECT_URI}&redirect_uri=${REDIRECT_URI}`;     
    }, 1000);
  };
  
  const handleGenerateReport = () =>{
    axios.post(`${API_GATEWAY_BASE_URL}/create-report`, {"msg": "Requesting report"})
      .then((res)=>{
        setError("")
        console.log("Successfully generated report")
        console.log(res.data)
        alert("Report sent to main email")
      })
      .catch((err)=>{
        console.log("Error generating report!", err.message)
        setError(`Error generating report: ${err}`)
      })
  }
    
    
  // END COGNITO CODE //
  
  useEffect(()=>{
    // get pets from api
    axios.get(`${API_GATEWAY_BASE_URL}/pets`)
      .then(res => {
        console.log(res.data);
        setPets(res.data.pets);
      })
      .catch(err => console.log(err))
  },[])
  const [pets, setPets] = useState([]);
  return (
    <div className="App">
      <Header isUserSignedIn={isUserSignedIn}/>
      {/* at the route /, the home compnent renders */}
      <main>
        <div>
          {isUserSignedIn ? (
            // Render content for signed-in users
            <div>
              <div>Signed in as employee</div>
              <button
                onClick={handleSignOut}
                style={{
                  color: "white",
                  backgroundColor: "red",
                  padding: "8px 16px",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  margin: "10px"
                }}
              >
                Sign Out
              </button> 
              <br></br>
              <button
                onClick={handleGenerateReport}
                id="report_btn"
                style={{
                  color: "white",
                  backgroundColor: "green",
                  padding: "8px 16px",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  margin: "10px"
                }}
              >
                Generate Report
              </button> 
            </div>
          ) : (
            // Render content for signed-out users
            <div>
              <a href={`${COGNITO_AUTH_URL}/login?client_id=${CLIENT_ID}&response_type=token&scope=email+openid&redirect_uri=${REDIRECT_URI}`}>
                <button
                  style={{
                    color: "white",
                    backgroundColor: "blue",
                    padding: "8px 16px",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    margin: "10px"
                  }}
                >
                Employee Sign In
              </button> 
              </a>               
            </div>
          )}
        </div>
        <p style={{color: 'red'}}>{error}</p>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/pets" element={<Pets pets={pets}/>} />
          <Route path="/adopt" element={<AdoptionForm pets={pets}/>} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/applications/:id" element={<ApplicationDetail/>}/>
        </Routes>
      </main>
      <Footer/>
    </div>
  );
}

export default App;