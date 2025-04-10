import { Head, Link } from "@inertiajs/react";

const Nav = ({ toggleAuthModal, handleNavButton }) => {
  return (
    <nav className="flex justify-between py-10 font-medium text-xl tracking-tight">
      <div className="nav-left flex items-center">
        <div className="logo">meibo</div>
        <div className="separator bg-white h-1.5 w-1.5 mx-4 mt-0.5 rounded-full"></div>
        <div className="catchphrase">powered by obvious prime</div>
      </div>
      <div className="nav-right flex">
        <div
          className="register cursor-pointer"
          onClick={(e) => {
            toggleAuthModal();
            handleNavButton("register");
          }}
        >
          register
        </div>
        <div
          className="login cursor-pointer ml-4"
          onClick={(e) => {
            toggleAuthModal();
            handleNavButton("login");
          }}
        >
          login
        </div>
      </div>
    </nav>
  );
};

export default Nav;
