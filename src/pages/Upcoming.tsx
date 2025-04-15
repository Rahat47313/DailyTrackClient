import { useDispatch, useSelector } from "react-redux";
import { TiPlus } from "react-icons/ti";
import SidebarRight from "../components/SidebarRight";
import { setSidebarRightVisibility } from "../redux/sidebarRight/sidebarRightSlice";
import UpcomingTasks from "../components/Upcoming/UpcomingTasks";
import { selectTasks, selectTasksLoading } from "../redux/tasks/tasksSelectors";
import { useEffect } from "react";
import { fetchAllUpcomingTasks } from "../redux/tasks/tasksThunks";
import { clearSelectedTask } from "../redux/sidebarRight/selectedTaskSlice";
import { AppDispatch } from "../redux/store";
import type { Task } from "../types";

function groupTasksByDate(tasks: Task[]) {
  if (!tasks || tasks.length === 0) return { today: [], tomorrow: [], thisWeek: [] };

  const now = new Date();
  now.setHours(0, 0, 0, 0); // Start of today

  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1); // Start of tomorrow

  const weekFromNow = new Date(now);
  weekFromNow.setDate(weekFromNow.getDate() + 7); // One week from today
  // const today = new Date().toISOString().split("T")[0];
  // const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];
  // const weekFromNow = new Date(Date.now() + 7 * 86400000)
  //   .toISOString()
  //   .split("T")[0];

  return {
    today: tasks.filter((task) => {
      if (!task?.dueDate) return false;
      const taskDate = new Date(task.dueDate);
      taskDate.setHours(0, 0, 0, 0);
      return taskDate.getTime() === now.getTime();
    }), //task.dueDate?.split("T")[0] === today

    tomorrow: tasks.filter((task) => {
      if (!task?.dueDate) return false;
      const taskDate = new Date(task.dueDate);
      taskDate.setHours(0, 0, 0, 0);
      return taskDate.getTime() === tomorrow.getTime();
    }), //task.dueDate?.split("T")[0] === tomorrow
    thisWeek: tasks.filter((task) => {
      if (!task?.dueDate) return false;
      const taskDate = new Date(task.dueDate);
      taskDate.setHours(0, 0, 0, 0); //task.dueDate?.split("T")[0];
      return taskDate > tomorrow && taskDate <= weekFromNow;
    }),
  };
}

export default function Upcoming() {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector(selectTasks) as Task[];
  const isLoading = useSelector(selectTasksLoading);
  const groupedTasks = groupTasksByDate(tasks);

  useEffect(() => {
    dispatch(fetchAllUpcomingTasks());
  }, [dispatch]);

  const renderTaskSection = (title: string, tasksToRender: Task[]) => {
    // If there are no tasks, don't render the section
    if (!tasksToRender || tasksToRender.length === 0) return null;

    return (
      <div className="flex-grow p-4 border-2 rounded-lg border-gray-200 dark:border-gray-700">
        <div className="font-bold text-2xl mb-4">{title}</div>
        {tasksToRender.map((task: Task) => (
          <UpcomingTasks key={task._id} task={task} />
        ))}
      </div>
    );
  };

  if (isLoading) {
    return <div className="p-4 md:ml-64 mt-[60px]">Loading...</div>;
  }

  return (
    <>
      <div className="p-4 md:ml-64 mt-[60px]">
        <SidebarRight />
        <div className="font-bold text-4xl border-b border-gray-200 dark:border-gray-700 pb-5 mb-5">
          Upcoming Tasks
        </div>

        <button
          onClick={() => {
            dispatch(clearSelectedTask());
            dispatch(setSidebarRightVisibility(true));
          }}
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
