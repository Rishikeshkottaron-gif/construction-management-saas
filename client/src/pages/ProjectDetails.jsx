import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { projectsAPI } from "../services/api";

export default function ProjectDetails() {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProject = async () => {
      try {
        const response = await projectsAPI.getById(id);

        setProject(response.data);
      } catch (error) {
        console.error(error);
        setError("Unable to load project details.");
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading project...</div>;
  }

  if (error) {
    return (
      <div>
        <div className="error-box">{error}</div>

        <Link className="secondary-button" to="/projects">
          Back to Projects
        </Link>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="empty-state">
        Project not found.
      </div>
    );
  }

  const progress = Number(project.progress || 0);

  return (
    <div>
      <div className="page-heading">
        <div>
          <div className="breadcrumb-page">
            <Link to="/projects">Projects</Link>
            <span>/</span>
            <strong>{project.name}</strong>
          </div>

          <h1>{project.name}</h1>

          <p>
            {project.location || "No location provided"}
          </p>
        </div>

        <Link className="secondary-button" to="/projects">
          ← Back to Projects
        </Link>
      </div>

      <div className="details-grid">
        <section className="panel">
          <div className="panel-header">
            <div>
              <h2>Project Progress</h2>
              <p>Current project completion</p>
            </div>

            <span className={`status ${project.status}`}>
              {project.status}
            </span>
          </div>

          <div className="progress-dashboard">
            <div
              className="progress-circle"
              style={{
                background: `conic-gradient(
                  #2563eb ${progress * 3.6}deg,
                  #e5e7eb ${progress * 3.6}deg
                )`,
              }}
            >
              <div className="progress-circle-inner">
                <strong>{progress}%</strong>
                <span>Complete</span>
              </div>
            </div>

            <div className="progress-summary">
              <h3>{project.name}</h3>

              <p>
                {project.description ||
                  "No project description available."}
              </p>

              <div className="large-progress">
                <div
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>

              <div className="progress-labels">
                <span>0%</span>
                <strong>{progress}%</strong>
                <span>100%</span>
              </div>
            </div>
          </div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <div>
              <h2>Project Information</h2>
              <p>Project overview</p>
            </div>
          </div>

          <div className="info-list">
            <div>
              <span>Client</span>
              <strong>{project.client || "-"}</strong>
            </div>

            <div>
              <span>Manager</span>
              <strong>{project.manager || "-"}</strong>
            </div>

            <div>
              <span>Location</span>
              <strong>{project.location || "-"}</strong>
            </div>

            <div>
              <span>Budget</span>
              <strong>
                ₹{Number(project.budget || 0).toLocaleString()}
              </strong>
            </div>

            <div>
              <span>Start Date</span>
              <strong>
                {project.startDate
                  ? new Date(
                      project.startDate
                    ).toLocaleDateString()
                  : "-"}
              </strong>
            </div>

            <div>
              <span>End Date</span>
              <strong>
                {project.endDate
                  ? new Date(
                      project.endDate
                    ).toLocaleDateString()
                  : "-"}
              </strong>
            </div>
          </div>
        </section>
      </div>

      <section className="panel">
        <div className="panel-header">
          <div>
            <h2>Project Status</h2>
            <p>Progress overview</p>
          </div>
        </div>

        <div className="milestones">
          <div className={progress >= 25 ? "done" : ""}>
            <span>1</span>
            <strong>Planning</strong>
          </div>

          <div className={progress >= 50 ? "done" : ""}>
            <span>2</span>
            <strong>Foundation</strong>
          </div>

          <div className={progress >= 75 ? "done" : ""}>
            <span>3</span>
            <strong>Construction</strong>
          </div>

          <div className={progress >= 100 ? "done" : ""}>
            <span>4</span>
            <strong>Completed</strong>
          </div>
        </div>
      </section>
    </div>
  );
}