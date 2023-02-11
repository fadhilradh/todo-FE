import { apiCall } from "@/utils";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./atoms/Button";
import { logout } from "../store/user";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const username = useSelector((state) => state.user.username);
  const userRole = useSelector((state) => state.user.role);
  const dispatch = useDispatch();

  async function logoutUser() {
    try {
      await apiCall.get("/logout");
      dispatch(logout());
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <nav>
      <ul className="sticky top-0 left-0 mb-4 flex w-full items-center justify-between p-4 shadow-md">
        <span className="flex items-center gap-x-6">
          <li className="cursor-pointer font-semibold hover:text-blue-700">
            <Link href="/">
              <h1 className="bg-gradient-to-r from-yellow-400 via-green-300 to-blue-600 bg-clip-text  font-bold text-transparent">
                todos
              </h1>
            </Link>
          </li>
          {userRole === "admin" && (
            <li className="cursor-pointer font-semibold hover:text-blue-700">
              <Link href="/users">Users</Link>
            </li>
          )}
        </span>
        <span className="flex gap-x-6">
          {isLoggedIn ? (
            <div className="flex items-center gap-x-8">
              <p>Hello, {username}</p>
              <Button
                className="cursor-pointer hover:text-blue-700"
                onClick={logoutUser}
              >
                Logout
              </Button>
            </div>
          ) : (
            <>
              <Link href="/login">
                {" "}
                <Button className="cursor-pointer font-semibold hover:text-blue-700">
                  Login{" "}
                </Button>
              </Link>
            </>
          )}
        </span>
      </ul>
    </nav>
  );
};

export default Navbar;
