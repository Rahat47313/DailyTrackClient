import { Checkbox } from "flowbite-react";

export default function Dashboard() {
  return (
    <>
      <div className="p-4 sm:ml-64 text-gray-900 dark:text-white">
        <div className="p-4 border-2 rounded-lg border-gray-200 dark:border-gray-700 mt-[60px]">
          <div className="font-bold text-2xl">Today</div>
          <div className="flex items-center border-b border-gray-200 dark:border-gray-700 gap-4 py-3 pl-5">
            <Checkbox />
            <div>Research content ideas</div>
          </div>
          <div className="flex items-center border-b border-gray-200 dark:border-gray-700 gap-4 py-3 pl-5">
            <Checkbox />
            <div>Create a database of guest authors</div>
          </div>
        </div>
        <div className="flex justify-between gap-4 mt-5">
        <div className="flex-grow p-4 border-2 rounded-lg border-gray-200 dark:border-gray-700">
          Tomorrow
        </div>
        <div className="flex-grow p-4 border-2 rounded-lg border-gray-200 dark:border-gray-700">
          This Week
        </div>
        </div>
      </div>
    </>
  );
}
