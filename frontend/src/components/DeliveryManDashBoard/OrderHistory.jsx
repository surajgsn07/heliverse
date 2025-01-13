import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosConfig/axiosConfig';
import { useSelector } from 'react-redux';

const OrderHistory = () => {
  const user = useSelector((state) => state.auth.user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrderHistory = async () => {
    try {
      const response = await axiosInstance.get(`/mealDelivery/${user?._id}`);
      if (response.data) {
        setOrders(response.data.data.filter((item) => item.status === 'Delivered'));
        setLoading(false);
      }
    } catch (err) {
      console.error('Failed to fetch order history:', err);
      setError('Failed to fetch order history.');
      setLoading(false);
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchOrderHistory();
    }
  }, [user]);



  const getStatusClass = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-700';
      case 'Out for Delivery':
        return 'bg-blue-100 text-blue-700';
      case 'Prepared':
        return 'bg-yellow-100 text-yellow-700';
      case 'Pending':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
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
      <h1 className="text-2xl font-bold mb-4">Order History</h1>

      {/* Table for larger screens */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">Order ID</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Patient Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Pantry</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Shift</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{order._id}</td>
                <td className="border border-gray-300 px-4 py-2">{order.patientId?.name || 'N/A'}</td>
                <td className="border border-gray-300 px-4 py-2">{order.pantryId?.name || 'N/A'}</td>
                <td className="border border-gray-300 px-4 py-2">{new Date(order.timestamps).toLocaleDateString()}</td>
                <td className="border border-gray-300 px-4 py-2">{order.shift}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(order.status)}`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards for smaller screens */}
      <div className="sm:hidden">
        {orders.map((order, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4 bg-white shadow-md">
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
              <div>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(order.status)}`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
