import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import styles

export default function AddTaskForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const user = localStorage.getItem("user");
 const userid = user._id
  const handleSubmit = (formValues) => {
    setLoading(true);

    axios
      .post(`http://localhost:${import.meta.env.VITE_BACKPORT}/task/addtask`, formValues, {
        withCredentials: true,
      })
      .then((response) => {
      
        if (response.data.message === 'success') {
          toast.success('Task Added Successfully', {
            position: 'top-right',
            autoClose: 1500,
          });
          setTimeout(() => {
            navigate('/');
          }, 1500);
        }
      })
      .catch((error) => {
        toast.error('Adding New Task failed. Try again.', {
          position: 'top-right',
          autoClose: 3000,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      status: 'pending',
      deadline: '',
      userid: userid,
    },
    onSubmit: handleSubmit,
  });

  const isSubmitDisabled = !formik.isValid || !formik.dirty || loading;

  return (
    <>
      <ToastContainer />
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-4"
      >
        <h2 className="text-xl font-bold mb-2">Add New Task</h2>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            name="title"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.title}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.description}
            rows="3"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Status</label>
          <select
            name="status"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.status}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="pending">pending</option>
            <option value="inprogress">inprogress</option>
            <option value="completed">completed</option>
          </select>
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Deadline</label>
          <input
            type="date"
            name="deadline"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.deadline}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitDisabled}
          className={`flex items-center gap-2 justify-center text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center transition-all duration-200 ease-in-out ${
            isSubmitDisabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-4 w-4 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              New Task Adding...
            </>
          ) : (
            'Add Task'
          )}
        </button>
      </form>
    </>
  );
}
