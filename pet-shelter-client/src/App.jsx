import { useState, useEffect } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Container, 
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { motion } from 'framer-motion';
import MenuIcon from '@mui/icons-material/Menu';
import PetsIcon from '@mui/icons-material/Pets';
import { theme } from './theme';
import { Routes, Route, Link } from "react-router-dom";
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const navItems = [
    { title: 'Home', path: '/' },
    { title: 'About Us', path: '/about' },
    { title: 'Pets', path: '/pets' },
    { title: 'Adopt', path: '/adopt' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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
    <ThemeProvider theme={theme}>
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: '100vh',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url("/pets.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.15,
            zIndex: -1
          }
        }}
      >
        <AppBar position="sticky" color="default" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(8px)' }}>
          <Container maxWidth="lg">
            <Toolbar sx={{ justifyContent: 'space-between', padding: '1rem 0' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <PetsIcon sx={{ color: 'primary.main', fontSize: '2rem' }} />
                </motion.div>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ 
                    fontWeight: 700,
                    background: 'linear-gradient(45deg, #3B82F6 30%, #10B981 90%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  AnyCompany Pet Shelter
                </Typography>
              </Box>

              {isMobile ? (
                <IconButton
                  color="primary"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                >
                  <MenuIcon />
                </IconButton>
              ) : (
                <Box sx={{ display: 'flex', gap: 2 }}>
                  {navItems.map((item) => (
                    <Button
                      key={item.title}
                      color="primary"
                      sx={{
                        '&:hover': {
                          backgroundColor: 'primary.light',
                          color: 'white',
                        },
                      }}
                    >
                      <Link to={item.path} style={{textDecoration: 'none', color: 'inherit'}}>{item.title}</Link>
                    </Button>
                  ))}
                  {isUserSignedIn ? (
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{
                        ml: 2,
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: 4,
                        },
                      }}
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{
                        ml: 2,
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: 4,
                        },
                      }}
                    >
                      <a href={`${COGNITO_AUTH_URL}/login?client_id=${CLIENT_ID}&response_type=token&scope=email+openid&redirect_uri=${REDIRECT_URI}`} style={{textDecoration: 'none', color: 'white'}}>Employee Sign In</a>
                    </Button>
                  )}
                </Box>
              )}
            </Toolbar>
          </Container>
        </AppBar>

        <Drawer
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <Box sx={{ width: 250, pt: 2 }}>
            <List>
              {navItems.map((item) => (
                <ListItem button key={item.title}>
                  <Link to={item.path} style={{textDecoration: 'none', color: 'inherit'}}><ListItemText primary={item.title} /></Link>
                </ListItem>
              ))}
              {isUserSignedIn ? (
                <ListItem>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </Button>
                </ListItem>
              ) : (
                <ListItem>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    <a href={`${COGNITO_AUTH_URL}/login?client_id=${CLIENT_ID}&response_type=token&scope=email+openid&redirect_uri=${REDIRECT_URI}`} style={{textDecoration: 'none', color: 'white'}}>Employee Sign In</a>
                  </Button>
                </ListItem>
              )}
            </List>
          </Box>
        </Drawer>

        <Container 
          component="main" 
          maxWidth="lg" 
          sx={{ 
            flex: 1,
            py: 8,
            position: 'relative',
            zIndex: 1
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h1"
              component="h1"
              align="center"
              gutterBottom
              sx={{
                fontSize: { xs: '2rem', md: '3rem' },
                mb: 4,
                background: 'linear-gradient(45deg, #3B82F6 30%, #10B981 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Welcome to our Pet Shelter
            </Typography>

            <Typography
              variant="h5"
              component="p"
              align="center"
              color="text.secondary"
              sx={{
                maxWidth: '800px',
                mx: 'auto',
                mb: 6,
                lineHeight: 1.8
              }}
            >
              Welcome to AnyCompany Pet Shelter, where we care for and find loving homes for stray and abandoned pets. 
              Our shelter provides a safe haven for dogs and cats while we work tirelessly to match them with their forever families.
              We believe every pet deserves a second chance at happiness and are committed to ensuring they receive the best care and love.
            </Typography>

            <Box
              sx={{
                display: 'flex',
                gap: 2,
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}
            >
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 4,
                  },
                }}
              >
                <Link to="/pets" style={{textDecoration: 'none', color: 'white'}}>View Available Pets</Link>
              </Button>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 2,
                  },
                }}
              >
                Learn More
              </Button>
            </Box>
          </motion.div>
        </Container>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/pets" element={<Pets pets={pets}/>} />
          <Route path="/adopt" element={<AdoptionForm pets={pets}/>} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/applications/:id" element={<ApplicationDetail/>}/>
        </Routes>

        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderTop: '1px solid',
            borderColor: 'divider',
            backdropFilter: 'blur(8px)',
            position: 'relative',
            zIndex: 1
          }}
        >
          <Container maxWidth="lg">
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
            >
              {'Copyright '}
              {new Date().getFullYear()}
              {' AnyCompany Pet Shelter. All rights reserved.'}
            </Typography>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;