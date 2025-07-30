export function useAuth() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  return {
    token,
    role,
    isAdmin: role === "admin",
    isLoggedIn: !!token,
  };
}
