import Login from "./Login";
import Register from "./Register";

const AuthModal = ({ toggleAuthModal, navButton, handleNavButton }) => {
    return (
        <div className="modal fixed inset-0 z-50 w-full h-screen flex flex-col justify-center items-center">
            <div
                className="modal-back absolute z-10 w-full h-screen bg-[#0E0F14]/94"
                onClick={toggleAuthModal}
            ></div>
            {navButton === "register" ? (
                    <Register handleNavButton={handleNavButton} />
            ) : navButton === "login" ? (
                    <Login handleNavButton={handleNavButton} />
            ) : null}
        </div>
    );
};

export default AuthModal;
