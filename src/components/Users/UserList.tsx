import { MdDelete } from "react-icons/md";
import type { User } from "../../types";

interface UserListProps {
  users: User[];
  onDelete: (userId: string, userType: string) => void;
  canDelete: boolean;
}

export default function UserList({ users, onDelete, canDelete }: UserListProps) {
  return (
    <ul className="flex flex-col gap-4">
      {users.map((user) => (
        <li key={user._id} className="flex justify-between items-center">
          <div>
            <div className="font-bold">{user.name}</div>
            <div className="text-sm text-gray-500">{user.email}</div>
          </div>
          {canDelete && (
            <button onClick={() => onDelete(user._id, user.userType)}>
              <p className="text-xl hover:text-red-500">
                <MdDelete />
              </p>
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}