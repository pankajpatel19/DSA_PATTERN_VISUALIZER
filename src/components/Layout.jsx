import React, { useState } from "react";
import { NavLink, Link, Outlet, useParams } from "react-router-dom";
import { ChevronRight, ChevronDown, Code2, Menu, X } from "lucide-react";
import { PATTERNS, CATEGORIES } from "../config/patterns";

const Layout = () => {
  const { patternId } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState(
    CATEGORIES.reduce((acc, cat) => ({ ...acc, [cat]: true }), {})
  );

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const getActiveTitle = () => {
    return PATTERNS.find((p) => p.id === patternId)?.title || "Select a Pattern";
  };

  return (
    <div className="dashboard-container">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <Link to="/" className="logo-container" onClick={() => setIsSidebarOpen(false)}>
            <Code2 className="logo-icon" size={28} />
            <h2>DSA Mastery</h2>
          </Link>
          <button
            className="mobile-close-btn"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {CATEGORIES.map((category) => (
            <div key={category} className="nav-section">
              <button
                className="nav-group-header"
                onClick={() => toggleCategory(category)}
              >
                <span className="nav-group-title">{category}</span>
                {expandedCategories[category] ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
              </button>

              {expandedCategories[category] && (
                <div className="nav-group-items">
                  {PATTERNS.filter((p) => p.category === category).map((pattern) => (
                    <NavLink
                      key={pattern.id}
                      to={`/pattern/${pattern.id}`}
                      className={({ isActive }) =>
                        `nav-item ${isActive ? "active" : ""}`
                      }
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <div className="nav-item-content">
                        <span className="nav-item-title">{pattern.title}</span>
                      </div>
                      <ChevronRight className="nav-item-indicator" size={14} />
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="main-header">
          <div className="header-left">
            <button
              className="mobile-menu-btn"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h1>{getActiveTitle()}</h1>
          </div>
        </header>

        <div className="visualizer-container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
