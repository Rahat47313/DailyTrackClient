import { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { gapi } from "gapi-script";
import { Dropdown } from "flowbite-react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaUserGear } from "react-icons/fa6";
import { selectCategories } from "../redux/tasks/categoriesSelectors";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../redux/tasks/categoriesThunks";
import { selectTasks } from "../redux/tasks/tasksSelectors";
import { selectTasksCount } from "../redux/tasks/tasksCountSelectors";
import { fetchAllTasksCounts } from "../redux/tasks/tasksCountThunks";
import { logoutUser } from '../redux/auth/authThunks';

export default function SidebarLeft() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tasks = useSelector(selectTasks);
  const tasksCounts = useSelector(selectTasksCount);
  const categories = useSelector(selectCategories) || [];
  const [newCategoryName, setNewCategoryName] = useState("");
  const [renameCategoryId, setRenameCategoryId] = useState(null);
  const [renameCategoryName, setRenameCategoryName] = useState("");

  const dropdownTheme = {
    arrowIcon: "ml-0 h-0 w-0",
    content: "py-1 focus:outline-none",
    floating: {
      animation: "transition-opacity",
      arrow: {
        base: "absolute z-10 h-2 w-2 rotate-45",
        style: {
          dark: "bg-gray-900 dark:bg-gray-700",
          light: "bg-white",
          auto: "bg-white dark:bg-gray-700",
        },
        placement: "-4px",
      },
      base: "z-10 w-fit divide-y divide-gray-100 rounded shadow focus:outline-none",
      content: "py-1 text-sm text-gray-700 dark:text-gray-200",
      divider: "my-1 h-px bg-gray-100 dark:bg-gray-600",
      header: "block px-4 py-2 text-sm text-gray-700 dark:text-gray-200",
      hidden: "invisible opacity-0",
      item: {
        container: "",
        base: "flex w-full cursor-pointer items-center justify-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:bg-gray-600 dark:focus:text-white",
        icon: "mr-2 h-4 w-4",
      },
      style: {
        dark: "bg-gray-900 text-white dark:bg-gray-700",
        light: "border border-gray-200 bg-white text-gray-900",
        auto: "border border-gray-200 bg-white text-gray-900 dark:border-none dark:bg-gray-700 dark:text-white",
      },
      target: "w-fit",
    },
    inlineWrapper: "flex items-center",
  };

  // function generateRandomColor() {
  //   var randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  //   return randomColor;
  //   //random color will be freshly served
  // }

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchAllTasksCounts());
  }, [dispatch]);

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) return;
    try {
      await dispatch(createCategory(newCategoryName)).unwrap();
      setNewCategoryName("");
    } catch (error) {
      console.error("Failed to create category:", error);
    }
  };

  const handleRenameCategory = async (id) => {
    if (!renameCategoryName.trim()) return;
    try {
      await dispatch(updateCategory({ id, name: renameCategoryName })).unwrap();
      setRenameCategoryId(null);
      setRenameCategoryName("");
    } catch (error) {
      console.error("Failed to rename category:", error);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await dispatch(deleteCategory(id)).unwrap();
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  const handleGoogleSignOut = useCallback(async () => {
    try {
      await gapi.auth2.getAuthInstance().signOut();
    } catch (error) {
      console.error("Sign out error:", error);
    }
  }, []);

  const handleSignOut = useCallback(async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate('/login');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  }, [dispatch, navigate]);

  return (
    <>
      <aside className="text-sm overflow-y-auto transition-all -translate-x-full md:translate-x-0 border-r border-gray-200 dark:border-gray-700 fixed top-0 left-0 z-10 w-64 h-screen px-3 pt-20">
        <div className="space-y-2 font-medium">
          <div>TASKS</div>
          <ul>
            <li>
              <NavLink
                to="/upcoming"
                className={({ isActive }) =>
                  isActive
                    ? "w-full flex items-center p-2 rounded-lg hover:text-red-500 dark:hover:text-red-500 bg-gray-100 dark:bg-gray-700 group"
                    : "w-full flex items-center p-2 rounded-lg hover:text-red-500 dark:hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 group"
                }
              >
                <div className="w-5 h-5 fill-gray-500 transition duration-75 group-hover:fill-red-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                  <svg viewBox="0 0 500 500">
                    <switch>
                      <g>
                        <path d="M71.4 35.2c.1-5.8.2-11.5.2-17.3C71.7 5.2 80.8-1.4 92.7.3c17.9 2.6 14.2 22.2 14.5 34.7 0 .5.3.7.7.7h70c.4 0 .5-.2.5-.5.1-6.2.1-12.4.1-18.4-.2-21.8 35.4-23 35.6.5.1 6 .1 12 .1 17.9 0 .3.2.6.5.6H285c.4 0 .6-.2.6-.6 0-7.6-.9-18.4 1.1-24.4 5.9-16.9 34.7-13.1 34.6 5.7 0 6.2 0 12.3.1 18.5 0 .5.3.7.7.7h70.1c.4 0 .5-.2.5-.5 0-6.1.1-12.1 0-18.1-.1-22.5 35.7-23.2 35.7.5 0 5.8 0 11.7.1 17.5 0 .4.2.6.6.6 13 0 26.6-1.1 39 4.3 15.5 6.8 26.7 20.2 30.4 36.8.9 4.2 1.4 11.7 1.4 22.2v335.9c0 11-.3 18.5-1 22.2-4.6 25.2-26.6 42.7-52.5 42.7-130.9.1-261.7.1-392.6 0-25.5 0-47.2-16.4-52.5-41.6-.9-4.1-1.3-11.5-1.3-22.1V89.3c0-24.8 15.7-45.7 39.8-51.8 9.2-2.4 20.7-1.9 30.9-1.7.4 0 .7-.2.7-.6zm249.2 60.1c-5.3 17.7-34.2 15.3-34.6-4.9-.1-6-.2-12.1-.4-18.2 0-.5-.2-.7-.7-.7h-70c-.3 0-.5.2-.5.5-.2 7.5.9 17.4-1.1 23.7-3.9 11.7-18 14.7-27.5 8.4-4.5-3-6.8-7.9-7-14.5-.1-6-.2-11.8-.2-17.6 0-.4-.2-.5-.5-.5h-70.3c-.3 0-.5.2-.5.5-.1 4.6-.1 9.2 0 13.8.2 11.8-4.4 21.4-17.7 21.3-7.8 0-14.4-3.6-17-11.1-2-5.9-1-16.5-1.1-23.9 0-.4-.2-.6-.6-.6-4.3 0-8.5-.1-12.8 0-9.7 0-17.3 1.2-20.9 10.4-.9 2.3-1.4 6.1-1.4 11.3-.1 16.2-.1 32.6.1 49 0 .5.2.7.7.7h427.2c.4 0 .5-.2.5-.5.1-16 .1-32.1 0-48.1 0-10.1-1.2-18.3-11.1-21.6-6.1-2.1-16.5-1.1-24-1.1-.4 0-.6.2-.6.6-.1 7.5 1 17.6-1.2 23.9-4 11.4-17.9 14.3-27.2 8.2-4.6-3-7-7.9-7.1-14.6-.1-5.9-.2-11.7-.3-17.3 0-.4-.4-.8-.8-.8h-70c-.4 0-.6.2-.6.6v15.1c0 3.6-.3 6.3-.8 8zM35.7 446.9c0 10.4 7.6 17.4 17.8 17.4h388.9c5.2 0 9.1-.5 11.6-1.6 6.8-2.9 10.2-8.9 10.2-18V179.3c0-.6-.3-.8-.8-.8H36.3c-.4 0-.5.2-.5.5-.1 89.5-.1 178.7-.1 267.9z" />
                        <path d="M295.9 303.2c-5.8-5.9-11.7-11.9-17.7-17.8-4.9-4.9-7.8-8.4-8.8-10.7-6-13.6 9.8-29.7 23.8-22.8 1.9.9 4.5 3.1 7.8 6.4 15.5 15.5 31 30.9 46.4 46.4 7 7.1 11 12 9.2 21.6-.9 4.6-3.2 6.7-6.3 9.9-16.2 16.2-32.4 32.5-48.6 48.6-4 4-7.2 6.4-9.7 7.4-7.2 2.7-14.7.2-19.5-5.8-7.2-8.8-4.2-18.2 3.1-25.5l20.6-20.6c.2-.2.1-.4 0-.6-.1-.1-.2-.1-.3-.1H168c-7.3 0-12.1-.5-14.6-1.5-13.7-5.6-13.4-27.4.1-32.6 2.8-1.1 8.2-1.6 16-1.6 42 .1 84.1.1 126.3 0 .5 0 .6-.2.1-.7z" />
                      </g>
                    </switch>
                  </svg>
                </div>
                <span className="ms-3 whitespace-nowrap">Upcoming</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/attendance"
                className={({ isActive }) =>
                  isActive
                    ? "w-full flex items-center justify-between p-2 rounded-lg hover:text-red-500 dark:hover:text-red-500 bg-gray-100 dark:bg-gray-700 group"
                    : "w-full flex items-center justify-between p-2 rounded-lg hover:text-red-500 dark:hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 group"
                }
              >
                <div className="flex">
                  <div className="w-5 h-5 fill-gray-500 transition duration-75 group-hover:fill-red-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                    <svg viewBox="0 0 500 500">
                      <switch>
                        <g>
                          <path d="M71.4 35.2c.1-5.8.2-11.5.2-17.3C71.7 5.2 80.8-1.4 92.7.3c17.9 2.6 14.2 22.2 14.5 34.7 0 .5.3.7.7.7h70c.4 0 .5-.2.5-.5.1-6.2.1-12.4.1-18.4-.2-21.8 35.4-23 35.6.5.1 6 .1 12 .1 17.9 0 .3.2.6.5.6H285c.4 0 .6-.2.6-.6 0-7.6-.9-18.4 1.1-24.4 5.9-16.9 34.7-13.1 34.6 5.7 0 6.2 0 12.3.1 18.5 0 .5.3.7.7.7h70.1c.4 0 .5-.2.5-.5 0-6.1.1-12.1 0-18.1-.1-22.5 35.7-23.2 35.7.5 0 5.8 0 11.7.1 17.5 0 .4.2.6.6.6 13 0 26.6-1.1 39 4.3 15.5 6.8 26.7 20.2 30.4 36.8.9 4.2 1.4 11.7 1.4 22.2v335.9c0 11-.3 18.5-1 22.2-4.6 25.2-26.6 42.7-52.5 42.7-130.9.1-261.7.1-392.6 0-25.5 0-47.2-16.4-52.5-41.6-.9-4.1-1.3-11.5-1.3-22.1V89.3c0-24.8 15.7-45.7 39.8-51.8 9.2-2.4 20.7-1.9 30.9-1.7.4 0 .7-.2.7-.6zm249.2 60.1c-5.3 17.7-34.2 15.3-34.6-4.9-.1-6-.2-12.1-.4-18.2 0-.5-.2-.7-.7-.7h-70c-.3 0-.5.2-.5.5-.2 7.5.9 17.4-1.1 23.7-3.9 11.7-18 14.7-27.5 8.4-4.5-3-6.8-7.9-7-14.5-.1-6-.2-11.8-.2-17.6 0-.4-.2-.5-.5-.5h-70.3c-.3 0-.5.2-.5.5-.1 4.6-.1 9.2 0 13.8.2 11.8-4.4 21.4-17.7 21.3-7.8 0-14.4-3.6-17-11.1-2-5.9-1-16.5-1.1-23.9 0-.4-.2-.6-.6-.6-4.3 0-8.5-.1-12.8 0-9.7 0-17.3 1.2-20.9 10.4-.9 2.3-1.4 6.1-1.4 11.3-.1 16.2-.1 32.6.1 49 0 .5.2.7.7.7h427.2c.4 0 .5-.2.5-.5.1-16 .1-32.1 0-48.1 0-10.1-1.2-18.3-11.1-21.6-6.1-2.1-16.5-1.1-24-1.1-.4 0-.6.2-.6.6-.1 7.5 1 17.6-1.2 23.9-4 11.4-17.9 14.3-27.2 8.2-4.6-3-7-7.9-7.1-14.6-.1-5.9-.2-11.7-.3-17.3 0-.4-.4-.8-.8-.8h-70c-.4 0-.6.2-.6.6v15.1c0 3.6-.3 6.3-.8 8zM35.7 446.9c0 10.4 7.6 17.4 17.8 17.4h388.9c5.2 0 9.1-.5 11.6-1.6 6.8-2.9 10.2-8.9 10.2-18V179.3c0-.6-.3-.8-.8-.8H36.3c-.4 0-.5.2-.5.5-.1 89.5-.1 178.7-.1 267.9z" />
                          <path d="M225.3 396c-4.2 0-8.4-1.6-11.6-4.8l-65.8-66.1c-6.4-6.5-6.4-16.9 0-23.4s16.9-6.5 23.3 0l54.2 54.4 103.5-104c6.4-6.5 16.8-6.5 23.3 0 6.4 6.5 6.4 16.9 0 23.4L237 391.2c-3.3 3.2-7.5 4.8-11.7 4.8z" />
                        </g>
                      </switch>
                    </svg>
                  </div>
                  <span className="ms-3 whitespace-nowrap">Attendance</span>
                </div>
                {/* <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                  Pro
                </span> */}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/calendar"
                className={({ isActive }) =>
                  isActive
                    ? "w-full flex items-center justify-between p-2 rounded-lg hover:text-red-500 dark:hover:text-red-500 bg-gray-100 dark:bg-gray-700 group"
                    : "w-full flex items-center justify-between p-2 rounded-lg hover:text-red-500 dark:hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 group"
                }
              >
                <div className="flex">
                  <div className="w-5 h-5 fill-gray-500 transition duration-75 group-hover:fill-red-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                    <svg viewBox="0 0 500 500">
                      <path d="M71.36 35.15c.1-5.77.18-11.52.23-17.25C71.72 5.23 80.77-1.42 92.74.3c17.89 2.57 14.16 22.22 14.45 34.71.01.49.26.74.75.74h70.04c.36 0 .54-.18.54-.54.08-6.21.1-12.35.06-18.41-.17-21.84 35.41-23.05 35.64.54.06 6.04.09 11.99.08 17.86 0 .31.24.56.55.56h70.3c.37 0 .56-.19.56-.56.03-7.58-.93-18.45 1.14-24.4 5.87-16.93 34.68-13.07 34.56 5.7-.04 6.17-.02 12.34.07 18.52.01.49.26.74.75.74h70.07c.36 0 .54-.18.55-.55.04-6.09.06-12.13.03-18.12-.09-22.52 35.7-23.16 35.67.54-.01 5.84.01 11.69.07 17.53 0 .39.2.59.59.59 12.96.01 26.63-1.15 38.97 4.29 15.55 6.84 26.73 20.23 30.41 36.84.94 4.24 1.41 11.65 1.42 22.23.01 111.97.01 223.95 0 335.93 0 11.04-.35 18.46-1.04 22.24-4.61 25.23-26.62 42.66-52.53 42.67-130.86.07-261.72.07-392.57.02-25.52-.01-47.23-16.39-52.52-41.61C.44 454.12 0 446.72 0 436.13V89.31c0-24.75 15.74-45.66 39.79-51.83 9.23-2.37 20.69-1.85 30.94-1.72.41.01.62-.2.63-.61zm249.22 60.19c-5.35 17.75-34.2 15.35-34.59-4.94-.12-5.98-.24-12.06-.37-18.24-.01-.47-.25-.7-.71-.7h-70.04c-.35 0-.53.17-.54.52-.17 7.48.95 17.41-1.14 23.67-3.91 11.69-18.04 14.73-27.46 8.39-4.51-3.04-6.83-7.86-6.96-14.46-.12-5.95-.2-11.82-.25-17.59 0-.36-.18-.54-.54-.54h-70.27c-.35 0-.53.17-.54.52-.1 4.58-.1 9.18-.02 13.81.21 11.76-4.39 21.37-17.71 21.33-7.78-.03-14.44-3.64-16.96-11.09-1.98-5.86-1.04-16.46-1.07-23.92-.01-.41-.22-.62-.62-.62-4.27-.04-8.53-.05-12.78-.04-9.69.03-17.32 1.23-20.88 10.37-.9 2.31-1.37 6.09-1.41 11.34-.12 16.23-.09 32.57.08 49.04 0 .47.24.7.71.7H463.7c.36 0 .54-.18.54-.55.06-16.03.07-32.07.03-48.11-.02-10.13-1.17-18.29-11.13-21.64-6.08-2.05-16.47-1.12-23.96-1.13-.39 0-.58.19-.59.58-.13 7.5.98 17.58-1.22 23.88-4 11.42-17.87 14.34-27.2 8.24-4.61-3.01-6.98-7.87-7.12-14.58-.12-5.9-.2-11.68-.26-17.34-.01-.43-.36-.78-.79-.78h-70.03c-.37 0-.56.19-.56.56.01 5.06 0 10.08-.04 15.06-.02 3.81-.29 6.56-.79 8.26zM35.74 446.92c.01 10.41 7.63 17.43 17.83 17.43 129.63-.03 259.27-.04 388.9-.04 5.24 0 9.1-.52 11.57-1.57 6.82-2.9 10.23-8.89 10.23-17.96V179.43c0-.55-.28-.83-.83-.83H36.28c-.36 0-.55.18-.55.55-.05 89.31-.05 178.57.01 267.77z" />
                      <path d="M403.83 346.46h-26c-6.6 0-12-5.4-12-12v-26c0-6.6 5.4-12 12-12h26c6.6 0 12 5.4 12 12v26c0 6.6-5.4 12-12 12zM309.94 346.46h-26c-6.6 0-12-5.4-12-12v-26c0-6.6 5.4-12 12-12h26c6.6 0 12 5.4 12 12v26c0 6.6-5.4 12-12 12zM216.06 346.46h-26c-6.6 0-12-5.4-12-12v-26c0-6.6 5.4-12 12-12h26c6.6 0 12 5.4 12 12v26c0 6.6-5.4 12-12 12zM122.17 346.46h-26c-6.6 0-12-5.4-12-12v-26c0-6.6 5.4-12 12-12h26c6.6 0 12 5.4 12 12v26c0 6.6-5.4 12-12 12zM403.83 413.29h-26c-6.6 0-12-5.4-12-12v-26c0-6.6 5.4-12 12-12h26c6.6 0 12 5.4 12 12v26c0 6.6-5.4 12-12 12zM309.94 413.29h-26c-6.6 0-12-5.4-12-12v-26c0-6.6 5.4-12 12-12h26c6.6 0 12 5.4 12 12v26c0 6.6-5.4 12-12 12zM216.06 413.29h-26c-6.6 0-12-5.4-12-12v-26c0-6.6 5.4-12 12-12h26c6.6 0 12 5.4 12 12v26c0 6.6-5.4 12-12 12zM122.17 413.29h-26c-6.6 0-12-5.4-12-12v-26c0-6.6 5.4-12 12-12h26c6.6 0 12 5.4 12 12v26c0 6.6-5.4 12-12 12zM403.83 279.63h-26c-6.6 0-12-5.4-12-12v-26c0-6.6 5.4-12 12-12h26c6.6 0 12 5.4 12 12v26c0 6.6-5.4 12-12 12zM309.94 279.63h-26c-6.6 0-12-5.4-12-12v-26c0-6.6 5.4-12 12-12h26c6.6 0 12 5.4 12 12v26c0 6.6-5.4 12-12 12zM216.06 279.63h-26c-6.6 0-12-5.4-12-12v-26c0-6.6 5.4-12 12-12h26c6.6 0 12 5.4 12 12v26c0 6.6-5.4 12-12 12zM122.17 279.63h-26c-6.6 0-12-5.4-12-12v-26c0-6.6 5.4-12 12-12h26c6.6 0 12 5.4 12 12v26c0 6.6-5.4 12-12 12z" />
                    </svg>
                  </div>
                  <span className="ms-3 whitespace-nowrap">Calendar</span>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/stickyWall"
                className={({ isActive }) =>
                  isActive
                    ? "w-full flex items-center p-2 rounded-lg hover:text-red-500 dark:hover:text-red-500 bg-gray-100 dark:bg-gray-700 group"
                    : "w-full flex items-center p-2 rounded-lg hover:text-red-500 dark:hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 group"
                }
              >
                <div className="w-5 h-5 fill-gray-500 transition duration-75 group-hover:fill-red-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                  <svg
                    id="Layer_1"
                    x="0"
                    y="0"
                    version="1.1"
                    viewBox="0 0 500 500"
                  >
                    <switch>
                      <g>
                        <path d="M314.87 435.63H79.5c-3.23 0-5.86-2.63-5.86-5.86V70.24c0-3.23 2.62-5.86 5.86-5.86h341c3.23 0 5.86 2.62 5.86 5.86v253.89c0 1.56-.62 3.04-1.72 4.15L319.01 433.91c-1.1 1.1-2.59 1.72-4.14 1.72zM85.36 423.91h227.08l102.19-102.2V76.1H85.36v347.81z" />
                        <path d="M314.87 435.63c-.76 0-1.52-.15-2.24-.45-2.19-.91-3.62-3.04-3.62-5.41L309 324.13c0-1.55.62-3.04 1.72-4.15 1.1-1.1 2.59-1.72 4.14-1.72H420.5c2.37 0 4.5 1.43 5.41 3.62.91 2.19.41 4.7-1.27 6.38L319.01 433.91c-1.12 1.12-2.62 1.72-4.14 1.72zm5.85-105.64v85.64l85.63-85.64h-85.63z" />
                        <path d="M315.42 500c-1.03 0-2.03-.26-2.93-.79l-111.5-64.37c-2.29-1.33-3.41-4.03-2.73-6.59.69-2.56 3.01-4.34 5.66-4.34h108.52l87.52-87.53c2.09-2.09 5.37-2.29 7.72-.5 2.33 1.79 2.98 5.03 1.51 7.58L320.5 497.07c-.77 1.35-2.06 2.32-3.56 2.73-.51.13-1.01.2-1.52.2zm-89.63-64.37 87.48 50.51 63.5-110-57.76 57.77c-1.1 1.1-2.59 1.72-4.14 1.72h-89.08zM79.5 363.79c-1.02 0-2.02-.26-2.93-.78L2.93 320.49c-2.8-1.61-3.76-5.2-2.14-8l73.64-127.55c1.33-2.29 4.04-3.41 6.59-2.73 2.56.69 4.34 3.01 4.34 5.66v170.07c0 2.09-1.12 4.03-2.93 5.07-.91.53-1.92.78-2.93.78zm-65.64-50.52 59.78 34.51V209.74L13.86 313.27zM420.5 318c-.5 0-1.02-.07-1.52-.2-2.56-.68-4.34-3-4.34-5.66V142.07c0-2.09 1.12-4.03 2.93-5.07 1.81-1.05 4.05-1.05 5.86 0l73.64 42.52c1.35.78 2.32 2.05 2.73 3.56.41 1.5.19 3.1-.59 4.45l-73.64 127.54c-1.07 1.84-3.02 2.93-5.07 2.93zm5.85-165.78v138.05l59.78-103.54-59.78-34.51zM296.16 76.1H147.41c-2.1 0-4.03-1.11-5.07-2.93-1.05-1.81-1.05-4.05 0-5.86l37.17-64.38c.78-1.35 2.05-2.33 3.56-2.73 1.5-.4 3.1-.19 4.45.59l110.95 64.06c2.09.89 3.55 2.97 3.55 5.39 0 3.24-2.62 5.86-5.86 5.86zm-138.6-11.72h116.65l-87.49-50.51-29.16 50.51zM364.74 133.54H135.26c-3.23 0-5.86-2.62-5.86-5.86s2.63-5.86 5.86-5.86h229.48c3.23 0 5.86 2.62 5.86 5.86s-2.63 5.86-5.86 5.86zM364.74 194.71H135.26c-3.23 0-5.86-2.62-5.86-5.86 0-3.23 2.63-5.86 5.86-5.86h229.48c3.23 0 5.86 2.62 5.86 5.86 0 3.23-2.63 5.86-5.86 5.86zM364.74 255.86H135.26c-3.23 0-5.86-2.62-5.86-5.86 0-3.23 2.63-5.86 5.86-5.86h229.48c3.23 0 5.86 2.63 5.86 5.86 0 3.24-2.63 5.86-5.86 5.86zM283.04 317.02H135.26c-3.23 0-5.86-2.63-5.86-5.86 0-3.23 2.63-5.86 5.86-5.86h147.78c3.23 0 5.86 2.63 5.86 5.86 0 3.23-2.63 5.86-5.86 5.86zM283.04 378.18H135.26c-3.23 0-5.86-2.63-5.86-5.86 0-3.23 2.63-5.86 5.86-5.86h147.78c3.23 0 5.86 2.63 5.86 5.86 0 3.24-2.63 5.86-5.86 5.86z" />
                        <path d="M261.38 99.58c3.07 1.78 7.04.71 8.82-2.36l19.37-33.54c1.78-3.07.71-7.04-2.36-8.82-3.07-1.78-7.04-.71-8.82 2.36l-19.37 33.54c-1.77 3.08-.71 7.05 2.36 8.82z" />
                        <path d="M300.1 0c-17.83 0-32.28 14.45-32.28 32.28 0 17.83 14.45 32.28 32.28 32.28 17.83 0 32.28-14.45 32.28-32.28C332.37 14.45 317.92 0 300.1 0zm0 51.64c-10.7 0-19.37-8.67-19.37-19.37 0-10.7 8.67-19.37 19.37-19.37 10.7 0 19.37 8.67 19.37 19.37-.01 10.7-8.68 19.37-19.37 19.37z" />
                      </g>
                    </switch>
                  </svg>
                </div>
                <span className="ms-3 whitespace-nowrap">Sticky Wall</span>
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
          <NavLink to={"/lists"}>LISTS</NavLink>
          <ul>
            {categories.map((category) => (
              <li
                key={category._id}
                className="flex items-center justify-between gap-2"
              >
                {renameCategoryId === category._id ? (
                  <input
                    type="text"
                    value={renameCategoryName}
                    onChange={(e) => setRenameCategoryName(e.target.value)}
                    onBlur={() => handleRenameCategory(category._id)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500 w-40"
                  />
                ) : (
                  <NavLink
                    to={`/lists/${category.name}`}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:text-red-500 dark:hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <div className="flex">
                      <div
                        className={`w-5 h-5 rounded-md ${category.color}`}
                      ></div>
                      <span className="flex-1 ms-3 whitespace-nowrap">
                        {category.name}
                      </span>
                    </div>
                    <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-red-800 bg-red-100 rounded-full dark:bg-red-900 dark:text-white">
                      {tasksCounts[category._id] || 0}
                    </span>
                  </NavLink>
                )}
                <Dropdown
                  label=""
                  theme={dropdownTheme}
                  renderTrigger={() => (
                    <button>
                      <p className="text-xl hover:text-red-500">
                        <BsThreeDotsVertical />
                      </p>
                    </button>
                  )}
                >
                  <Dropdown.Item
                    icon={FaEdit}
                    onClick={() => {
                      setRenameCategoryId(category._id);
                      setRenameCategoryName(category.name);
                    }}
                  >
                    Rename
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item
                    icon={MdDelete}
                    onClick={() => handleDeleteCategory(category._id)}
                  >
                    Delete
                  </Dropdown.Item>
                </Dropdown>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between gap-2">
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Add a new list"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
            />
            <button
              onClick={handleCreateCategory}
              className="flex items-center justify-center px-4 py-2.5 rounded-lg hover:text-red-500 dark:hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 group"
            >
              <span>+</span>
            </button>
          </div>
        </div>
        <div className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
          <ul>
            <li>
              <NavLink
                to="/users"
                className="w-full flex items-center p-2 transition duration-75 rounded-lg hover:text-red-500 dark:hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <div className="w-5 h-5 fill-gray-500 transition duration-75 group-hover:fill-red-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                  <svg viewBox="0 0 500 500">
                    <path d="M112.5 175c34.5 0 62.5-28 62.5-62.5S147.1 50 112.5 50 50 77.9 50 112.5 78 175 112.5 175zm287.6 0c34.5 0 62.5-28 62.5-62.5S434.6 50 400.1 50s-62.5 28-62.5 62.5 27.9 62.5 62.5 62.5zM0 283.4c0 9.1 7.5 16.6 16.6 16.6h167.2C163 281.6 150 254.8 150 225c0-5.9.5-11.7 1.5-17.4-10.6-4.9-22.4-7.6-34.8-7.6H83.4C37.3 200 0 237.3 0 283.4zM250 300c18.8 0 35.9-6.9 49-18.2 2-2.9 4.1-5.7 6.3-8.4 2.1-2.6 4.5-4.8 7-6.5 8-12 12.7-26.4 12.7-42 0-41.4-33.6-75-75-75s-75 33.6-75 75 33.6 75.1 75 75.1zm51.1 47c-8-4.6-14.1-12.7-16.3-22h-80.7C146.7 325 100 371.7 100 429.2c0 11.5 9.3 20.9 20.9 20.9h234.8c-1.6-4.1-2.5-8.5-2.5-12.8V435c-1-.5-2.1-1.2-3.1-1.8l-2 1.2c-13.1 7.6-31.6 6.3-42.7-7.6-3.5-4.4-6.7-9-9.7-13.8l-.1-.2-.1-.2-1.9-3.2-.1-.2-.1-.2c-2.7-4.8-5-9.8-7-15.1-6.4-16.6 1.7-33.3 14.8-40.9l2.1-1.2v-3.6l-2.1-1.2h-.1zm115.6-147h-33.3c-12.4 0-24.2 2.7-34.8 7.6 1 5.6 1.5 11.5 1.5 17.4 0 13.6-2.7 26.5-7.6 38.3 2 .7 3.8 1.6 5.5 2.6l2 1.2c1-.6 2-1.3 3.1-1.8V263c0-15.2 10.4-30.6 28-33.3 6.2-.9 12.5-1.5 18.9-1.5s12.7.5 18.9 1.5c17.6 2.7 28 18.1 28 33.3v2.3c1 .5 2.1 1.2 3.1 1.8l2-1.2c13.1-7.6 31.6-6.3 42.7 7.6 1.8 2.2 3.5 4.5 5.2 6.8-1.5-44.7-38.2-80.3-83.2-80.3zM488 328.1c4.9-2.8 7.4-8.7 5.3-14.1-1.6-4.3-3.6-8.4-5.8-12.4l-1.8-3.1c-2.4-4-5.1-7.7-8-11.3-3.6-4.5-9.9-5.2-14.8-2.3l-14.1 8.2c-7-5.9-14.9-10.6-23.8-13.8v-16.4c0-5.7-3.8-10.8-9.5-11.6-5.1-.8-10.2-1.2-15.5-1.2-5.3 0-10.5.4-15.5 1.2-5.6.9-9.5 5.9-9.5 11.6v16.4c-8.8 3.1-16.8 7.8-23.8 13.8l-14.2-8.2c-4.9-2.8-11.3-2-14.8 2.3-2.9 3.6-5.5 7.4-8 11.4l-1.8 3c-2.2 4-4.1 8.1-5.8 12.4-2 5.3.4 11.2 5.3 14l14.2 8.2c-.8 4.5-1.3 9.1-1.3 13.8s.5 9.3 1.3 13.7l-14.2 8.2c-4.9 2.8-7.4 8.7-5.3 14 1.6 4.3 3.6 8.4 5.8 12.3l1.9 3.2c2.3 4 5 7.7 7.9 11.3 3.6 4.5 9.9 5.2 14.8 2.3l14.2-8c7 5.9 15 10.6 23.8 13.8v16.4c0 5.7 3.8 10.8 9.5 11.6 5.1.8 10.2 1.2 15.5 1.2s10.5-.4 15.5-1.2c5.6-.9 9.5-5.9 9.5-11.6v-16.4c8.8-3.1 16.8-7.8 23.8-13.8l14.2 8.2c4.9 2.8 11.3 2 14.8-2.3 2.9-3.6 5.5-7.3 7.9-11.3l1.9-3.3c2.2-4 4.1-8 5.8-12.3 2-5.3-.4-11.2-5.3-14l-14.2-8.2c.8-4.5 1.3-9.1 1.3-13.7s-.5-9.3-1.3-13.8l14.1-8.2zM431.3 350c0 17.3-14 31.3-31.3 31.3s-31.3-14-31.3-31.3 14-31.3 31.3-31.3c17.3.1 31.3 14 31.3 31.3z" />
                  </svg>
                </div>
                <span className="ms-3">Manage Users</span>
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                to="#"
                className="w-full flex items-center p-2 transition duration-75 rounded-lg hover:text-red-500 dark:hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <div className="w-5 h-5 fill-gray-500 transition duration-75 group-hover:fill-red-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                  <svg viewBox="0 0 500 500">
                    <switch>
                      <g>
                        <path d="m494.56 311.25-47.91-38.83c-1.27-1.03-2.46-2.16-3.54-3.38-11.01-12.38-9.43-30.94 3.54-41.46l47.91-38.83c4.76-3.85 6.61-10.07 4.69-15.73-11.38-33.59-30.13-64.43-54.86-90.56-4.18-4.42-10.74-5.99-16.62-3.99l-59.11 20.17c-1.57.54-3.19.95-4.84 1.24-16.74 2.91-32.79-7.68-35.84-23.66l-11.29-59.01c-1.12-5.86-5.84-10.5-11.95-11.74C286.88 1.85 268.56 0 250 0c-18.57 0-36.9 1.85-54.78 5.48-6.11 1.24-10.83 5.88-11.95 11.75l-11.26 59c-.3 1.57-.73 3.11-1.3 4.62-5.73 15.3-23.36 23.27-39.38 17.8L72.22 78.47c-5.87-2.01-12.44-.43-16.62 3.99-24.73 26.13-43.48 56.97-54.86 90.56-1.92 5.67-.07 11.88 4.69 15.73l47.91 38.83c1.28 1.03 2.46 2.16 3.54 3.38 11.01 12.38 9.43 30.94-3.54 41.46l-47.9 38.83C.68 315.1-1.17 321.32.75 326.98c11.38 33.59 30.12 64.43 54.86 90.56 4.18 4.42 10.74 5.99 16.62 3.99l59.11-20.17c1.57-.54 3.19-.95 4.84-1.24 16.74-2.91 32.79 7.68 35.84 23.66l11.26 59c1.12 5.86 5.84 10.5 11.95 11.75 17.87 3.62 36.2 5.47 54.77 5.47 18.56 0 36.88-1.85 54.74-5.47 6.11-1.24 10.83-5.88 11.95-11.74l11.29-59.01c.3-1.58.73-3.12 1.3-4.63 5.73-15.29 23.36-23.26 39.38-17.8l59.11 20.17c5.87 2 12.43.43 16.62-3.99 24.73-26.13 43.48-56.96 54.86-90.56 1.92-5.66.07-11.87-4.69-15.72zm-244.57 11.69c-40.28 0-72.94-32.66-72.94-72.94s32.66-72.94 72.94-72.94 72.94 32.66 72.94 72.94-32.65 72.94-72.94 72.94z" />
                      </g>
                    </switch>
                  </svg>
                </div>
                <span className="ms-3">Settings</span>
              </NavLink>
            </li> */}
            <li>
              <NavLink
                to="/login"
                // onClick={handleGoogleSignOut}
                onClick={handleSignOut}
                className="w-full flex items-center p-2 transition duration-75 rounded-lg hover:text-red-500 dark:hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <div className="w-5 h-5 fill-gray-500 transition duration-75 group-hover:fill-red-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                  <svg
                    id="Layer_1"
                    x="0"
                    y="0"
                    version="1.1"
                    viewBox="0 0 500 500"
                  >
                    <switch>
                      <g>
                        <path d="M357.42 374.48c-5.69 0-11.38-2.15-15.76-6.45-8.86-8.71-8.98-22.94-.27-31.8L426.15 250l-84.76-86.22c-8.71-8.86-8.58-23.09.27-31.8s23.09-8.59 31.8.27l100.26 101.99c8.6 8.75 8.6 22.78 0 31.53L373.46 367.75c-4.4 4.48-10.22 6.73-16.04 6.73z" />
                        <path d="M450.52 272.49H214.19c-12.42 0-22.49-10.07-22.49-22.49s10.07-22.49 22.49-22.49h236.33c12.42 0 22.49 10.07 22.49 22.49s-10.07 22.49-22.49 22.49z" />
                        <path d="M343.1 500H99.61c-43.99 0-79.78-38.24-79.78-85.25V85.25C19.83 38.24 55.62 0 99.61 0H343.1c12.42 0 22.49 10.07 22.49 22.49s-10.07 22.49-22.49 22.49H99.61c-19.19 0-34.81 18.07-34.81 40.28v329.5c0 22.21 15.61 40.28 34.81 40.28H343.1c12.42 0 22.49 10.07 22.49 22.49 0 12.4-10.07 22.47-22.49 22.47z" />
                      </g>
                    </switch>
                  </svg>
                </div>
                <span className="ms-3">Sign Out</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
