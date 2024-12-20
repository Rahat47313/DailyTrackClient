import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "flowbite-react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { selectCategories } from "../redux/tasks/categoriesSelectors";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../redux/tasks/categoriesThunks";

export default function Lists() {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [renameCategoryId, setRenameCategoryId] = useState(null);
  const [renameCategoryName, setRenameCategoryName] = useState("");

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

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) return;
    try {
      await dispatch(createCategory(newCategoryName)).unwrap();
      setNewCategoryName("");
    } catch (error) {
      console.error("Failed to create category:", error);
    }
  };

  const handleRenameCategory = async (id) => {
    if (!renameCategoryName.trim()) return;
    try {
      await dispatch(updateCategory({ id, name: renameCategoryName })).unwrap();
      setRenameCategoryId(null);
      setRenameCategoryName("");
    } catch (error) {
      console.error("Failed to rename category:", error);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await dispatch(deleteCategory(id)).unwrap();
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  return (
    <div>
      <div className="p-4 md:ml-64 mt-[60px]">
        <div className="font-bold text-4xl border-b border-gray-200 dark:border-gray-700 pb-5 mb-5">
          Lists of Tasks
        </div>
        <div className="flex gap-5 flex-wrap">
          {categories.map((category) => (
            <div
              key={category._id}
              className="flex justify-center items-center gap-3 p-4 border-2 rounded-lg border-gray-200 dark:border-gray-700"
            >
              {renameCategoryId === category._id ? (
                <input
                  type="text"
                  value={renameCategoryName}
                  onChange={(e) => setRenameCategoryName(e.target.value)}
                  onBlur={() => handleRenameCategory(category._id)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500 w-40"
                />
              ) : (
                <NavLink
                  to={`/lists/${category.name}`}
                  className="flex justify-center items-center gap-3"
                >
                  <div className={`w-5 h-5 rounded-md ${category.color}`} />
                  {category.name}
                </NavLink>
              )}
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
                    setRenameCategoryId(category._id);
                    setRenameCategoryName(category.name);
                  }}
                >
                  Rename
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  icon={MdDelete}
                  onClick={() => handleDeleteCategory(category._id)}
                >
                  Delete
                </Dropdown.Item>
              </Dropdown>
            </div>
          ))}
          <div className="flex justify-between items-center gap-3 px-4 py-4 border-2 rounded-lg border-gray-200 dark:border-gray-700">
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Add a new list"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500 w-40"
            />
            <button
              onClick={handleCreateCategory}
              className="flex items-center justify-center px-4 py-2.5 rounded-lg hover:text-red-500 dark:hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <span>+</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
