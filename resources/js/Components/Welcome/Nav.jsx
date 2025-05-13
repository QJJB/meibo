import { Head, Link } from "@inertiajs/react";

const Nav = ({ toggleAuthModal, handleNavButton, auth }) => {
  return (
    <nav className="flex justify-between py-10 font-medium text-xl tracking-tight">
      <div className="nav-left flex items-center">
        <div className="logo">meibo</div>
        <div className="separator bg-white h-1.5 w-1.5 mx-4 mt-0.5 rounded-full"></div>
        <div className="catchphrase">powered by obvious prime</div>
      </div>
      {auth.user ? (
        <div className="hover:text-white cursor-pointer transition duration-300"
        onClick={() => { window.location.href = `/dashboard`; }}>
          Dashboard
        </div>
      ) : (
        <div className="nav-right flex">
        <div
          className="register cursor-pointer hover:text-white transition duration-300"
          onClick={(e) => {
            toggleAuthModal();
            handleNavButton("register");
          }}
        >
          register
        </div>
        <div
          className="login cursor-pointer ml-4 hover:text-white transition duration-300"
          onClick={(e) => {
            toggleAuthModal();
            handleNavButton("login");
          }}
        >
          login
        </div>
      </div>
      )}
    </nav>
  );
};

export default Nav;
