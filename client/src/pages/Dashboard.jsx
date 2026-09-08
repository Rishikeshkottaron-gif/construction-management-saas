import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  projectsAPI,
  clientsAPI,
  employeesAPI,
  tasksAPI,
} from "../services/api";

import StatCard from "../components/StatCard";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [
          projectsResponse,
          clientsResponse,
          employeesResponse,
          tasksResponse,
        ] = await Promise.all([
          projectsAPI.getAll(),
          clientsAPI.getAll(),
          employeesAPI.getAll(),
          tasksAPI.getAll(),
        ]);

        setProjects(projectsResponse.data);
        setClients(clientsResponse.data);
        setEmployees(employeesResponse.data);
        setTasks(tasksResponse.data);
      } catch (error) {
        console.error("Dashboard error:", error);
      }
    };

    loadDashboard();
  }, []);

  const pendingTasks = tasks.filter(
    (task) => task.status !== "Completed"
  ).length;

  return (
    <div>
      <div className="page-heading">
        <div>
          <h1>Dashboard</h1>
          <p>Construction Management Overview</p>
        </div>

        <Link className="primary-button" to="/projects">
          + New Project
        </Link>
      </div>

      <div className="stats-grid">
        <StatCard
          title="Total Projects"
          value={projects.length}
          description="Construction projects"
          icon="▣"
        />

        <StatCard
          title="Total Clients"
          value={clients.length}
          description="Registered clients"
          icon="○"
        />

        <StatCard
          title="Employees"
          value={employees.length}
          description="Company employees"
          icon="♙"
        />

        <StatCard
          title="Pending Tasks"
          value={pendingTasks}
          description="Tasks requiring attention"
          icon="✓"
        />
      </div>

      <div className="dashboard-grid">
        <section className="panel">
          <div className="panel-header">
            <div>
              <h2>Recent Projects</h2>
              <p>Your latest construction projects</p>
            </div>

            <Link to="/projects">View all</Link>
          </div>

          {projects.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">+</div>

              <h3>No projects yet</h3>

              <p>
                Create your first construction project to get started.
              </p>

              <Link className="secondary-button" to="/projects">
                Create Project
              </Link>
            </div>
          ) : (
            <div className="project-list">
              {projects.slice(0, 5).map((project) => (
                <Link
                  to={`/projects/${project._id}`}
                  className="project-row"
                  key={project._id}
                >
                  <div>
                    <strong>{project.name}</strong>
                    <span>{project.location}</span>
                  </div>

                  <div className="project-progress-small">
                    <span>{project.progress || 0}%</span>

                    <div className="progress-bar">
                      <div
                        style={{
                          width: `${project.progress || 0}%`,
                        }}
                      />
                    </div>
                  </div>

                  <span className={`status ${project.status}`}>
                    {project.status}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </section>

        <section className="panel">
          <div className="panel-header">
            <div>
              <h2>Quick Actions</h2>
              <p>Common management tasks</p>
            </div>
          </div>

          <div className="quick-actions">
            <Link to="/projects">+ Add Project</Link>
            <Link to="/clients">+ Add Client</Link>
            <Link to="/employees">+ Add Employee</Link>
            <Link to="/materials">+ Add Material</Link>
            <Link to="/expenses">+ Record Expense</Link>
          </div>
        </section>
      </div>
    </div>
  );
}