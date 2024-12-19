import { NavLink } from "react-router-dom";
import TaskData from "../components/TaskData.json";

export default function Lists() {
  return (
    <div>
      <div className="p-4 md:ml-64 mt-[60px]">
        <div className="font-bold text-4xl border-b border-gray-200 dark:border-gray-700 pb-5 mb-5">
          Lists of Tasks
        </div>
        <div className="flex gap-5 flex-wrap">
          {TaskData.categories.map((category) => (
            <NavLink
              key={category.name}
              to={`/lists/${category.name}`}
              className="flex justify-center items-center gap-3 p-4 border-2 rounded-lg border-gray-200 dark:border-gray-700"
            >
              <div
                className={`w-5 h-5 rounded-md ${category.color}`}
              />
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}
