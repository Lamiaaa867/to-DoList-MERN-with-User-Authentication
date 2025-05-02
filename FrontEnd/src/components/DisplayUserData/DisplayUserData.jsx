import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function DisplayUserData() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`http://localhost:${import.meta.env.VITE_BACKPORT}/user/display`, {
          withCredentials: true,
        });
        setUser(res.data.user);
        setTasks(res.data.tasks);
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  if (!user) {
    return <p className="text-center text-red-500">User not found.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">User Info</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">User Tasks</h2>
        {tasks.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task, idx) => (
              <div key={idx} className="border rounded-lg p-4 shadow-sm">
                <h3 className="font-bold text-lg">{task.title}</h3>
                <p className="text-sm text-gray-600">{task.description}</p>
                <p className="mt-2"><strong>Status:</strong> {task.status}</p>
                <p><strong>Deadline:</strong> {new Date(task.deadline).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No tasks found.</p>
        )}
      </div>
    </div>
  );
}
