import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateProfile = () => {
  const [patientData, setPatientData] = useState({
    name: '',
    email: '',
    age: '',
    gender: '',
    contactInfo: '',
    emergencyContact: '',
    roomNumber: '',
    bedNumber: '',
    floorNumber: '',
    diseases: [],
    allergies: []
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch patient data when the component mounts
  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        // Assuming patient is logged in and token is saved in localStorage
        const token = localStorage.getItem('authToken');
        const response = await axios.get('/api/patient/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPatientData(response.data);
      } catch (err) {
        setError('Failed to fetch patient data');
      }
    };

    // fetchPatientData();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle diseases and allergies input (multiple values)
  const handleArrayChange = (e, field) => {
    const { value } = e.target;
    const updatedArray = value.split(',').map(item => item.trim());
    setPatientData((prevState) => ({
      ...prevState,
      [field]: updatedArray
    }));
  };

  // Submit the updated profile data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.put('/api/patient/profile', patientData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setLoading(false);
      alert('Profile updated successfully');
      // Optionally, redirect the user or update state based on response
    } catch (err) {
      setLoading(false);
      setError('Failed to update profile');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Update Profile</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block font-medium">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={patientData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block font-medium">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={patientData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            disabled
          />
        </div>

        <div>
          <label htmlFor="age" className="block font-medium">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={patientData.age}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="gender" className="block font-medium">Gender</label>
          <select
            id="gender"
            name="gender"
            value={patientData.gender}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            required
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="contactInfo" className="block font-medium">Contact Info</label>
          <input
            type="text"
            id="contactInfo"
            name="contactInfo"
            value={patientData.contactInfo}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="emergencyContact" className="block font-medium">Emergency Contact</label>
          <input
            type="text"
            id="emergencyContact"
            name="emergencyContact"
            value={patientData.emergencyContact}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="diseases" className="block font-medium">Diseases (comma separated)</label>
          <input
            type="text"
            id="diseases"
            value={patientData?.diseases?.join(', ')}
            onChange={(e) => handleArrayChange(e, 'diseases')}
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="allergies" className="block font-medium">Allergies (comma separated)</label>
          <input
            type="text"
            id="allergies"
            value={patientData.allergies.join(', ')}
            onChange={(e) => handleArrayChange(e, 'allergies')}
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="roomNumber" className="block font-medium">Room Number</label>
          <input
            type="text"
            id="roomNumber"
            name="roomNumber"
            value={patientData.roomNumber}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="bedNumber" className="block font-medium">Bed Number</label>
          <input
            type="text"
            id="bedNumber"
            name="bedNumber"
            value={patientData.bedNumber}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="floorNumber" className="block font-medium">Floor Number</label>
          <input
            type="number"
            id="floorNumber"
            name="floorNumber"
            value={patientData.floorNumber}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
