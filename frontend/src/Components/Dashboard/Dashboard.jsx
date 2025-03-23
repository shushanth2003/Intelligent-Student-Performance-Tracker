import React from 'react';

function Dashboard() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-900">Total Students</h2>
          <p className="mt-2 text-3xl font-bold text-gray-900">150</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-900">Average Grade</h2>
          <p className="mt-2 text-3xl font-bold text-gray-900">8.5</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-900">Attendance Rate</h2>
          <p className="mt-2 text-3xl font-bold text-gray-900">92%</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Performance Trends</h2>
        <div className="bg-white p-6 rounded-lg shadow">
          {/* Placeholder for a chart (add Chart.js later if you want) */}
          <canvas id="myChart"></canvas>
        </div>
      </div>

      {/* Table Section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Student List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grade
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Raju</td>
                <td className="px-6 py-4 whitespace-nowrap">S001</td>
                <td className="px-6 py-4 whitespace-nowrap">9.0</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Priya</td>
                <td className="px-6 py-4 whitespace-nowrap">S002</td>
                <td className="px-6 py-4 whitespace-nowrap">8.7</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Arun</td>
                <td className="px-6 py-4 whitespace-nowrap">S003</td>
                <td className="px-6 py-4 whitespace-nowrap">8.3</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;