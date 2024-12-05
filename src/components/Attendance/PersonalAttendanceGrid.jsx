// import { Fragment } from "react";

export default function PersoanalAttendanceGrid() {
  return (
    <>
      {/* <div className="flex h-full flex-col text-gray-900 dark:text-white">
        <div className="isolate flex flex-auto flex-col overflow-auto">
          <div className="grid grid-cols-12 text-sm leading-6 divide-x divide-gray-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-700"> */}
      {/* Header Row */}
      {/* <div className="col-start-1 row-start-1 sticky top-0 z-10 bg-gray-50 dark:bg-gray-800 shadow text-center font-semibold">
              Date
            </div>
            {[
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ].map((month) => (
              <div
                key={month}
                className="row-start-1 sticky top-0 z-10 bg-gray-50 dark:bg-gray-800 shadow text-center font-semibold"
              >
                {month}
              </div>
            ))} */}

      {/* Dates and Data Rows */}
      {/* {[...Array(31)].map((_, rowIndex) => (
              <Fragment key={rowIndex}>
                <div className="text-right font-semibold bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 pr-2">
                  {rowIndex + 1}
                </div>
                {[...Array(12)].map((_, colIndex) => (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className="h-14 text-center border-b border-gray-200 dark:border-gray-700"
                  ></div>
                ))}
              </Fragment>
            ))}
          </div>
        </div>
      </div> */}

      <div className="flex h-full flex-col text-gray-900 dark:text-white">
        <div className="isolate flex flex-auto flex-col overflow-auto">
          <div
            style={{ width: "165%" }}
            className="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full"
          >
            <div className="sticky top-0 z-30 flex-none shadow ring-1 ring-black dark:ring-white ring-opacity-5 dark:ring-opacity-5 sm:pr-8">
              <div className="-mr-px hidden grid-cols-[repeat(13,1fr)] divide-x divide-gray-200 dark:divide-gray-700 border-r border-gray-200 dark:border-gray-700 text-sm leading-6 text-gray-500 dark:text-gray-400 sm:grid">
                {/* <div className="col-end-1 w-14" /> */}
                <div className="flex items-center justify-center py-3">
                  date
                </div>
                <div className="flex items-center justify-center py-3">JAN</div>
                <div className="flex items-center justify-center py-3">FEB</div>
                <div className="flex items-center justify-center py-3">MAR</div>
                <div className="flex items-center justify-center py-3">APR</div>
                <div className="flex items-center justify-center py-3">MAY</div>
                <div className="flex items-center justify-center py-3">JUN</div>
                <div className="flex items-center justify-center py-3">JUL</div>
                <div className="flex items-center justify-center py-3">AUG</div>
                <div className="flex items-center justify-center py-3">SEP</div>
                <div className="flex items-center justify-center py-3">OCT</div>
                <div className="flex items-center justify-center py-3">NOV</div>
                <div className="flex items-center justify-center py-3">DEC</div>
              </div>
            </div>
            <div className="flex flex-auto">
              <div className="sticky left-0 z-10 w-14 flex-none ring-1 ring-gray-200 dark:ring-gray-700" />
              <div className="grid flex-auto grid-cols-1 grid-rows-1">
                {/* Horizontal lines */}
                <div
                  className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-200 dark:divide-gray-700"
                  style={{
                    gridTemplateRows: "repeat(31, minmax(3.5rem, 1fr))",
                  }}
                >
                  <div className="row-end-1 h-7"></div>
                  <div>
                    <div className="sticky left-0 z-20 -ml-14 mt-4 w-14 pr-2 text-right text-xs leading-5 text-gray-500 dark:text-gray-400">
                      01
                    </div>
                  </div>
                  <div>
                    <div className="sticky left-0 z-20 -ml-14 mt-4 w-14 pr-2 text-right text-xs leading-5 text-gray-500 dark:text-gray-400">
                      02
                    </div>
                  </div>
                  <div>
                    <div className="sticky left-0 z-20 -ml-14 mt-4 w-14 pr-2 text-right text-xs leading-5 text-gray-500 dark:text-gray-400">
                      03
                    </div>
                  </div>
                  <div>
                    <div className="sticky left-0 z-20 -ml-14 mt-4 w-14 pr-2 text-right text-xs leading-5 text-gray-500 dark:text-gray-400">
                      04
                    </div>
                  </div>
                  <div>
                    <div className="sticky left-0 z-20 -ml-14 mt-4 w-14 pr-2 text-right text-xs leading-5 text-gray-500 dark:text-gray-400">
                      05
                    </div>
                  </div>
                  <div>
                    <div className="sticky left-0 z-20 -ml-14 mt-4 w-14 pr-2 text-right text-xs leading-5 text-gray-500 dark:text-gray-400">
                      06
                    </div>
                  </div>
                  <div>
                    <div className="sticky left-0 z-20 -ml-14 mt-4 w-14 pr-2 text-right text-xs leading-5 text-gray-500 dark:text-gray-400">
                      07
                    </div>
                  </div>
                  <div>
                    <div className="sticky left-0 z-20 -ml-14 mt-4 w-14 pr-2 text-right text-xs leading-5 text-gray-500 dark:text-gray-400">
                      08
                    </div>
                  </div>
                  <div>
                    <div className="sticky left-0 z-20 -ml-14 mt-4 w-14 pr-2 text-right text-xs leading-5 text-gray-500 dark:text-gray-400">
                      09
                    </div>
                  </div>
                  <div>
                    <div className="sticky left-0 z-20 -ml-14 mt-4 w-14 pr-2 text-right text-xs leading-5 text-gray-500 dark:text-gray-400">
                      10
                    </div>
                  </div>
                  <div>
                    <div className="sticky left-0 z-20 -ml-14 mt-4 w-14 pr-2 text-right text-xs leading-5 text-gray-500 dark:text-gray-400">
                      11
                    </div>
                  </div>
                  <div>
                    <div className="sticky left-0 z-20 -ml-14 mt-4 w-14 pr-2 text-right text-xs leading-5 text-gray-500 dark:text-gray-400">
                      12
                    </div>
                  </div>
                  <div>
                    <div className="sticky left-0 z-20 -ml-14 mt-4 w-14 pr-2 text-right text-xs leading-5 text-gray-500 dark:text-gray-400">
                      13
                    </div>
                  </div>
                  <div>
                    <div className="sticky left-0 z-20 -ml-14 mt-4 w-14 pr-2 text-right text-xs leading-5 text-gray-500 dark:text-gray-400">
                      14
                    </div>
                  </div>
                  <div>
                    <div className="sticky left-0 z-20 -ml-14 mt-4 w-14 pr-2 text-right text-xs leading-5 text-gray-500 dark:text-gray-400">
                      15
                    </div>
                  </div>
                  <div>
                    <div className="sticky left-0 z-20 -ml-14 mt-4 w-14 pr-2 text-right text-xs leading-5 text-gray-500 dark:text-gray-400">
                      16
                    </div>
                  </div>
                  <div>
                    <div className="sticky left-0 z-20 -ml-14 mt-4 w-14 pr-2 text-right text-xs leading-5 text-gray-500 dark:text-gray-400">
                      17
                    </div>
                  </div>
                  <div>
                    <div className="sticky left-0 z-20 -ml-14 mt-4 w-14 pr-2 text-right text-xs leading-5 text-gray-500 dark:text-gray-400">
                      18
                    </div>
                  </div>
                  <div>
                    <div className="sticky left-0 z-20 -ml-14 mt-4 w-14 pr-2 text-right text-xs leading-5 text-gray-500 dark:text-gray-400">
                      19
                    </div>
                  </div>
                  <div>
                    <div className="sticky left-0 z-20 -ml-14 mt-4 w-14 pr-2 text-right text-xs leading-5 text-gray-500 dark:text-gray-400">
                      20
                    </div>
                  </div>
                  <div>
                    <div className="sticky left-0 z-20 -ml-14 mt-4 w-14 pr-2 text-right text-xs leading-5 text-gray-500 dark:text-gray-400">
                      21
                    </div>
                  </div>
                  <div>
                    <div className="sticky left-0 z-20 -ml-14 mt-4 w-14 pr-2 text-right text-xs leading-5 text-gray-500 dark:text-gray-400">
                      22
                    </div>
                  </div>
                  <div>
                    <div className="sticky left-0 z-20 -ml-14 mt-4 w-14 pr-2 text-right text-xs leading-5 text-gray-500 dark:text-gray-400">
                      23
                    </div>
                  </div>
                  <div>
                    <div className="sticky left-0 z-20 -ml-14 mt-4 w-14 pr-2 text-right text-xs leading-5 text-gray-500 dark:text-gray-400">
                      24
                    </div>
                  </div>
                  <div>
                    <div className="sticky left-0 z-20 -ml-14 mt-4 w-14 pr-2 text-right text-xs leading-5 text-gray-500 dark:text-gray-400">
                      25
                    </div>
                  </div>
                  <div>
                    <div className="sticky left-0 z-20 -ml-14 mt-4 w-14 pr-2 text-right text-xs leading-5 text-gray-500 dark:text-gray-400">
                      26
                    </div>
                  </div>
                  <div>
                    <div className="sticky left-0 z-20 -ml-14 mt-4 w-14 pr-2 text-right text-xs leading-5 text-gray-500 dark:text-gray-400">
                      27
                    </div>
                  </div>
                  <div>
                    <div className="sticky left-0 z-20 -ml-14 mt-4 w-14 pr-2 text-right text-xs leading-5 text-gray-500 dark:text-gray-400">
                      28
                    </div>
                  </div>
                  <div>
                    <div className="sticky left-0 z-20 -ml-14 mt-4 w-14 pr-2 text-right text-xs leading-5 text-gray-500 dark:text-gray-400">
                      29
                    </div>
                  </div>
                  <div>
                    <div className="sticky left-0 z-20 -ml-14 mt-4 w-14 pr-2 text-right text-xs leading-5 text-gray-500 dark:text-gray-400">
                      30
                    </div>
                  </div>
                  <div>
                    <div className="sticky left-0 z-20 -ml-14 mt-4 w-14 pr-2 text-right text-xs leading-5 text-gray-500 dark:text-gray-400">
                      31
                    </div>
                  </div>
                  <div />
                </div>

                {/* Vertical lines */}
                <div className="col-start-1 col-end-2 row-start-1 hidden grid-cols-7 grid-rows-1 divide-x divide-gray-200 dark:divide-gray-700 sm:grid sm:grid-cols-7">
                  <div className="col-start-1 row-span-full" />
                  <div className="col-start-2 row-span-full" />
                  <div className="col-start-3 row-span-full" />
                  <div className="col-start-4 row-span-full" />
                  <div className="col-start-5 row-span-full" />
                  <div className="col-start-6 row-span-full" />
                  <div className="col-start-7 row-span-full" />
                  <div className="col-start-13 row-span-full w-8" />
                  {/* <div className="col-start-8 row-span-full" />
                  <div className="col-start-9 row-span-full" />
                  <div className="col-start-10 row-span-full" />
                  <div className="col-start-11 row-span-full" />
                  <div className="col-start-12 row-span-full" /> */}
                  {/* <div className="col-start-13 row-span-full w-8" /> */}
                </div>

                {/* Events */}
                <ol
                  className="col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-7 sm:pr-8"
                  style={{
                    gridTemplateRows:
                      "1.75rem repeat(288, minmax(0, 1fr)) auto",
                  }}
                >
                  <li
                    className="relative mt-px flex sm:col-start-3"
                    style={{ gridRow: "74 / span 12" }}
                  >
                    <a
                      href="#"
                      className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-50 p-2 text-xs leading-5 hover:bg-blue-100"
                    >
                      <p className="order-1 font-semibold text-blue-700">
                        Breakfast
                      </p>
                      <p className="text-blue-500 group-hover:text-blue-700">
                        <time dateTime="2022-01-12T06:00">6:00 AM</time>
                      </p>
                    </a>
                  </li>
                  <li
                    className="relative mt-px flex sm:col-start-3"
                    style={{ gridRow: "92 / span 30" }}
                  >
                    <a
                      href="#"
                      className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-pink-50 p-2 text-xs leading-5 hover:bg-pink-100"
                    >
                      <p className="order-1 font-semibold text-pink-700">
                        Flight to Paris
                      </p>
                      <p className="text-pink-500 group-hover:text-pink-700">
                        <time dateTime="2022-01-12T07:30">7:30 AM</time>
                      </p>
                    </a>
                  </li>
                  <li
                    className="relative mt-px hidden sm:col-start-6 sm:flex"
                    style={{ gridRow: "122 / span 24" }}
                  >
                    <a
                      href="#"
                      className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-gray-100 p-2 text-xs leading-5 hover:bg-gray-200"
                    >
                      <p className="order-1 font-semibold text-gray-700">
                        Meeting with design team at Disney
                      </p>
                      <p className="text-gray-500 group-hover:text-gray-700">
                        <time dateTime="2022-01-15T10:00">10:00 AM</time>
                      </p>
                    </a>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
