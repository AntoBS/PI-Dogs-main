import React from "react";
import { Link } from "react-router-dom";


export default NavBar = () => {
  return (
    <div>
      <Link to={"/home"}>
        <button>HOME</button>
      </Link>
      <Link to={"/form"}>
        <button>CREATE</button>
      </Link>
      <Link to={'/'}>
        <button>LOGOUT</button>
      </Link>
    </div>
  );
};