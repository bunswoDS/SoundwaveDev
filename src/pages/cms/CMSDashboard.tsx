import React from 'react';
import { Link } from 'react-router-dom';

const CMSDashboard: React.FC = () => {
  const stats = [
    { title: 'Total Sounds', value: 120 },
    { title: 'Categories', value: 6 },
    { title: 'Languages', value: 2 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Content Management Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">{stat.title}</h3>
            <p className="text-3xl font-bold mt-2">{stat.value}</p>
          </div>
        ))}
      </div>
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Quick Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/cms/sounds" className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg text-center">
            Manage Sounds
          </Link>
          <Link to="/cms/categories" className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-lg text-center">
            Manage Categories
          </Link>
          <Link to="/cms/languages" className="bg-purple-500 hover:bg-purple-600 text-white p-4 rounded-lg text-center">
            Manage Languages
          </Link>
        </div>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recent Activity</h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="divide-y divide-gray-200">
            <div className="p-4 flex justify-between items-center">
              <p>Sound "Dog Bark" added to Animals category</p>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
            <div className="p-4 flex justify-between items-center">
              <p>French localization updated</p>
              <span className="text-sm text-gray-500">1 day ago</span>
            </div>
            <div className="p-4 flex justify-between items-center">
              <p>New category "Music" created</p>
              <span className="text-sm text-gray-500">3 days ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CMSDashboard;
