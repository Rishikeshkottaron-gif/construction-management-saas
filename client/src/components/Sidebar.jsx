import { NavLink } from "react-router-dom";

const navigation = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: "▦",
  },
  {
    label: "Clients",
    path: "/clients",
    icon: "◉",
  },
  {
    label: "Projects",
    path: "/projects",
    icon: "▣",
  },
  {
    label: "Employees",
    path: "/employees",
    icon: "♙",
  },
  {
    label: "Tasks",
    path: "/tasks",
    icon: "✓",
  },
  {
    label: "Materials",
    path: "/materials",
    icon: "▤",
  },
  {
    label: "Suppliers",
    path: "/suppliers",
    icon: "⌂",
  },
  {
    label: "Expenses",
    path: "/expenses",
    icon: "₹",
  },
  {
    label: "Payments",
    path: "/payments",
    icon: "▰",
  },
  {
    label: "Attendance",
    path: "/attendance",
    icon: "◷",
  },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">B</div>

        <div className="logo-text">
          <strong>BuildFlow</strong>
          <span>Construction Management</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <p className="nav-title">MAIN MENU</p>

        {navigation.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-footer-card">
          <div className="footer-icon">⚙</div>

          <div>
            <strong>Construction ERP</strong>
            <span>Management Platform</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;