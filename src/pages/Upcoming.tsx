import { useDispatch } from "react-redux";
import { TiPlus } from "react-icons/ti";
import SidebarRight from "../components/SidebarRight";
import { setSidebarRightVisibility } from "../redux/sidebarRight/sidebarRightSlice";
import UpcomingTasks from "../components/Upcoming/UpcomingTasks";
import UpcomingData from "../components/Upcoming/UpcomingData.json";

function groupTasksByDate(tasks) {
  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];
  const weekFromNow = new Date(Date.now() + 7 * 86400000)
    .toISOString()
    .split("T")[0];

  return {
    today: tasks.filter((task) => task.dueDate === today),
    tomorrow: tasks.filter((task) => task.dueDate === tomorrow),
    thisWeek: tasks.filter((task) => {
      return task.dueDate > tomorrow && task.dueDate <= weekFromNow;
    }),
  };
}

export default function Upcoming() {
  const dispatch = useDispatch();
  const groupedTasks = groupTasksByDate(UpcomingData.tasks);

  const renderTaskSection = (title, tasks) => (
    <div className="flex-grow p-4 border-2 rounded-lg border-gray-200 dark:border-gray-700">
      <div className="font-bold text-2xl mb-4">{title}</div>
      {tasks.map((task) => (
        <UpcomingTasks
          key={task.id}
          task={task}
        />
      ))}
    </div>
  );

  return (
    <>
      <div className="p-4 md:ml-64 mt-[60px]">
        <SidebarRight />
        <div className="font-bold text-4xl border-b border-gray-200 dark:border-gray-700 pb-5 mb-5">
          Upcoming Tasks
        </div>

        <button
          onClick={() => dispatch(setSidebarRightVisibility(true))}
          className="flex items-center border rounded-md border-gray-200 dark:border-gray-700 gap-4 py-3 px-5 my-5 w-full"
        >
          <TiPlus />
          <div>Add New Task</div>
        </button>

        <div className="flex flex-col gap-5">
          {renderTaskSection("Today", groupedTasks.today)}
          {renderTaskSection("Tomorrow", groupedTasks.tomorrow)}
          {renderTaskSection("Next 7 days", groupedTasks.thisWeek)}
        </div>
      </div>
    </>
  );
}
