"use client";

import React from "react";
import {
  DollarSign,
  ShoppingCart,
  Users,
  Boxes,
  LucideIcon,
} from "lucide-react";

type Stat = {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  prefix?: string; // e.g. "$"
};

type OrdersOverviewProps = {
  title?: string;
  subtitle?: string;
  stats: Stat[];
};

export default function OrdersOverview({
  title = "Orders",
  subtitle = "Search, filter and manage your recent orders.",
  stats,
}: OrdersOverviewProps) {
  return (
    <section className="w-full">
      {/* Top banner */}
      <div className="rounded-3xl bg-gradient-to-r from-purple-500 to-violet-500 text-white p-6 md:p-8 shadow-lg">
        <h1 className="text-2xl md:text-3xl font-semibold">{title}</h1>
        <p className="text-white/80 mt-1">{subtitle}</p>
      </div>

      {/* Stats grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={`${s.label}-${i}`}
              className="rounded-2xl bg-zinc-900/70 border border-white/10 shadow-sm p-5 flex items-center justify-between"
            >
              <div className="space-y-1">
                <p className="text-sm text-zinc-300">{s.label}</p>
                <div className="flex items-end gap-2">
                  {s.prefix ? (
                    <span className="text-xl md:text-2xl text-zinc-200">
                      {s.prefix}
                    </span>
                  ) : null}
                  <span className="text-2xl md:text-3xl font-semibold text-white tabular-nums">
                    {s.value}
                  </span>
                </div>
              </div>
              {Icon ? (
                <div className="shrink-0 rounded-xl bg-zinc-800/70 p-3">
                  <Icon className="w-5 h-5 text-zinc-200" />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
