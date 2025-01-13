import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosConfig/axiosConfig';
import { useSelector } from 'react-redux';

const NewOrders = () => {
  const user = useSelector((state) => state.auth.user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch the orders from the API
  const fetchNewOrders = async () => {
    
    try {
        const response = await axiosInstance.get(`/mealDelivery/${user?._id}`) ;
        if (response.data) {
            console.log("re :" , response)
            setOrders(response.data.data.filter((item) => item.status === 'Prepared'));
            setLoading(false);
        }
    } catch (error) {
        console.log("error : " , error)
    }
  };

  useEffect(() => {
    if (user) {
      fetchNewOrders();
    }
  }, [user]);

  // Handle accepting an order
  const acceptOrder = async (orderId) => {
    try {
      // Make an API request to accept the order (replace with your API call)
      await axiosInstance.put(`/mealDelivery/${orderId}`,{status:'Out for Delivery'});
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: 'Out for Delivery' } : order
        )
      );
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

  // Filter the orders to show only those that are 'Prepared'
  const preparedOrders = orders.filter((order) => order.status === 'Prepared');

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">New Orders</h1>
      {preparedOrders.length === 0 ? (
        <div className="text-center">No orders are prepared at the moment.</div>
      ) : (
        <div>
          {preparedOrders.map((order) => (
            <div key={order._id} className="border border-gray-200 rounded-lg p-4 mb-4 bg-white shadow-md">
              <div className="flex flex-col">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Order ID: {order._id}</span>
                  <span className="text-sm text-gray-500">{new Date(order.timestamps).toLocaleDateString()}</span>
                </div>
                <div className="mb-2">
                  <strong>Patient Name:</strong> {order.patientId?.name || 'N/A'}
                </div>
                <div className="mb-2">
                  <strong>Pantry:</strong> {order.pantryId?.name || 'N/A'}
                </div>
                <div className="mb-2">
                  <strong>Shift:</strong> {order.shift}
                </div>
                <div className="mb-4">
                  <strong>Status:</strong> <span className="text-yellow-700">{order.status}</span>
                </div>
                <button
                  onClick={() => acceptOrder(order._id)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Accept Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewOrders;
