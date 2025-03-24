import React, { useState } from 'react';

function Student() {
  // Static data for 5 students
  const [students, setStudents] = useState([
    { name: 'Raju', id: 'S001', sem1: 7.8, sem2: 8.2, sem3: 8.0, sem4: 8.5, sem5: 9.0, sem6: 8.7, sem7: 8.8, sem8: 9.1 },
    { name: 'Priya', id: 'S002', sem1: 8.0, sem2: 8.5, sem3: 8.3, sem4: 8.7, sem5: 9.2, sem6: 8.9, sem7: 9.0, sem8: 9.3 },
    { name: 'Arun', id: 'S003', sem1: 7.5, sem2: 7.9, sem3: 8.1, sem4: 8.3, sem5: 8.8, sem6: 8.4, sem7: 8.6, sem8: 8.9 },
    { name: 'Kavi', id: 'S004', sem1: 7.2, sem2: 7.6, sem3: 7.8, sem4: 8.0, sem5: 8.5, sem6: 8.2, sem7: 8.4, sem8: 8.7 },
    { name: 'Siva', id: 'S005', sem1: 8.1, sem2: 8.4, sem3: 8.2, sem4: 8.6, sem5: 9.1, sem6: 8.8, sem7: 9.0, sem8: 9.2 },
  ]);

  // Search input state
  const [searchTerm, setSearchTerm] = useState('');

  // State to track which row is being edited
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState(null);

  // Filtered students based on search
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate CGPA for a student
  const calculateCGPA = (student) => {
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
    const total = semesters.reduce((sum, grade) => sum + grade, 0);
    return (total / semesters.length).toFixed(2);
  };

  // Start editing a student
  const startEditing = (student) => {
    setEditingId(student.id);
    setEditData({ ...student });
  };

  // Save edited data
  const saveEdit = (studentId) => {
    const updatedStudents = students.map(student => {
      if (student.id === studentId) {
        return { ...editData };
      }
      return student;
    });
    setStudents(updatedStudents);
    setEditingId(null);
    setEditData(null);
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

  // Delete a student
  const deleteStudent = (studentId) => {
    const updatedStudents = students.filter(student => student.id !== studentId);
    setStudents(updatedStudents);
  };

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
                    // <button
                      
                    //   className="text-blue-600 hover:text-blue-800"
                    // >
                    //   Update
                    // </button>
                    <button class="cursor-pointer transition-all bg-green-500 text-white px-6 py-2 rounded-lg
                    border-green-600
                    border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
                    active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
                    onClick={() => startEditing(student)}>
                      Update
                    </button>
                  )}
                  {/* <button
                    onClick={() => deleteStudent(student.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button> */}
                  
                  <button class="cursor-pointer transition-all bg-red-500 text-white px-6 py-2 rounded-lg
                  border-red-600
                  border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
                  active:border-b-[2px] active:brightness-90 active:translate-y-[2px]" onClick={() => deleteStudent(student.id)}>
                    delete
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