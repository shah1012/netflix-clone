import React, { useState, useEffect } from "react";
import "./Nav.css"

function Nav() {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {   //attaches a scroll to the window 
        if(window.scrollY > 100){  //checks how much y 
            handleShow(true)
        }else handleShow(false);
    })
    return () => {
        window.removeEventListener("scroll") //removes listeners
    }
  }, [])

  return (
    <div className={`nav ${show &&  "nav_black"}`}>
      <img
        className="nav_logo"
        src="https://pmcvariety.files.wordpress.com/2020/05/netflix-logo.png?w=681&h=383&crop=1"
        alt="NetFlix Logo"
      />
      <img
        className="nav_avatar"
        src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png"
        alt="NetFlix Logo"
      />
    </div>
  );
}

export default Nav;
