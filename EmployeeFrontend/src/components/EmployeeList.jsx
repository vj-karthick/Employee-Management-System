import React, { useEffect, useState } from "react";
import EmployeeService from "../services/EmployeeService.jsx";

const EmployeeList = ({ refreshFlag, onEdit }) => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    EmployeeService.getAll().then(res => setEmployees(res.data));
  }, [refreshFlag]);

  const deleteEmployee = (id) => {
    EmployeeService.delete(id).then(() => {
      setEmployees(employees.filter(emp => emp.id !== id));
    });
  };

  return (
    <div className="table-container">
      <h2>Employee List</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan="5">No Employees Found</td>
            </tr>
          ) : (
            employees.map(emp => (
              <tr key={emp.id}>
                <td data-label="Name">{emp.name}</td>
                <td data-label="Email">{emp.email}</td>
                <td data-label="Department">{emp.department}</td>
                <td data-label="Salary">{emp.salary}</td>
                <td data-label="Action">
                  <button
                    className="edit-btn"
                    onClick={() => onEdit(emp)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteEmployee(emp.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
