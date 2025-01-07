import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const AdoptionForm = ({ pets }) => {
  const API_GATEWAY_BASE_URL = import.meta.env.VITE_API_GATEWAY_URL;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    pets: [] // Updated to an array to store multiple pets
  });

  const [errors, setErrors] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, options } = e.target;

    if (name === 'pets') {
      const selectedPets = Array.from(options)
        .filter(option => option.selected)
        .map(option => JSON.parse(option.value));

      setFormData({ ...formData, [name]: selectedPets });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    const newApplication = {
      applicant_name: formData.name,
      email: formData.email,
      phone: formData.phone,
      pets: formData.pets, // Include the array of pets
      submitted_at: new Date().toISOString() // Add the current timestamp here
    };
    console.log("application", newApplication)

    // alert("backend not configured")

    axios.post(`${API_GATEWAY_BASE_URL}/adoptions`, newApplication)
      .then(res => {
        console.log(res.data);
        alert("Your adoption has been submitted successfully. One of our representatives will email you.")
        // navigate(`/applications/${res.data.id}`);
        navigate("/")
      })
      .catch(err => {
        console.log(err);
        setErrors(err);
      });
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        {errors ? <div className="error">{JSON.stringify(errors)}</div> : null}
        <div className="form-group">
          <label htmlFor="name">Your Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Your Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Your Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="123-456-7890"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="pets">Select Pets:</label>
          <select
            id="pets"
            name="pets"
            onChange={handleChange}
            multiple
            required
            defaultValue={[]}
          >
            {pets.map((pet) => (
              <option key={pet.id} value={JSON.stringify(pet)}>
                {pet.name} (ID: {pet.id})
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AdoptionForm;
