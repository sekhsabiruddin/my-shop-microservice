// components/UserTable.tsx
"use client";
import { MoreVertical } from "lucide-react";
import { UserType } from "../data/mockUsers";

interface Props {
  users: UserType[];
}

function UserTable({ users }: Props) {
  return (
    <div className="bg-[#1d1d1f] p-4 rounded-xl">
      <table className="w-full">
        <thead>
          <tr className="text-gray-400 text-left text-sm">
            <th className="pb-3">Name</th>
            <th className="pb-3">Email</th>
            <th className="pb-3">Role</th>
            <th className="pb-3">Status</th>
            <th className="pb-3">Last Login</th>
            <th className="pb-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t border-[#2b2b2e]/50">
              <td className="flex items-center gap-3 py-4">
                <div className="h-8 w-8 rounded-full bg-purple-700 flex items-center justify-center text-sm font-semibold">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                {user.name}
              </td>
              <td>{user.email}</td>
              <td>
                <span className="px-3 py-1 rounded-full text-xs bg-yellow-900/30 text-yellow-400">
                  {user.role}
                </span>
              </td>
              <td>
                <span
                  className={`px-3 py-1 rounded-full text-xs ${
                    user.status === "active"
                      ? "bg-green-900/30 text-green-400"
                      : "bg-red-900/30 text-red-400"
                  }`}
                >
                  {user.status}
                </span>
              </td>
              <td>{user.lastLogin}</td>
              <td className="text-right">
                <MoreVertical size={18} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default UserTable;
