import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskCard from '../TaskCard/TaskCard';
import { toast } from 'react-toastify';
import NavBar from '../NavBar/NavBar';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');
  const [editingTask, setEditingTask] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedStatus, setEditedStatus] = useState('');

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`http://localhost:${import.meta.env.VITE_BACKPORT}/task/getall`, {
        withCredentials: true,
      });
      if (response.data.tasks) {
        setTasks(response.data.tasks);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSearchResults = (results) => {
    if (results === null) {
      // If search bar cleared, reload all tasks
      fetchTasks();
    } else {
      setTasks(results);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      const res = await axios.delete(`http://localhost:${import.meta.env.VITE_BACKPORT}/task/deletetask/${taskId}`, {
        withCredentials: true,
      });

      if (res.data.message === 'task deleted') {
        toast.success('Task deleted');
        setTasks(tasks.filter((task) => task._id !== taskId));
      } else {
        toast.error('Delete failed');
      }
    } catch (error) {
      toast.error('Error deleting task');
    }
  };

  const startEdit = (task) => {
    setEditingTask(task);
    setEditedTitle(task.title);
    setEditedDescription(task.description);
    setEditedStatus(task.status);
  };

  const cancelEdit = () => {
    setEditingTask(null);
    setEditedTitle('');
    setEditedDescription('');
    setEditedStatus('');
  };

  const handleEditSubmit = async () => {
    try {
      const res = await axios.patch(
        `http://localhost:${import.meta.env.VITE_BACKPORT}/task/edittask/${editingTask._id}`,
        {
          title: editedTitle,
          description: editedDescription,
          status: editedStatus,
        },
        {
          withCredentials: true,
        }
      );

      if (res.data.message === 'Task updated') {
        toast.success('Task updated');
        fetchTasks();
        cancelEdit();
      } else {
        toast.error('Update failed');
      }
    } catch (err) {
      toast.error('Error updating task');
    }
  };

  const filteredTasks =
    filter === 'All'
      ? tasks
      : tasks.filter((t) => t.status.toLowerCase() === filter.toLowerCase());

  return (
    <div className="p-6">
      <NavBar onSearchResults={handleSearchResults} />

      <div className="flex justify-between items-center mb-6 mt-4">
        <h2 className="text-2xl font-bold">My Tasks</h2>

        <div className="flex items-center gap-3">
          {['All', 'pending', 'inprogress', 'completed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`text-sm px-4 py-1.5 rounded-full transition-all duration-200 ${
                filter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="text-center text-gray-500 mt-20 text-lg">
          No tasks found. Start adding your To Do List 📋
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onDelete={handleDelete}
              onEdit={startEdit}
            />
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingTask && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Edit Task</h3>
            <input
              type="text"
              className="w-full mb-2 p-2 border rounded"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              placeholder="Title"
            />
            <textarea
              className="w-full mb-2 p-2 border rounded"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              placeholder="Description"
            />
            <select
              className="w-full mb-4 p-2 border rounded"
              value={editedStatus}
              onChange={(e) => setEditedStatus(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="inprogress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <div className="flex justify-end gap-3">
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={cancelEdit}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleEditSubmit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
