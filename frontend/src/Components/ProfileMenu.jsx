import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import useAuth from '../hooks/useAuth';
import { FaCog, FaSignOutAlt, FaUser, FaPen } from 'react-icons/fa';

function ProfileMenu() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (  
    <div className="relative flex items-center cursor-pointer">
      {user?.profilePic ? (
        <img
          src={user.profilePic}
          alt="Profile"
          className={`w-9 h-9 rounded-full object-cover mr-2 transition-transform duration-300 ease-in-out ${dropdownVisible ? 'rotate-180' : ''}`}
          onClick={toggleDropdown}
        />
      ) : (
        <CgProfile className={`w-9 h-9 mr-2 transition-transform duration-300 ease-in-out`} onClick={toggleDropdown} />
      )}

      <div className={`absolute top-full right-0 bg-white rounded-md shadow-lg overflow-hidden z-50 min-w-[160px] transform ${dropdownVisible ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'} transition-all duration-300 ease-in-out`}>
        {isAuthenticated && user ? (
          <>
            <div className="p-4 border-b border-gray-200">
              <p className="font-bold mb-1">{`${user.firstName || 'User'} ${user.lastName || ''}`}</p>
              <p className="text-sm text-gray-500">{user.email || 'No email available'}</p>
            </div>

            <Link to='/profile' className="px-4 py-3 hover:bg-teal-100 flex items-center">
              < FaUser className='w-[20px] h-[20px] mr-2' />
              My Profile
            </Link>

            <Link to='/create-blog' className="flex items-center px-4 py-3 hover:bg-teal-100">
              < FaPen className='w-[20px] h-[20px] mr-2' />
              Create Blog
            </Link>

            <Link to='/settings' className="flex items-center px-4 py-3 hover:bg-teal-100">
              < FaCog className='w-[20px] h-[20px] mr-2' />
              Settings
            </Link>

            <button onClick={handleLogout} className="flex items-center w-full text-left px-4 py-3 hover:bg-teal-100">
              < FaSignOutAlt className='w-[20px] h-[20px] mr-2' />
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to='/login' className="block px-4 py-3 hover:bg-teal-100">Login</Link>
            <Link to='/signup' className="block px-4 py-3 hover:bg-teal-100">Signup</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default ProfileMenu;
