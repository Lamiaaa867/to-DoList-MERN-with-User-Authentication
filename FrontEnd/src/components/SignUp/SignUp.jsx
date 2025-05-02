import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUp() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (formValues) => {
    setLoading(true);

    axios.post(`http://localhost:${import.meta.env.VITE_BACKPORT}/auth/signup`, formValues, {
      withCredentials: true,
    })
      .then((response) => {
        if (response.data.message === 'success') {
          toast.success('Signed up successfully!', {
            position: 'top-right',
            autoClose: 1500,
          });
          setTimeout(() => {
            navigate('/login');
          }, 1500);
        }
      })
      .catch(() => {
        toast.error('Signup failed. Try again.', {
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
      name: '',
      phone: '',
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(4, 'Must be 4 characters or more')
        .max(10, 'Must be 10 characters or less')
        .required('Required'),
      phone: Yup.string()
        .min(8, 'Must be at least 8 digits')
        .required('Required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      password: Yup.string()
        .matches(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
          'Password must contain at least 8 characters, one uppercase, one lowercase, and one number'
        )
        .required('Required'),
    }),
    onSubmit: handleSubmit
  });

  const isSubmitDisabled = !formik.isValid || !formik.dirty || loading;

  return (
    <>
      <ToastContainer />

      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-white/20 backdrop-blur border border-white/30 shadow-xl rounded-2xl p-8 w-full max-w-xl">
          <h2 className="text-3xl font-bold text-pink-800 text-center mb-6">Sign Up</h2>

          <form onSubmit={formik.handleSubmit}>

            {/* Name */}
            <div className="mb-5">
              <input
                type="text"
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.name}
                id="name"
                className="w-full px-4 py-2 bg-white/30 text-pink placeholder-white rounded-md border border-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Full Name"
                required
              />
              {formik.touched.name && formik.errors.name && (
                <p className="mt-1 text-sm text-red-800">{formik.errors.name}</p>
              )}
            </div>

            {/* Phone */}
            <div className="mb-5">
              <input
                type="tel"
                name="phone"
                id="phone"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.phone}
                className="w-full px-4 py-2 bg-white/30 text-pink placeholder-white rounded-md border border-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Phone Number"
                required
              />
              {formik.touched.phone && formik.errors.phone && (
                <p className="mt-1 text-sm text-red-800">{formik.errors.phone}</p>
              )}
            </div>

            {/* Email */}
            <div className="mb-5">
              <input
                type="email"
                name="email"
                id="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
                className="w-full px-4 py-2 bg-white/30 text-pink placeholder-white rounded-md border border-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                 placeholder="Email Address"
                required
              />
              {formik.touched.email && formik.errors.email && (
                <p className="mt-1 text-sm text-red-800">{formik.errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="mb-5">
              <input
                type="password"
                name="password"
                id="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.password}
                className="w-full px-4 py-2 bg-white/30 text-pink placeholder-white rounded-md border border-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Password"
                required
              />
              {formik.touched.password && formik.errors.password && (
                <p className="mt-1 text-sm text-red-800">{formik.errors.password}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitDisabled}
              className={`w-full py-2 px-4 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-md transition duration-200 ${
                isSubmitDisabled ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>

            {/* Link to login */}
            <p className="mt-4 text-center text-pink">
              Already have an account?{' '}
              <Link to="/login" className="text-pink-800 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
