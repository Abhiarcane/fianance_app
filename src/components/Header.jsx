import React from "react";

const Header = ({ user }) => {
  function logout() {
    alert("Logout");
  }
  return (
    <div className="bg-blue-600 text-white flex justify-between p-4">
      <span className="font-semibold text-xl">Finbetter</span>
      <div>
        <span>
          <img src="" alt="" />
        </span>
        <span onClick={logout} className="cursor-pointer">
          Logout
        </span>
      </div>
    </div>
  );
};

export default Header;
