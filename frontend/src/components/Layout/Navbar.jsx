import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthorized(true);
    }
  };

  return (
    <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
      {/* <div className="logo">
        <img src="https://i.pinimg.com/736x/7e/5e/a9/7e5ea9790da44051161fe487bcefb862.jpg" alt="logo" />
      </div> */}
      <div>
        <h1>Career<span>Hub</span></h1>
      </div>
      <ul className={!show ? "menu" : "show-menu menu"}>
        <li>
          <Link to={"/"} onClick={() => setShow(false)}>
            HOME
          </Link>
        </li>
        <li>
          <Link to={"/job/getall"} onClick={() => setShow(false)}>
            ALL JOBS
          </Link>
        </li>
        <li>
          <Link to={"/applications/me"} onClick={() => setShow(false)}>
            {user && user.role === "Employer"
              ? "APPLICANT'S APPLICATIONS"
              : "MY APPLICATIONS"}
          </Link>
        </li>
        {user && user.role === "Employer" ? (
          <>
            <li>
              <Link to={"/job/post"} onClick={() => setShow(false)}>
                POST NEW JOB
              </Link>
            </li>
            <li>
              <Link to={"/job/me"} onClick={() => setShow(false)}>
                VIEW YOUR JOBS
              </Link>
            </li>
          </>
        ) : null}
      </ul>
      <button onClick={handleLogout} className="logout-button">LOGOUT</button>
      {/* <div className="hamburger">
        <GiHamburgerMenu onClick={() => setShow(!show)} />
      </div> */}
    </nav>
  );
};

export default Navbar;
