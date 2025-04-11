import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function Dashboard() {
  // Student list data (initially empty, will be filled by backend)
  const [students, setStudents] = useState([]);
  const [averageGrade, setAverageGrade] = useState(0);
  const chartRef = useRef(null);
  const [semesterData, setSemesterData] = useState([]); // New state for average grade

  // Search input state
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch data from backend
  useEffect(() => {
    fetch('http://localhost:6969/api/students')
      .then(res => res.json())
      .then(data => setStudents(data))
      .catch(err => console.error('Error fetching students:', err));
  }, []);

  // Update average grade when students data changes
  useEffect(() => {
    if (students.length > 0) {
      const avg = (students.reduce((sum, student) => sum + student.totalCGPA, 0) / students.length).toFixed(1);
      setAverageGrade(avg);
    } else {
      setAverageGrade(0);
    }
  }, [students]); // Dependency on students state

  // Filtered students based on search
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.grade.toString().includes(searchTerm)
  );

  // Calculate dynamic data for cards
  const totalStudents = students.length;
  const averageAttendance = students.length > 0
    ? (students.reduce((sum, student) => sum + student.attendance, 0) / students.length).toFixed(1)
    : 0;

    useEffect(() => {
      // Fetch full student data with semester grades
      fetch('http://localhost:6969/api/students/full') // New endpoint needed
        .then(res => res.json())
        .then(data => {
          // Calculate average for each semester
          const averages = Array(8).fill(0).map((_, i) => {
            const sem = `sem${i + 1}`;
            const sum = data.reduce((acc, student) => acc + student[sem], 0);
            return (sum / data.length).toFixed(1);
          });
          setSemesterData(averages);
        })
        .catch(err => console.error('Error fetching semester data:', err));
    }, []);

    useEffect(() => {
      const ctx = document.getElementById('myChart').getContext('2d');
      if (chartRef.current) {
        chartRef.current.destroy();
      }
      chartRef.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7', 'Sem 8'],
          datasets: [
            {
              label: 'Average Grades',
              data: semesterData, // Dynamic data from backend
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
    }, [semesterData]);

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
                  <td className="px-6 py-4 whitespace-nowrap">{student.totalCGPA}</td>
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