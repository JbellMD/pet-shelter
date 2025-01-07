import React from "react";
import aboutImage from "../assets/about_us_1.jpeg";

const S3_BUCKET_URL = import.meta.env.VITE_PET_IMAGES_BUCKET_URL;

const AboutUs = () => {
  return (
    <div className="aboutus">
      <h2>What we do</h2>
      <div className="row">
        <div className="col-left">
          <img
            src={`${S3_BUCKET_URL}/about_us_1.jpeg`}
            alt="Our team"
            style={{ width: "auto", height: "800px" }}
          />
          {/* <img 
            src={aboutImage} 
            alt="" 
            style={{ width: "auto", height: "800px" }}
            /> */}
        </div>
        <div className="col-right">
          <p>
            Our team at AnyCompany Pet Shelter is dedicated to rescuing and
            rehabilitating pets in need. We are a group of passionate
            individuals who work together to ensure every animal receives the
            care and love they deserve. With hundreds of pets entering our
            shelter each year, we are dedicated to treating each animal as an
            individual and providing the highest quality of care. We offer a
            variety of community support programs to help pets stay with their
            families. We are proud to be part of a diverse and vibrant community
            that includes a highly skilled and dedicated staff, a committed team
            of volunteers and fosters, and compassionate residents.
          </p>
          <h3>Contact Information</h3>
          <p>
            <strong>Location:</strong> 1234 Pet Lane, Happy Town, HT 56789
          </p>
          <p>
            <strong>Phone:</strong> (123) 456-7890
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
