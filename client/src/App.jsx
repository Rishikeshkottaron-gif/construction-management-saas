import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout";

import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Employees from "./pages/Employees";
import Tasks from "./pages/Tasks";
import Materials from "./pages/Materials";
import Suppliers from "./pages/Suppliers";
import Expenses from "./pages/Expenses";
import Payments from "./pages/Payments";
import Attendance from "./pages/Attendance";

function App() {
  return (
    <Routes>
      {/* Main application layout */}
      <Route path="/" element={<Layout />}>
        
        {/* Dashboard */}
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />

        {/* Clients */}
        <Route path="clients" element={<Clients />} />

        {/* Projects */}
        <Route path="projects" element={<Projects />} />

        {/* Individual project details */}
        <Route
          path="projects/:id"
          element={<ProjectDetails />}
        />

        {/* Employees */}
        <Route path="employees" element={<Employees />} />

        {/* Tasks */}
        <Route path="tasks" element={<Tasks />} />

        {/* Materials */}
        <Route path="materials" element={<Materials />} />

        {/* Suppliers */}
        <Route path="suppliers" element={<Suppliers />} />

        {/* Expenses */}
        <Route path="expenses" element={<Expenses />} />

        {/* Payments */}
        <Route path="payments" element={<Payments />} />

        {/* Attendance */}
        <Route path="attendance" element={<Attendance />} />

        {/* Unknown URL */}
        <Route
          path="*"
          element={<Navigate to="/dashboard" replace />}
        />

      </Route>
    </Routes>
  );
}

export default App;