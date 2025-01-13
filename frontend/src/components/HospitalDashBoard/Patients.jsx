import React, { useState, useEffect } from "react";
import axiosInstance from "../../axiosConfig/axiosConfig";
import { useNavigate } from "react-router-dom";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    diseases: [],
    roomNumber: "",
    bedNumber: "",
    floorNumber: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/patient/getall");
        if (response.data) {
          setPatients(response.data.data);
        }
      } catch (err) {
        setError("Error fetching patients data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const handleOpenModal = (patient = null) => {
    if (patient) {
      setSelectedPatient(patient);
      setFormData({
        name: patient.name,
        age: patient.age,
        diseases: patient.diseases,
        roomNumber: patient.roomNumber,
        bedNumber: patient.bedNumber,
        floorNumber: patient.floorNumber,
      });
    } else {
      setSelectedPatient(null);
      setFormData({
        name: "",
        age: "",
        diseases: [],
        roomNumber: "",
        bedNumber: "",
        floorNumber: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPatient(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "diseases") {
      const diseases = value.split(",").map((disease) => disease.trim());
      setFormData((prev) => ({ ...prev, [name]: diseases }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdatePatient = (patientId) => {
    navigate(`/hospitalManager/dashboard/patient/${patientId}`)
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedPatient) {
        // Update existing patient
        const response = await axiosInstance.put(
          `/patient/${selectedPatient._id}`,
          formData
        );
        if (response.data) {
          setPatients((prev) =>
            prev.map((p) =>
              p._id === selectedPatient._id ? response.data.data : p
            )
          );
        }
      } else {
        // Add new patient
        const response = await axiosInstance.post("/patient/", formData);
        if (response.data) {
          setPatients((prev) => [...prev, response.data.data]);
        }
      }
      handleCloseModal();
    } catch (err) {
      alert("Error saving patient.");
    }
  };

  if (loading) {
    return <div>Loading patients data...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-blue-600">Patient Records</h2>
        <button
          onClick={() => handleOpenModal()}
          className="text-white bg-green-500 px-4 py-2 rounded-md shadow-md"
        >
          Add Patient
        </button>
      </div>

      <div className="hidden md:block overflow-x-auto">
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
            {patients.map((patient, index) => (
              <tr
                key={index}
                className={`border-t ${index % 2 === 0 ? "bg-gray-50" : ""}`}
              >
                <td className="px-6 py-3">{patient.name}</td>
                <td className="px-6 py-3">
                  {patient.diseases?.join(", ")}
                </td>
                <td className="px-6 py-3">{patient.age}</td>
                <td className="px-6 py-3">
                  <button
                    onClick={()=>handleUpdatePatient(patient?._id)}
                    className="text-white bg-blue-500 px-3 py-1 rounded-md shadow-md"
                  >
                    Dashboard
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden">
  {patients.map((patient, index) => (
    <div
      key={index}
      className={`border rounded-lg p-4 shadow-md ${
        index % 2 === 0 ? "bg-gray-50" : "bg-white"
      } mb-4`}
    >
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold text-blue-600 text-lg">{patient.name}</h2>
        <button
          onClick={() => handleUpdatePatient(patient?._id)}
          className="text-white bg-blue-500 px-3 py-1 rounded-md shadow-md"
        >
          Dashboard
        </button>
      </div>
      <p className="text-gray-600">
        <span className="font-semibold">Diseases:</span>{" "}
        {patient.diseases?.join(", ")}
      </p>
      <p className="text-gray-600">
        <span className="font-semibold">Age:</span> {patient.age}
      </p>
    </div>
  ))}
</div>


      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">
              {selectedPatient ? "Update Patient" : "Add Patient"}
            </h2>
            <form onSubmit={handleFormSubmit}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Diseases (Comma Separated)
                  </label>
                  <input
                    type="text"
                    name="diseases"
                    value={formData.diseases?.join(", ")}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Room Number
                  </label>
                  <input
                    type="text"
                    name="roomNumber"
                    value={formData.roomNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bed Number
                  </label>
                  <input
                    type="text"
                    name="bedNumber"
                    value={formData.bedNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Floor Number
                  </label>
                  <input
                    type="number"
                    name="floorNumber"
                    value={formData.floorNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-300 rounded-md text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Patients;
