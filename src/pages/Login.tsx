import { useCallback, useEffect, useState } from "react";
import { gapi } from "gapi-script";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useThemeMode } from "flowbite-react";
import { setIsAuthenticated } from "../redux/calendar/calendarSlice";
import { selectIsAuthenticated } from "../redux/calendar/calendarSelectors";
import {
  initializeGoogleAPI,
  fetchEvents,
} from "../redux/calendar/calendarThunks";
import { setNavAndSideVisibility } from "../redux/navAndSide/navAndSideSlice";
import DailyTrack_dark from "../assets/logo/DailyTrack_dark.svg";
import DailyTrack_light from "../assets/logo/DailyTrack_light.svg";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { mode } = useThemeMode();
  const isDarkmode = mode === "dark";

  useEffect(() => {
    let isMounted = true;

    const initAuth = async () => {
      try {
        dispatch(setNavAndSideVisibility(false));

        if (!gapi.client) {
          await dispatch(initializeGoogleAPI()).unwrap();
        }

        if (isMounted && isAuthenticated) {
          navigate("/upcoming");
          dispatch(setNavAndSideVisibility(true));
        }
      } catch (error) {
        console.error("Failed to initialize Google API:", error);
      }
    };

    initAuth();

    return () => {
      isMounted = false;
    };
  }, [dispatch, isAuthenticated, navigate]);

  const handleSignIn = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const auth2 = gapi.auth2.getAuthInstance();
        await auth2.signIn();
        dispatch(setIsAuthenticated(true));
        dispatch(fetchEvents());
        navigate("/upcoming");
        dispatch(setNavAndSideVisibility(true));
      } catch (error) {
        console.error("Sign in error:", error);
      }
    },
    [dispatch, navigate]
  );

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href=""
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              className="h-8 mr-2"
              src={isDarkmode ? DailyTrack_dark : DailyTrack_light}
              alt="logo"
            />
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                    placeholder="name@contessa.com"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                    required=""
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 checked:bg-red-600 dark:checked:bg-red-600 focus:ring-red-600 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-red-600 dark:ring-offset-gray-800"
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                  >
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  onClick={handleSignIn}
                  className="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                >
                  Sign in
                </button>
                {/* <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <a
                    href="#"
                    className="font-medium text-red-600 hover:underline dark:text-red-500"
                  >
                    Sign up
                  </a>
                </p> */}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
