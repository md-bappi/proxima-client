import { useAuthContext } from "./useAuthContext";

export const userLogout = () => {
  const { dispatch: logoutDispatch } = useAuthContext();

  const logout = () => {
    // clear Is
    localStorage.removeItem("user");

    // dispatch logout
    logoutDispatch({ type: "LOGOUT" });
  };

  return { logout };
};
