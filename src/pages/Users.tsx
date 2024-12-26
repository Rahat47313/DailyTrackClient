import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dropdown, Label, TextInput } from "flowbite-react";
import { fetchUsers, createUser, deleteUser } from "../redux/users/usersThunks";
import { selectUsers, selectUsersLoading } from "../redux/users/usersSelectors";
import { MdDelete } from "react-icons/md";

export default function Users() {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const isLoading = useSelector(selectUsersLoading);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    userType: "employee",
  });

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
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createUser(formData)).unwrap();
      setFormData({ name: "", email: "", password: "", userType: "employee" });
    } catch (error) {
      console.error("Failed to create user:", error);
    }
  };

  const handleDelete = (userId: string) => {
    dispatch(deleteUser(userId));
  };

  const adminUsers = users.filter((user) => user.userType === "admin");
  const employeeUsers = users.filter((user) => user.userType === "employee");

  return (
    <div className="p-4 md:ml-64 mt-[60px]">
      <div className="font-bold text-4xl border-b border-gray-200 dark:border-gray-700 pb-5 mb-5">
        Users
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex-grow p-4 border-2 rounded-lg border-gray-200 dark:border-gray-700">
          <div className="font-bold text-2xl mb-4">Add new User</div>
          <form
            onSubmit={handleSubmit}
            className="flex max-w-md flex-col gap-4"
          >
            <div>
              <div className="mb-2 block">
                <Label htmlFor="username0" value="Your name" />
              </div>
              <TextInput
                id="username0"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email0" value="Your email" />
              </div>
              <TextInput
                id="email0"
                type="email"
                placeholder="name@contessa.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password0" value="Password" />
              </div>
              <TextInput
                id="password0"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="userType0" value="User Type" />
              </div>
              <Dropdown
                id="userType0"
                theme={dropdownTheme}
                renderTrigger={() => (
                  <button
                    className="text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 font-medium rounded-lg text-sm w-full p-2.5 text-center flex justify-center items-center dark:bg-gray-700 dark:hover:bg-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="button"
                  >
                    Choose
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
                <Dropdown.Item
                  onClick={() =>
                    setFormData({ ...formData, userType: "admin" })
                  }
                >
                  Admin
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  onClick={() =>
                    setFormData({ ...formData, userType: "employee" })
                  }
                >
                  User
                </Dropdown.Item>
              </Dropdown>
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create User"}
            </Button>
          </form>
        </div>
        <div className="flex-grow p-4 border-2 rounded-lg border-gray-200 dark:border-gray-700">
          <div className="font-bold text-2xl mb-4">Admins</div>
          <ul className="flex flex-col gap-4">
            {adminUsers.map((user) => (
              <li key={user._id} className="flex justify-between items-center">
                <div>
                  <div className="font-bold">{user.name}</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </div>
                <button onClick={() => handleDelete(user._id)}>
                  <p className="text-xl hover:text-red-500">
                    <MdDelete />
                  </p>
                </button>
              </li>
            ))}
            <li className="flex justify-between items-center">
              <div>
                <div className="font-bold">John Doe</div>
              </div>
              <p className="text-xl hover:text-red-500">
                <MdDelete />
              </p>
            </li>
          </ul>
        </div>
        <div className="flex-grow p-4 border-2 rounded-lg border-gray-200 dark:border-gray-700">
          <div className="font-bold text-2xl mb-4">Employees</div>
          <ul className="flex flex-col gap-4">
            {employeeUsers.map((user) => (
              <li key={user._id} className="flex justify-between items-center">
                <div>
                  <div className="font-bold">{user.name}</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </div>
                <button onClick={() => handleDelete(user._id)}>
                  <p className="text-xl hover:text-red-500">
                    <MdDelete />
                  </p>
                </button>
              </li>
            ))}
            <li className="flex justify-between items-center">
              <div>
                <div className="font-bold">John Doe</div>
              </div>
              <p className="text-xl hover:text-red-500">
                <MdDelete />
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
