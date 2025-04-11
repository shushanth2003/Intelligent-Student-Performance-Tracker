import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

function Analysis() {
  // State for students data, loading, and error
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Chart refs
  const performanceChartRef = useRef(null);
  const comparisonChartRef = useRef(null);

  // Fetch data from backend
  useEffect(() => {
    fetch('http://localhost:6969/api/students')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch student data');
        return res.json();
      })
      .then(data => {
        setStudents(data);
        setSelectedStudent(data[0]); // Default to first student
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching students:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Semesters array
  const semesters = ['sem1', 'sem2', 'sem3', 'sem4', 'sem5', 'sem6', 'sem7', 'sem8'];

  // Calculate CGPA for a student (using totalCGPA if available, else calculate)
  const calculateCGPA = (student) => {
    console.log('Calculating CGPA for:', student.name, student);
    return student.totalCGPA || (semesters.map(sem => student[sem] || 0).reduce((sum, grade) => sum + grade, 0) / semesters.length).toFixed(2);
  };

  // Initialize charts
  useEffect(() => {
    const initializeCharts = () => {
      // Performance Chart (Line Chart for selected student)
      const performanceCtx = document.getElementById('performanceChart');
      if (performanceCtx && !performanceChartRef.current && selectedStudent) {
        console.log('Initializing performance chart for:', selectedStudent.name);
        performanceChartRef.current = new Chart(performanceCtx.getContext('2d'), {
          type: 'line',
          data: {
            labels: semesters.map(s => `Sem ${s.replace('sem', '')}`),
            datasets: [
              {
                label: `${selectedStudent.name}'s Performance`,
                data: semesters.map(sem => selectedStudent[sem] || 0),
                borderColor: '#4ade80',
                backgroundColor: 'rgba(74, 222, 128, 0.2)',
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#10b981',
                pointRadius: 5,
                pointHoverRadius: 7,
              },
            ],
          },
          options: {
            responsive: true,
            animation: {
              duration: 2000,
              easing: 'easeInOutQuad',
            },
            scales: {
              y: { beginAtZero: true, max: 10, title: { display: true, text: 'Grade' } },
              x: { title: { display: true, text: 'Semester' } },
            },
            plugins: {
              tooltip: {
                callbacks: {
                  label: (context) => `Grade: ${context.raw}`,
                },
              },
              legend: { labels: { color: '#1f2937' } },
            },
          },
        });
      } else {
        console.log('Performance chart not initialized:', { performanceCtx, selectedStudent });
      }

      // Comparison Chart (Bar Chart for top 3 students)
      const comparisonCtx = document.getElementById('comparisonChart');
      if (comparisonCtx && !comparisonChartRef.current && students.length > 0) {
        console.log('Initializing comparison chart');
        const topStudents = [...students]
          .sort((a, b) => parseFloat(calculateCGPA(b)) - parseFloat(calculateCGPA(a)))
          .slice(0, 3)
          .map(student => ({
            name: student.name,
            cgpa: calculateCGPA(student),
          }));
        comparisonChartRef.current = new Chart(comparisonCtx.getContext('2d'), {
          type: 'bar',
          data: {
            labels: topStudents.map(s => s.name),
            datasets: [
              {
                label: 'CGPA',
                data: topStudents.map(s => parseFloat(s.cgpa)),
                backgroundColor: ['#4ade80', '#facc15', '#f87171'],
                borderColor: ['#10b981', '#d4a017', '#dc2626'],
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            animation: {
              duration: 1500,
              easing: 'easeOutBounce',
            },
            scales: {
              y: { beginAtZero: true, max: 10, title: { display: true, text: 'CGPA' } },
              x: { title: { display: true, text: 'Students' } },
            },
            plugins: {
              tooltip: {
                callbacks: {
                  label: (context) => `CGPA: ${context.raw}`,
                },
              },
              legend: { display: false },
            },
          },
        });
      } else {
        console.log('Comparison chart not initialized:', { comparisonCtx, studentsLength: students.length });
      }
    };

    initializeCharts();

    // Cleanup charts on unmount or data change
    return () => {
      if (performanceChartRef.current) performanceChartRef.current.destroy();
      if (comparisonChartRef.current) comparisonChartRef.current.destroy();
    };
  }, [students, selectedStudent]);

  // Handle student selection
  const handleStudentChange = (event) => {
    const student = students.find(s => s.id === event.target.value);
    setSelectedStudent(student);
  };

  // Render logic
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-600 bg-white min-h-screen">
        Error: {error}. Please try again later or check the backend.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <header className="bg-green-600 text-white py-6">
        <h1 className="text-3xl font-bold text-center">Student Dashboard</h1>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Student Selector */}
        <div className="mb-8">
          <label htmlFor="studentSelect" className="block text-lg font-medium text-gray-700 mb-2">
            Select Student:
          </label>
          <select
            id="studentSelect"
            value={selectedStudent?.id || ''}
            onChange={handleStudentChange}
            className="w-full max-w-xs p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {students.map(student => (
              <option key={student.id} value={student.id}>
                {student.name} (ID: {student.id})
              </option>
            ))}
          </select>
        </div>

        {/* Performance Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {selectedStudent?.name}'s Semester Performance
          </h2>
          <div className="h-80">
            <canvas id="performanceChart"></canvas>
          </div>
          <div className="mt-4">
            <p className="text-gray-600">CGPA: {calculateCGPA(selectedStudent)}</p>
            <p className="text-gray-600">Attendance: {selectedStudent.attendance || 'N/A'}%</p>
          </div>
        </div>

        {/* Comparison Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Top 3 Performers</h2>
          <div className="h-80">
            <canvas id="comparisonChart"></canvas>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-orange-500 text-white text-center py-4 mt-8">
        <p>© 2025 Student Performance Analytics. Powered by xAI.</p>
      </footer>
    </div>
  );
}

export default Analysis;