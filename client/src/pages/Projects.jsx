import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { projectsAPI } from "../services/api";

const emptyProject = {
  name: "",
  location: "",
  client: "",
  manager: "",
  description: "",
  startDate: "",
  endDate: "",
  budget: 0,
  progress: 0,
  status: "Planning",
};

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(emptyProject);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProjects = async () => {
    try {
      setLoading(true);

      const response = await projectsAPI.getAll();

      setProjects(response.data);
      setError("");
    } catch (error) {
      console.error(error);
      setError("Unable to load projects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!form.name.trim()) {
        alert("Project name is required.");
        return;
      }

      if (editingId) {
        await projectsAPI.update(editingId, form);
      } else {
        await projectsAPI.create(form);
      }

      setForm(emptyProject);
      setEditingId(null);

      await loadProjects();
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.error ||
          "Unable to save project."
      );
    }
  };

  const handleEdit = (project) => {
    setEditingId(project._id);

    setForm({
      name: project.name || "",
      location: project.location || "",
      client: project.client || "",
      manager: project.manager || "",
      description: project.description || "",
      startDate: project.startDate
        ? project.startDate.substring(0, 10)
        : "",
      endDate: project.endDate
        ? project.endDate.substring(0, 10)
        : "",
      budget: project.budget || 0,
      progress: project.progress || 0,
      status: project.status || "Planning",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project?")) {
      return;
    }

    try {
      await projectsAPI.remove(id);
      await loadProjects();
    } catch (error) {
      console.error(error);
      alert("Unable to delete project.");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyProject);
  };

  return (
    <div>
      <div className="page-heading">
        <div>
          <h1>Projects</h1>
          <p>Create and manage construction projects</p>
        </div>
      </div>

      <section className="panel form-panel">
        <div className="panel-header">
          <div>
            <h2>
              {editingId ? "Edit Project" : "Create Project"}
            </h2>
            <p>Enter project information</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <label>
              Project Name
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Rahul House"
              />
            </label>

            <label>
              Location
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Kozhikode"
              />
            </label>

            <label>
              Client
              <input
                name="client"
                value={form.client}
                onChange={handleChange}
                placeholder="Client name"
              />
            </label>

            <label>
              Project Manager
              <input
                name="manager"
                value={form.manager}
                onChange={handleChange}
                placeholder="Manager name"
              />
            </label>

            <label>
              Start Date
              <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
              />
            </label>

            <label>
              End Date
              <input
                type="date"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
              />
            </label>

            <label>
              Budget
              <input
                type="number"
                name="budget"
                value={form.budget}
                onChange={handleChange}
              />
            </label>

            <label>
              Progress %
              <input
                type="number"
                min="0"
                max="100"
                name="progress"
                value={form.progress}
                onChange={handleChange}
              />
            </label>

            <label>
              Status
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option>Planning</option>
                <option>In Progress</option>
                <option>On Hold</option>
                <option>Completed</option>
              </select>
            </label>

            <label className="full-width">
              Description
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Project description"
              />
            </label>
          </div>

          <div className="form-actions">
            <button className="primary-button" type="submit">
              {editingId ? "Update Project" : "Create Project"}
            </button>

            {editingId && (
              <button
                type="button"
                className="secondary-button"
                onClick={cancelEdit}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <h2>All Projects</h2>
            <p>{projects.length} projects</p>
          </div>
        </div>

        {loading && <div className="loading">Loading...</div>}

        {error && <div className="error-box">{error}</div>}

        {!loading && projects.length === 0 && (
          <div className="empty-state compact">
            No projects available.
          </div>
        )}

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Project</th>
                <th>Client</th>
                <th>Progress</th>
                <th>Status</th>
                <th>Budget</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {projects.map((project) => (
                <tr key={project._id}>
                  <td>
                    <Link
                      className="table-primary"
                      to={`/projects/${project._id}`}
                    >
                      {project.name}
                    </Link>

                    <small>{project.location}</small>
                  </td>

                  <td>{project.client || "-"}</td>

                  <td>
                    <div className="progress-cell">
                      <span>{project.progress || 0}%</span>

                      <div className="progress-bar">
                        <div
                          style={{
                            width: `${project.progress || 0}%`,
                          }}
                        />
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className={`status ${project.status}`}>
                      {project.status}
                    </span>
                  </td>

                  <td>
                    ₹{Number(project.budget || 0).toLocaleString()}
                  </td>

                  <td>
                    <div className="action-buttons">
                      <Link
                        className="small-button"
                        to={`/projects/${project._id}`}
                      >
                        View
                      </Link>

                      <button
                        className="small-button"
                        onClick={() => handleEdit(project)}
                      >
                        Edit
                      </button>

                      <button
                        className="small-button danger"
                        onClick={() =>
                          handleDelete(project._id)
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}