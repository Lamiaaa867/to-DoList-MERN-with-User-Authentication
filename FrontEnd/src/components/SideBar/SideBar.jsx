import React , {useContext} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiLogOut, FiUsers, FiClipboard, FiPlusSquare, FiHome } from 'react-icons/fi';
 import { UserContext } from '../../Context/UserContext';
export default function SideBar() {
  const location = useLocation();
  const navigate = useNavigate();
 const {setuserLogin}=useContext(UserContext)
 
  const navItems = [
    { name: 'Dashboard', icon: <FiHome />, path: '/' },
    { name: 'Update User Data', icon: <FiClipboard />, path: '/update-user-data' },
    { name: 'Create Task', icon: <FiPlusSquare />, path: '/create-task' },
    { name: 'Display User Data', icon: <FiUsers />, path: '/profile' },
  ];

  const handleLogout = async () => {
    try {
      await axios.post(`http://localhost:${import.meta.env.VITE_BACKPORT}/auth/logout`, {},{
        withCredentials: true,
      });
      localStorage.removeItem("user");
      setuserLogin(null);
      navigate('/login');
      localStorage.removeItem("user") 
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <aside className="min-h-screen w-64 bg-white  p-6 flex flex-col justify-between">
        
      <div>
      <h6 className="text-xl font-bold text-gray-600">To-Do-List</h6>
        {/* Profile */}
        <div className="flex flex-col items-center text-center mb-6">
          <img
            src="https://i.pravatar.cc/100"
            alt="profile"
            className="w-20 h-20 rounded-full mb-2"
          />
        
        </div>

        {/* Navigation */}
        <nav className="space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2 rounded-md text-gray-700 hover:bg-blue-100 transition ${
                location.pathname === item.path ? 'bg-blue-100 font-semibold text-blue-700' : ''
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 text-red-500 hover:text-red-600 text-sm mt-6"
      >
        <FiLogOut />
        Logout
      </button>
    </aside>
  );
}
