import { useState, useEffect, Fragment } from "react";
import { Drawer, Datepicker, Checkbox, Dropdown } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { selectSidebarRightVisibility } from "../redux/sidebarRight/sidebarRightSelectors.ts";
import { setSidebarRightVisibility } from "../redux/sidebarRight/sidebarRightSlice";
import { selectSelectedTask } from "../redux/sidebarRight/selectedTaskSelectors";
import { clearSelectedTask } from "../redux/sidebarRight/selectedTaskSlice";
import { createTask, updateTask, deleteTask } from "../redux/tasks/tasksThunks";
import {
  selectCategories,
  selectCurrentCategory,
  selectCategoriesLoading,
  selectCategoriesError,
} from "../redux/tasks/categoriesSelectors";

export default function SidebarRight() {
  const dispatch = useDispatch();
  const sidebarRightVisibility = useSelector(selectSidebarRightVisibility);
  const selectedTask = useSelector(selectSelectedTask);
  const categories = useSelector(selectCategories);
  const currentCategory = useSelector(selectCurrentCategory);
  const isLoading = useSelector(selectCategoriesLoading);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState("");
  const [renameSubtaskIndex, setRenameSubtaskIndex] = useState(null);
  const [renameSubtaskTitle, setRenameSubtaskTitle] = useState("");

  const dropdownTheme = {
    arrowIcon: "ml-0 h-0 w-0",
    content: "py-1 focus:outline-none",
    floating: {
      animation: "transition-opacity",
      arrow: {
        base: "absolute z-10 h-2 w-2 rotate-45",
        style: {
          dark: "bg-gray-900 dark:bg-gray-700",
          light: "bg-white",
          auto: "bg-white dark:bg-gray-700",
        },
        placement: "-4px",
      },
      base: "z-10 w-fit divide-y divide-gray-100 rounded shadow focus:outline-none",
      content: "py-1 text-sm text-gray-700 dark:text-gray-200",
      divider: "my-1 h-px bg-gray-100 dark:bg-gray-600",
      header: "block px-4 py-2 text-sm text-gray-700 dark:text-gray-200",
      hidden: "invisible opacity-0",
      item: {
        container: "",
        base: "flex w-full cursor-pointer items-center justify-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:bg-gray-600 dark:focus:text-white",
        icon: "mr-2 h-4 w-4",
      },
      style: {
        dark: "bg-gray-900 text-white dark:bg-gray-700",
        light: "border border-gray-200 bg-white text-gray-900",
        auto: "border border-gray-200 bg-white text-gray-900 dark:border-none dark:bg-gray-700 dark:text-white",
      },
      target: "w-fit",
    },
    inlineWrapper: "flex items-center",
  };

  const [formErrors, setFormErrors] = useState({
    title: "",
    categoryId: "",
    dueDate: "",
  });

  const validateForm = () => {
    const errors = {
      title: "",
      categoryId: "",
      dueDate: "",
    };

    if (!formData.title.trim()) {
      errors.title = "Title is required";
    }
    if (!formData.categoryId) {
      errors.categoryId = "Category is required";
    }
    if (!formData.dueDate) {
      errors.dueDate = "Due date is required";
    }

    setFormErrors(errors);
    return !Object.values(errors).some((error) => error);
  };

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

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: new Date(),
    categoryId: "",
    subtasks: [],
  });

  // Initialize form data
  useEffect(() => {
    if (selectedTask) {
      setFormData({
        title: selectedTask.title,
        description: selectedTask.description || "",
        dueDate: new Date(selectedTask.dueDate),
        categoryId: selectedTask.category._id,
        subtasks: selectedTask.subtasks,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        dueDate: new Date(),
        categoryId: currentCategory?._id || "",
        subtasks: [],
      });
    }
  }, [selectedTask, currentCategory]);

  // Form handlers
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddSubtask = () => {
    if (!newSubtaskTitle.trim()) return;
    setFormData((prev) => ({
      ...prev,
      subtasks: [
        ...prev.subtasks,
        { title: newSubtaskTitle, completed: false },
      ],
    }));
    setNewSubtaskTitle("");
  };

  const handleRenameSubtask = (index) => {
    if (!renameSubtaskTitle.trim()) {
      setRenameSubtaskIndex(null);
      setRenameSubtaskTitle("");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      subtasks: prev.subtasks.map((subtask, i) =>
        i === index ? { ...subtask, title: renameSubtaskTitle } : subtask
      ),
    }));

    setRenameSubtaskIndex(null);
    setRenameSubtaskTitle("");
  };

  const handleDeleteSubtask = (index) => {
    const newSubtasks = formData.subtasks.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      subtasks: newSubtasks,
    }));
  };

  const handleToggleSubtask = (index) => {
    const newSubtasks = [...formData.subtasks];
    newSubtasks[index].completed = !newSubtasks[index].completed;
    setFormData((prev) => ({
      ...prev,
      subtasks: newSubtasks,
    }));
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      if (selectedTask) {
        await dispatch(
          updateTask({
            id: selectedTask._id,
            updates: formData,
            categoryId: formData.categoryId,
          })
        );
      } else {
        await dispatch(createTask(formData));
      }
      handleClose();
    } catch (err) {
      console.error("Failed to save task:", err);
    }
  };

  const handleDelete = async () => {
    try {
      if (selectedTask) {
        await dispatch(
          deleteTask({
            id: selectedTask._id,
            categoryId: formData.categoryId,
          })
        );
        handleClose();
      }
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  const handleClose = () => {
    dispatch(setSidebarRightVisibility(false));
    dispatch(clearSelectedTask());
  };

  return (
    <>
      <Drawer
        open={sidebarRightVisibility}
        onClose={handleClose}
        position="right"
        theme={drawerTheme}
        className="p-8 w-[400px]"
      >
        <Drawer.Header
          titleIcon={() => <></>}
          title={selectedTask ? "Edit Task" : "New Task"}
        />
        <Drawer.Items>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-5 max-w-sm mx-auto"
          >
            <div>
              <input
                type="text"
                value={formData.title}
                placeholder="Task title"
                onChange={(e) => handleInputChange("title", e.target.value)}
                disabled={isLoading}
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                  formErrors.title ? "border-red-500" : ""
                }`}
              />
              {formErrors.title && (
                <p className="mt-1 text-sm text-red-500">{formErrors.title}</p>
              )}
            </div>

            <textarea
              id="message"
              rows={4}
              placeholder="Description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />

            <div className="flex items-center gap-4">
              <p className="block mb-2 text-sm font-medium">Categories</p>
              <Dropdown
                renderTrigger={() => (
                  <button
                    className="text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 font-medium rounded-lg text-sm w-full p-2.5 text-center flex justify-center items-center dark:bg-gray-700 dark:hover:bg-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="button"
                  >
                    {(() => {
                      const selectedCategory = categories.find(
                        (c) => c._id === formData.categoryId
                      );
                      return selectedCategory
                        ? selectedCategory.name
                        : "Choose";
                    })()}
                    {/* {formData.categoryId
                      ? categories.find((c) => c._id === formData.categoryId)
                          ?.name
                      : "Choose"} */}
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
                )}
              >
                {categories.map((category, index) => (
                  <Fragment key={category._id}>
                    <Dropdown.Item
                      onClick={() =>
                        handleInputChange("categoryId", category._id)
                      }
                    >
                      {category.name}
                    </Dropdown.Item>
                    {index !== categories.length - 1 && <Dropdown.Divider />}
                  </Fragment>
                ))}
              </Dropdown>
            </div>
            <div className="flex items-center gap-4">
              <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Due
              </div>
              <Datepicker
                value={formData.dueDate}
                onChange={(date) => handleInputChange("dueDate", date)}
              />
            </div>
            <div className="font-bold text-xl text-gray-500 uppercase dark:text-gray-400">
              Subtasks:
            </div>
            {formData.subtasks.map((subtask, index) => (
              <div key={index} className="flex items-center gap-2">
                {renameSubtaskIndex === index ? (
                  <input
                    type="text"
                    value={renameSubtaskTitle}
                    onChange={(e) => setRenameSubtaskTitle(e.target.value)}
                    onBlur={() => handleRenameSubtask(index)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleRenameSubtask(index);
                      } else if (e.key === "Escape") {
                        setRenameSubtaskIndex(null);
                        setRenameSubtaskTitle("");
                      }
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                  />
                ) : (
                  <div className="w-full flex items-center justify-between p-2">
                    <div className="flex items-center gap-4">
                      <Checkbox
                        checked={subtask.completed}
                        onChange={() => handleToggleSubtask(index)}
                      />
                      <span className="flex-1 whitespace-nowrap">
                        {subtask.title}
                      </span>
                    </div>
                    <Dropdown
                      label=""
                      theme={dropdownTheme}
                      renderTrigger={() => (
                        <button>
                          <p className="text-xl hover:text-red-500">
                            <BsThreeDotsVertical />
                          </p>
                        </button>
                      )}
                    >
                      <Dropdown.Item
                        icon={FaEdit}
                        onClick={() => {
                          setRenameSubtaskIndex(index);
                          setRenameSubtaskTitle(subtask.title);
                        }}
                      >
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item
                        icon={MdDelete}
                        onClick={() => {
                          handleDeleteSubtask(index);
                        }}
                      >
                        Delete
                      </Dropdown.Item>
                    </Dropdown>
                  </div>
                )}
              </div>
            ))}
            <div className="flex items-center justify-between gap-2">
              <input
                type="text"
                value={newSubtaskTitle}
                onChange={(e) => setNewSubtaskTitle(e.target.value)}
                placeholder="Add a new subtask"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
              />
              <button
                onClick={handleAddSubtask}
                className="flex items-center justify-center px-4 py-2.5 rounded-lg hover:text-red-500 dark:hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 group"
              >
                <span>+</span>
              </button>
            </div>
            <div className="flex justify-center items-center gap-10 pt-10">
              <button
                type="button"
                onClick={handleSave}
                disabled={isLoading}
                className="flex items-center text-green-500 border rounded-md border-green-200 dark:border-green-700 gap-4 py-3 px-5"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900" />
                ) : (
                  <>
                    <FaSave />
                    <span>SAVE</span>
                  </>
                )}
              </button>
              {selectedTask && (
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isLoading}
                  className="flex items-center text-red-500 border rounded-md border-red-200 dark:border-red-700 gap-4 py-3 px-5"
                >
                  <MdDelete />
                  <span>DELETE</span>
                </button>
              )}
            </div>
          </form>
        </Drawer.Items>
      </Drawer>
    </>
  );
}
