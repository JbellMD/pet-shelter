import React from 'react';
import shelterImage from '../assets/shelter.jpeg';

const Home = () => {
  const S3_BUCKET_URL = import.meta.env.VITE_PET_IMAGES_BUCKET_URL;
  console.log(S3_BUCKET_URL);
  return (
    <div className='home'>
      <h2>Welcome to our Pet Shelter</h2>
      <p>
        Welcome to AnyCompany Pet Shelter, where we care for and find loving homes for stray and abandoned pets.
        Our shelter provides a safe haven for dogs and cats while we work tirelessly to match them with their
        forever families. We believe every pet deserves a second chance at happiness and are committed to ensuring they receive the
        best care and love. Join us in making a difference in the lives of these wonderful animals.
      </p>
      <p>
        
      </p>
      {/* <img src={shelterImage} alt="Happy pets" /> */}
      <img src={`${S3_BUCKET_URL}/shelter.jpeg`} alt="" />
    </div>

  );
};

export default Home;
