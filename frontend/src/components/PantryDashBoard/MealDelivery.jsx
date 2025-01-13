import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../axiosConfig/axiosConfig";

const MealDeliveriesList = () => {
  const dummyDeliveries = [
    {
      _id: "1",
      patientName: "John Doe",
      pantryName: "Pantry A",
      deliveryPersonName: "Alice",
      status: "Prepared",
      timestamps: new Date().toLocaleString(),
    },
    {
      _id: "2",
      patientName: "Jane Smith",
      pantryName: "Pantry B",
      deliveryPersonName: "Bob",
      status: "Out for Delivery",
      timestamps: new Date().toLocaleString(),
    },
    {
      _id: "3",
      patientName: "Mike Johnson",
      pantryName: "Pantry C",
      deliveryPersonName: "Charlie",
      status: "Delivered",
      timestamps: new Date().toLocaleString(),
    },
  ];

  const [assignedTasks, setassignedTasks] = useState([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const user = useSelector((state) => state.auth.user);
  

  const getAllTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get(`/mealDelivery/pantry/${user?._id}`);
      if(response.data){
        console.log("Res : " , response.data.data)
        
        setassignedTasks(response.data.data);
        
      }
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch tasks");
      setLoading(false);
    }
  };
  

  useEffect(() => {
    if(user){
      getAllTasks()
    }

  }, [user])


  return (
    <div className="p-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Meal Deliveries</h2>
      {assignedTasks.filter((task) => task.status.toLowerCase() !== "delivered").length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assignedTasks.map((delivery) => (
            <div
              key={delivery._id}
              className="bg-white rounded-lg shadow-md p-4 transition-transform transform hover:scale-105"
            >
              <p className="text-xl font-semibold text-gray-800 mb-2">
                Patient: <span className="text-blue-600">{delivery.patientId?.name}</span>
              </p>
              <p className="text-gray-600">
                <strong>Pantry:</strong> {delivery.pantryId?.name}
              </p>
              <p className="text-gray-600">
                <strong>Delivery Person:</strong> {delivery.deliveryPersonId?.name || "N/A"}
              </p>
              <p
                className={`text-sm font-medium ${
                  delivery.status === "Prepared"
                    ? "text-yellow-600"
                    : delivery.status === "Out for Delivery"
                    ? "text-blue-600"
                    : "text-green-600"
                }`}
              >
                <strong>Status:</strong> {delivery.status}
              </p>
              <p className="text-gray-500 text-sm">
                <strong>Time:</strong> {delivery.timestamps}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">No deliveries found.</div>
      )}
    </div>
  );
};

export default MealDeliveriesList;
