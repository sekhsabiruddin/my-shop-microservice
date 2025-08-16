"use client";

import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import StatusFilter from "./components/StatusFilter";
import UserTable from "./components/UserTable";
import { users } from "./data/mockUsers";
import { Download, FileText } from "lucide-react";

const Page = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [activeTab, setActiveTab] = useState<"all" | "deleted">("all");

  const filteredUsers =
    activeTab === "all"
      ? users.filter((u) => u.status !== "deleted")
      : users.filter((u) => u.status === "deleted");

  return (
    <div className="p-6 text-white">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold mb-6">User Management</h1>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-[#2f2f31] text-white px-4 py-2 rounded-lg">
            <FileText size={18} />
            Export PDF
          </button>

          <button className="flex items-center gap-2 border border-[#2f2f31] text-white px-4 py-2 rounded-lg">
            <Download size={18} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "all" ? "bg-[#2f2f31]" : "border border-[#2f2f31]"
          }`}
        >
          All Users
        </button>
        <button
          onClick={() => setActiveTab("deleted")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "deleted" ? "bg-[#2f2f31]" : "border border-[#2f2f31]"
          }`}
        >
          Recycle Bin
        </button>
      </div>

      {/* Search + filter */}
      {/** you can hide filters for deleted tab if needed */}
      <div className="flex items-center justify-between gap-4 mb-6 mt-2">
        <SearchBar value={search} onChange={setSearch} />
        <StatusFilter activeFilter={filter} setActiveFilter={setFilter} />
      </div>

      {/* Table */}
      <UserTable users={filteredUsers} />
    </div>
  );
};

export default Page;
