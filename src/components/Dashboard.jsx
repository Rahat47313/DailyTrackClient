export default function Dashboard() {
  return (
    <>
      <div className="p-4 sm:ml-64 text-gray-900 dark:text-white">
        <div className="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700 mt-14">
          Today
        </div>
        <div className="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700 mt-14">
          Tomorrow
        </div>
        <div className="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700 mt-14">
          This Week
        </div>
      </div>
    </>
  );
}
