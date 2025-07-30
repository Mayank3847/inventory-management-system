import { useAuth } from "../hooks/useAuth";

const Header = () => {
  const { isLoggedIn, role } = useAuth();

  return (
    <div>
      {isLoggedIn ? (
        <>
          <span>Logged in as: {role}</span>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </div>
  );
};
