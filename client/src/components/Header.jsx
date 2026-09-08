export default function Header() {
  return (
    <header className="header">
      <div className="breadcrumb">
        <span>Construction Management</span>
        <span>/</span>
        <strong>Management System</strong>
      </div>

      <div className="header-actions">
        <div className="search-box">
          <span>⌕</span>
          <input placeholder="Search..." />
          <kbd>Ctrl K</kbd>
        </div>

        <button className="notification">
          ◇
          <span>3</span>
        </button>

        <div className="user-area">
          <div className="avatar">PM</div>

          <div>
            <strong>Project Manager</strong>
            <small>Administrator</small>
          </div>
        </div>
      </div>
    </header>
  );
}