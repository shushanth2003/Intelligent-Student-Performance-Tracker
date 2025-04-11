import React, { useState, useEffect } from 'react';

function Student() {
  // Student list data from backend
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState(null);

  // Fetch data from backend
  useEffect(() => {
    fetch('http://localhost:6969/api/students') // Now fetches full data
      .then(res => res.json())
      .then(data => setStudents(data))
      .catch(err => console.error('Error fetching students:', err));
  }, []);

  // Calculate CGPA for a student
  const calculateCGPA = (student) => {
    console.log('Student object:', student); // Debug log
    const semesters = [
      student.sem1,
      student.sem2,
      student.sem3,
      student.sem4,
      student.sem5,
      student.sem6,
      student.sem7,
      student.sem8,
    ];
    console.log('Semesters:', semesters); // Debug log
    const total = semesters.reduce((sum, grade) => sum + (grade || 0), 0); // Handle undefined grades
    console.log('Total:', total); // Debug log
    return (total / semesters.length).toFixed(2);
  };

  // Start editing a student
  const startEditing = (student) => {
    setEditingId(student.id);
    setEditData({ ...student });
  };

  // Save edited data (to backend)
  const saveEdit = async (studentId) => {
    try {
      const response = await fetch(`http://localhost:6969/api/students/${studentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData),
      });
      if (response.ok) {
        const updatedStudent = await response.json();
        setStudents(students.map(student => student.id === studentId ? updatedStudent : student));
        setEditingId(null);
        setEditData(null);
      } else {
        console.error('Update failed:', await response.text()); // Debug failed response
      }
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setEditData(null);
  };

  // Update semester marks in editData
  const updateSemester = (semester, value) => {
    setEditData({ ...editData, [semester]: parseFloat(value) || 0 });
  };

  // Delete a student (from backend)
  const deleteStudent = async (studentId) => {
    try {
      const response = await fetch(`http://localhost:6969/api/students/${studentId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setStudents(students.filter(student => student.id !== studentId));
      } else {
        console.error('Delete failed:', await response.text()); // Debug failed response
      }
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  // Filtered students based on search
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Name or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200 ease-in-out"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sem 1</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sem 2</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sem 3</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sem 4</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sem 5</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sem 6</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sem 7</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sem 8</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total CGPA</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{student.id}</td>
                {editingId === student.id ? (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        value={editData.sem1}
                        onChange={(e) => updateSemester('sem1', e.target.value)}
                        className="w-16 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        value={editData.sem2}
                        onChange={(e) => updateSemester('sem2', e.target.value)}
                        className="w-16 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        value={editData.sem3}
                        onChange={(e) => updateSemester('sem3', e.target.value)}
                        className="w-16 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        value={editData.sem4}
                        onChange={(e) => updateSemester('sem4', e.target.value)}
                        className="w-16 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        value={editData.sem5}
                        onChange={(e) => updateSemester('sem5', e.target.value)}
                        className="w-16 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        value={editData.sem6}
                        onChange={(e) => updateSemester('sem6', e.target.value)}
                        className="w-16 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        value={editData.sem7}
                        onChange={(e) => updateSemester('sem7', e.target.value)}
                        className="w-16 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        value={editData.sem8}
                        onChange={(e) => updateSemester('sem8', e.target.value)}
                        className="w-16 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{calculateCGPA(editData)}</td>
                  </>
                ) : (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap">{student.sem1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{student.sem2}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{student.sem3}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{student.sem4}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{student.sem5}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{student.sem6}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{student.sem7}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{student.sem8}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{calculateCGPA(student)}</td>
                  </>
                )}
                <td className="px-6 py-4 whitespace-nowrap flex space-x-2">
                  {editingId === student.id ? (
                    <>
                      <button
                        onClick={() => saveEdit(student.id)}
                        className="text-green-600 hover:text-green-800"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="text-gray-600 hover:text-gray-800"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      className="cursor-pointer transition-all bg-green-500 text-white px-6 py-2 rounded-lg border-green-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
                      onClick={() => startEditing(student)}
                    >
                      Update
                    </button>
                  )}
                  <button
                    className="cursor-pointer transition-all bg-red-500 text-white px-6 py-2 rounded-lg border-red-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
                    onClick={() => deleteStudent(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default Student;