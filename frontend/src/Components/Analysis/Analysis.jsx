import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function Analysis() {
  // Static data for 5 students
  const students = [
    { name: 'Raju', id: 'S001', sem1: 7.8, sem2: 8.2, sem3: 8.0, sem4: 8.5, sem5: 9.0, sem6: 8.7, sem7: 8.8, sem8: 9.1, dept: 'CSE', subjects: { Maths: 8.5, Physics: 7.8, Chemistry: 9.0 } },
    { name: 'Priya', id: 'S002', sem1: 8.0, sem2: 8.5, sem3: 8.3, sem4: 8.7, sem5: 9.2, sem6: 8.9, sem7: 9.0, sem8: 9.3, dept: 'ECE', subjects: { Maths: 8.8, Physics: 8.2, Chemistry: 9.2 } },
    { name: 'Arun', id: 'S003', sem1: 7.5, sem2: 7.9, sem3: 8.1, sem4: 8.3, sem5: 8.8, sem6: 8.4, sem7: 8.6, sem8: 8.9, dept: 'CSE', subjects: { Maths: 7.9, Physics: 7.5, Chemistry: 8.5 } },
    { name: 'Kavi', id: 'S004', sem1: 7.2, sem2: 7.6, sem3: 7.8, sem4: 8.0, sem5: 8.5, sem6: 8.2, sem7: 8.4, sem8: 8.7, dept: 'ECE', subjects: { Maths: 7.5, Physics: 7.2, Chemistry: 8.0 } },
    { name: 'Siva', id: 'S005', sem1: 8.1, sem2: 8.4, sem3: 8.2, sem4: 8.6, sem5: 9.1, sem6: 8.8, sem7: 9.0, sem8: 9.2, dept: 'CSE', subjects: { Maths: 8.7, Physics: 8.0, Chemistry: 9.1 } },
  ];

  // Calculate average grades for each semester (for overall trend)
  const semesters = ['sem1', 'sem2', 'sem3', 'sem4', 'sem5', 'sem6', 'sem7', 'sem8'];
  const averageGrades = semesters.map(sem => {
    const total = students.reduce((sum, student) => sum + student[sem], 0);
    return (total / students.length).toFixed(2);
  });

  // Calculate CGPA for each student
  const calculateCGPA = (student) => {
    const semGrades = semesters.map(sem => student[sem]);
    const total = semGrades.reduce((sum, grade) => sum + grade, 0);
    return (total / semGrades.length).toFixed(2);
  };

  // Top and bottom performers
  const studentsWithCGPA = students.map(student => ({
    ...student,
    cgpa: calculateCGPA(student),
  }));
  const sortedStudents = [...studentsWithCGPA].sort((a, b) => b.cgpa - a.cgpa);
  const topPerformers = sortedStudents.slice(0, 3);
  const bottomPerformers = sortedStudents.slice(-3);

  // Department-wise average CGPA
  const deptAverages = {
    CSE: students.filter(s => s.dept === 'CSE').reduce((sum, s) => sum + parseFloat(calculateCGPA(s)), 0) / students.filter(s => s.dept === 'CSE').length,
    ECE: students.filter(s => s.dept === 'ECE').reduce((sum, s) => sum + parseFloat(calculateCGPA(s)), 0) / students.filter(s => s.dept === 'ECE').length,
  };

  // Chart refs
  const overallTrendChartRef = useRef(null);
  const topVsBottomChartRef = useRef(null);
  const subjectChartRef = useRef(null);
  const deptChartRef = useRef(null);

  // Initialize charts
  useEffect(() => {
    // Overall Trend Chart (Line Chart)
    const overallTrendCtx = document.getElementById('overallTrendChart').getContext('2d');
    if (overallTrendChartRef.current) overallTrendChartRef.current.destroy();
    overallTrendChartRef.current = new Chart(overallTrendCtx, {
      type: 'line',
      data: {
        labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7', 'Sem 8'],
        datasets: [
          {
            label: 'Average Grades',
            data: averageGrades,
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
          y: { beginAtZero: true, max: 10, title: { display: true, text: 'Grade' } },
          x: { title: { display: true, text: 'Semester' } },
        },
      },
    });

    // Top vs Bottom Performers Chart (Bar Chart)
    const topVsBottomCtx = document.getElementById('topVsBottomChart').getContext('2d');
    if (topVsBottomChartRef.current) topVsBottomChartRef.current.destroy();
    topVsBottomChartRef.current = new Chart(topVsBottomCtx, {
      type: 'bar',
      data: {
        labels: [...topPerformers.map(s => s.name), ...bottomPerformers.map(s => s.name)],
        datasets: [
          {
            label: 'CGPA',
            data: [...topPerformers.map(s => s.cgpa), ...bottomPerformers.map(s => s.cgpa)],
            backgroundColor: [...topPerformers.map(() => '#ff6200'), ...bottomPerformers.map(() => '#ff0000')],
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true, max: 10, title: { display: true, text: 'CGPA' } },
          x: { title: { display: true, text: 'Students' } },
        },
      },
    });

    // Subject-wise Analysis for Raju (Radar Chart)
    const subjectCtx = document.getElementById('subjectChart').getContext('2d');
    if (subjectChartRef.current) subjectChartRef.current.destroy();
    subjectChartRef.current = new Chart(subjectCtx, {
      type: 'radar',
      data: {
        labels: ['Maths', 'Physics', 'Chemistry'],
        datasets: [
          {
            label: 'Raju',
            data: [students[0].subjects.Maths, students[0].subjects.Physics, students[0].subjects.Chemistry],
            backgroundColor: 'rgba(255, 98, 0, 0.2)',
            borderColor: '#ff6200',
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          r: { beginAtZero: true, max: 10 },
        },
      },
    });

    // Department-wise Comparison (Bar Chart)
    const deptCtx = document.getElementById('deptChart').getContext('2d');
    if (deptChartRef.current) deptChartRef.current.destroy();
    deptChartRef.current = new Chart(deptCtx, {
      type: 'bar',
      data: {
        labels: ['CSE', 'ECE'],
        datasets: [
          {
            label: 'Average CGPA',
            data: [deptAverages.CSE.toFixed(2), deptAverages.ECE.toFixed(2)],
            backgroundColor: '#ff6200',
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true, max: 10, title: { display: true, text: 'Average CGPA' } },
          x: { title: { display: true, text: 'Department' } },
        },
      },
    });

    return () => {
      if (overallTrendChartRef.current) overallTrendChartRef.current.destroy();
      if (topVsBottomChartRef.current) topVsBottomChartRef.current.destroy();
      if (subjectChartRef.current) subjectChartRef.current.destroy();
      if (deptChartRef.current) deptChartRef.current.destroy();
    };
  }, []);

  // Simple prediction for Raju
  const rajuGrades = semesters.map(sem => students[0][sem]);
  const trend = rajuGrades[rajuGrades.length - 1] - rajuGrades[rajuGrades.length - 2];
  const predictedNextSem = (rajuGrades[rajuGrades.length - 1] + trend).toFixed(2);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  
      {/* Top Section: Overall Trends (Left) and Top vs Bottom (Right) */}
      <div className="flex flex-col lg:flex-row gap-6 mb-6">
        {/* Left: Overall Performance Trends */}
        <div className="lg:w-1/2">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Overall Performance Trends</h2>
          <div className="bg-white p-6 rounded-lg shadow">
            <canvas id="overallTrendChart"></canvas>
          </div>
        </div>

        {/* Right: Top vs Bottom Performers */}
        <div className="lg:w-1/2">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Top vs Bottom Performers</h2>
          <div className="bg-white p-6 rounded-lg shadow">
            <canvas id="topVsBottomChart"></canvas>
          </div>
        </div>
      </div>

      {/* Bottom Section: Subject-wise (Left) and Dept Comparison (Right) */}
      <div className="flex flex-col lg:flex-row gap-6 mb-6">
        {/* Left: Subject-wise Analysis */}
        <div className="lg:w-1/2">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Subject-wise Analysis (Raju)</h2>
          <div className="bg-white p-6 rounded-lg shadow">
            <canvas id="subjectChart"></canvas>
          </div>
        </div>

        {/* Right: Department-wise Comparison */}
        <div className="lg:w-1/2">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Department-wise Comparison</h2>
          <div className="bg-white p-6 rounded-lg shadow">
            <canvas id="deptChart"></canvas>
          </div>
        </div>
      </div>

      {/* Predictive Insights (Center) */}
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Predictive Insights</h2>
        <div className="bg-white p-6 rounded-lg shadow inline-block">
          <p className="text-gray-700">
            Based on Raju’s performance trend, his predicted grade for the next semester is{' '}
            <span className="font-bold text-orange-600">{predictedNextSem}</span>.
          </p>
        </div>
      </div>
    </main>
  );
}

export default Analysis;