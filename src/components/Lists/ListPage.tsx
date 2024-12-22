import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox } from "flowbite-react";
import { TiPlus } from "react-icons/ti";
import { IoIosArrowForward } from "react-icons/io";
import SidebarRight from "../../components/SidebarRight";
import { setSidebarRightVisibility } from "../../redux/sidebarRight/sidebarRightSlice";
import { clearSelectedTask, setSelectedTask } from "../../redux/sidebarRight/selectedTaskSlice";
import { selectCategories } from "../../redux/tasks/categoriesSelectors";
import { selectTasks, selectTasksLoading } from "../../redux/tasks/tasksSelectors";
import { fetchTasksByCategory } from "../../redux/tasks/tasksThunks";
import { Fragment } from "react/jsx-runtime";
import { setCurrentCategory } from "../../redux/tasks/categoriesSlice";

export default function ListPage() {
  const dispatch = useDispatch();
  const { category } = useParams();
  const categories = useSelector(selectCategories);
  const tasks = useSelector(selectTasks);
  const isLoading = useSelector(selectTasksLoading);

  const categoryData = categories.find((cat) => cat.name === category);

  useEffect(() => {
    if (categoryData?._id) {
      dispatch(fetchTasksByCategory(categoryData._id));
      dispatch(setCurrentCategory(categoryData));
    }
  }, [dispatch, categoryData]);

  const handleTaskClick = (task) => {
    console.log('Task being selected:', task);
    dispatch(
      setSelectedTask({
        ...task,
        category: categoryData
      })
    );
    dispatch(setSidebarRightVisibility(true));
  };

  if (isLoading) {
    return <div className="p-4 md:ml-64 mt-[60px]">Loading...</div>;
  }

  return (
    <>
      <div className="p-4 md:ml-64 mt-[60px]">
        <SidebarRight />
        <div className="font-bold text-4xl border-b border-gray-200 dark:border-gray-700 pb-5 mb-5">
          {category}
        </div>
        <button
          onClick={() => {
            dispatch(clearSelectedTask());
            dispatch(setSidebarRightVisibility(true))
          }}
          className="flex items-center border rounded-md border-gray-200 dark:border-gray-700 gap-4 py-3 px-5 my-5 w-full"
        >
          <TiPlus />
          <div>Add New Task</div>
        </button>
        {tasks?.length > 0 && (
          <div className="flex-grow p-4 border-2 rounded-lg border-gray-200 dark:border-gray-700">
            {tasks.map((task) => (
              <Fragment key={task._id}>
                <div className="flex flex-col border-b border-gray-200 dark:border-gray-700 py-3 px-5 w-full">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-4">
                      <Checkbox checked={task.completed} />
                        <div>{task.title}</div>
                      </div>
                      <div className="hidden sm:flex pl-4 text-xs">
                        <div className="flex items-center gap-2 border-r px-4">
                          <div className="w-4 h-4 fill-gray-500 transition duration-75 dark:text-gray-400">
                            <svg viewBox="0 0 500 500">
                              <path d="M71.36 35.15c.1-5.77.18-11.52.23-17.25C71.72 5.23 80.77-1.42 92.74.3c17.89 2.57 14.16 22.22 14.45 34.71.01.49.26.74.75.74h70.04c.36 0 .54-.18.54-.54.08-6.21.1-12.35.06-18.41-.17-21.84 35.41-23.05 35.64.54.06 6.04.09 11.99.08 17.86 0 .31.24.56.55.56h70.3c.37 0 .56-.19.56-.56.03-7.58-.93-18.45 1.14-24.4 5.87-16.93 34.68-13.07 34.56 5.7-.04 6.17-.02 12.34.07 18.52.01.49.26.74.75.74h70.07c.36 0 .54-.18.55-.55.04-6.09.06-12.13.03-18.12-.09-22.52 35.7-23.16 35.67.54-.01 5.84.01 11.69.07 17.53 0 .39.2.59.59.59 12.96.01 26.63-1.15 38.97 4.29 15.55 6.84 26.73 20.23 30.41 36.84.94 4.24 1.41 11.65 1.42 22.23.01 111.97.01 223.95 0 335.93 0 11.04-.35 18.46-1.04 22.24-4.61 25.23-26.62 42.66-52.53 42.67-130.86.07-261.72.07-392.57.02-25.52-.01-47.23-16.39-52.52-41.61C.44 454.12 0 446.72 0 436.13V89.31c0-24.75 15.74-45.66 39.79-51.83 9.23-2.37 20.69-1.85 30.94-1.72.41.01.62-.2.63-.61zm249.22 60.19c-5.35 17.75-34.2 15.35-34.59-4.94-.12-5.98-.24-12.06-.37-18.24-.01-.47-.25-.7-.71-.7h-70.04c-.35 0-.53.17-.54.52-.17 7.48.95 17.41-1.14 23.67-3.91 11.69-18.04 14.73-27.46 8.39-4.51-3.04-6.83-7.86-6.96-14.46-.12-5.95-.2-11.82-.25-17.59 0-.36-.18-.54-.54-.54h-70.27c-.35 0-.53.17-.54.52-.1 4.58-.1 9.18-.02 13.81.21 11.76-4.39 21.37-17.71 21.33-7.78-.03-14.44-3.64-16.96-11.09-1.98-5.86-1.04-16.46-1.07-23.92-.01-.41-.22-.62-.62-.62-4.27-.04-8.53-.05-12.78-.04-9.69.03-17.32 1.23-20.88 10.37-.9 2.31-1.37 6.09-1.41 11.34-.12 16.23-.09 32.57.08 49.04 0 .47.24.7.71.7H463.7c.36 0 .54-.18.54-.55.06-16.03.07-32.07.03-48.11-.02-10.13-1.17-18.29-11.13-21.64-6.08-2.05-16.47-1.12-23.96-1.13-.39 0-.58.19-.59.58-.13 7.5.98 17.58-1.22 23.88-4 11.42-17.87 14.34-27.2 8.24-4.61-3.01-6.98-7.87-7.12-14.58-.12-5.9-.2-11.68-.26-17.34-.01-.43-.36-.78-.79-.78h-70.03c-.37 0-.56.19-.56.56.01 5.06 0 10.08-.04 15.06-.02 3.81-.29 6.56-.79 8.26zM35.74 446.92c.01 10.41 7.63 17.43 17.83 17.43 129.63-.03 259.27-.04 388.9-.04 5.24 0 9.1-.52 11.57-1.57 6.82-2.9 10.23-8.89 10.23-17.96V179.43c0-.55-.28-.83-.83-.83H36.28c-.36 0-.55.18-.55.55-.05 89.31-.05 178.57.01 267.77z" />
                              <path d="M327.23 244.24c-8.14-8.13-21.33-8.13-29.46 0L250 292.01l-47.77-47.77c-8.14-8.14-21.33-8.14-29.46 0-8.14 8.14-8.14 21.33 0 29.46l47.77 47.77-47.77 47.77c-8.14 8.14-8.14 21.33 0 29.46s21.33 8.14 29.46 0L250 350.94l47.77 47.77c8.14 8.14 21.33 8.14 29.46 0 8.14-8.14 8.14-21.33 0-29.46l-47.77-47.77 47.77-47.77c8.14-8.14 8.14-21.33 0-29.47 0 .01 0 0 0 0z" />
                            </svg>
                          </div>
                          <div>{new Date(task.dueDate).toLocaleDateString()}</div>
                        </div>
                        <div className="flex items-center gap-2 border-r px-4">
                          <div className="flex items-center justify-center w-3 h-3 p-[10px] text-xs font-medium text-red-800 bg-red-100 rounded-full dark:bg-red-900 dark:text-white">
                          {task.subtasks?.length || 0}
                          </div>
                          <div>Subtasks</div>
                        </div>
                        <div className="flex items-center gap-2 px-4">
                          <div
                            className={`w-5 h-5 rounded-md ${categoryData.color}`}
                          />
                          <div>{categoryData.name}</div>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleTaskClick(task)}
                      className="grow flex justify-end py-[14px]"
                    >
                      <div className="xxs:hidden sm:block">
                        <IoIosArrowForward />
                      </div>
                    </button>
                  </div>
                  <div className="mt-3 pl-8">{task.description}</div>
                </div>
              </Fragment>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
