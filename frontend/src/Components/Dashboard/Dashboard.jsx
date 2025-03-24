import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function Dashboard() {
  // Student list data (static for now)
  const [students, setStudents] = useState([
    { name: 'Raju', id: 'S001', grade: 9.0, attendance: 95 },
    { name: 'Priya', id: 'S002', grade: 8.7, attendance: 90 },
    { name: 'Arun', id: 'S003', grade: 8.3, attendance: 88 },
    { name: 'Kavi', id: 'S004', grade: 7.9, attendance: 92 },
  ]);

  // Search input state
  const [searchTerm, setSearchTerm] = useState('');

  // Filtered students based on search
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.grade.toString().includes(searchTerm)
  );

  // Calculate dynamic data for cards
  const totalStudents = students.length;
  const averageGrade = students.length > 0
    ? (students.reduce((sum, student) => sum + student.grade, 0) / students.length).toFixed(1)
    : 0;
  const averageAttendance = students.length > 0
    ? (students.reduce((sum, student) => sum + student.attendance, 0) / students.length).toFixed(1)
    : 0;

  // Chart setup
  const chartRef = useRef(null);
  useEffect(() => {
    const ctx = document.getElementById('myChart').getContext('2d');
    if (chartRef.current) {
      chartRef.current.destroy();
    }
    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6','Sem 7','Sem 8'],
        datasets: [
          {
            label: 'Grades',
            data: [7.8, 8.2, 8.0, 8.5, 9.0, 8.7,9.0,7.8],
            borderColor: '#ff6200',
            backgroundColor: 'rgba(255, 98, 0, 0.2)',
            fill: true,
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 10,
            title: { display: true, text: 'Grade' },
          },
          x: {
            title: { display: true, text: 'Semester' },
          },
        },
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-900">Total Students</h2>
          <p className="mt-2 text-3xl font-bold text-gray-900">{totalStudents}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-900">Average Grade</h2>
          <p className="mt-2 text-3xl font-bold text-gray-900">{averageGrade}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-900">Attendance Rate</h2>
          <p className="mt-2 text-3xl font-bold text-gray-900">{averageAttendance}%</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Performance Trends</h2>
        <div className="bg-white p-6 rounded-lg shadow">
          <canvas id="myChart"></canvas>
        </div>
      </div>

      {/* Table Section with Search */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Student List</h2>
        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by Name, ID, or Grade..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        {/* Table */}
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Attendance Rate
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{student.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{student.grade}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{student.attendance}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;