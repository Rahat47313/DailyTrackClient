import { useEffect, useState } from "react";
// import { gapi } from "gapi-script";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useThemeMode } from "flowbite-react";
import { login } from "../redux/auth/authThunks";
import {
  selectToken,
  selectIsLoading,
  selectError,
} from "../redux/auth/authSelectors";
// import { setIsAuthenticated } from "../redux/calendar/calendarSlice";
// import { selectIsAuthenticated } from "../redux/calendar/calendarSelectors";
// import {
//   initializeGoogleAPI,
//   fetchEvents,
// } from "../redux/calendar/calendarThunks";
import { setNavAndSideVisibility } from "../redux/navAndSide/navAndSideSlice";
import DailyTrack_dark from "../assets/logo/DailyTrack_dark.svg";
import DailyTrack_light from "../assets/logo/DailyTrack_light.svg";
import { AppDispatch } from "../redux/store";

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const token = useSelector(selectToken);
  const isAuthLoading = useSelector(selectIsLoading);
  const authError = useSelector(selectError);
  // const isGoogleAuthenticated = useSelector(selectIsAuthenticated);
  const { mode } = useThemeMode();
  const isDarkmode = mode === "dark";
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    dispatch(setNavAndSideVisibility(false));
  }, []);

  useEffect(() => {
    if (token) {
      navigate("/upcoming");
    }
  }, [token, navigate]);

  // useEffect(() => {
  //   let isMounted = true;

  //   const initAuth = async () => {
  //     try {

  //       if (!gapi.client) {
  //         await dispatch(initializeGoogleAPI()).unwrap();
  //       }

  //       if (isMounted && isGoogleAuthenticated) {
  //         navigate("/upcoming");
  //       }
  //     } catch (error) {
  //       console.error("Failed to initialize Google API:", error);
  //     }
  //   };

  //   initAuth();

  //   return () => {
  //     isMounted = false;
  //   };
  // }, [dispatch, isGoogleAuthenticated, navigate]);

  // const handleGoogleSignIn = useCallback(
  //   async (e: React.FormEvent) => {
  //     e.preventDefault();
  //     try {
  //       const auth2 = gapi.auth2.getAuthInstance();
  //       await auth2.signIn();
  //       dispatch(setIsAuthenticated(true));
  //       dispatch(fetchEvents());
  //     } catch (error) {
  //       console.error("Sign in error:", error);
  //     }
  //   },
  //   [dispatch, navigate]
  // );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await dispatch(login(credentials)).unwrap();
      // Redirect based on user type
      if (
        result.user.userType === "superAdmin" ||
        result.user.userType === "admin"
      ) {
        navigate("/users");
      } else {
        navigate("/upcoming");
      }
      dispatch(setNavAndSideVisibility(true));
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img
              className="h-8 mr-2"
              src={isDarkmode ? DailyTrack_dark : DailyTrack_light}
              alt="logo"
            />
          </div>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </p>
              {authError && (
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
                  {authError}
                </div>
              )}
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="name@contessa.com"
                    value={credentials.email}
                    onChange={(e) =>
                      setCredentials({ ...credentials, email: e.target.value })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    value={credentials.password}
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        password: e.target.value,
                      })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isAuthLoading}
                  // onClick={handleGoogleSignIn}
                  className="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                >
                  {isAuthLoading ? "Signing in..." : "Sign in"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
