// data/mockUsers.ts
export type UserType = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
};

export const users: UserType[] = [
  {
    id: 1,
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    role: "User",
    status: "active",
    lastLogin: "2024-08-16",
  },
  {
    id: 2,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Admin",
    status: "inactive",
    lastLogin: "2024-08-15",
  },
  {
    id: 2,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Admin",
    status: "deleted",
    lastLogin: "2024-08-15",
  },
];
