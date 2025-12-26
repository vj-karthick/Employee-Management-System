import React, { useState } from "react";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import "./App.css";

function App() {
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const refresh = () => setRefreshFlag(!refreshFlag);
  const clearSelection = () => setSelectedEmployee(null);

  return (
    <div className="container">
      <h1>Employee Management System</h1>

      <EmployeeForm
        refresh={refresh}
        selectedEmployee={selectedEmployee}
        clearSelection={clearSelection}
      />

      <EmployeeList
        refreshFlag={refreshFlag}
        onEdit={setSelectedEmployee}
      />
    </div>
  );
}

export default App;
