import React, { useState } from 'react';
import axios from 'axios';

export default function NavBar({ onSearchResults }) {
  const [searchKey, setSearchKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [noMatchMessage, setNoMatchMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchKey.trim()) return;

    try {
      setLoading(true);
      setNoMatchMessage('');
      const { data } = await axios.get(
        `http://localhost:${import.meta.env.VITE_BACKPORT}/task/search/${searchKey}`,
        { withCredentials: true }
      );

      onSearchResults(data.tasks);

      if (data.tasks.length === 0) {
        setNoMatchMessage(`No tasks found matching: "${searchKey}"`);
      } else {
        setNoMatchMessage('');
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setNoMatchMessage('An error occurred. Please try again.');
      onSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setSearchKey(e.target.value);
    if (noMatchMessage) {
      setNoMatchMessage('');
    }

    if (e.target.value === '') {
   
      onSearchResults(null);
    }
  };

  const handleFocus = () => {
    if (noMatchMessage) {
      setNoMatchMessage('');
    }
  };

  return (
    <header className="flex flex-col md:flex-row items-center justify-between gap-4 px-6 py-4 bg-white shadow-md">
      <h1 className="text-3xl font-extrabold text-blue-700">📝 To-Do List</h1>

      <form onSubmit={handleSubmit} className="relative w-full max-w-md">
        <input
          type="search"
          id="task-search"
          className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search tasks by title..."
          value={searchKey}
          onChange={handleInputChange}
          onFocus={handleFocus}
        />
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <button
          type="submit"
          className="absolute end-2.5 bottom-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1.5 rounded-lg"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {noMatchMessage && (
        <p className="text-red-600 text-sm mt-2 md:mt-0 text-center w-full">
          {noMatchMessage}
        </p>
      )}
    </header>
  );
}
