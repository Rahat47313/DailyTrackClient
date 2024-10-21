import { Datepicker, Checkbox } from "flowbite-react";
import { TiPlus } from "react-icons/ti";

export default function SidebarRight() {
  const customTheme = {
    root: {
      base: "absolute w-full", // Styling the outer wrapper
    },
    triggerButton: {
      base: "text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 font-medium rounded-lg text-sm text-center flex justify-center items-center dark:bg-gray-700 dark:hover:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
    },
    popup: {
      base: "absolute top-10 z-50 block pt-2",
    }
  };
  return (
    <>
      <div
        id="drawer-navigation"
        className="h-screen p-8 overflow-y-auto transition-transform translate-x-[100%] bg-white dark:bg-gray-800"
        tabIndex={-1}
        aria-labelledby="drawer-navigation-label"
      >
        <div id="drawer-navigation-label"></div>
        <div className="font-bold text-xl text-gray-500 uppercase dark:text-gray-400">
          Task:
        </div>
        <button
          type="button"
          data-drawer-hide="drawer-navigation"
          aria-controls="drawer-navigation"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
        <div className="py-4 overflow-y-auto">
          <div className="space-y-2 font-medium">
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
                  className="text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 font-medium rounded-lg text-sm  w-full p-2.5 text-center flex justify-center items-center dark:bg-gray-700 dark:hover:bg-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                <Datepicker id="datepick" theme={customTheme} />
              </div>
              <div className="font-bold text-xl text-gray-500 uppercase dark:text-gray-400">
                Subtasks:
              </div>
              <button className="flex items-center border rounded-md border-gray-200 dark:border-gray-700 gap-4 py-3 px-5 w-full">
                <TiPlus />
                <div>Add New Subtask</div>
              </button>
              <div className="flex items-center gap-4">
                <Checkbox />
                <div>Research content ideas</div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
