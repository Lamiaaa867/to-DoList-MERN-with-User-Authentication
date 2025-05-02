import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import { data, Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../../Context/UserContext';
 
export default function Login() {
  let { userLogin,setuserLogin} = useContext(UserContext)
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const loginSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string()
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
        'Password must be 8+ characters with uppercase, lowercase & number'
      )
      .required('Required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      setLoading(true);
      axios
        .post(`http://localhost:${import.meta.env.VITE_BACKPORT}/auth/login`, values , {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.message === 'success') {
         localStorage.setItem("user", JSON.stringify(res.data.user));
           // localStorage.setItem('userid', res.data.user._id);
           setuserLogin(localStorage.getItem("user"))
           console.log("user login in login " , userLogin)
            toast.success('Logged in successfully!', {
              position: 'top-right',
              autoClose: 1500,
            });
            setTimeout(() => navigate('/'), 2000); // navigate after toast
          }
        })
        .catch((err) => {
          console.log("error message" , err.message)
          toast.error(err.response?.data?.message || 'Login failed', {
            position: 'top-right',
            autoClose: 3000,
          });
        })
        .finally(() => {

          setLoading(false);
        });
    },
  });

  const isSubmitDisabled = !formik.isValid || !formik.dirty || loading;
  return (
    <>
      <ToastContainer />

      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-white/20 backdrop-blur border border-white/30 shadow-xl rounded-2xl p-8 w-full max-w-xl">
          <h2 className="text-3xl font-bold text-pink-800 text-center mb-6">LogIn</h2>

     
        <form onSubmit={formik.handleSubmit}>
  
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
              {loading ? 'logging in ...' : 'LogIn'}
            </button>

            {/* Link to signup */}
            <p className="mt-4 text-center text-pink">
              Already have an account?{' '}
              <Link to="/signup" className="text-pink-800 hover:underline">
                SignUp
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}