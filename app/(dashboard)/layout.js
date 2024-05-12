"use client";
// import node module libraries
import { useEffect, useState } from "react";

// import theme style scss file
import "styles/theme.scss";

// import sub components
import NavbarVertical from "/layouts/navbars/NavbarVertical";
import NavbarTop from "/layouts/navbars/NavbarTop";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function DashboardLayout({ children }) {
  const [token, setToken] = useState("");
  const [showMenu, setShowMenu] = useState(true);
  const [profile, setProfile] = useState({});

  const router = useRouter();
  const ToggleMenu = () => {
    return setShowMenu(!showMenu);
  };

  const verifyToken = async (token) => {
    try {
      const { data } = await axios.post("/api/users", {
        token,
      });

      setToken(token);
      setProfile(data);
    } catch (err) {
      localStorage.removeItem("token");
      return router.push("/authentication/sign-in");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      return router.push("/authentication/sign-in");
    } else {
      verifyToken(token);
    }
  }, []);

  if (!token) {
    return null;
  }

  return (
    <div id="db-wrapper" className={`${showMenu ? "" : "toggled"}`}>
      <div className="navbar-vertical navbar">
        <NavbarVertical
          showMenu={showMenu}
          onClick={(value) => setShowMenu(value)}
        />
      </div>
      <div id="page-content">
        <div className="header">
          <NavbarTop
            data={{
              showMenu: showMenu,
              SidebarToggleMenu: ToggleMenu,
              profile,
            }}
          />
        </div>
        {children}
      </div>
    </div>
  );
}
