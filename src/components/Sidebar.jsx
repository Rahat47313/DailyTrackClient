export default function Sidebar() {
  return (
    <>
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="h-full text-sm px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <div className="space-y-2 font-medium">
            <div>TASKS</div>
            <ul>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <div className="w-5 h-5 fill-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                    <svg viewBox="0 0 500 500">
                      <switch>
                        <g>
                          <path d="M71.4 35.2c.1-5.8.2-11.5.2-17.3C71.7 5.2 80.8-1.4 92.7.3c17.9 2.6 14.2 22.2 14.5 34.7 0 .5.3.7.7.7h70c.4 0 .5-.2.5-.5.1-6.2.1-12.4.1-18.4-.2-21.8 35.4-23 35.6.5.1 6 .1 12 .1 17.9 0 .3.2.6.5.6H285c.4 0 .6-.2.6-.6 0-7.6-.9-18.4 1.1-24.4 5.9-16.9 34.7-13.1 34.6 5.7 0 6.2 0 12.3.1 18.5 0 .5.3.7.7.7h70.1c.4 0 .5-.2.5-.5 0-6.1.1-12.1 0-18.1-.1-22.5 35.7-23.2 35.7.5 0 5.8 0 11.7.1 17.5 0 .4.2.6.6.6 13 0 26.6-1.1 39 4.3 15.5 6.8 26.7 20.2 30.4 36.8.9 4.2 1.4 11.7 1.4 22.2v335.9c0 11-.3 18.5-1 22.2-4.6 25.2-26.6 42.7-52.5 42.7-130.9.1-261.7.1-392.6 0-25.5 0-47.2-16.4-52.5-41.6-.9-4.1-1.3-11.5-1.3-22.1V89.3c0-24.8 15.7-45.7 39.8-51.8 9.2-2.4 20.7-1.9 30.9-1.7.4 0 .7-.2.7-.6zm249.2 60.1c-5.3 17.7-34.2 15.3-34.6-4.9-.1-6-.2-12.1-.4-18.2 0-.5-.2-.7-.7-.7h-70c-.3 0-.5.2-.5.5-.2 7.5.9 17.4-1.1 23.7-3.9 11.7-18 14.7-27.5 8.4-4.5-3-6.8-7.9-7-14.5-.1-6-.2-11.8-.2-17.6 0-.4-.2-.5-.5-.5h-70.3c-.3 0-.5.2-.5.5-.1 4.6-.1 9.2 0 13.8.2 11.8-4.4 21.4-17.7 21.3-7.8 0-14.4-3.6-17-11.1-2-5.9-1-16.5-1.1-23.9 0-.4-.2-.6-.6-.6-4.3 0-8.5-.1-12.8 0-9.7 0-17.3 1.2-20.9 10.4-.9 2.3-1.4 6.1-1.4 11.3-.1 16.2-.1 32.6.1 49 0 .5.2.7.7.7h427.2c.4 0 .5-.2.5-.5.1-16 .1-32.1 0-48.1 0-10.1-1.2-18.3-11.1-21.6-6.1-2.1-16.5-1.1-24-1.1-.4 0-.6.2-.6.6-.1 7.5 1 17.6-1.2 23.9-4 11.4-17.9 14.3-27.2 8.2-4.6-3-7-7.9-7.1-14.6-.1-5.9-.2-11.7-.3-17.3 0-.4-.4-.8-.8-.8h-70c-.4 0-.6.2-.6.6v15.1c0 3.6-.3 6.3-.8 8zM35.7 446.9c0 10.4 7.6 17.4 17.8 17.4h388.9c5.2 0 9.1-.5 11.6-1.6 6.8-2.9 10.2-8.9 10.2-18V179.3c0-.6-.3-.8-.8-.8H36.3c-.4 0-.5.2-.5.5-.1 89.5-.1 178.7-.1 267.9z" />
                          <path d="M295.9 303.2c-5.8-5.9-11.7-11.9-17.7-17.8-4.9-4.9-7.8-8.4-8.8-10.7-6-13.6 9.8-29.7 23.8-22.8 1.9.9 4.5 3.1 7.8 6.4 15.5 15.5 31 30.9 46.4 46.4 7 7.1 11 12 9.2 21.6-.9 4.6-3.2 6.7-6.3 9.9-16.2 16.2-32.4 32.5-48.6 48.6-4 4-7.2 6.4-9.7 7.4-7.2 2.7-14.7.2-19.5-5.8-7.2-8.8-4.2-18.2 3.1-25.5l20.6-20.6c.2-.2.1-.4 0-.6-.1-.1-.2-.1-.3-.1H168c-7.3 0-12.1-.5-14.6-1.5-13.7-5.6-13.4-27.4.1-32.6 2.8-1.1 8.2-1.6 16-1.6 42 .1 84.1.1 126.3 0 .5 0 .6-.2.1-.7z" />
                        </g>
                      </switch>
                    </svg>
                  </div>
                  <span className="ms-3">Upcoming</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <div className="w-5 h-5 fill-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                    <svg viewBox="0 0 500 500">
                      <switch>
                        <g>
                          <path d="M71.4 35.2c.1-5.8.2-11.5.2-17.3C71.7 5.2 80.8-1.4 92.7.3c17.9 2.6 14.2 22.2 14.5 34.7 0 .5.3.7.7.7h70c.4 0 .5-.2.5-.5.1-6.2.1-12.4.1-18.4-.2-21.8 35.4-23 35.6.5.1 6 .1 12 .1 17.9 0 .3.2.6.5.6H285c.4 0 .6-.2.6-.6 0-7.6-.9-18.4 1.1-24.4 5.9-16.9 34.7-13.1 34.6 5.7 0 6.2 0 12.3.1 18.5 0 .5.3.7.7.7h70.1c.4 0 .5-.2.5-.5 0-6.1.1-12.1 0-18.1-.1-22.5 35.7-23.2 35.7.5 0 5.8 0 11.7.1 17.5 0 .4.2.6.6.6 13 0 26.6-1.1 39 4.3 15.5 6.8 26.7 20.2 30.4 36.8.9 4.2 1.4 11.7 1.4 22.2v335.9c0 11-.3 18.5-1 22.2-4.6 25.2-26.6 42.7-52.5 42.7-130.9.1-261.7.1-392.6 0-25.5 0-47.2-16.4-52.5-41.6-.9-4.1-1.3-11.5-1.3-22.1V89.3c0-24.8 15.7-45.7 39.8-51.8 9.2-2.4 20.7-1.9 30.9-1.7.4 0 .7-.2.7-.6zm249.2 60.1c-5.3 17.7-34.2 15.3-34.6-4.9-.1-6-.2-12.1-.4-18.2 0-.5-.2-.7-.7-.7h-70c-.3 0-.5.2-.5.5-.2 7.5.9 17.4-1.1 23.7-3.9 11.7-18 14.7-27.5 8.4-4.5-3-6.8-7.9-7-14.5-.1-6-.2-11.8-.2-17.6 0-.4-.2-.5-.5-.5h-70.3c-.3 0-.5.2-.5.5-.1 4.6-.1 9.2 0 13.8.2 11.8-4.4 21.4-17.7 21.3-7.8 0-14.4-3.6-17-11.1-2-5.9-1-16.5-1.1-23.9 0-.4-.2-.6-.6-.6-4.3 0-8.5-.1-12.8 0-9.7 0-17.3 1.2-20.9 10.4-.9 2.3-1.4 6.1-1.4 11.3-.1 16.2-.1 32.6.1 49 0 .5.2.7.7.7h427.2c.4 0 .5-.2.5-.5.1-16 .1-32.1 0-48.1 0-10.1-1.2-18.3-11.1-21.6-6.1-2.1-16.5-1.1-24-1.1-.4 0-.6.2-.6.6-.1 7.5 1 17.6-1.2 23.9-4 11.4-17.9 14.3-27.2 8.2-4.6-3-7-7.9-7.1-14.6-.1-5.9-.2-11.7-.3-17.3 0-.4-.4-.8-.8-.8h-70c-.4 0-.6.2-.6.6v15.1c0 3.6-.3 6.3-.8 8zM35.7 446.9c0 10.4 7.6 17.4 17.8 17.4h388.9c5.2 0 9.1-.5 11.6-1.6 6.8-2.9 10.2-8.9 10.2-18V179.3c0-.6-.3-.8-.8-.8H36.3c-.4 0-.5.2-.5.5-.1 89.5-.1 178.7-.1 267.9z" />
                          <path d="M225.3 396c-4.2 0-8.4-1.6-11.6-4.8l-65.8-66.1c-6.4-6.5-6.4-16.9 0-23.4s16.9-6.5 23.3 0l54.2 54.4 103.5-104c6.4-6.5 16.8-6.5 23.3 0 6.4 6.5 6.4 16.9 0 23.4L237 391.2c-3.3 3.2-7.5 4.8-11.7 4.8z" />
                        </g>
                      </switch>
                    </svg>
                  </div>
                  <span className="flex-1 ms-3 whitespace-nowrap">Today</span>
                  <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                    Pro
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Calendar
                  </span>
                  <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                    3
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                  >
                    <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Sticky Wall
                  </span>
                </a>
              </li>
            </ul>
          </div>
          <div className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
            <div>LISTS</div>
            <ul>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                >
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 17 20"
                  >
                    <path d="M7.958 19.393a7.7 7.7 0 0 1-6.715-3.439c-2.868-4.832 0-9.376.944-10.654l.091-.122a3.286 3.286 0 0 0 .765-3.288A1 1 0 0 1 4.6.8c.133.1.313.212.525.347A10.451 10.451 0 0 1 10.6 9.3c.5-1.06.772-2.213.8-3.385a1 1 0 0 1 1.592-.758c1.636 1.205 4.638 6.081 2.019 10.441a8.177 8.177 0 0 1-7.053 3.795Z" />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Personal
                  </span>
                  <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                    3
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                >
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 20"
                  >
                    <path d="M16 14V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 0 0 0-2h-1v-2a2 2 0 0 0 2-2ZM4 2h2v12H4V2Zm8 16H3a1 1 0 0 1 0-2h9v2Z" />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">Work</span>
                  <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                    4
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                >
                  <span className="">+ Add New List</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
            <ul>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                >
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 17 20"
                  >
                    <path d="M7.958 19.393a7.7 7.7 0 0 1-6.715-3.439c-2.868-4.832 0-9.376.944-10.654l.091-.122a3.286 3.286 0 0 0 .765-3.288A1 1 0 0 1 4.6.8c.133.1.313.212.525.347A10.451 10.451 0 0 1 10.6 9.3c.5-1.06.772-2.213.8-3.385a1 1 0 0 1 1.592-.758c1.636 1.205 4.638 6.081 2.019 10.441a8.177 8.177 0 0 1-7.053 3.795Z" />
                  </svg>
                  <span className="ms-3">Settings</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                >
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 20"
                  >
                    <path d="M16 14V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 0 0 0-2h-1v-2a2 2 0 0 0 2-2ZM4 2h2v12H4V2Zm8 16H3a1 1 0 0 1 0-2h9v2Z" />
                  </svg>
                  <span className="ms-3">Sign Out</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
}
