import React from "react";
import { Link, NavLink } from "react-router-dom";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../components/Navbar.css'
const Navbar = () => {
  const handleNavItemClick = () => {
    const navCollapse = document.getElementById("navbarNav");
    if (navCollapse && navCollapse.classList.contains("show")) {
      const bsCollapse = new window.bootstrap.Collapse(navCollapse, {
        toggle: false
      });
      bsCollapse.hide();
    }
  };

  const handleToggleClick = () => {
    const navCollapse = document.getElementById("navbarNav");
    if (navCollapse) {
      const isShown = navCollapse.classList.contains("show");
      const bsCollapse = new window.bootstrap.Collapse(navCollapse, {
        toggle: false
      });
      if (isShown) {
        bsCollapse.hide(); // 👈 nếu đang mở thì đóng
      } else {
        bsCollapse.show(); // 👈 nếu đang đóng thì mở
      }
    }
  };
// View Part
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 fixed-top">
      <div className="container-fluid">
      <Link className="navbar-brand d-flex flex-column" to="/">
        <span style={{
          fontWeight: "bold",
          fontSize: "1.5rem",
          lineHeight: "1.2"
        }}>
          STOCK VISION AI
        </span>
      </Link>


        <button
          className="navbar-toggler"
          type="button"
          onClick={handleToggleClick}  // 👈 Gọi toggle bằng JS thủ công
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink to="/home" className="nav-link" onClick={handleNavItemClick}>
                Trang chủ 🏠
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/predict" className="nav-link" onClick={handleNavItemClick}>
                Dự đoán 🔮
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/chart" className="nav-link" onClick={handleNavItemClick}>
                Biểu đồ 📊
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/" className="nav-link" onClick={handleNavItemClick}>
                Thông tin 📍
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
