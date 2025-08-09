"use client";
import React from "react";
import OrdersOverview from "./components/OrdersOverview";
import { DollarSign, ShoppingCart, Users, Boxes } from "lucide-react";
import OrdersTable from "./components/OrdersTable";
const page = () => {
  return (
    <div>
      <main className="min-h-screen bg-[#0b0f16] p-4 md:p-8">
        <OrdersOverview
          stats={[
            {
              label: "Total Revenue",
              value: "54,239",
              prefix: "$",
              icon: DollarSign,
            },
            { label: "Orders", value: "1,429", icon: ShoppingCart },
            { label: "Customers", value: "2,845", icon: Users },
            { label: "Products", value: "892", icon: Boxes },
          ]}
        />
        <OrdersTable />
      </main>
    </div>
  );
};

export default page;
