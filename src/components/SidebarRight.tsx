import { Drawer, Datepicker, Checkbox } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { TiPlus } from "react-icons/ti";
import { selectSidebarRightVisibility } from "../redux/sidebarRight/sidebarRightSelectors";
import { setSidebarRightVisibility } from "../redux/sidebarRight/sidebarRightSlice";

export default function SidebarRight() {
  const dispatch = useDispatch();
  const sidebarRightVisibility = useSelector(selectSidebarRightVisibility);

  const drawerTheme = {
    header: {
      inner: {
        closeButton:
          "absolute p-1.5 end-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white",
        closeIcon: "h-5 w-5",
        titleText:
          "mb-4 inline-flex items-center uppercase text-xl font-bold text-gray-500 dark:text-gray-400",
      },
    },
  };

  return (
    <>
      <Drawer
        open={sidebarRightVisibility}
        onClose={() => dispatch(setSidebarRightVisibility(false))}
        position="right"
        theme={drawerTheme}
        className="p-8 w-[400px]"
      >
        <Drawer.Header titleIcon={() => <></>} title="Task:" />
        <Drawer.Items>
          <form className="space-y-5 max-w-sm mx-auto">
            <div className="">
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <textarea
              id="message"
              rows={4}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Description"
              defaultValue={""}
            />

            <div className="flex items-center gap-4">
              <label
                htmlFor="dropdownDefaultButton"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Lists
              </label>
              <button
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                className="text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 font-medium rounded-lg text-sm w-full p-2.5 text-center flex justify-center items-center dark:bg-gray-700 dark:hover:bg-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="button"
              >
                Choose
                <svg
                  className="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {/* Dropdown menu */}
              <div
                id="dropdown"
                className="z-50 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
              >
                <div
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownDefaultButton"
                >
                  <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    Personal
                  </div>
                  <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    Work
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <label
                htmlFor="datepick"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Due
              </label>
              <Datepicker id="datepick" />
            </div>
            <div className="font-bold text-xl text-gray-500 uppercase dark:text-gray-400">
              Subtasks:
            </div>
            <button className="flex items-center border rounded-md border-gray-200 dark:border-gray-700 gap-4 py-3 px-5 w-full">
              <TiPlus />
              <div>Add New Subtask</div>
            </button>
            <div className="flex items-center gap-4 pl-1">
              <Checkbox />
              <div>Research content ideas</div>
            </div>
          </form>
        </Drawer.Items>
      </Drawer>
    </>
  );
}
