import React, { useEffect, useState } from "react";
import EmployeeService from "../services/EmployeeService.jsx";

const EmployeeForm = ({ refresh, selectedEmployee, clearSelection }) => {
  const [employee, setEmployee] = useState({
    id: "",
    name: "",
    email: "",
    department: "",
    salary: ""
  });

  // Load data when Edit is clicked
  useEffect(() => {
    if (selectedEmployee) {
      setEmployee(selectedEmployee);
    }
  }, [selectedEmployee]);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const saveOrUpdate = (e) => {
    e.preventDefault();

    if (employee.id) {
      // UPDATE
      EmployeeService.update(employee.id, employee).then(() => {
        refresh();
        clearSelection();
      });
    } else {
      // ADD
      EmployeeService.create(employee).then(() => {
        refresh();
      });
    }

    setEmployee({ id: "", name: "", email: "", department: "", salary: "" });
  };

  return (
    <form className="form">
      <h2>{employee.id ? "Update Employee" : "Add Employee"}</h2>

      <input name="name" placeholder="Name" value={employee.name} onChange={handleChange} />
      <input name="email" placeholder="Email" value={employee.email} onChange={handleChange} />
      <input name="department" placeholder="Department" value={employee.department} onChange={handleChange} />
      <input name="salary" placeholder="Salary" value={employee.salary} onChange={handleChange} />

      <button onClick={saveOrUpdate}>
        {employee.id ? "Update" : "Save"}
      </button>
    </form>
  );
};

export default EmployeeForm;
