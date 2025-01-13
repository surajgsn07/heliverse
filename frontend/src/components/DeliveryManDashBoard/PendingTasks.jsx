import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosConfig/axiosConfig'; // Ensure you replace with your actual axios config
import { useSelector } from 'react-redux';

const PendingTasks = () => {
  const user = useSelector((state) => state.auth.user);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch the tasks from the API (dummy data used for testing)
  const fetchPendingTasks = async () => {
    
    try {
        const response = await axiosInstance.get(`/mealDelivery/${user?._id}`);
        if (response.data) {
          console.log("data : ",response.data)
            setTasks(response.data.data.filter((item) => item.status === 'Out for Delivery'));
            console.log(response.data.data.filter((item) => item.status === 'Out for Delivery'));
            setLoading(false);
        }
    } catch (error) {
        console.log("erro : " , error)
    }
  };

  useEffect(() => {
    if (user) {
      fetchPendingTasks();
    }
  }, [user]);

  // Handle marking a task as delivered
  const markAsDelivered = async (taskId) => {
    try {
        // Make an API request to accept the order (replace with your API call)
        await axiosInstance.put(`/mealDelivery/${taskId}`,{status:'Delivered'});
        
        setTasks((prevTasks) =>prevTasks.filter((task) => task._id !== taskId));
      } catch (err) {
        setError('Failed to accept the order');
      }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Pending Tasks</h1>
      {tasks.length === 0 ? (
        <div className="text-center">No pending tasks at the moment.</div>
      ) : (
        <div>
          {tasks.map((task) => (
            <div key={task._id} className="border border-gray-200 rounded-lg p-4 mb-4 bg-white shadow-md">
              <div className="flex flex-col">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Task ID: {task._id}</span>
                  <span className="text-sm text-gray-500">{new Date(task.timestamps).toLocaleDateString()}</span>
                </div>
                <div className="mb-2">
                  <strong>Patient Name:</strong> {task.patientId?.name || 'N/A'}
                </div>
                <div className="mb-2">
                  <strong>Pantry:</strong> {task.pantryId?.name || 'N/A'}
                </div>
                <div className="mb-4">
                  <strong>Status:</strong> <span className="text-yellow-700">{task.status}</span>
                </div>
                <button
                  onClick={() => markAsDelivered(task._id)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Mark as Delivered
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingTasks;
