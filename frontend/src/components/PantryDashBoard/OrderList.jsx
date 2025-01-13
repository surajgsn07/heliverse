import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axiosInstance from '../../axiosConfig/axiosConfig';

const OrderList = () => {
  const dummyDeliveries = [
    {
      _id: "1",
      patientName: "John Doe",
      pantryName: "Pantry A",
      deliveryPersonName: "Alice",
      timestamps: new Date().toLocaleString(),
      shift: "Morning",
      patientId: "12345", // Mock patient ID
    },
    {
      _id: "2",
      patientName: "Jane Smith",
      pantryName: "Pantry B",
      deliveryPersonName: "Bob",
      timestamps: new Date().toLocaleString(),
      shift: "Afternoon",
      patientId: "67890", // Mock patient ID
    },
    {
      _id: "3",
      patientName: "Mike Johnson",
      pantryName: "Pantry C",
      deliveryPersonName: "Charlie",
      timestamps: new Date().toLocaleString(),
      shift: "Evening",
      patientId: "11223", // Mock patient ID
    },
  ];

  

  const [assignedTasks, setassignedTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [deliveryPersons, setdeliveryPersons] = useState([])

  
  const user = useSelector((state) => state.auth.user);

  const getAllTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get(`/mealDelivery/pantry/${user?._id}`);
      if(response.data){
        
        setassignedTasks(response.data.data);
        
      }
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch tasks");
      setLoading(false);
    }
  };

  

  const fetchDeliveryPersons = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get(`/delivery/getall`);
      if(response.data){
        console.log("data : " , response.data.data)
        setdeliveryPersons(response.data.data);
        
      }
      setLoading(false);
    } catch (err) {
      console.log("err : " , err)
      setError("Failed to fetch tasks");
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchDeliveryPersons();
  }, [])
  

  useEffect(() => {
    if(user){
      getAllTasks()
    }

  }, [user])

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedDeliveryPerson, setSelectedDeliveryPerson] = useState(null);
  const [showViewDetailsModal, setShowViewDetailsModal] = useState(false);
  const [showAcceptOrderModal, setShowAcceptOrderModal] = useState(false);

  // FINISH IT LAter
  const handleAcceptOrder = async(orderId, deliveryPersonId) => {
    try {
      
      const response = await axiosInstance.post(`/mealDelivery/assignDeliveryPerson`,{ deliveryId :orderId, deliveryPersonId });
      if(response.data){
        console.log("data : " , response.data.data)
        getAllTasks();
      }
    } catch (error) {
      console.log("error : " , error)
    }
    setShowAcceptOrderModal(false); // Close modal after accepting the order
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowViewDetailsModal(true);
  };

  const handleOpenAcceptOrderModal = (order) => {
    setSelectedOrder(order);
    setShowAcceptOrderModal(true);
  };

  
  return (
    <div className="p-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Meal Deliveries</h2>
      {assignedTasks.filter((delivery) => delivery.status === "Pending").length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assignedTasks.filter((delivery) => delivery.status === "Pending").map((delivery) => (
            <div
              key={delivery._id}
              className="bg-white rounded-lg shadow-md p-4 transition-transform transform hover:scale-105"
            >
              <p className="text-xl font-semibold text-gray-800 mb-2">
                Patient: <span className="text-blue-600">{delivery.patientName}</span>
              </p>
              <p className="text-gray-500 text-sm">
                <strong>Time:</strong> {delivery.timestamps}
              </p>

              <p className="text-gray-500 text-sm">
                <strong>Shift:</strong> {delivery.shift}
              </p>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => handleViewDetails(delivery)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 focus:outline-none"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleOpenAcceptOrderModal(delivery)}
                  className="px-4 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600 focus:outline-none"
                >
                  Accept Order
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">No deliveries found.</div>
      )}

      {/* View Details Modal */}
      {showViewDetailsModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-4">Patient Details</h3>
            <p><strong>Patient Name:</strong> {selectedOrder.patientId?.name}</p>
            <p><strong>Contact Info:</strong> {selectedOrder.patientId?.contactInfo}</p>
            <p><strong>Room Number:</strong> {selectedOrder.patientId?.roomNumber}</p>
            <p><strong>Bed Number:</strong> {selectedOrder.patientId?.bedNumber}</p>
            <p><strong>Floor Number:</strong> {selectedOrder.patientId?.floorNumber}</p>
            <p><strong>Shift:</strong> {selectedOrder.shift}</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowViewDetailsModal(false)}
                className="px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600 focus:outline-none"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Accept Order Modal */}
      {showAcceptOrderModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-4">Accept Order</h3>
            <p><strong>Patient Name:</strong> {selectedOrder.patientId?.name}</p>
            <p><strong>Shift:</strong> {selectedOrder.shift}</p>
            <p><strong>Pantry:</strong> {selectedOrder.pantryId?.name}</p>
            <p><strong>Delivery Person:</strong></p>
            <select
              onChange={(e) => setSelectedDeliveryPerson(deliveryPersons.find(dp => dp._id === e.target.value))}
              className="w-full p-2 border rounded-md mb-4"
            >
              <option value="">Select Delivery Person</option>
              {deliveryPersons.map((person) => (
                <option key={person._id} value={person._id}>
                  {person.name}
                </option>
              ))}
            </select>
            <div className="mt-4 flex justify-between">
              <button
                onClick={()=>handleAcceptOrder(selectedOrder?._id , selectedDeliveryPerson?._id)}
                disabled={!selectedDeliveryPerson}
                className="px-4 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600 focus:outline-none"
              >
                Accept Order
              </button>
              <button
                onClick={() => setShowAcceptOrderModal(false)}
                className="px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600 focus:outline-none"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderList;
