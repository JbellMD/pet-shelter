import React, { useState } from "react";
import { Link } from "react-router-dom";
import ApplyForm from "./AdoptionForm";

const S3_BUCKET_URL = import.meta.env.VITE_PET_IMAGES_BUCKET_URL;

function getImgUrl(fileName) {
  // let ext = '.jpg' // can be anything
  // const imgUrl = new URL(`../assets/${fileName}`, import.meta.url).href;
  const imgUrl = `${S3_BUCKET_URL}/${fileName}`

  return imgUrl;
}

const calculateDaysInShelter = (dateEntered) => {
  const today = new Date();
  dateEntered = new Date(dateEntered);
  const timeDifference = today.getTime() - dateEntered.getTime();
  const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
  return daysDifference;
};

const Pets = ({ pets }) => {
  const [filter, setFilter] = useState("");

  const filteredPets = filter
    ? pets.filter((pet) => pet.species.toLowerCase() === filter.toLowerCase())
    : pets;
  console.log('filteredpets is this', filteredPets);

  return (
    <div className="pets">
      <h1>Available Pets for Adoption</h1>
      <label>
        Filter by species:
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="">All</option>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
        </select>
      </label>
      {/* <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px' }}> */}
      <div className="petsList">
        {filteredPets.map((pet) => (
          <div
            className="pet"
            key={
              pet.id
            }
          >
            <div style={{width: '200px'}}>
              <img
                src={getImgUrl(pet.image)}
                alt={pet.name} /*style={{ width: '100%' }}*/
                style={{height: '200px', width: '100%', objectFit: 'cover'}}
              />
            </div>
            <h2>{pet.name}</h2>
            <p>Age: {pet.age}</p>
            <p>Species: {pet.species}</p>
            <p>Date Entered: {pet.date_entered}</p>
            <p>
              In shelter for{" "}
              <strong>{calculateDaysInShelter(pet.date_entered)} days</strong>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pets;
