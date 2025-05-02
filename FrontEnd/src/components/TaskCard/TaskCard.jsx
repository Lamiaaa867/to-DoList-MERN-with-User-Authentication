import React from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

export default function TaskCard({ task, onDelete, onEdit }) {
  const { title, description, status, deadline, _id } = task;

  return (
    <div className="bg-white rounded-lg shadow p-4 w-full sm:w-[330px] relative pb-10">
      <div className="flex justify-between mb-2">
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
          status === 'Pending' ? 'bg-purple-100 text-purple-800'
          : status === 'In Progress' ? 'bg-blue-100 text-blue-800'
          : 'bg-green-100 text-green-800'
        }`}>
          {status}
        </span>
      </div>

      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-sm text-gray-600 line-clamp-2 mb-3">{description}</p>

      <div className="flex justify-between text-xs text-gray-500 mt-3">
        <span>Deadline: {deadline}</span>
      </div>

      {/* Bottom right edit/delete buttons */}
      <div className="absolute bottom-3 right-4 flex gap-3">
      <button onClick={() => onEdit(task)} className="text-blue-500 hover:text-blue-700">
    <FiEdit2 size={18} />
  </button>
        <button
          onClick={() => onDelete(_id)}
          className="text-red-600 hover:text-red-800"
          title="Delete Task"
        >
          <FiTrash2 size={18} />
        </button>
      </div>
    </div>
  );
}
