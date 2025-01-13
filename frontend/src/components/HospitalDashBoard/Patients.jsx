import React, { useState, useEffect } from "react";
import axiosInstance from "../../axiosConfig/axiosConfig";
import { useNavigate } from "react-router-dom";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    ageMin: "",
    ageMax: "",
    diseases: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/patient/getall");
        if (response.data) {
          setPatients(response.data.data);
          setFilteredPatients(response.data.data); // Initialize with all patients
        }
      } catch (err) {
        setError("Error fetching patients data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    const { name, ageMin, ageMax, diseases } = filters;
    let filtered = [...patients];

    if (name) {
      filtered = filtered.filter((patient) =>
        patient.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    if (ageMin) {
      filtered = filtered.filter((patient) => patient.age >= parseInt(ageMin));
    }

    if (ageMax) {
      filtered = filtered.filter((patient) => patient.age <= parseInt(ageMax));
    }

    if (diseases) {
      const diseaseArray = diseases
        .split(",")
        .map((disease) => disease.trim().toLowerCase());
      filtered = filtered.filter((patient) =>
        patient.diseases.some((disease) =>
          diseaseArray.includes(disease.toLowerCase())
        )
      );
    }

    setFilteredPatients(filtered);
  };

  const resetFilters = () => {
    setFilters({ name: "", ageMin: "", ageMax: "", diseases: "" });
    setFilteredPatients(patients);
  };

  const handleViewDetails = (id) => {
    navigate(`/hospitalManager/dashboard/patient/${id}`);
  };

  if (loading) {
    return <div>Loading patients data...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-6xl mx-auto">
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <input
          type="text"
          name="name"
          placeholder="Search by Name"
          value={filters.name}
          onChange={handleFilterChange}
          className="w-full md:w-1/4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="number"
          name="ageMin"
          placeholder="Min Age"
          value={filters.ageMin}
          onChange={handleFilterChange}
          className="w-full md:w-1/4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="number"
          name="ageMax"
          placeholder="Max Age"
          value={filters.ageMax}
          onChange={handleFilterChange}
          className="w-full md:w-1/4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          name="diseases"
          placeholder="Diseases (comma separated)"
          value={filters.diseases}
          onChange={handleFilterChange}
          className="w-full md:w-1/4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={applyFilters}
          className="text-white bg-blue-500 px-4 py-2 rounded-md shadow-md"
        >
          Apply Filters
        </button>
        <button
          onClick={resetFilters}
          className="text-white bg-gray-500 px-4 py-2 rounded-md shadow-md"
        >
          Reset
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-blue-100 text-left text-blue-600 font-semibold">
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Diseases</th>
              <th className="px-6 py-3">Age</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient, index) => (
              <tr
                key={index}
                className={`border-t ${index % 2 === 0 ? "bg-gray-50" : ""}`}
              >
                <td className="px-6 py-3">{patient.name}</td>
                <td className="px-6 py-3">{patient.diseases?.join(", ")}</td>
                <td className="px-6 py-3">{patient.age}</td>
                <td className="px-6 py-3">
                  <button
                    onClick={() => handleViewDetails(patient._id)}
                    className="text-white bg-blue-500 px-4 py-2 rounded-md shadow-md"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Patients;
