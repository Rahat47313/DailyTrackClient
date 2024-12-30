import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dropdown, Label, TextInput } from "flowbite-react";
import { fetchUsers, createUser, deleteUser } from "../redux/users/usersThunks";
import { selectUsers, selectUsersLoading } from "../redux/users/usersSelectors";
import { selectCurrentUser } from "../redux/auth/authSelectors";
import UserList from "../components/Users/UserList";

export default function Users() {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const currentUser = useSelector(selectCurrentUser);
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
    console.log("Current user:", currentUser);
    console.log("All users:", users);
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = useMemo(() => {
    if (currentUser.userType === "superAdmin") {
      return {
        superAdmins: users.filter((user) => user.userType === "superAdmin"),
        admins: users.filter((user) => user.userType === "admin"),
        employees: users.filter((user) => user.userType === "employee"),
      };
    }
    if (currentUser.userType === "admin") {
      return {
        admins: users.filter((user) => user.userType === "admin"),
        employees: users.filter((user) => user.userType === "employee"),
      };
    }
    return {};
  }, [users, currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createUser(formData)).unwrap();
      setFormData({ name: "", email: "", password: "", userType: "employee" });
    } catch (error) {
      console.error("Failed to create user:", error);
    }
  };

  const handleDelete = async (userId: string, userType: string) => {
    try {
      if (currentUser.userType === "superAdmin") {
        // Permanently delete
        await dispatch(deleteUser(userId)).unwrap();
      } else if (currentUser.userType === "admin") {
        // Soft delete - just deactivate
        await dispatch(deactivateUser(userId)).unwrap();
      }
    } catch (error) {
      console.error("Failed to remove user:", error);
    }
  };

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
                <Label htmlFor="email" value="Your email" />
              </div>
              <TextInput
                id="email"
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
                <Label htmlFor="password" value="Password" />
              </div>
              <TextInput
                id="password"
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
                <Label htmlFor="userType" value="User Type" />
              </div>
              <Dropdown
                id="userType"
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
                  Employee
                </Dropdown.Item>
              </Dropdown>
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create User"}
            </Button>
          </form>
        </div>
        {currentUser.userType === "superAdmin" &&
          filteredUsers.superAdmins?.length > 0 && (
            <div className="flex-grow p-4 border-2 rounded-lg border-gray-200 dark:border-gray-700">
              <div className="font-bold text-2xl mb-4">Super Admins</div>
              <UserList
                users={filteredUsers.superAdmins}
                onDelete={handleDelete}
                canDelete={false} // Super admins can't be deleted
              />
            </div>
          )}
        {filteredUsers.admins?.length > 0 && (
          <div className="flex-grow p-4 border-2 rounded-lg border-gray-200 dark:border-gray-700">
            <div className="font-bold text-2xl mb-4">Admins</div>
            <UserList
              users={filteredUsers.admins}
              onDelete={handleDelete}
              canDelete={currentUser.userType === "superAdmin"}
            />
          </div>
        )}
        {filteredUsers.employees?.length > 0 && (
          <div className="flex-grow p-4 border-2 rounded-lg border-gray-200 dark:border-gray-700">
            <div className="font-bold text-2xl mb-4">Employees</div>
            <UserList
              users={filteredUsers.employees}
              onDelete={handleDelete}
              canDelete={true}
            />
          </div>
        )}
      </div>
    </div>
  );
}
