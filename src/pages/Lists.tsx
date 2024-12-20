import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCategories, selectCategoriesLoading } from "../redux/tasks/categoriesSelectors";
import { fetchCategories, createCategory } from "../redux/tasks/categoriesThunks";

export default function Lists() {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const isLoading = useSelector(selectCategoriesLoading);
  const [newCategoryName, setNewCategoryName] = useState("");

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="p-4 md:ml-64 mt-[60px]">
        <div className="font-bold text-4xl border-b border-gray-200 dark:border-gray-700 pb-5 mb-5">
          Lists of Tasks
        </div>
        <div className="flex gap-5 flex-wrap">
          {categories.map((category) => (
            <NavLink
              key={category._id}
              to={`/lists/${category.name}`}
              className="flex justify-center items-center gap-3 p-4 border-2 rounded-lg border-gray-200 dark:border-gray-700"
            >
              <div
                className={`w-5 h-5 rounded-md ${category.color}`}
              />
              {category.name}
            </NavLink>
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
             className="flex items-center justify-center px-4 py-2.5 rounded-lg hover:text-red-500 dark:hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <span>+</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
